
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, MapPin, Tractor, Phone, Mail, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RegisterFormProps {
  formData: {
    name: string;
    area: string;
    landArea: string;
    phone: string;
    email: string;
    selectedCrop: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  handleChange,
  handleRegister,
  isLoading
}) => {
  const { t } = useLanguage();
  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <User size={16} />
            </div>
            <Input
              type="text"
              name="name"
              placeholder={t("name")}
              value={formData.name}
              onChange={handleChange}
              required
              className="pl-10 bg-background/50"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <MapPin size={16} />
            </div>
            <Input
              type="text"
              name="area"
              placeholder={t("area")}
              value={formData.area}
              onChange={handleChange}
              required
              className="pl-10 bg-background/50"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Tractor size={16} />
            </div>
            <Input
              type="number"
              name="landArea"
              placeholder={t("landAreaInAcres")}
              value={formData.landArea}
              onChange={handleChange}
              required
              className="pl-10 bg-background/50"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Phone size={16} />
            </div>
            <Input
              type="text"
              name="phone"
              placeholder={t("phoneNumber")}
              value={formData.phone}
              onChange={handleChange}
              required
              className="pl-10 bg-background/50"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Mail size={16} />
            </div>
            <Input
              type="email"
              name="email"
              placeholder={t("email")}
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 bg-background/50"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Sprout size={16} />
            </div>
            <Input
              type="text"
              name="selectedCrop"
              placeholder={t("selectedCrop")}
              value={formData.selectedCrop}
              onChange={handleChange}
              className="pl-10 bg-background/50"
            />
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? t("registering") : t("register")}
      </Button>
    </form>
  );
};

export default RegisterForm;
