import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PropertyCard from "../components/PropertyCard";
import { savedPropertyAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Heart, Loader2 } from "lucide-react";

function mapProperty(s) {
  const p = s.property;
  return {
    id: p.id,
    title: p.title,
    city: p.city,
    type: p.listingType?.toLowerCase() === "sale" ? "buy" : "rent",
    rentPrice: p.rentPrice ? `₹${Number(p.rentPrice).toLocaleString("en-IN")} / month` : null,
    buyPrice: p.buyPrice ? `₹${Number(p.buyPrice).toLocaleString("en-IN")}` : null,
    image: p.images?.[0]?.url || null,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
  };
}

export default function SavedHomes() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    savedPropertyAPI
      .getAll()
      .then((res) => {
        setProperties(res.data.data.savedProperties.map(mapProperty));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleUnsave = async (propertyId) => {
    // Optimistically remove from list
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    try {
      await savedPropertyAPI.unsave(propertyId);
    } catch {
      // On failure, re-fetch to restore correct state
      savedPropertyAPI
        .getAll()
        .then((res) => setProperties(res.data.data.savedProperties.map(mapProperty)))
        .catch(() => {});
    }
  };

  return (
    <MainLayout role={role}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved Homes</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Properties you've saved — ready to compare or schedule visits.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">No saved homes yet</h2>
            <p className="text-slate-500 mb-6 max-w-xs">
              Browse listings and tap the heart on any property to save it here.
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors"
            >
              Browse Homes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => navigate(`/property/${property.id}`)}
                isSaved={true}
                onToggleSave={handleUnsave}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
