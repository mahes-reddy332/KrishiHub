import { X } from "lucide-react";
import { useLanguage, LANGUAGES, LangCode } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  open: boolean;
  onClose: () => void;
}

const LanguageSelector = ({ open, onClose }: LanguageSelectorProps) => {
  const { language, setLanguage, t, currentLangOption } = useLanguage();

  if (!open) return null;

  const handleSelect = (code: LangCode) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <div>
            <h3 className="text-lg font-semibold">{t("selectLanguage")}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("currentLabel")}: {currentLangOption.nativeName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Language list */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1.5">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-200 ${
                language === lang.code
                  ? "bg-primary/10 border-2 border-primary text-primary font-medium"
                  : "bg-muted/50 border-2 border-transparent hover:bg-muted hover:border-border"
              }`}
            >
              <span className="text-sm font-medium">{lang.name}</span>
              <span className={`text-sm ${language === lang.code ? "text-primary" : "text-muted-foreground"}`}>
                {lang.nativeName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
