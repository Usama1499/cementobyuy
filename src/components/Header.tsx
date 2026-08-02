import { Link } from "@tanstack/react-router";
import { ChevronDown, LogIn, Menu, Phone, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { site } from "@/lib/site";
import { siteImages } from "@/lib/projects";

const textureMenu = [
  { to: "/textures", label: "Textures & finishes" },
  { to: "/custom-designs", label: "Custom Designs" },
] as const;

const nav = [
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/training", label: "DIY Training" },
  { to: "/store", label: "Shop" },
  { to: "/visualiser", label: "AI Visualiser" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img
            src={siteImages.logo}
            alt="Cemento — the art of microcement"
            width={320}
            height={80}
            className="h-9 w-auto object-contain lg:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            to="/services"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Services
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground data-[state=open]:text-foreground">
              Texture <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {textureMenu.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground xl:flex">
            <Phone className="h-4 w-4" />{site.phoneDisplay}
          </a>

          <Link to="/cart" aria-label="View cart" className="relative flex h-10 w-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary">
            <ShoppingBag className="h-5 w-5" />
            {hydrated && count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[0.625rem] font-semibold text-clay-foreground">{count}</span>
            )}
          </Link>

          {user ? (
            <Link to="/account" aria-label="My account" className="flex h-10 w-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary">
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link to="/auth" aria-label="Sign in" className="flex h-10 w-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary">
              <LogIn className="h-5 w-5" />
            </Link>
          )}

          <Button asChild variant="clay" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Get a quote</Link>
          </Button>

          <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="flex h-10 w-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-2">
            <Link to="/services" onClick={() => setOpen(false)} className="border-b border-border/60 py-3 text-sm text-foreground">
              Services
            </Link>
            <p className="pt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Texture</p>
            {textureMenu.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-border/60 py-3 pl-3 text-sm text-foreground">
                {item.label}
              </Link>
            ))}
            {nav.slice(1).map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-border/60 py-3 text-sm text-foreground">
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link to="/account" onClick={() => setOpen(false)} className="py-3 text-sm text-foreground">My account</Link>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="py-3 text-sm text-foreground">Sign in</Link>
            )}
            <Link to="/contact" onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-clay">Get a quote</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
