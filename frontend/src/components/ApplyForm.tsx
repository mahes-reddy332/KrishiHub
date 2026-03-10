import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase, FileText, DollarSign, MapPin, Clock, Tag, ClipboardList, Phone, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";

const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:10000"
  : "https://iiit-naya-raipur-hakathon.vercel.app";

const fieldIcons = {
  title: Briefcase,
  description: FileText,
  payment: DollarSign,
  location: MapPin,
  duration: Clock,
  category: Tag,
  requirements: ClipboardList,
  contactInfo: Phone,
};

export default function ApplyForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    payment: "",
    location: "",
    duration: "",
    category: "",
    requirements: "",
    contactInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${API_BASE}/api/work/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location: formData.location.split(","),
        }),
      });

      if (response.ok) {
        setFormMessage({ type: "success", text: t("workListingCreated") });
        setFormData({
          title: "",
          description: "",
          payment: "",
          location: "",
          duration: "",
          category: "",
          requirements: "",
          contactInfo: "",
        });
      } else {
        setFormMessage({ type: "error", text: t("failedCreateListing") });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormMessage({ type: "error", text: t("errorConnecting") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: "title", label: t("jobTitle"), placeholder: t("jobTitlePlaceholder"), type: "text" },
    { name: "description", label: t("descriptionLabel"), placeholder: t("jobDescPlaceholder"), type: "textarea" },
    { name: "payment", label: t("payment"), placeholder: t("paymentPlaceholder"), type: "text" },
    { name: "location", label: t("locationLabel"), placeholder: t("locationPlaceholder"), type: "text" },
    { name: "duration", label: t("duration"), placeholder: t("durationPlaceholder"), type: "text" },
    { name: "category", label: t("categoryLabel"), placeholder: t("jobCategoryPlaceholder"), type: "text" },
    { name: "requirements", label: t("requirements"), placeholder: t("requirementsPlaceholder"), type: "textarea" },
    { name: "contactInfo", label: t("contactInfo"), placeholder: t("contactInfoPlaceholder"), type: "text" },
  ];

  return (
    <Card className="max-w-3xl mx-auto border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Gradient accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-teal-500" />

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">
          {t("createWorkListing")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {formMessage.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              formMessage.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {formMessage.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            {formMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {formFields.map((field) => {
              const Icon = fieldIcons[field.name];
              return (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <Label htmlFor={field.name} className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {field.label}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="min-h-24 bg-background/50 border-border/60 focus:border-primary/50"
                      required
                    />
                  ) : (
                    <Input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="bg-background/50 border-border/60 focus:border-primary/50"
                      required
                    />
                  )}
                </div>
              );
            })}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white shadow-lg shadow-primary/20"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                {t("submitting")}
              </span>
            ) : (
              t("createListing")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
