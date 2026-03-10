
import { BarChart, TrendingUp, LineChart, DollarSign, Sparkles, Wheat, Droplets, FlaskConical, Layers } from 'lucide-react';
import Layout from '@/components/Layout';
import PriceCalculator from '@/components/PriceCalculator';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = [
  { icon: TrendingUp, colorClass: "from-emerald-500 to-green-600" },
  { icon: BarChart, colorClass: "from-blue-500 to-cyan-600" },
  { icon: LineChart, colorClass: "from-amber-500 to-orange-600" },
  { icon: DollarSign, colorClass: "from-violet-500 to-purple-600" },
];

const stepKeys = [
  { title: "marketAnalysis", desc: "marketAnalysisDesc" },
  { title: "resourceEvaluation", desc: "resourceEvalDesc" },
  { title: "yieldPrediction", desc: "yieldPredictionDesc" },
  { title: "priceRangeGen", desc: "priceRangeDesc" },
];

const PriceEstimation = () => {
  const { t } = useLanguage();
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              {t("aiPowered")}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight">
              {t("priceEstTitle").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                {t("priceEstTitle").split(" ").slice(-1)}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("priceEstSubtitle")}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - How It Works */}
            <div className="animate-fade-in-left space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="inline-block w-8 h-1 rounded-full bg-gradient-to-r from-primary to-emerald-400" />
                  {t("howItWorks")}
                </h2>
                <p className="text-muted-foreground text-sm ml-10">
                  {t("howItWorksDesc")}
                </p>
              </div>

              <div className="space-y-4">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={i}
                      className="group relative flex gap-4 p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      {/* Step number */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">
                        {i + 1}
                      </div>
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.colorClass} flex items-center justify-center text-white shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold mb-0.5 text-foreground group-hover:text-primary transition-colors">
                          {t(stepKeys[i].title)}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(stepKeys[i].desc)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { icon: Wheat, label: "50+", sub: "Crops" },
                  { icon: Droplets, label: "95%", sub: "Accuracy" },
                  { icon: FlaskConical, label: "AI", sub: "Powered" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/20 transition-colors"
                  >
                    <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <div className="text-xl font-bold text-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Did You Know */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-emerald-500/5 to-transparent border border-primary/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                <div className="flex items-start gap-3 relative">
                  <Layers className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1.5 text-sm">{t("didYouKnow")}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("didYouKnowText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calculator */}
            <div className="flex justify-center animate-fade-in lg:sticky lg:top-28">
              <PriceCalculator />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PriceEstimation;
