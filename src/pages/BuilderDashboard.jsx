import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { PlusCircle, Building, Home, Bookmark, Loader2, TrendingUp } from "lucide-react";
import { analyticsAPI } from "../services/api";

export default function BuilderDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await analyticsAPI.getOverview();
        setStats(data.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const summary = stats?.summary || {};

  return (
    <MainLayout role="builder">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* WELCOME */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-800">
            Builder Dashboard
          </h2>
          <p className="text-slate-500 mt-1">
            Manage your senior-friendly property listings.
          </p>
        </section>

        {/* STATS */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Total Properties", value: summary.totalProperties ?? 0, icon: Home, bg: "bg-emerald-100", text: "text-emerald-700" },
              { label: "Active Listings", value: summary.activeProperties ?? 0, icon: TrendingUp, bg: "bg-blue-100", text: "text-blue-700" },
              { label: "Saved by Users", value: summary.totalSaved ?? 0, icon: Bookmark, bg: "bg-purple-100", text: "text-purple-700" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center ${s.text} mb-3`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </section>
        )}

        {/* ACTION CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ADD PROPERTY */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 mb-6">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Add New Property
            </h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              List a new property for rent or sale. You can check verification status after submission.
            </p>
            <button
              onClick={() => navigate("/builder/add-property")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold w-full md:w-auto text-center"
            >
              List Property
            </button>
          </div>

          {/* VIEW PROPERTIES */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-6">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              My Properties
            </h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              View and manage your existing listings and update availability status.
            </p>
            <button
              onClick={() => navigate("/builder/my-properties")}
              className="bg-white border-2 border-slate-200 hover:border-emerald-600 hover:text-emerald-700 text-slate-600 px-6 py-3 rounded-xl font-semibold w-full md:w-auto text-center transition-colors"
            >
              View All Properties
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
