import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface SquareCard {
  attach: (el: HTMLElement) => Promise<void>;
  tokenize: () => Promise<{
    status: string;
    token?: string;
    errors?: { message: string }[];
  }>;
  destroy?: () => Promise<void>;
}

interface SquarePayments {
  card: () => Promise<SquareCard>;
}

interface SquareGlobal {
  payments: (appId: string, locationId: string) => SquarePayments;
}

declare global {
  interface Window {
    Square?: SquareGlobal;
  }
}

const SDK_ID = "square-web-payments-sdk";

function loadSdk(environment: "sandbox" | "production"): Promise<SquareGlobal> {
  if (window.Square) return Promise.resolve(window.Square);
  const src =
    environment === "production"
      ? "https://web.squarecdn.com/v1/square.js"
      : "https://sandbox.web.squarecdn.com/v1/square.js";

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SDK_ID) as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");
    const onLoad = () => {
      if (window.Square) resolve(window.Square);
      else reject(new Error("Square SDK failed to initialise"));
    };
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", () => reject(new Error("Could not load the Square SDK")), {
      once: true,
    });
    if (!existing) {
      script.id = SDK_ID;
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

export interface SquareCardFormHandle {
  tokenize: () => Promise<string>;
}

export function SquareCardForm({
  appId,
  locationId,
  environment,
  onReady,
}: {
  appId: string;
  locationId: string;
  environment: "sandbox" | "production";
  onReady: (handle: SquareCardFormHandle | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    let cancelled = false;
    let card: SquareCard | null = null;

    (async () => {
      try {
        const sdk = await loadSdk(environment);
        const payments = sdk.payments(appId, locationId);
        card = await payments.card();
        if (cancelled || !containerRef.current) return;
        await card.attach(containerRef.current);
        if (cancelled) return;
        setStatus("ready");
        onReadyRef.current({
          tokenize: async () => {
            const result = await card!.tokenize();
            if (result.status !== "OK" || !result.token) {
              throw new Error(
                result.errors?.map((e) => e.message).join(" ") ?? "Card details are invalid",
              );
            }
            return result.token;
          },
        });
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setError(e instanceof Error ? e.message : "Could not load the card form");
        onReadyRef.current(null);
      }
    })();

    return () => {
      cancelled = true;
      onReadyRef.current(null);
      void card?.destroy?.();
    };
  }, [appId, locationId, environment]);

  return (
    <div className="mt-4">
      {status === "loading" && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading secure card form…
        </p>
      )}
      <div ref={containerRef} className="min-h-[90px]" />
      {status === "error" && <p className="text-sm text-destructive">{error}</p>}
      {status === "ready" && environment === "sandbox" && (
        <p className="mt-2 text-xs text-muted-foreground">
          Sandbox mode. Test card 4111 1111 1111 1111, any future expiry, CVV 111, postcode 6000.
        </p>
      )}
    </div>
  );
}
