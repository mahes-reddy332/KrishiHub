import { useEffect, useRef, useState } from "react";
import { Users, Leaf, TrendingUp, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  bg: string;
}

function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

const StatItem = ({ icon, value, suffix, label, color, bg }: StatItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center space-y-3">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${bg}`}>
        <span className={color}>{icon}</span>
      </div>
      <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        {count.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: 1200, suffix: "+", label: t("farmersOnPlatform"), color: "text-primary", bg: "bg-primary/10" },
    { icon: <Leaf className="h-6 w-6" />, value: 8500, suffix: "+", label: t("cropsMonitored"), color: "text-agri-emerald", bg: "bg-agri-emerald/10" },
    { icon: <TrendingUp className="h-6 w-6" />, value: 25000, suffix: "+", label: t("pricePredictions"), color: "text-agri-blue", bg: "bg-agri-blue/10" },
    { icon: <MapPin className="h-6 w-6" />, value: 150, suffix: "+", label: t("districtsCovered"), color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  ];

  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background -z-10" />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
