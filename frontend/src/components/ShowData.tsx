import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Phone, DollarSign, Tag, Loader2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:10000"
  : "https://iiit-naya-raipur-hakathon.vercel.app";

export default function ShowData() {
  const { t } = useLanguage();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE}/api/work/`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(t("failedLoadData"));
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8">
        {t("workListings")}
      </h2>

      {error && (
        <div className="text-center text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">{t("loadingListings")}</p>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-20">
          <Inbox className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">{t("noWorkListings")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item) => (
            <Card
              key={item._id}
              className="group border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Tag className="h-3 w-3" />
                    {item.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-2.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{item.payment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-blue-500" />
                    <span className="truncate">{item.location?.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 text-violet-500" />
                    <span className="truncate">{item.contactInfo}</span>
                  </div>
                </div>

                {item.requirements && (
                  <div className="pt-3 border-t border-border/50">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {t("requirementsLabel")}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.requirements}</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white shadow-md shadow-primary/10">
                    {t("applyNow")}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
