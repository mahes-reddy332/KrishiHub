import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Cloud, ChevronDown, Sprout } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const primaryLinks = [
    { name: t("navHome"), path: "/" },
    { name: t("navPriceEstimation"), path: "/price-estimation" },
    { name: t("navCropHealth"), path: "/crop-health" },
    { name: t("navSchemes"), path: "/government-schemes" },
    { name: t("navMarket"), path: "/direct-market" },
    { name: t("navLand"), path: "/landselling" },
    { name: t("navPrices"), path: "/prices" },
    { name: t("navWeather"), path: "/wether", icon: <Cloud className="w-3.5 h-3.5" /> },
    { name: t("navToken"), path: "/tokenform" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-background/60 backdrop-blur-md border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-agri-green-light flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              {t("projectKisan")} <span className="text-primary">{t("projectKisanHighlight")}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="text-sm">
                <Link to="/farmerform">{t("logIn")}</Link>
              </Button>
              <Button size="sm" asChild className="rounded-lg bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 text-sm">
                <Link to="/workplace">{t("dashboard")}</Link>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-border/50 flex gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1 rounded-xl">
                <Link to="/farmerform" onClick={() => setIsOpen(false)}>{t("logIn")}</Link>
              </Button>
              <Button size="sm" asChild className="flex-1 rounded-xl">
                <Link to="/workplace" onClick={() => setIsOpen(false)}>{t("dashboard")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
