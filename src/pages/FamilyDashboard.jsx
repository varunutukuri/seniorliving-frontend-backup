import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PropertyCard from "../components/PropertyCard";
import AdWidget from "../components/common/AdWidget";
import { MapPin, Loader2 } from "lucide-react";
import { propertyAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const mapProperty = (p) => ({
  id: p.id,
  title: p.title,
  city: p.city,
  type: p.listingType?.toLowerCase() === "sale" ? "buy" : "rent",
  rentPrice: p.rentPrice ? `₹${Number(p.rentPrice).toLocaleString("en-IN")} / month` : null,
  buyPrice: p.buyPrice ? `₹${Number(p.buyPrice).toLocaleString("en-IN")}` : null,
  image: p.images?.[0]?.url || "/images/placeholder.jpg",
  beds: p.beds,
  baths: p.baths,
  area: p.area,
  propertyType: p.propertyType,
});

export default function FamilyDashboard() {
  const [mode, setMode] = useState("rent");
  const [filters, setFilters] = useState({ city: "", budget: "" });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = { listingType: mode.toUpperCase() };
      if (filters.city) params.city = filters.city;
      if (filters.budget) {
        if (mode === "rent") {
          if (filters.budget === "low") { params.maxPrice = 20000; }
          else if (filters.budget === "mid") { params.minPrice = 20000; params.maxPrice = 50000; }
          else if (filters.budget === "high") { params.minPrice = 50000; }
        }
      }
      const { data } = await propertyAPI.getAll(params);
      setProperties((data.data?.properties || []).map(mapProperty));
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  }, [mode, filters]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  return (
    <MainLayout role="family">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* BRANDED HEADER */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Find Comfort for Your Loved Ones
            </h2>
            <p className="text-slate-300 text-lg">
              Browse verified homes with medical facilities and community support.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        </section>

        {/* COMPACT TOOLBAR */}
        <section className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="bg-slate-100 p-1 rounded-xl flex shrink-0 w-full md:w-auto">
            {["rent", "buy"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 md:flex-none px-8 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${mode === m
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 mx-2"></div>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="relative group flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="text"
                placeholder="Search City (e.g. Hyderabad, Mumbai)"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 placeholder:text-slate-400"
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
            </div>
          </div>
        </section>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No properties found. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onClick={() => navigate(`/property/${p.id}`)}
              />
            ))}
          </div>
        )}

        {/* AD WIDGET */}
        <div className="mt-4">
          <AdWidget
            variant="inline"
            title="Verified Caregivers"
            description="Find experienced caregivers for 24/7 home support. Background checked and trained."
            actionText="Find Caregivers"
          />
        </div>

      </div>
    </MainLayout>
  );
}
