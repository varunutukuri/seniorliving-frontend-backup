import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PropertyCard from "../components/PropertyCard";
import AdWidget from "../components/common/AdWidget";
import { useAuth } from "../context/AuthContext";
import { propertyAPI, savedPropertyAPI } from "../services/api";

import { Search, SlidersHorizontal, ChevronDown, ChevronUp, MapPin, Loader2 } from "lucide-react";

export default function BrowseHomes() {
    const navigate = useNavigate();
    const { role, user } = useAuth();
    const [showFilters, setShowFilters] = useState(true);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    // State
    const [filters, setFilters] = useState({
        location: "",
        minPrice: "",
        maxPrice: "",
        propertyType: "All",
    });

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                listingType: "RENT",
                page: pagination.page,
                limit: 12,
            };
            if (filters.location) params.city = filters.location;
            if (filters.propertyType !== "All") params.propertyType = filters.propertyType.toUpperCase();
            if (filters.minPrice) params.minPrice = parseInt(filters.minPrice);
            if (filters.maxPrice) params.maxPrice = parseInt(filters.maxPrice);

            const res = await propertyAPI.getAll(params);
            const data = res.data.data;
            setProperties(data.properties.map(mapProperty));
            setPagination(data.pagination);
        } catch (err) {
            console.error("Failed to fetch properties:", err);
        } finally {
            setLoading(false);
        }
    }, [filters, pagination.page]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const [savedIds, setSavedIds] = useState(new Set());

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

    // Map API property to component-friendly shape
    function mapProperty(p) {
        return {
            id: p.id,
            title: p.title,
            city: p.city,
            rentPrice: p.rentPrice ? `₹${p.rentPrice.toLocaleString("en-IN")} / month` : null,
            buyPrice: p.buyPrice ? `₹${(p.buyPrice / 100000).toFixed(p.buyPrice >= 10000000 ? 1 : 0)} ${p.buyPrice >= 10000000 ? "Cr" : "Lakhs"}` : null,
            type: p.listingType?.toLowerCase() === "sale" ? "buy" : "rent",
            image: p.images?.[0]?.url || null,
            beds: p.beds,
            baths: p.baths,
            area: p.area,
        };
    }

    return (
        <MainLayout role={role}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 h-[calc(100vh-theme(spacing.20))] flex flex-col">

                {/* HEADER SECTION (Compact) */}
                <div className="flex flex-col gap-4 mb-6 shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Browse Homes</h1>
                            <p className="text-slate-500 text-sm mt-0.5">Verified senior-friendly listings across India</p>
                        </div>
                    </div>

                    {/* FILTER BAR (Horizontal) */}
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-3 items-center justify-between">

                        {/* Left: Main Filters */}
                        {showFilters && (
                            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">

                                {/* Location */}
                                <div className="relative group w-full md:w-48">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-emerald-600 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="City or Locality"
                                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                        value={filters.location}
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    />
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px h-8 bg-slate-200 mx-1"></div>

                                {/* Selects */}
                                <select
                                    className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer hover:bg-white transition-colors"
                                    value={filters.propertyType}
                                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                                >
                                    <option value="All">All Property Types</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Assisted">Assisted Living</option>
                                </select>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Min Price"
                                        className="w-24 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        value={filters.minPrice}
                                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                    />
                                    <span className="text-slate-300">-</span>
                                    <input
                                        type="text"
                                        placeholder="Max Price"
                                        className="w-24 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                    />
                                </div>

                            </div>
                        )}

                        {/* Right: Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="ml-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            {showFilters ? "Hide Filters" : "Show Filters"}
                            {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                    </div>
                </div>

                {/* RESULTS GRID */}
                <div className="flex-1 overflow-y-auto pr-1 pb-10">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                        </div>
                    ) : properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                            {properties.map((property) => (
                                <div key={property.id} className="h-full">
                                    <PropertyCard
                                        property={property}
                                        onClick={() => navigate(`/property/${property.id}`)}
                                        isSaved={savedIds.has(property.id)}
                                        onToggleSave={user ? handleToggleSave : undefined}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-12 text-center h-64 flex flex-col items-center justify-center">
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                <Search className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mb-1">No homes found in this area</h3>
                            <p className="text-slate-500 text-sm mb-4 max-w-xs mx-auto">
                                Try changing your spelling or removing some filters to see more results.
                            </p>
                            <button
                                onClick={() => setFilters({ location: "", minPrice: "", maxPrice: "", propertyType: "All" })}
                                className="text-emerald-600 font-bold text-sm hover:underline"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}

                    {/* PAGINATION */}
                    {!loading && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 py-6">
                            <button
                                onClick={() => setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
                                disabled={pagination.page <= 1}
                                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pg) => (
                                <button
                                    key={pg}
                                    onClick={() => setPagination((p) => ({ ...p, page: pg }))}
                                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                                        pg === pagination.page
                                            ? "bg-emerald-600 text-white shadow-sm"
                                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                                >
                                    {pg}
                                </button>
                            ))}
                            <button
                                onClick={() => setPagination((p) => ({ ...p, page: Math.min(p.totalPages, p.page + 1) }))}
                                disabled={pagination.page >= pagination.totalPages}
                                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* AD WIDGET AT BOTTOM OF GRID */}
                    <AdWidget
                        variant="inline"
                        title="Verified Movers & Packers"
                        description="Moving made easy. Get 20% off on premium shifting services for seniors."
                        actionText="Get Quote"
                        className="mb-8"
                    />
                </div>

            </div>
        </MainLayout>
    );
}
