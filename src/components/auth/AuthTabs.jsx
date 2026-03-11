export default function AuthTabs({ mode, setMode }) {
  return (
    <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
      <button
        type="button"
        onClick={() => setMode("login")}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
          mode === "login"
            ? "bg-white text-[#1F8F6A] shadow"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => setMode("register")}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
          mode === "register"
            ? "bg-white text-[#1F8F6A] shadow"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Register
      </button>
    </div>
  );
}
