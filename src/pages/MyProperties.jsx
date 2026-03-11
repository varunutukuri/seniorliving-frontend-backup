import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { PlusCircle, Search, Loader2, Trash2 } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { propertyAPI } from "../services/api";

export default function MyProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const { data } = await propertyAPI.getMine(params);
      setProperties(data.data?.properties || []);
    } catch (err) {
      console.error("Failed to load properties", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await propertyAPI.delete(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete.");
    }
  };

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
    status: p.status,
    leads: p._count?.requests || 0,
    saves: p._count?.savedBy || 0,
  });

  return (
    <MainLayout role="builder">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Properties</h1>
            <p className="text-slate-500">Manage your active listings and leads</p>
          </div>
          <button
            onClick={() => navigate("/builder/add-property")}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-200 transition-all"
          >
            <PlusCircle className="w-5 h-5" /> Add New Property
          </button>
        </div>

        {/* Search/Filter Bar */}
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </form>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No properties yet. Click "Add New Property" to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => {
              const mapped = mapProperty(p);
              return (
                <div key={p.id} className="relative group">
                  <PropertyCard
                    property={mapped}
                    onClick={() => navigate(`/property/${p.id}`)}
                  />
                  {/* Status badge + stats overlay */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      p.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" :
                      p.status === "UNDER_REVIEW" ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>{p.status?.replace("_", " ")}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                      className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg"
                      title="Delete Property"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-4 px-4 py-2 text-xs text-slate-500">
                    <span>{mapped.leads} lead{mapped.leads !== 1 ? "s" : ""}</span>
                    <span>{mapped.saves} save{mapped.saves !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </MainLayout>
  );
}
