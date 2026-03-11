import { MapPin, Heart, BedDouble, Bath, Square, ArrowRight, Building2 } from "lucide-react";

export default function PropertyCard({ property, onClick, isSaved = false, onToggleSave }) {
    // Determine display price
    const price = property.type === "buy" ? property.buyPrice : property.rentPrice || property.price;

    const beds = property.beds || 2;
    const baths = property.baths || 2;
    const area = property.area || 1200;

    return (
        <div
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] border border-slate-100 transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={onClick}
        >
            {/* IMAGE SECTION (60-65% Height) */}
            <div className="relative h-64 overflow-hidden bg-slate-100">
                {property.image ? (
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-slate-300" />
                    </div>
                )}

                {/* WISHLIST BUTTON */}
                {onToggleSave && (
                    <button
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white transition-colors shadow-sm"
                        onClick={(e) => { e.stopPropagation(); onToggleSave(property.id); }}
                    >
                        <Heart className={`w-5 h-5 transition-colors ${isSaved ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
                    </button>
                )}
            </div>

            {/* CONTENT SECTION */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 text-xl leading-snug mb-1 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {property.title}
                </h3>

                <div className="flex items-center text-slate-500 text-sm gap-1 mb-4">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="line-clamp-1">{property.city}</span>
                </div>

                {/* AMENITIES ROW (Mini) */}
                <div className="flex gap-4 text-slate-500 text-xs font-medium mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-emerald-600/70" /> {beds} Beds
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-emerald-600/70" /> {baths} Baths
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Square className="w-4 h-4 text-emerald-600/70" /> {area.toLocaleString()} sqft
                    </div>
                </div>

                {/* PRICE & ACTION */}
                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</p>
                        <p className="text-xl font-bold text-emerald-700">{price}</p>
                    </div>

                    <button className="p-2 rounded-full bg-slate-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
