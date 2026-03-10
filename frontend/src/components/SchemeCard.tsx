
import { ReactNode } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface SchemeCardProps {
  title: string;
  agency: string;
  description: string;
  deadline: string;
  category: string;
  icon: ReactNode;
  imageSrc?: string;
}

const SchemeCard = ({
  title,
  agency,
  description,
  deadline,
  category,
  icon,
  imageSrc
}: SchemeCardProps) => {
  const { t } = useLanguage();

  return (
    <div className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6 flex items-start gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        
        <div className="space-y-3 flex-1 min-w-0">
          <div>
            <Badge variant="outline" className="mb-2 text-xs rounded-md border-border/60">
              {category}
            </Badge>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("by")} {agency}
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary/60" />
              <span>{t("deadline")}: {deadline}</span>
            </div>
            
            <Button variant="ghost" size="sm" className="text-primary text-sm font-medium h-8 px-3 hover:bg-primary/10">
              {t("details")} <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
