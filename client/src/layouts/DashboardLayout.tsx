
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Menu } from "lucide-react";
import logo_light from "../assets/logo_light.png"
import logo_dark from "../assets/logo_dark.png"

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDark = document.documentElement.classList.contains(
    "dark"
  );


  return (
    <div className="max-h-[100vh] flex bg-zinc-100 dark:bg-zinc-900 transition-all duration-300">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* sidebar drawer */}
          <div className="relative w-[280px] h-full bg-white dark:bg-zinc-950">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={
                    isDark
                      ? logo_dark
                      : logo_light
                  } 
                className="w-50" alt="" />
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-200 flex items-center justify-center"
            >
              <Menu size={20} />
            </button>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="min-h-[calc(100vh-40px)] rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 md:p-8 transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;