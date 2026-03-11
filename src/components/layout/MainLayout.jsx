import Sidebar from "./Sidebar";

export default function MainLayout({ children, role = "guest" }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation */}
            <Sidebar role={role} />

            {/* Page Content — offset by navbar height */}
            <main className="flex-1 pt-16">
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
