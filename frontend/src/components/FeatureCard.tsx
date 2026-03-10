
import { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  chip?: string;
  imageSrc?: string;
}

const FeatureCard = ({ icon, title, description, chip, imageSrc }: FeatureCardProps) => {
  const { t } = useLanguage();

  return (
    <div className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 h-full">
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col h-full p-6">
        {/* Top row: icon + chip */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
          {chip && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/8 text-primary text-xs font-semibold tracking-wide">
              {chip}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>

        {/* Bottom action hint */}
        <div className="mt-5 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          {t("learnMore")}
          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
