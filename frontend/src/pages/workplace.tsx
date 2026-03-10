import { useState } from "react";
import ShowData from '../components/ShowData';
import ApplyForm from '../components/ApplyForm'
import Layout from "@/components/Layout";
import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, ClipboardList, Plus, Sparkles } from "lucide-react";

export default function Workplace() {
  const { t } = useLanguage();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const tabs = [
    { id: "showdata", label: t("showData"), icon: ClipboardList },
    { id: "apply", label: t("apply"), icon: Plus },
  ];

  return (
    <Layout>
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              {t("dashboard")}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
              Work{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                {t("dashboard")}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {t("selectOption")}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-3 mb-10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeComponent === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveComponent(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-emerald-500 text-white shadow-lg shadow-primary/20"
                      : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div>
            {activeComponent === "showdata" && <ShowData />}
            {activeComponent === "apply" && <ApplyForm />}
            {!activeComponent && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-9 w-9 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">{t("welcome")}</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t("selectOption")}
                </p>
                <div className="flex justify-center gap-3 mt-8">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveComponent(tab.id)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 bg-card text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-all"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
