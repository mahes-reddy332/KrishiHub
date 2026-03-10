
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import Navbar from './Navbar';
import { Toaster } from "@/components/ui/toaster";
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();

  const footerLinks = {
    [t("footerPlatform")]: [
      { name: t("priceEstimation"), path: "/price-estimation" },
      { name: t("cropHealth"), path: "/crop-health" },
      { name: t("govSchemes"), path: "/government-schemes" },
      { name: t("directMarket"), path: "/direct-market" },
    ],
    [t("footerResources")]: [
      { name: t("footerWeather"), path: "/wether" },
      { name: t("footerMarketPrices"), path: "/prices" },
      { name: t("landRecords"), path: "/landselling" },
      { name: t("footerWorkspace"), path: "/workplace" },
    ],
    [t("footerCompany")]: [
      { name: t("footerAbout"), path: "#" },
      { name: t("footerPrivacy"), path: "#" },
      { name: t("footerTerms"), path: "#" },
      { name: t("footerContact"), path: "#" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 lg:py-16">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-agri-green-light flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-base">
                  {t("projectKisan")} <span className="text-primary">{t("projectKisanHighlight")}</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {t("footerDescription")}
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {t("footerCopyright")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("footerTagline")}
            </p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};

export default Layout;
