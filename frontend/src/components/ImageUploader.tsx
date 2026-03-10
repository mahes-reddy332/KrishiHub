import { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { X, Check, Loader2, Upload, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageUploaderProps {
  onImageAnalyzed: (result: AnalysisResult) => void;
}

interface Treatment {
  disease: string;
  fertilizer: string;
  fungicide: string;
  cost1: string;
  cost2: string;
}

interface AnalysisResult {
  health: number;
  disease: string | null;
  recommendations: string[];
  confidence: number;
  treatment?: Treatment | null;
  isHealthy?: boolean;
  formatted?: string;
}

const ML_API = "http://localhost:5000";

const ImageUploader = ({ onImageAnalyzed }: ImageUploaderProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
  };

  const analyzeImage = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    toast({
      title: t("analyzingImage"),
      description: t("analyzingImageDesc"),
    });

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(`${ML_API}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const pred = data.prediction;
        onImageAnalyzed({
          health: pred.health,
          disease: pred.disease,
          recommendations: pred.recommendations,
          confidence: pred.confidence,
          treatment: pred.treatment,
          isHealthy: pred.isHealthy,
          formatted: pred.formatted,
        });

        toast({
          title: t("analysisComplete"),
          description: pred.isHealthy
            ? "Your crop looks healthy!"
            : `Detected: ${pred.formatted}`,
        });
      } else {
        throw new Error(data.error || "Prediction failed");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: "Analysis Failed",
        description: `Could not connect to the ML server. Make sure the Python API is running. (${message})`,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      {!image ? (
        <div
          className={`w-full max-w-md border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border/60 hover:border-primary/40 hover:bg-muted/30"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Drop your crop image here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse — PNG, JPG up to 10MB
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2 gap-2" type="button">
              <Camera className="h-4 w-4" />
              Choose Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md border rounded-2xl p-4 bg-card/80 backdrop-blur-sm shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-sm">{t("uploadedImage")}</h3>
            <Button variant="ghost" size="icon" onClick={removeImage} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden mb-4 aspect-video w-full flex items-center justify-center bg-muted/40">
            <img
              src={image}
              alt="Uploaded crop"
              className="object-cover w-full h-full"
            />
          </div>
          <Button
            onClick={analyzeImage}
            className="w-full h-11 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-semibold shadow-lg"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("analyzing")}
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> {t("analyzeCropHealth")}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
