import MainLayout from "../../components/layout/MainLayout";
import { ShieldCheck, Heart, Users } from "lucide-react";

export default function AboutUs() {
    return (
        <MainLayout role="guest">
            <div className="max-w-5xl mx-auto space-y-16 py-8">

                {/* Hero */}
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Empowering Senior Lives with <span className="text-emerald-600">Dignity & Care</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                        NestCare isn't just a listing platform. It's a promise to help families find safe, verified, and loving homes for their elders.
                    </p>
                </section>

                {/* Values Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: "100% Verified", text: "Every home is physically inspected for senior safety compliance." },
                        { icon: Heart, title: "Care First", text: "We prioritize communities that offer medical aid and social engagement." },
                        { icon: Users, title: "Family Centric", text: "Tools designed for families to collaborate and make decisions together." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-6">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </section>

                {/* Team / Story */}
                <section className="bg-slate-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800">Our Story</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Started in 2024, NestCare was born from a personal struggle to find a suitable home for our own grandparents. We realized the market lacked transparency and empathy. Today, we bridge that gap.
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm rotate-3 transform border border-slate-100">
                            <div className="h-48 bg-slate-200 rounded-xl mb-4 flex items-center justify-center text-slate-400">Team Photo</div>
                            <p className="font-bold text-slate-800">The NestCare Team</p>
                            <p className="text-sm text-slate-500">Bangalore, India</p>
                        </div>
                    </div>
                </section>

            </div>
        </MainLayout>
    );
}
