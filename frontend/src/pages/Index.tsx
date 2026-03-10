
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Leaf, BarChart3, FileText, Image, ShoppingBag,
  MapPin, CloudSun, ArrowRight, CheckCircle2, Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import StatsSection from '@/components/StatsSection';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    toast({
      title: t("welcomeToast"),
      description: t("welcomeToastDesc"),
      duration: 4000,
    });
  }, [toast]);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t("priceEstimation"),
      description: t("priceEstimationDesc"),
      chip: t("aiPowered"),
      link: "/price-estimation",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: t("cropHealth"),
      description: t("cropHealthDesc"),
      chip: t("computerVision"),
      link: "/crop-health",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t("govSchemes"),
      description: t("govSchemesDesc"),
      chip: t("updatedWeekly"),
      link: "/government-schemes",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: t("directMarket"),
      description: t("directMarketDesc"),
      chip: t("marketplace"),
      link: "/direct-market",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t("landRecords"),
      description: t("landRecordsDesc"),
      chip: t("landManagement"),
      link: "/landselling",
    },
    {
      icon: <CloudSun className="h-6 w-6" />,
      title: t("weatherPrices"),
      description: t("weatherPricesDesc"),
      chip: t("liveData"),
      link: "/prices",
    },
  ];

  return (
    <Layout>
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
              <Sparkles className="h-3 w-3" />
              {t("features")}
            </div>
            <h2 className="section-title">
              {t("featuresTitle")}{" "}
              <span className="bg-gradient-to-r from-primary to-agri-green-light bg-clip-text text-transparent">
                {t("featuresTitleHighlight")}
              </span>
            </h2>
            <p className="section-subtitle">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className="block hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-2xl"
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  chip={feature.chip}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-background -z-10" />
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
                  {t("whyBadge")}
                </div>
                <h2 className="section-title">{t("whyTitle")}</h2>
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                  {t("whySubtitle")}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  t("whyItem1"),
                  t("whyItem2"),
                  t("whyItem3"),
                  t("whyItem4"),
                  t("whyItem5"),
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="rounded-xl shadow-md shadow-primary/20">
                <Link to="/price-estimation">
                  {t("getStartedNow")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right: Visual card */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative rounded-2xl border border-border/60 bg-card shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{t("cropAnalysisDashboard")}</h4>
                      <p className="text-xs text-muted-foreground">{t("realTimeMonitoring")}</p>
                    </div>
                  </div>

                  <div className="relative h-36 rounded-xl overflow-hidden bg-muted">
                    <img
                      src="https://www.agricensus.com/files/mf/1e7351450fe72dfac6509013dd6d4823_Data%20Dashboards%20Crop%20Forecast.png"
                      alt="Crop dashboard"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: t("health"), value: "94%", color: "bg-primary/10 text-primary" },
                      { label: t("pricePerKg"), value: "₹18.2", color: "bg-agri-blue/10 text-agri-blue" },
                      { label: t("yield"), value: "+12%", color: "bg-agri-emerald/10 text-agri-emerald" },
                    ].map((stat, i) => (
                      <div key={i} className={`rounded-xl p-3 text-center ${stat.color.split(" ")[0]}`}>
                        <div className={`text-xl font-bold ${stat.color.split(" ")[1]}`}>{stat.value}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-agri-green-light to-agri-emerald" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                {t("ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="rounded-xl bg-white text-primary hover:bg-white/90 shadow-lg px-8 h-12 text-base font-semibold"
                >
                  <Link to="/price-estimation">
                    {t("startFreeToday")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-xl border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base font-semibold"
                >
                  <Link to="/workplace">{t("viewDashboard")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
