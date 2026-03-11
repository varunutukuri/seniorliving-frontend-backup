import MainLayout from "../../components/layout/MainLayout";
import { Search, ShieldCheck, Key } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Search & Filter",
            desc: "Browse hundreds of senior-friendly homes. Filter by care level, budget, and city.",
            icon: Search
        },
        {
            num: "02",
            title: "Verify & Visit",
            desc: "Check our safety scores. Schedule a physical or virtual visit with the property owner.",
            icon: ShieldCheck
        },
        {
            num: "03",
            title: "Book & Move In",
            desc: "Finalize the lease or purchase securely. Get support for moving and settling in.",
            icon: Key
        }
    ];

    return (
        <MainLayout role="guest">
            <div className="max-w-5xl mx-auto py-12 px-4">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">How NestCare Works</h1>
                    <p className="text-lg text-slate-500">Values transparency. We simplify the journey to finding your next home.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-20 right-20 h-0.5 bg-slate-100 -z-10"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="bg-white p-8 pt-0 relative">
                            <div className="w-24 h-24 bg-white mx-auto mb-6 flex items-center justify-center">
                                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 text-2xl font-bold">
                                    {step.num}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 text-center mb-3">{step.title}</h3>
                            <p className="text-slate-500 text-center leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 bg-emerald-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
                        <p className="text-emerald-100 max-w-xl mx-auto mb-8">
                            Join thousands of seniors living their best life in homes designed for them.
                        </p>
                        <button className="bg-white text-emerald-900 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                            Find a Home
                        </button>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}
