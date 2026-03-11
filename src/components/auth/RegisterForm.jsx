import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPModal from "./OTPModal";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm({ role }) {
  const navigate = useNavigate();
  const { register: registerUser, verifyOTP, sendOTP } = useAuth();
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState({});
  const [showOptional, setShowOptional] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Helper to check conditions
  const isBuilder = role === "builder";
  const isSenior = role === "senior";

  // Handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceed = async () => {
    setError("");
    // Basic validation
    if (!formData.mobile || !formData.email || !formData.password) {
      setError("Please fill in mobile, email, and password.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        phone: formData.mobile,
        email: formData.email,
        password: formData.password,
        role: role.toUpperCase(),
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        companyName: formData.companyName || undefined,
        reraNumber: formData.rera || undefined,
        city: formData.city || undefined,
        age: formData.age ? parseInt(formData.age) : undefined,
      };
      await registerUser(payload);
      // Send OTP to the phone
      await sendOTP(formData.mobile);
      setShowOTP(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp) => {
    try {
      const user = await verifyOTP(formData.mobile, otp);
      setShowOTP(false);
      const userRole = user.role?.toLowerCase();
      if (userRole === "builder" || userRole === "owner") {
        navigate("/builder-dashboard");
      } else if (userRole === "family") {
        navigate("/family-dashboard");
      } else {
        navigate("/senior-dashboard");
      }
    } catch (err) {
      // OTPModal will handle the error display
      throw err;
    }
  };

  return (
    <>
      <div className="space-y-3">

        {error && (
          <div className="text-red-500 text-xs font-medium text-center bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        {/* --- SECTION 1: IDENTITY & CONTACT --- */}
        <section className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {isBuilder ? (
              <>
                <Input
                  label="Company Name"
                  placeholder="e.g. Green Valley"
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                />
                <Input
                  label="RERA Number"
                  placeholder="e.g. P52100012345"
                  onChange={(e) => handleInputChange("rera", e.target.value)}
                />
              </>
            ) : (
              <>
                <Input
                  label="First Name"
                  placeholder="John"
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </>
            )}

            <Input
              label="Mobile Number"
              placeholder="+91 98765 43210"
              onChange={(e) => handleInputChange("mobile", e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </section>

        {/* --- SECTION 2: KEY PREFERENCES (Role Specific) --- */}
        <section className="space-y-3 pt-1">
          <SectionHeader title={isBuilder ? "Business Details" : "Your Requirements"} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {isBuilder ? (
              <>
                <Input
                  label="Operating City"
                  placeholder="e.g. Pune"
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
                <Select
                  label="Property Type"
                  options={["Apartments", "Villas", "Retirement Community", "Assisted Living"]}
                  onChange={(e) => handleInputChange("propertyType", e.target.value)}
                />
              </>
            ) : (
              <>
                <Input
                  label="Preferred City"
                  placeholder="e.g. Pune"
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
                <Select
                  label="Looking For"
                  options={["Rent a Home", "Buy a Home"]}
                  onChange={(e) => handleInputChange("lookingFor", e.target.value)}
                />
                {isSenior && (
                  <Input
                    label="Age"
                    placeholder="e.g. 65"
                    className="w-full"
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                )}
              </>
            )}
          </div>
        </section>

        {/* --- SECTION 3: SECURITY --- */}
        <section className="space-y-3 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            />
          </div>
        </section>

        {/* --- SECTION 4: OPTIONAL (Collapsible) --- */}
        <div className="pt-2">
          <button
            onClick={() => setShowOptional(!showOptional)}
            className="flex items-center gap-2 text-xs font-semibold text-primary-600 hover:text-primary-700 transition w-full text-left"
          >
            {showOptional ? "− Hide Optional Details" : "+ Add More Details (Optional)"}
          </button>

          {showOptional && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fadeIn">
              {!isBuilder && (
                <>
                  <Input
                    label="Middle Name"
                    placeholder="Optional"
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                  />
                  <Input
                    label="Budget"
                    placeholder="e.g. 20k/month"
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                  />
                </>
              )}
              {/* Placeholders for other potential optional fields */}
              <div className="col-span-full">
                <p className="text-xs text-slate-400 italic">Additional profile settings can be configured after registration.</p>
              </div>
            </div>
          )}
        </div>

        {/* --- FOOTER: TERMS & CTA --- */}
        <div className="pt-2 space-y-4">
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-gray-300 cursor-pointer"
            />
            <p className="text-xs text-slate-500 leading-snug">
              I agree to the{" "}
              <span className="text-primary-600 font-medium cursor-pointer hover:underline">
                Terms
              </span>{" "}
              &{" "}
              <span className="text-primary-600 font-medium cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>

          <button
            onClick={handleProceed}
            disabled={isLoading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white py-2.5 rounded-lg font-bold shadow-md shadow-primary-200/50 transition-all transform active:scale-[0.98] text-sm"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
              Registering as: {role === "senior" ? "Senior" : role === "family" ? "Family" : "Builder"}
            </span>
          </div>
        </div>

      </div>

      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
        onResend={() => sendOTP(formData.mobile)}
      />

      {/* Styles for simple animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                            SUB-COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <div className="h-px flex-1 bg-slate-200"></div>
      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{title}</span>
      <div className="h-px flex-1 bg-slate-200"></div>
    </div>
  );
}

function Input({ label, type = "text", placeholder, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-700 mb-1 pl-0.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all shadow-sm"
        {...props}
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1 pl-0.5">
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 text-[15px] text-slate-800 bg-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all shadow-sm"
          onChange={props.onChange}
        >
          <option value="">Select Option</option>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
