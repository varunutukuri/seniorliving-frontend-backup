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
    FileText,
    MessageSquare,
    User,
    Users,
    Calendar,
    Building,
    PlusCircle,
    BarChart3,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ role = "guest", mobileOpen, setMobileOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
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
            { label: "My Requests", path: "/requests", icon: FileText },
            { label: "Messages", path: "/messages", icon: MessageSquare },
            { label: "Profile", path: "/profile", icon: User },
        ],
        family: [
            { label: "Dashboard", path: "/family-dashboard", icon: LayoutDashboard },
            { label: "Senior Profiles", path: "/seniors", icon: Users },
            { label: "Shortlisted", path: "/shortlisted", icon: Heart },
            { label: "Visits & Requests", path: "/visits", icon: Calendar },
            { label: "Communication", path: "/communication", icon: MessageSquare },
            { label: "Profile", path: "/profile", icon: User },
        ],
        builder: [
            { label: "Dashboard", path: "/builder-dashboard", icon: LayoutDashboard },
            { label: "My Properties", path: "/builder/my-properties", icon: Building },
            { label: "Add Property", path: "/builder/add-property", icon: PlusCircle },
            { label: "Leads", path: "/leads", icon: Users },
            { label: "Analytics", path: "/analytics", icon: BarChart3 },
            { label: "Profile", path: "/profile", icon: User },
        ]
    };

    const currentNav = navItems[role] || navItems.guest;

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 shadow-xl lg:shadow-none
        transition-transform duration-300 ease-in-out w-64 lg:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-100">
                        <span className="text-xl font-bold text-emerald-700 tracking-tight flex items-center gap-2">
                            <Home className="w-6 h-6" />
                            NestCare
                        </span>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        {currentNav.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                    ${active
                                            ? "bg-emerald-50 text-emerald-700 font-semibold shadow-sm ring-1 ring-emerald-100"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"}
                  `}
                                >
                                    <item.icon className={`w-5 h-5 ${active ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                                    <span className="text-[16px]">{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Guest Specific Actions */}
                        {role === "guest" && (
                            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Get Started
                                </p>
                                <Link
                                    to="/auth"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors"
                                >
                                    <LogIn className="w-5 h-5 text-slate-400" />
                                    <span className="text-[16px]">Login</span>
                                </Link>
                                <Link
                                    to="/auth?mode=register"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold shadow-md shadow-emerald-200 transition-all"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    <span className="text-[16px]">Register</span>
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* User Profile / Logout (for non-guests) */}
                    {role !== "guest" && (
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
                                onClick={async () => { await logout(); navigate("/"); }}
                            >
                                <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
                                <span className="font-medium text-[16px]">Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
