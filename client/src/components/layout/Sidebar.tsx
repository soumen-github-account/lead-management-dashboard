import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo_dark from "../../assets/logo_dark.png"
import logo_light from "../../assets/logo_light.png"

import { logout } from "../../features/auth/authSlice";

import {
  LayoutDashboard,
  Users,
  BadgeDollarSign,
  LogOut,
  Moon,
  Sun,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {

  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;
  const isDark = document.documentElement.classList.contains("dark");


  return (
    <aside className={`${onClose ? "md:hidden" : "hidden md:flex"} md:flex w-[280px] min-h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white flex-col p-6 transition-all duration-300`}>
    
      {onClose && (
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <X />
          </button>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight hidden">
          Smart Leads
        </h1>

        <img
          src={isDark ? logo_dark : logo_light}
          className="w-full"
          alt="logo"
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
          Management Dashboard
        </p>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {user?.role === "sales" ? (
          <Link
            to="/sales"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive("/sales") ? "bg-black text-white dark:bg-white dark:text-black": "hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}>
            <BadgeDollarSign size={20} />
            Sales Dashboard
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive("/dashboard") ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-zinc-100 dark:hover:bg-zinc-900" }`}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            to="/leads"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive("/leads")? "bg-black text-white dark:bg-white dark:text-black": "hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}
          >
            <BadgeDollarSign size={20} />
            Leads
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            to="/users"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive("/users")? "bg-black text-white dark:bg-white dark:text-black": "hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}>
            <Users size={20} />
            Users
          </Link>
        )}
      </nav>

      <button
        onClick={toggleTheme}
        className="mb-3 flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:scale-[1.02] transition-all duration-200">
        <div className="flex items-center gap-3">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </div>

        <div
          className={`w-11 h-6 rounded-full p-1 transition-all duration-300
            ${darkMode ? "bg-white": "bg-black"}`}>
          <div className={`w-4 h-4 rounded-full transition-all duration-300
              ${darkMode ? "translate-x-5 bg-black" : "translate-x-0 bg-white"}`}
          />
        </div>
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition-all duration-200">
        <LogOut size={18} />
        Logout
      </button>

      <h2 className="text-[11px] font-medium text-center text-zinc-800 dark:text-zinc-300 mt-3">SDKING DEV © 2026 Smart Leads. All rights reserved.</h2>
    </aside>
  );
};

export default Sidebar;