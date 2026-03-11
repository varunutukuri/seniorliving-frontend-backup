import { useState, useEffect, useCallback } from "react";
import MainLayout from "../components/layout/MainLayout";
import { requestAPI } from "../services/api";
import {
  Loader2,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

const STATUS_STYLES = {
  PENDING: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
  CONFIRMED: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  COMPLETED: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  CANCELLED: "bg-red-50 text-red-600 ring-1 ring-red-200",
};

const STATUS_ICONS = {
  PENDING: Clock,
  CONFIRMED: CheckCircle,
  COMPLETED: CheckCircle,
  CANCELLED: XCircle,
};

function StatusBadge({ status }) {
  const Icon = STATUS_ICONS[status] || AlertCircle;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}

function StatusDropdown({ enquiryId, currentStatus, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleSelect = async (newStatus) => {
    if (newStatus === currentStatus) { setOpen(false); return; }
    setUpdating(true);
    setOpen(false);
    try {
      await requestAPI.update(enquiryId, { status: newStatus });
      onUpdate(enquiryId, newStatus);
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={updating}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
      >
        {updating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ChevronDown className="w-3.5 h-3.5" />}
        Update
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[140px]">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSelect(s)}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors ${s === currentStatus ? "text-emerald-700 bg-emerald-50/50" : "text-slate-700"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EnquiryCard({ enquiry, onUpdate }) {
  const date = new Date(enquiry.createdAt);
  const formattedDate = date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const formattedTime = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left: caller info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-slate-800">
              {enquiry.user?.firstName} {enquiry.user?.lastName}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              {enquiry.user?.phone && (
                <a href={`tel:${enquiry.user.phone}`} className="flex items-center gap-1 text-sm text-emerald-600 hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  {enquiry.user.phone}
                </a>
              )}
              {enquiry.user?.email && (
                <span className="text-sm text-slate-400">{enquiry.user.email}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: status + update */}
        <div className="flex items-center gap-3 shrink-0">
          <StatusBadge status={enquiry.status} />
          <StatusDropdown enquiryId={enquiry.id} currentStatus={enquiry.status} onUpdate={onUpdate} />
        </div>
      </div>

      {/* Property info */}
      <div className="mt-4 pt-4 border-t border-slate-50">
        <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {enquiry.property?.title}
          {enquiry.property?.city && (
            <span className="text-slate-400 font-normal">· {enquiry.property.city}</span>
          )}
        </p>
        {enquiry.message && (
          <p className="mt-2 text-sm text-slate-500 flex items-start gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
            {enquiry.message}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {formattedDate} at {formattedTime}
        </span>
        <span className="capitalize font-medium text-slate-500">
          {enquiry.type?.replace(/_/g, " ").toLowerCase() || "callback"}
        </span>
      </div>
    </div>
  );
}

export default function BuilderEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    requestAPI
      .getAll()
      .then((res) => setEnquiries(res.data.data.requests || []))
      .catch(() => setError("Failed to load enquiries."))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = useCallback((id, newStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  }, []);

  const filtered = filter === "ALL" ? enquiries : enquiries.filter((e) => e.status === filter);

  const counts = enquiries.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <MainLayout role="builder">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-700" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Enquiries</h1>
          </div>
          <p className="text-slate-500 text-sm ml-[52px]">Callback requests from seniors on your properties</p>
        </div>

        {/* Filter tabs */}
        {!loading && !error && enquiries.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {["ALL", ...STATUS_OPTIONS].map((s) => {
              const count = s === "ALL" ? enquiries.length : (counts[s] || 0);
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === s
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                  {count > 0 && (
                    <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${filter === s ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
            <p className="text-slate-600">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Phone className="w-14 h-14 text-slate-200 mb-4" />
            <p className="text-lg font-semibold text-slate-600">
              {filter === "ALL" ? "No enquiries yet" : `No ${filter.toLowerCase()} enquiries`}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Callback requests from seniors will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((e) => (
              <EnquiryCard key={e.id} enquiry={e} onUpdate={handleUpdate} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
