import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { User, Shield, Bell, Lock, Loader2, Check } from "lucide-react";
import { userAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("personal");
    const { user, role, refreshUser } = useAuth();
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pwSaving, setPwSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await userAPI.getProfile();
                const u = data.data;
                setForm({
                    firstName: u.firstName || "",
                    lastName: u.lastName || "",
                    email: u.email || "",
                    phone: u.phone || "",
                });
            } catch (err) {
                console.error("Failed to load profile", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage("");
        try {
            await userAPI.updateProfile({
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
            });
            await refreshUser();
            setMessage("Profile updated successfully!");
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        setPwSaving(true);
        setPwMessage("");
        if (pwForm.newPassword !== pwForm.confirmPassword) {
            setPwMessage("Passwords do not match.");
            setPwSaving(false);
            return;
        }
        try {
            await userAPI.changePassword({
                currentPassword: pwForm.currentPassword,
                newPassword: pwForm.newPassword,
            });
            setPwMessage("Password changed successfully!");
            setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setPwMessage(err.response?.data?.message || "Failed to change password.");
        } finally {
            setPwSaving(false);
        }
    };

    return (
        <MainLayout role={role}>
            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Account Settings</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 shrink-0 space-y-2">
                        {[
                            { id: "personal", label: "Personal Info", icon: User },
                            { id: "security", label: "Login & Security", icon: Lock },
                            { id: "notifications", label: "Notifications", icon: Bell },
                            { id: "verify", label: "Verification", icon: Shield },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === tab.id
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 min-h-[400px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                            </div>
                        ) : activeTab === "personal" ? (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={form.firstName}
                                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={form.lastName}
                                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            disabled
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                </div>
                                {message && (
                                    <p className={`text-sm font-medium ${message.includes("success") ? "text-emerald-600" : "text-red-500"}`}>
                                        {message}
                                    </p>
                                )}
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 flex items-center gap-2"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    Save Changes
                                </button>
                            </div>
                        ) : activeTab === "security" ? (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Change Password</h2>
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            value={pwForm.currentPassword}
                                            onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={pwForm.newPassword}
                                            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={pwForm.confirmPassword}
                                            onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                </div>
                                {pwMessage && (
                                    <p className={`text-sm font-medium ${pwMessage.includes("success") ? "text-emerald-600" : "text-red-500"}`}>
                                        {pwMessage}
                                    </p>
                                )}
                                <button
                                    onClick={handlePasswordChange}
                                    disabled={pwSaving}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 flex items-center gap-2"
                                >
                                    {pwSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                                    Change Password
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                    <Lock className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-slate-500 font-medium">This section is coming soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
