import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AdWidget from "../components/common/AdWidget";
import { Search, Heart, Building, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
    const navigate = useNavigate();

    return (
        <MainLayout role="guest">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HERO SECTION - DASHBOARD STYLE */}
                <section className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                            Find a home where <br /> care comes first.
                        </h1>
                        <p className="text-emerald-100 text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                            Discover senior-friendly homes, retirement communities, and assisted living facilities verified for safety and comfort.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate("/browse")}
                                className="bg-white text-emerald-900 px-6 py-3.5 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2"
                            >
                                <Search className="w-5 h-5" />
                                Browse Homes
                            </button>
                            <button
                                onClick={() => navigate("/auth?mode=register")}
                                className="bg-emerald-700/50 backdrop-blur-sm border border-emerald-500/30 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
                            >
                                Create Free Account
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                        <Building className="w-80 h-80 -mr-20 -mb-20" />
                    </div>
                </section>

                {/* ROLE BASED CARDS */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* FOR FAMILIES */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6 text-rose-600 group-hover:scale-110 transition-transform">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">For Families</h2>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Find the perfect home for your parents. Track visits, shortlist properties, and communicate with landlords directly.
                        </p>
                        <button
                            onClick={() => navigate("/auth?role=family")}
                            className="text-emerald-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                        >
                            Start Your Search <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* FOR BUILDERS */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                            <Building className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">For Builders</h2>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            List your senior-friendly properties. Reach verified tenants and manage inquiries efficiently.
                        </p>
                        <button
                            onClick={() => navigate("/auth?role=builder")}
                            className="text-emerald-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                        >
                            List Property <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </section>

                {/* WHY NESTCARE */}
                <section className="bg-slate-100 rounded-3xl p-8 md:p-12">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Why NestCare Living?</h2>
                        <p className="text-slate-500">We prioritize safety, dignity, and specialized care in every home we verify.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Verified Listings", desc: "Every home is physically verified for senior safety standards." },
                            { title: "Direct Connection", desc: "Connect directly with property owners without middlemen." },
                            { title: "Community Focus", desc: "Find homes in communities that foster social connection." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mb-4">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AD WIDGET */}
                <AdWidget
                    variant="popup"
                    title="Need Health Insurance?"
                    description="Get comprehensive coverage designed specifically for senior citizens. fast claims and cashless network."
                    actionText="Get Quote"
                />

            </div>
        </MainLayout>
    );
}
