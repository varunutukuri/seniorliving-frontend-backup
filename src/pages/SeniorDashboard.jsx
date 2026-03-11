import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PropertyCard from "../components/PropertyCard";
import AdWidget from "../components/common/AdWidget";
import { MapPin, Loader2 } from "lucide-react";
import { propertyAPI, savedPropertyAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const mapProperty = (p) => ({
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
  propertyType: p.propertyType,
});

export default function SeniorDashboard() {
  const [filters, setFilters] = useState({ city: "", budget: "", type: "All" });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState(new Set());
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = { listingType: "RENT" };
      if (filters.city) params.city = filters.city;
      if (filters.type !== "All") params.propertyType = filters.type.toUpperCase();
      if (filters.budget) {
        if (filters.budget === "low") { params.maxPrice = 20000; }
        else if (filters.budget === "mid") { params.minPrice = 20000; params.maxPrice = 50000; }
        else if (filters.budget === "high") { params.minPrice = 50000; }
      }
      const { data } = await propertyAPI.getAll(params);
      setProperties((data.data?.properties || []).map(mapProperty));
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  useEffect(() => {
    if (!user) return;
    savedPropertyAPI.getAll()
      .then((res) => {
        const ids = new Set(res.data.data.savedProperties.map((s) => s.propertyId));
        setSavedIds(ids);
      })
      .catch(() => {});
  }, [user]);

  const handleToggleSave = async (propertyId) => {
    const alreadySaved = savedIds.has(propertyId);
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (alreadySaved) next.delete(propertyId);
      else next.add(propertyId);
      return next;
    });
    try {
      if (alreadySaved) await savedPropertyAPI.unsave(propertyId);
      else await savedPropertyAPI.save(propertyId);
    } catch {
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (alreadySaved) next.add(propertyId);
        else next.delete(propertyId);
        return next;
      });
    }
  };

  return (
    <MainLayout role="senior">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* BRANDED HEADER */}
        <section className="bg-emerald-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Welcome Back{user?.name ? `, ${user.name}` : ""}! 👋
            </h2>
            <p className="text-emerald-100/90 text-lg">
              Your personalized dashboard for finding safe, comfortable housing.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        </section>

        {/* COMPACT FILTER TOOLBAR */}
        <section className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="relative group flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="text"
                placeholder="Search City..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <select
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer hover:bg-white transition-colors"
                value={filters.budget}
                onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              >
                <option value="">Budget</option>
                <option value="low">Under 20k</option>
                <option value="mid">20k - 50k</option>
                <option value="high">50k+</option>
              </select>

              <select
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer hover:bg-white transition-colors"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>
        </section>

        {/* PROPERTY GRID */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No properties found. Try adjusting your filters.
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => navigate(`/property/${property.id}`)}
                isSaved={savedIds.has(property.id)}
                onToggleSave={user ? handleToggleSave : undefined}
              />
            ))}
          </section>
        )}

        {/* AD WIDGET */}
        <div className="mt-4">
          <AdWidget
            variant="inline"
            title="Care Services at Home"
            description="Professional nursing, physiotherapy, and assisted living support at your doorstep."
            actionText="Explore Services"
          />
        </div>
      </div>
    </MainLayout>
  );
}
