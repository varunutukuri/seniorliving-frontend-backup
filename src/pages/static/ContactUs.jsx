import MainLayout from "../../components/layout/MainLayout";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactUs() {
    return (
        <MainLayout role="guest">
            <div className="max-w-4xl mx-auto py-12 px-4">

                <h1 className="text-3xl font-bold text-slate-900 mb-8">Contact Support</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Talk to Us</h3>
                        <p className="text-slate-500 mb-4">We are available Mon-Sat, 9am to 6pm.</p>
                        <a href="tel:+919876543210" className="text-2xl font-bold text-blue-600 hover:underline">+91 98765 43210</a>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Email Support</h3>
                        <p className="text-slate-500 mb-4">We typically respond within 2 hours.</p>
                        <a href="mailto:help@nestcare.in" className="text-2xl font-bold text-emerald-600 hover:underline">help@nestcare.in</a>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-3xl p-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-slate-400" /> Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {[
                            "How do I verify a property?",
                            "Is there a brokerage fee?",
                            "Can I request a wheelchair accessible home?"
                        ].map((q, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center cursor-pointer hover:border-emerald-300 transition-colors">
                                <span className="font-medium text-slate-700">{q}</span>
                                <span className="text-emerald-600 font-bold">+</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}
