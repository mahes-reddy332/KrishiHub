import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-primary/20 via-agri-green-light/10 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-agri-emerald/10 to-transparent rounded-full blur-3xl" />
        <div className="dot-pattern absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] animate-fade-in-up">
            {t("heroTitle")}{" "}
            <span className="bg-gradient-to-r from-primary via-agri-green-light to-agri-emerald bg-clip-text text-transparent">
              {t("heroTitleHighlight")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            {t("heroSubtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-fade-in-up">
            <Button
              size="lg"
              asChild
              className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all px-8 h-12 text-base font-semibold"
            >
              <Link to="/price-estimation">
                {t("getStartedFree")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-xl border-border/60 hover:bg-muted px-8 h-12 text-base font-semibold"
            >
              <Link to="/crop-health">{t("checkCropHealth")}</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 pt-6 animate-fade-in">
            <div className="flex -space-x-2.5">
              {[
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&q=60",
                "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=80&h=80&fit=crop&q=60",
                "https://images.unsplash.com/photo-1622281953819-e1b36b928122?w=80&h=80&fit=crop&q=60",
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=80&h=80&fit=crop&q=60",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background overflow-hidden ring-1 ring-border/20"
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {t("trustedBy")} <span className="font-semibold text-foreground">{t("trustedCount")}</span> {t("farmersAcrossIndia")}
            </p>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-5xl mx-auto animate-fade-in-up">
          <div className="relative rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-muted text-xs text-muted-foreground font-mono">
                  projectkisan.ai/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-card via-card to-muted/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: t("activeCrops"), value: "12", icon: <TrendingUp className="h-4 w-4" />, color: "text-primary", bg: "bg-primary/10" },
                  { label: t("healthScore"), value: "94%", icon: <Shield className="h-4 w-4" />, color: "text-agri-emerald", bg: "bg-agri-emerald/10" },
                  { label: t("priceAlerts"), value: "8", icon: <Zap className="h-4 w-4" />, color: "text-agri-blue", bg: "bg-agri-blue/10" },
                  { label: t("estRevenue"), value: "₹2.4L", icon: <Sparkles className="h-4 w-4" />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl border border-border/40 bg-background/50 p-4 space-y-2">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${stat.bg}`}>
                      <span className={stat.color}>{stat.icon}</span>
                    </div>
                    <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="rounded-xl border border-border/40 bg-background/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">{t("priceTrends")}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-md">{t("last7Days")}</span>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-primary/80 to-primary/40 transition-all duration-500"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
