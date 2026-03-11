import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { ArrowLeft, Upload, Check, Loader2, X } from "lucide-react";
import { propertyAPI } from "../services/api";

export default function AddProperty() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    listingType: "RENT",
    propertyType: "APARTMENT",
    rentPrice: "",
    buyPrice: "",
    beds: "",
    baths: "",
    area: "",
    features: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.title || !form.city || !form.listingType) {
      setError("Title, city, and listing type are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        city: form.city,
        listingType: form.listingType,
        propertyType: form.propertyType,
        rentPrice: form.rentPrice || null,
        buyPrice: form.buyPrice || null,
        beds: form.beds || null,
        baths: form.baths || null,
        area: form.area || null,
        features: form.features ? form.features.split(",").map((f) => f.trim()) : null,
      };
      const { data } = await propertyAPI.create(payload);
      const propertyId = data.data?.property?.id;

      // Upload images if any
      if (propertyId && images.length > 0) {
        const fd = new FormData();
        images.forEach((file) => fd.append("images", file));
        await propertyAPI.uploadImages(propertyId, fd);
      }

      navigate("/builder/my-properties");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to list property.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout role="builder">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">List New Property</h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Property Title *</label>
              <input type="text" value={form.title} onChange={set("title")} placeholder="e.g. Sunny Brooks Senior Villa" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
                <select value={form.propertyType} onChange={set("propertyType")} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                  <option value="APARTMENT">Apartment</option>
                  <option value="VILLA">Villa</option>
                  <option value="INDEPENDENT_HOUSE">Independent House</option>
                  <option value="RETIREMENT_COMMUNITY">Retirement Community</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Listing Type *</label>
                <select value={form.listingType} onChange={set("listingType")} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                  <option value="RENT">Rent</option>
                  <option value="SALE">Sale</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">City *</label>
              <input type="text" value={form.city} onChange={set("city")} placeholder="e.g. Hyderabad" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {form.listingType === "RENT" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Rent Price (₹/month)</label>
                  <input type="number" value={form.rentPrice} onChange={set("rentPrice")} placeholder="e.g. 25000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              )}
              {form.listingType === "SALE" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Buy Price (₹)</label>
                  <input type="number" value={form.buyPrice} onChange={set("buyPrice")} placeholder="e.g. 6500000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Beds</label>
                <input type="number" value={form.beds} onChange={set("beds")} placeholder="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Baths</label>
                <input type="number" value={form.baths} onChange={set("baths")} placeholder="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Area (sq ft)</label>
                <input type="number" value={form.area} onChange={set("area")} placeholder="1200" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea rows="4" value={form.description} onChange={set("description")} placeholder="Describe the property..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Features (comma-separated)</label>
              <input type="text" value={form.features} onChange={set("features")} placeholder="Elevator, Wheelchair Access, Garden" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Property Images</label>
              <label className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mb-2 text-slate-400" />
                <span className="text-sm font-medium">Click to upload property images</span>
                <span className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {images.map((file, i) => (
                    <div key={i} className="relative group">
                      <img src={URL.createObjectURL(file)} alt="" className="w-20 h-20 rounded-lg object-cover border border-slate-200" />
                      <button onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>}

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              List Property
            </button>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
