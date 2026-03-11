import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { propertyAPI, savedPropertyAPI, requestAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/layout/MainLayout";
import { Loader2, MapPin, BedDouble, Bath, Square, Heart, Phone, ArrowLeft } from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    propertyAPI
      .getById(id)
      .then((res) => setProperty(res.data.data.property))
      .catch(() => navigate("/browse"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // Check if user already has an active callback for this property
  useEffect(() => {
    if (!isAuthenticated) return;
    requestAPI.getAll().then((res) => {
      const reqs = res.data.data?.requests || [];
      const active = reqs.find(
        (r) => r.propertyId === parseInt(id) && ["PENDING", "CONFIRMED"].includes(r.status)
      );
      if (active) setRequestSent(true);
    }).catch(() => {});
  }, [id, isAuthenticated]);

  const handleSave = async () => {
    if (!isAuthenticated) return navigate("/auth");
    setSaving(true);
    try {
      await savedPropertyAPI.save(property.id);
      alert("Property saved!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleRequest = async (type) => {
    if (!isAuthenticated) return navigate("/auth");
    try {
      await requestAPI.create({ propertyId: property.id, type });
      setRequestSent(true);
      alert(`${type} request sent successfully!`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request");
    }
  };

  if (loading) {
    return (
      <MainLayout role={role}>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!property) return null;

  const rentPrice = property.rentPrice
    ? `₹${property.rentPrice.toLocaleString("en-IN")} / month`
    : null;
  const buyPrice = property.buyPrice
    ? `₹${(property.buyPrice / 100000).toFixed(property.buyPrice >= 10000000 ? 1 : 0)} ${property.buyPrice >= 10000000 ? "Cr" : "Lakhs"}`
    : null;
  const primaryImage = property.images?.find((i) => i.isPrimary)?.url || property.images?.[0]?.url;

  return (
    <MainLayout role={role}>
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-600 font-medium mb-6 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Image */}
        {primaryImage && (
          <div className="rounded-2xl overflow-hidden mb-6 h-80">
            <img src={primaryImage} alt={property.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-slate-800">
              {property.title}
            </h2>

            <div className="flex items-center text-slate-600 text-lg mt-1 gap-1">
              <MapPin className="w-5 h-5 text-slate-400" />
              {property.city}
            </div>

            {/* Price */}
            <div className="mt-4 bg-emerald-50 p-4 rounded-xl flex gap-8">
              {rentPrice && (
                <div>
                  <p className="text-xs text-emerald-600 font-bold uppercase">Rent</p>
                  <p className="font-semibold text-emerald-700 text-lg">{rentPrice}</p>
                </div>
              )}
              {buyPrice && (
                <div>
                  <p className="text-xs text-emerald-600 font-bold uppercase">Buy</p>
                  <p className="font-semibold text-emerald-700 text-lg">{buyPrice}</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-6 text-slate-600">
              {property.beds && (
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-emerald-600" />
                  <span>{property.beds} Beds</span>
                </div>
              )}
              {property.baths && (
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-emerald-600" />
                  <span>{property.baths} Baths</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-emerald-600" />
                  <span>{property.area.toLocaleString()} sqft</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-slate-700 text-lg leading-relaxed">
              {property.description}
            </p>

            {/* Features */}
            {property.features?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-600">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Builder Info */}
            {property.builder && (
              <div className="mt-8 p-4 bg-slate-100 rounded-xl">
                <p className="text-sm text-slate-500">Listed by</p>
                <p className="font-bold text-slate-800">
                  {property.builder.companyName || `${property.builder.firstName} ${property.builder.lastName}`}
                </p>
              </div>
            )}
          </div>

          {/* Action Sidebar */}
          {role !== "builder" && role !== "owner" && (
            <div className="w-full md:w-72 shrink-0 space-y-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-emerald-600 text-emerald-700 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                <Heart className="w-5 h-5" /> {saving ? "Saving..." : "Save Property"}
              </button>
              <button
                onClick={() => handleRequest("CALLBACK")}
                disabled={requestSent}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 transition-colors disabled:bg-slate-300"
              >
                <Phone className="w-5 h-5" /> {requestSent ? "Request Sent" : "Request Callback"}
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
