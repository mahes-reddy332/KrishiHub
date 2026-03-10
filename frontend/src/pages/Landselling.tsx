"use client"; // Required for Next.js if using Client Components
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import MapView from "@/components/landselling/MapView";
import AddListing from "@/components/landselling/AddListing";
import { LandListing } from "@/types/landselling";
import { saveListings, getListings } from "@/services/landListingService";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Landselling() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("list");
  const [listings, setListings] = useState<LandListing[]>([]);
  const { toast } = useToast();
  const [filters, setFilters] = useState({ price: "", area: "", location: "" });

  // Load listings from local storage on component mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("https://iiit-naya-raipur-hakathon.vercel.app/api/land"); // Update with your actual API URL
  
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
  
        const data = await response.json();
        setListings(data);
  
        toast({
          title: t("listingsLoaded"),
          description: `${data.length} ${t("listingsLoadedDesc")}`,
        });
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast({
          title: t("error"),
          description: t("failedLoadListings"),
          variant: "destructive",
        });
      }
    };
  
    fetchListings();
  }, []);
  

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleContactSeller = (listing) => {
    alert(`Contacting seller for ${listing.title}`);
    // You can integrate an email feature, open a chat, or navigate to a contact page
  };
  

  // Handle adding a new listing (from the Add Listing tab)
  const handleAddListing = (newListingData: Omit<LandListing, "id">) => {
    if (
      !newListingData.title ||
      newListingData.price <= 0 ||
      newListingData.area <= 0
    ) {
      toast({
        title: t("invalidListing"),
        description: t("fillAllRequired"),
        variant: "destructive",
      });
      return;
    }

    const newItem: LandListing = {
      id: Date.now().toString(),
      ...newListingData,
    };

    const updatedListings = [...listings, newItem];
    setListings(updatedListings);

    // Save to local storage
    saveListings(updatedListings);

    toast({
      title: t("listingAdded"),
      description: t("listingAddedDesc"),
    });

    // Switch to map view
    handleTabChange("map");
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter listings based on price, area, and location
  const filteredListings = listings.filter((listing) => {
    const matchesPrice =
      filters.price === "" || listing.price <= parseInt(filters.price);
    const matchesArea =
      filters.area === "" || listing.area >= parseInt(filters.area);
    // Assuming location is an array of numbers, convert to string for filtering.
    const locationString = listing.location.join(", ");
    const matchesLocation =
      filters.location === "" ||
      locationString.toLowerCase().includes(filters.location.toLowerCase());
    return matchesPrice && matchesArea && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t("landMarketplace")}
        </h1>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="map">{t("mapView")}</TabsTrigger>
            <TabsTrigger value="add">{t("addListing")}</TabsTrigger>
            <TabsTrigger value="list">{t("viewListings")}</TabsTrigger>
          </TabsList>

          <TabsContent
            value="map"
            className="space-y-4"
            forceMount={activeTab === "map"}
          >
            <MapView listings={listings} activeTab={activeTab} />
          </TabsContent>

          <TabsContent
            value="add"
            className="space-y-4"
            forceMount={activeTab === "add"}
          >
            <AddListing activeTab={activeTab} onAddListing={handleAddListing} />
          </TabsContent>

          <TabsContent
            value="list"
            className="space-y-4"
            forceMount={activeTab === "list"}
          >
            {/* Filter Section */}
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <input
                type="number"
                name="price"
                placeholder={t("maxPrice")}
                value={filters.price}
                onChange={handleFilterChange}
                className="p-2 border rounded w-full sm:w-auto"
              />
              <input
                type="number"
                name="area"
                placeholder={t("minArea")}
                value={filters.area}
                onChange={handleFilterChange}
                className="p-2 border rounded w-full sm:w-auto"
              />
              <input
                type="text"
                name="location"
                placeholder={t("location")}
                value={filters.location}
                onChange={handleFilterChange}
                className="p-2 border rounded w-full sm:w-auto"
              />
            </div>
            {/* Listings Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border  border-gray-300">
                <thead>
                  <tr className="">
                    <th className="p-2 border">{t("title")}</th>
                    <th className="p-2 border">{t("price")}</th>
                    <th className="p-2 border">{t("area")}</th>
                    <th className="p-2 border">{t("location")}</th>
                    <th className="p-2 border">{t("createdAt")}</th>
                    <th className="p-2 border">{t("contact")}</th>
                  </tr>
                </thead>
                <tbody>
  {filteredListings.map((listing) => (
    <tr key={listing.id} className="border-t">
      <td className="p-2 border">{listing.title}</td>
      <td className="p-2 border">₹{listing.price}</td>
      <td className="p-2 border">{listing.area} acres</td>
      <td className="p-2 border">{listing.location.join(", ")}</td>
      <td className="p-2 border">
        {new Date(listing.createdAt).toLocaleString()}
      </td>
      <td className="p-2 border">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition duration-200"
          onClick={() => handleContactSeller(listing)}
        >
          {t("contactSeller")}
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
