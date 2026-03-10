import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Wheat, MapPin, Droplets, Mountain, FlaskConical, FileText,
  Loader2, TrendingUp, AlertCircle, DollarSign, Bug, Beaker, MessageSquare, ShoppingCart, Coins,
  CheckCircle2
} from "lucide-react";

const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:10000"
  : "https://iiit-naya-raipur-hakathon.vercel.app";

const fieldConfig = [
  { key: "cropType", icon: Wheat, color: "text-emerald-500" },
  { key: "landArea", icon: MapPin, color: "text-blue-500" },
  { key: "waterAvailability", icon: Droplets, color: "text-cyan-500" },
  { key: "soilType", icon: Mountain, color: "text-amber-500" },
  { key: "fertilizerType", icon: FlaskConical, color: "text-violet-500" },
  { key: "additionalInfo", icon: FileText, color: "text-rose-500" },
];

const resultFields = [
  { key: "Estimated_yield", icon: TrendingUp, color: "from-emerald-500 to-green-600" },
  { key: "Water_required", icon: Droplets, color: "from-blue-500 to-cyan-600" },
  { key: "Diseases", icon: Bug, color: "from-red-500 to-rose-600" },
  { key: "Fertilizer", icon: Beaker, color: "from-violet-500 to-purple-600" },
  { key: "Remark", icon: MessageSquare, color: "from-amber-500 to-orange-600" },
  { key: "Estimated_Sales", icon: ShoppingCart, color: "from-emerald-500 to-teal-600" },
  { key: "Estimated_cost", icon: Coins, color: "from-pink-500 to-rose-600" },
];

const SimpleForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    cropType: "",
    landArea: "",
    waterAvailability: "",
    soilType: "",
    fertilizerType: "",
    additionalInfo: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeholders = {
    cropType: "e.g., Wheat, Rice, Corn",
    landArea: "e.g., 5 acres",
    waterAvailability: "e.g., 5000 liters per day",
    soilType: "e.g., Sandy, Clay, Loamy",
    fertilizerType: "e.g., Urea, NPK, Compost",
    additionalInfo: "Any other relevant details...",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/api/ai/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(t("fetchError"));
      }
    } catch (err) {
      setError(t("serverError"));
    } finally {
      setLoading(false);
    }
  };

  const resultKeyToTranslation: Record<string, string> = {
    Estimated_yield: "estimatedYield",
    Water_required: "waterRequired",
    Diseases: "diseases",
    Fertilizer: "fertilizerRec",
    Remark: "remark",
    Estimated_Sales: "estimatedSales",
    Estimated_cost: "estimatedCost",
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      {/* Form Card */}
      <Card className="w-full border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-400 to-cyan-400" />
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">{t("cropYieldEstimation")}</CardTitle>
              <CardDescription className="text-xs mt-0.5">Fill in your crop details for AI analysis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fieldConfig.map(({ key, icon: Icon, color }) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={key} className="text-sm font-medium flex items-center gap-2">
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()).trim()}
                </Label>
                <Input
                  id={key}
                  name={key}
                  type="text"
                  placeholder={placeholders[key]}
                  value={formData[key]}
                  onChange={handleChange}
                  required={key !== "additionalInfo"}
                  className="h-10 bg-background/50 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
                />
              </div>
            ))}
            <Button
              type="submit"
              className="w-full h-11 mt-2 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {t("estimate")}
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="w-full mt-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-center p-3 rounded-xl border border-border/30 bg-card/50">
              <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="w-full mt-6 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-500 text-sm">Error</p>
            <p className="text-sm text-red-400/80 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <Card className="w-full mt-6 border-border/50 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-primary to-cyan-400" />
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-primary flex items-center justify-center text-white">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg">{t("estimationResult")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 pb-5">
            {resultFields.map(({ key, icon: Icon, color }) => {
              const value = result[key];
              if (!value) return null;
              return (
                <div
                  key={key}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border/30 bg-background/30 hover:bg-background/50 transition-colors"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t(resultKeyToTranslation[key])}
                    </p>
                    <p className="text-sm font-medium mt-0.5 leading-relaxed">{value}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleForm;
