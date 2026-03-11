import {
    Home,
    Info,
    HelpCircle,
    Search,
    Phone,
    LogIn,
    UserPlus,
    LayoutDashboard,
    Heart,
    User,
    Building,
    PlusCircle,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ role = "guest" }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    const navItems = {
        guest: [
            { label: "Home", path: "/", icon: Home },
            { label: "About Us", path: "/about", icon: Info },
            { label: "How It Works", path: "/how-it-works", icon: HelpCircle },
            { label: "Browse Homes", path: "/browse", icon: Search },
            { label: "Contact Us", path: "/contact", icon: Phone },
        ],
        senior: [
            { label: "Dashboard", path: "/senior-dashboard", icon: LayoutDashboard },
            { label: "Browse Homes", path: "/browse", icon: Search },
            { label: "Saved Homes", path: "/saved", icon: Heart },
            { label: "Enquiry History", path: "/enquiries", icon: Phone },
            { label: "Profile", path: "/profile", icon: User },
        ],
        builder: [
            { label: "Dashboard", path: "/builder-dashboard", icon: LayoutDashboard },
            { label: "My Properties", path: "/builder/my-properties", icon: Building },
            { label: "Add Property", path: "/builder/add-property", icon: PlusCircle },
            { label: "Enquiries", path: "/builder/enquiries", icon: Phone },
            { label: "Profile", path: "/profile", icon: User },
        ],
    };

    const currentNav = navItems[role] || navItems.guest;

    return (
        <>
            {/* ── Top Navigation Bar ── */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-screen-xl mx-auto h-full flex items-center px-4 lg:px-8 gap-6">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-emerald-700 font-bold text-xl tracking-tight shrink-0"
                    >
                        <Home className="w-5 h-5" />
                        NestCare
                    </Link>

                    {/* Desktop nav links */}
                    <nav className="hidden md:flex items-center gap-1 flex-1">
                        {currentNav.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                        ${active
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${active ? "text-emerald-600" : "text-slate-400"}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop right-side actions */}
                    <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
                        {role === "guest" ? (
                            <>
                                <Link
                                    to="/auth"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </Link>
                                <Link
                                    to="/auth?mode=register"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Register
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={async () => { await logout(); navigate("/"); }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden ml-auto p-2 rounded-lg text-slate-600 hover:bg-slate-50"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* ── Mobile dropdown menu ── */}
            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/30 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="fixed top-16 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg md:hidden">
                        <nav className="flex flex-col px-4 py-3 space-y-1">
                            {currentNav.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                                            ${active
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <item.icon className={`w-4 h-4 ${active ? "text-emerald-600" : "text-slate-400"}`} />
                                        {item.label}
                                    </Link>
                                );
                            })}

                            {/* Auth actions */}
                            <div className="pt-2 border-t border-slate-100 mt-2">
                                {role === "guest" ? (
                                    <>
                                        <Link to="/auth" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                                            <LogIn className="w-4 h-4 text-slate-400" /> Login
                                        </Link>
                                        <Link to="/auth?mode=register" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-600 text-white mt-1">
                                            <UserPlus className="w-4 h-4" /> Register
                                        </Link>
                                    </>
                                ) : (
                                    <button
                                        onClick={async () => { setMobileOpen(false); await logout(); navigate("/"); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                )}
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </>
    );
}
