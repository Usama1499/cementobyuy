// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Public backend configuration for this standalone deployment. Defining both
    // variants keeps browser hydration and SSR on the same external project even
    // when the hosting platform does not inject environment variables at build time.
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
        "https://mudbizqkcldtskdtomkv.supabase.co",
      ),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        "sb_publishable_W43SaU3KlU5CxmhYM5xEhg_ZYupzRU4",
      ),
      "process.env.SUPABASE_URL": JSON.stringify(
        "https://mudbizqkcldtskdtomkv.supabase.co",
      ),
      "process.env.SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        "sb_publishable_W43SaU3KlU5CxmhYM5xEhg_ZYupzRU4",
      ),
      
      // ===== ADD SQUARE ENVIRONMENT VARIABLES HERE =====
      // Client-side (Vite) variables
      "import.meta.env.VITE_SQUARE_APP_ID": JSON.stringify(
        "sandbox-sq0idb-X2D0KHqEMd5fPMkAy598Sw",
      ),
      "import.meta.env.VITE_SQUARE_ACCESS_TOKEN": JSON.stringify(
        "EAAAl1X8kNkTslEuAkl5dzXaevex39jm-Eo4g1ZCkF9Y2mVN8F0kRA8RPY7i9kHw",
      ),
      "import.meta.env.VITE_SQUARE_LOCATION_ID": JSON.stringify(
        "L32Z1PY3P905Q",
      ),
      "import.meta.env.VITE_SQUARE_ENVIRONMENT": JSON.stringify(
        "sandbox",
      ),
      
      // Server-side (Node.js) variables
      "process.env.SQUARE_APP_ID": JSON.stringify(
        "sandbox-sq0idb-X2D0KHqEMd5fPMkAy598Sw",
      ),
      "process.env.SQUARE_ACCESS_TOKEN": JSON.stringify(
        "EAAAl1X8kNkTslEuAkl5dzXaevex39jm-Eo4g1ZCkF9Y2mVN8F0kRA8RPY7i9kHw",
      ),
      "process.env.SQUARE_LOCATION_ID": JSON.stringify(
        "L32Z1PY3P905Q",
      ),
      "process.env.SQUARE_ENVIRONMENT": JSON.stringify(
        "sandbox",
      ),
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});