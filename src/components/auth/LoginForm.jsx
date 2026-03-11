import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm({ role }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      setError("Please enter both email/mobile and password.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const user = await login(identifier, password);
      const userRole = user.role?.toLowerCase();
      if (userRole === "builder" || userRole === "owner") {
        navigate("/builder-dashboard");
      } else if (userRole === "family") {
        navigate("/family-dashboard");
      } else {
        navigate("/senior-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="text-red-500 text-xs font-medium text-center bg-red-50 p-2 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1 pl-0.5">
          Mobile Number or Email
        </label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all shadow-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1 pl-0.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 transition-all shadow-sm"
        />
      </div>

      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white py-2.5 rounded-lg font-bold shadow-md shadow-primary-200/50 transition-all transform active:scale-[0.98] text-sm"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {role === "senior" && (
        <p className="text-xs text-center text-slate-500 cursor-pointer hover:text-primary-600 underline transition">
          Login with OTP
        </p>
      )}
    </div>
  );
}
