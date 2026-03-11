import { BarChart3, MessageSquare, Files, Heart, Search } from "lucide-react";

export default function RichState({ type = "analytics" }) {

    const content = {
        analytics: {
            icon: BarChart3,
            title: "Analytics Dashboard",
            desc: "Track your property performance, lead generation stats, and view trends over time.",
            placeholder: (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                    <div className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
                    <div className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
                    <div className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
                    <div className="col-span-1 md:col-span-3 h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
                </div>
            )
        },
        messages: {
            icon: MessageSquare,
            title: "Your Conversations",
            desc: "Connect directly with builders, property owners, and care providers. Your chat history will appear here.",
            placeholder: (
                <div className="mt-8 space-y-4 opacity-60">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4 p-4 border rounded-2xl">
                            <div className="w-12 h-12 rounded-full bg-slate-100"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-1/3 bg-slate-100 rounded"></div>
                                <div className="h-3 w-2/3 bg-slate-100 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        saved: {
            icon: Heart,
            title: "Saved Homes",
            desc: "Keep track of the properties you love. Compare them side-by-side and schedule visits.",
            placeholder: (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-slate-100 rounded-2xl border border-slate-200"></div>
                    ))}
                </div>
            )
        },
        requests: {
            icon: Files,
            title: "My Requests",
            desc: "Track the status of your visit requests, document submissions, and callbacks.",
            placeholder: (
                <div className="mt-8 space-y-4 opacity-60">
                    <div className="h-20 bg-emerald-50/50 rounded-2xl border border-emerald-100"></div>
                    <div className="h-20 bg-slate-50 rounded-2xl border border-slate-100"></div>
                </div>
            )
        },
        leads: {
            icon: Search,
            title: "Lead Management",
            desc: "View and manage inquiries from potential tenants and buyers. Follow up and close deals faster.",
            placeholder: (
                <div className="mt-8 space-y-4 opacity-60">
                    <div className="h-16 bg-slate-100 rounded-xl w-full"></div>
                    <div className="h-16 bg-slate-100 rounded-xl w-full"></div>
                    <div className="h-16 bg-slate-100 rounded-xl w-full"></div>
                </div>
            )
        }
    };

    const current = content[type] || content.analytics;
    const Icon = current.icon;

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">{current.title}</h2>
                <p className="text-slate-500 text-lg leading-relaxed">{current.desc}</p>
            </div>

            <div className="relative">
                {/* Placeholder Content */}
                {current.placeholder}

                {/* Overlay Message */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl px-8 py-4 rounded-full text-sm font-semibold text-slate-600">
                        Sample Preview • No active data yet
                    </div>
                </div>
            </div>
        </div>
    );
}
