import { useState } from "react";
import LeftInfoPanel from "../components/auth/LeftInfoPanel";
import RoleSelector from "../components/auth/RoleSelector";
import AuthTabs from "../components/auth/AuthTabs";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Auth() {
  const [role, setRole] = useState(null);
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface">
      {/* LEFT - STICKY */}
      <div className="hidden lg:block lg:w-1/2 lg:h-screen lg:sticky lg:top-0 lg:overflow-hidden">
        <LeftInfoPanel />
      </div>

      {/* RIGHT - SCROLLABLE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-2 lg:p-4 min-h-screen bg-slate-50">
        <div className="w-full max-w-2xl bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200/60">

          {!role ? (
            <RoleSelector onSelect={setRole} />
          ) : (
            <>
              <div className="mb-2 text-center">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  {role === 'builder' ? 'Partner with us directly' : 'Join our trusted community'}
                </p>
              </div>

              <AuthTabs mode={mode} setMode={setMode} />

              <div className="mt-3">
                {mode === "login" ? (
                  <LoginForm role={role} />
                ) : (
                  <RegisterForm role={role} />
                )}
              </div>

              <button
                onClick={() => setRole(null)}
                className="mt-6 w-full text-center text-xs text-slate-400 hover:text-slate-600 font-medium transition"
              >
                ← Change Role
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
