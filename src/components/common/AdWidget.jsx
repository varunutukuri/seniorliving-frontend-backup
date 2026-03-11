import { useState } from "react";
import { X, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export default function AdWidget({ variant = "popup", title, description, actionText, onClose, className = "" }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    // Variants styling
    const variants = {
        popup: "fixed bottom-6 right-6 z-40 w-80 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500",
        inline: "w-full my-6",
        sidebar: "w-full mt-auto mb-4",
    };

    return (
        <div className={`bg-white rounded-2xl border border-slate-100 overflow-hidden ${variants[variant]} ${className}`}>

            {/* Header / Image Area */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-4 relative">
                <button
                    onClick={() => { setVisible(false); if (onClose) onClose(); }}
                    className="absolute top-2 right-2 p-1.5 bg-white/50 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Sponsored
                    </span>
                </div>

                <h4 className="font-bold text-slate-800 text-lg leading-tight pr-6">
                    {title || "Senior Care Services"}
                </h4>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {description || "Discover verified care providers in your area. Trusted by thousands of families."}
                </p>

                <button className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all group">
                    {actionText || "Learn More"}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
}
