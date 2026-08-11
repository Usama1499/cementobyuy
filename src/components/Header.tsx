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

const projectsMenu = [
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
] as const;

// Removed "Services" from nav since it's rendered separately
const nav = [
  { to: "/training", label: "DIY Training" },
  { to: "/store", label: "Shop" },
  { to: "/visualiser", label: "AI Visualiser" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page max-w-7xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-8 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img
            src={siteImages.logo}
            alt="Cemento — the art of microcement"
            width={320}
            height={80}
            className="h-8 w-auto object-contain sm:h-9 md:h-10 lg:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-5 xl:gap-7 2xl:gap-8 lg:flex">
          {/* Services - rendered once */}
          <Link
            to="/services"
            className="whitespace-nowrap text-xs text-muted-foreground transition-colors hover:text-foreground xl:text-sm"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Services
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground outline-none transition-colors hover:text-foreground data-[state=open]:text-foreground xl:text-sm">
              Texture <ChevronDown className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 sm:w-56">
              {textureMenu.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground outline-none transition-colors hover:text-foreground data-[state=open]:text-foreground xl:text-sm">
              Projects <ChevronDown className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 sm:w-56">
              {projectsMenu.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap text-xs text-muted-foreground transition-colors hover:text-foreground xl:text-sm"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
          <a 
            href={site.phoneHref} 
            className="hidden items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:flex xl:gap-2 xl:text-sm 2xl:flex"
          >
            <Phone className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
            <span className="hidden xl:inline">{site.phoneDisplay}</span>
          </a>

          <Link 
            to="/cart" 
            aria-label="View cart" 
            className="relative flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary sm:h-10 sm:w-10"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            {hydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[0.625rem] font-semibold text-clay-foreground sm:right-1 sm:top-1">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <Link 
              to="/account" 
              aria-label="My account" 
              className="flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary sm:h-10 sm:w-10"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          ) : (
            <Link 
              to="/auth" 
              aria-label="Sign in" 
              className="flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary sm:h-10 sm:w-10"
            >
              <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          )}

          <Button 
            asChild 
            variant="clay" 
            size="sm" 
            className="hidden sm:inline-flex text-xs px-3 py-1.5 h-8 sm:h-9 md:h-10 md:px-4 md:text-sm"
          >
            <Link to="/contact">Get a quote</Link>
          </Button>

          <button 
            type="button" 
            onClick={() => setOpen((v) => !v)} 
            aria-label={open ? "Close menu" : "Open menu"} 
            aria-expanded={open} 
            className="flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary lg:hidden sm:h-10 sm:w-10"
          >
            {open ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container-page max-w-7xl mx-auto flex flex-col px-4 py-2 sm:px-6">
            {/* Services - only once in mobile menu too */}
            <Link 
              to="/services" 
              onClick={() => setOpen(false)} 
              className="border-b border-border/60 py-3 text-sm text-foreground sm:py-4 sm:text-base"
            >
              Services
            </Link>
            
            <p className="pt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:pt-4">
              Texture
            </p>
            {textureMenu.map((item) => (
              <Link 
                key={item.to} 
                to={item.to} 
                onClick={() => setOpen(false)} 
                className="border-b border-border/60 py-3 pl-3 text-sm text-foreground sm:py-4 sm:pl-4 sm:text-base"
              >
                {item.label}
              </Link>
            ))}

            <p className="pt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:pt-4">
              Projects
            </p>
            {projectsMenu.map((item) => (
              <Link 
                key={item.to} 
                to={item.to} 
                onClick={() => setOpen(false)} 
                className="border-b border-border/60 py-3 pl-3 text-sm text-foreground sm:py-4 sm:pl-4 sm:text-base"
              >
                {item.label}
              </Link>
            ))}

            {nav.map((item) => (
              <Link 
                key={item.to} 
                to={item.to} 
                onClick={() => setOpen(false)} 
                className="border-b border-border/60 py-3 text-sm text-foreground sm:py-4 sm:text-base"
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <Link 
                to="/account" 
                onClick={() => setOpen(false)} 
                className="py-3 text-sm text-foreground sm:py-4 sm:text-base"
              >
                My account
              </Link>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setOpen(false)} 
                className="py-3 text-sm text-foreground sm:py-4 sm:text-base"
              >
                Sign in
              </Link>
            )}
            <Link 
              to="/contact" 
              onClick={() => setOpen(false)} 
              className="py-3 text-sm font-medium text-clay sm:py-4 sm:text-base"
            >
              Get a quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}