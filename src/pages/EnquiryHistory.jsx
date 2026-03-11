import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requestAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/layout/MainLayout";
import {
  Loader2,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
} from "lucide-react";

const STATUS_STYLES = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-700 ring-1 ring-red-200",
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle,
    className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  },
};

function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] || {
    label: status,
    icon: AlertCircle,
    className: "bg-slate-100 text-slate-600",
  };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

function EnquiryCard({ request }) {
  const navigate = useNavigate();
  const date = new Date(request.createdAt);
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <button
              onClick={() => navigate(`/property/${request.property?.id}`)}
              className="text-base font-semibold text-slate-800 hover:text-emerald-700 transition-colors truncate block"
            >
              {request.property?.title || "Unknown Property"}
            </button>
            {request.property?.city && (
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                {request.property.city}
              </p>
            )}
            {request.message && (
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                {request.message}
              </p>
            )}
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {formattedDate} at {formattedTime}
        </span>
        <span className="capitalize font-medium text-slate-500">
          {request.type?.replace(/_/g, " ").toLowerCase() || "callback"}
        </span>
      </div>
    </div>
  );
}

export default function EnquiryHistory() {
  const { role } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestAPI
      .getAll()
      .then((res) => {
        setRequests(res.data.data.requests || []);
      })
      .catch(() => setError("Failed to load enquiry history."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout role={role}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-700" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Enquiry History
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-[52px]">
            All your callback requests in one place
          </p>
        </div>

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
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Phone className="w-14 h-14 text-slate-200 mb-4" />
            <p className="text-lg font-semibold text-slate-600">
              No enquiries yet
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Your callback requests will appear here
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-400 mb-4">
              {requests.length} {requests.length === 1 ? "enquiry" : "enquiries"} found
            </p>
            <div className="space-y-4">
              {requests.map((req) => (
                <EnquiryCard key={req.id} request={req} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
