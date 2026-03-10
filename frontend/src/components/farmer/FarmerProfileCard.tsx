
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Tractor, Phone, Mail, Sprout, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Farmer {
  _id: string;
  name: string;
  area: string;
  landArea: number;
  phone: string;
  email: string;
  selectedCrop: string;
  date: string;
}

interface FarmerProfileCardProps {
  farmer: Farmer;
}

const FarmerProfileCard: React.FC<FarmerProfileCardProps> = ({ farmer }) => {
  const { t } = useLanguage();
  const formattedDate = farmer?.date ? new Date(farmer.date).toLocaleDateString() : t("notApplicable");
  
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-primary text-xl">
          <User className="mr-2" size={20} />
          {farmer.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 text-muted-foreground" size={16} />
            <span className="font-medium mr-2">{t("areaLabel")}</span> 
            {farmer.area}
          </div>
          
          <div className="flex items-center text-sm">
            <Tractor className="mr-2 text-muted-foreground" size={16} />
            <span className="font-medium mr-2">{t("landAreaLabel")}</span> 
            {farmer.landArea} {t("acres")}
          </div>
          
          <div className="flex items-center text-sm">
            <Phone className="mr-2 text-muted-foreground" size={16} />
            <span className="font-medium mr-2">{t("phoneLabel")}</span> 
            {farmer.phone}
          </div>
          
          <div className="flex items-center text-sm">
            <Mail className="mr-2 text-muted-foreground" size={16} />
            <span className="font-medium mr-2">{t("emailLabel")}</span> 
            {farmer.email}
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 text-muted-foreground" size={16} />
            <span className="font-medium mr-2">{t("registrationDate")}</span> 
            {formattedDate}
          </div>
          
          <div className="flex items-center text-sm">
            <Sprout className="mr-2 text-muted-foreground" size={16} />
            <span className="font-medium mr-2">{t("cropLabel")}</span> 
            {farmer.selectedCrop || t("notSelected")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmerProfileCard;
