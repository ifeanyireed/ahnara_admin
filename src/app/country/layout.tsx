"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconLayoutDashboard,
  IconLayoutDashboardFilled,
  IconUsers,
  IconAlertOctagon,
  IconFileText,
  IconHeart,
  IconBell,
  IconX,
  IconPhoneCall,
  IconCurrentLocation,
  IconBuildingHospital
} from "@tabler/icons-react";
import { AhnaraLoader } from "@/components/ahnara/AhnaraLoader";
import { cn } from "@/lib/utils";

export default function CountryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminData, setAdminData] = useState<any>(null);

  // Load admin data on mount
  useEffect(() => {
    const dataStr = localStorage.getItem("admin_country_data");
    if (!dataStr) {
      router.push("/onboarding");
      return;
    }
    try {
      const data = JSON.parse(dataStr);
      setAdminData(data);
    } catch (e) {
      router.push("/onboarding");
    }
  }, [pathname, router]);

  const menuItems = [
    { name: "Health Triage", href: "/country", icon: IconLayoutDashboard, activeIcon: IconLayoutDashboardFilled },
    { name: "Providers Ledger", href: "/country/providers", icon: IconUsers, activeIcon: IconUsers },
    { name: "Emergency SOS", href: "/country/sos", icon: IconAlertOctagon, activeIcon: IconAlertOctagon },
    { name: "Reporting Suite", href: "/country/reporting", icon: IconFileText, activeIcon: IconFileText },
    { name: "Observatory Map", href: "/country/observatory", icon: IconBuildingHospital, activeIcon: IconBuildingHospital },
  ];

  if (!adminData) {
    return <AhnaraLoader fullScreen size="lg" />;
  }

  return (
    <div className="min-h-screen bg-[#E8EFF4] text-[#0D090C] font-sans flex flex-col select-none">
      
      {/* TOP HEADER */}
      <header className="px-8 py-5 flex items-center justify-between gap-4 bg-transparent border-none">
        
        {/* Logo and Nav Menu Group */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#D4F475] flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          </div>

          <nav className="flex items-center gap-1 bg-[#DDEEF3] p-1 rounded-2xl border border-slate-300/30">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 z-10 ${
                    isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAdminTab"
                      className="absolute inset-0 bg-[#1E293B] rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Notifications and Profile */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all relative bg-white shadow-xs">
            <IconBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white" />
          </button>
          
          <div className="h-8 w-px bg-slate-200" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0089C1] flex items-center justify-center text-white font-bold shadow-xs">
              CA
            </div>
            <div className="text-left hidden sm:block">
              <p className="font-bold text-sm text-slate-900 leading-none">{adminData.ministryName || "Country Admin"}</p>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">
                Region: {adminData.regionId || "MOH-NG-721"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN SCREEN CONTAINER */}
      <div className="flex-1 px-8 pt-6 pb-6 flex flex-col">
        {children}
      </div>

    </div>
  );
}
