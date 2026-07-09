"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  IconActivity, 
  IconAlertTriangle, 
  IconUserCheck,
  IconMapPin,
  IconBuildingHospital,
  IconHeartbeat,
  IconTrendingUp
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraBadge } from "@/components/ahnara/AhnaraBadge";

export default function TriageDashboard() {
  const [triageAlerts, setTriageAlerts] = useState([
    { id: 1, type: "Maternal", patient: "Tyra Dhillon", risk: "high", location: "District A (Coordinates: 6.52, 3.37)", alert: "SOS Double-Tap Triggered: Impending Sepsis Alert", time: "2 min ago" },
    { id: 2, type: "Pediatric", patient: "Baby Aria", risk: "high", location: "District B (Coordinates: 6.45, 3.42)", alert: "APGAR < 4 Crisis Triage Alert", time: "5 min ago" },
    { id: 3, type: "Geriatric", patient: "Baba Adebayo", risk: "moderate", location: "District A (Coordinates: 6.53, 3.36)", alert: "Longevity Fall Detector Sensor Trigger", time: "12 min ago" },
    { id: 4, type: "Maternal", patient: "Chichi Obi", risk: "low", location: "District C (Coordinates: 6.61, 3.29)", alert: "Missed 3rd ANC Checkup Followup Flag", time: "1 hr ago" }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-4 text-left"
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <AhnaraCard className="bg-white border border-slate-200/50 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Observed Clinics</span>
            <span className="text-2xl font-black text-slate-800 text-display block mt-1">42 Clinics</span>
            <span className="text-xs text-emerald-600 font-bold mt-1 block">100% Verified Status</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E8F3CE] text-[#608216] flex items-center justify-center">
            <IconBuildingHospital className="w-5 h-5" />
          </div>
        </AhnaraCard>

        <AhnaraCard className="bg-white border border-slate-200/50 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active SOS Alerts</span>
            <span className="text-2xl font-black text-rose-600 text-display block mt-1">2 Critical</span>
            <span className="text-xs text-slate-500 font-bold mt-1 block">ETAs below 14 mins</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <IconAlertTriangle className="w-5 h-5" />
          </div>
        </AhnaraCard>

        <AhnaraCard className="bg-white border border-slate-200/50 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Immunization Coverage</span>
            <span className="text-2xl font-black text-[#0089C1] text-display block mt-1">94.8%</span>
            <span className="text-xs text-emerald-600 font-bold mt-1 block">↑ 1.2% this quarter</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#DDEEF3] text-[#0089C1] flex items-center justify-center">
            <IconActivity className="w-5 h-5" />
          </div>
        </AhnaraCard>

        <AhnaraCard className="bg-white border border-slate-200/50 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Preeclampsia Rate</span>
            <span className="text-2xl font-black text-slate-800 text-display block mt-1">1.8%</span>
            <span className="text-xs text-[#608216] font-bold mt-1 block">WHO Optimal Limits</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <IconHeartbeat className="w-5 h-5" />
          </div>
        </AhnaraCard>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        
        {/* COLUMN 1: Geospatial Map Overlay (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <AhnaraCard className="flex-1 bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Geospatial Insights Map</h3>
              <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-black">Live GPS Feed</span>
            </div>

            {/* Map Placeholder */}
            <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center min-h-[300px]">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
              
              {/* Overlay spots */}
              <div className="absolute top-[20%] left-[30%] flex flex-col items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
                <IconMapPin className="w-6 h-6 text-red-500" />
                <span className="text-[8px] bg-slate-900 border border-red-500 text-white px-1.5 py-0.5 rounded mt-1 font-mono">SOS: Tyra</span>
              </div>

              <div className="absolute top-[55%] left-[65%] flex flex-col items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
                <IconMapPin className="w-6 h-6 text-red-500" />
                <span className="text-[8px] bg-slate-900 border border-red-500 text-white px-1.5 py-0.5 rounded mt-1 font-mono">SOS: Baby Aria</span>
              </div>

              <div className="absolute top-[40%] left-[15%] flex flex-col items-center">
                <IconMapPin className="w-6 h-6 text-[#8BB436]" />
                <span className="text-[8px] bg-slate-900 border border-slate-700 text-white px-1.5 py-0.5 rounded mt-1">Center A</span>
              </div>

              <div className="absolute top-[70%] left-[45%] flex flex-col items-center">
                <IconMapPin className="w-6 h-6 text-[#0089C1]" />
                <span className="text-[8px] bg-slate-900 border border-slate-700 text-white px-1.5 py-0.5 rounded mt-1">Clinic B</span>
              </div>

              <span className="text-white/40 text-xs font-semibold select-none">Observed District Map Overlay</span>
            </div>
          </AhnaraCard>
        </div>

        {/* COLUMN 2: Active Triage Alert Ticker (4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <AhnaraCard className="flex-1 bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Active Triage Ticker</h3>
              <AhnaraBadge size="sm" variant="outline" className="border-red-200 text-red-600 bg-red-50 font-black animate-pulse">
                Live Broadcast
              </AhnaraBadge>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[350px] scrollbar-none">
              {triageAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-xl border flex flex-col gap-1.5 text-xs text-left leading-normal ${
                    alert.risk === "high" 
                      ? "bg-red-50/60 border-red-200 text-slate-700" 
                      : alert.risk === "moderate" 
                      ? "bg-orange-50/60 border-orange-200 text-slate-700" 
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 uppercase text-[9px] tracking-wider">
                      {alert.type} Triage
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">{alert.time}</span>
                  </div>
                  <h4 className="font-black text-slate-800 text-sm mt-0.5">{alert.patient}</h4>
                  <p className="text-xs font-semibold text-slate-600">{alert.alert}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight flex items-center gap-1">
                    <IconMapPin className="w-3 h-3 text-slate-400" />
                    {alert.location}
                  </p>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>

        {/* COLUMN 3: Vital Metrics & Epidemiological trends (3 cols) */}
        <div className="lg:col-span-3 flex flex-col">
          <AhnaraCard className="flex-1 bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Observed Trends</h3>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-between">
              {/* Epidemiological Trend 1 */}
              <div className="text-left flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Geriatric Falls Trend</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-extrabold text-slate-850 text-display">↓ 8.4%</span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase">Favorable</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">
                  Post-longevity spacer exercises rolled out across District A.
                </p>
              </div>

              {/* Epidemiological Trend 2 */}
              <div className="text-left flex flex-col gap-1 border-t border-slate-100 pt-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Neonatal APGAR Recovery</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-extrabold text-slate-850 text-display">92.4%</span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase">Optimal</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">
                  92.4% of low birth weights synced successfully in critical care.
                </p>
              </div>

              {/* Epidemiological Trend 3 */}
              <div className="text-left flex flex-col gap-1 border-t border-slate-100 pt-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preeclampsia Flags</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-extrabold text-slate-850 text-display">12 Alerts</span>
                  <span className="text-[10px] font-black text-amber-600 uppercase">Monitored</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">
                  All active cases linked with mobile health clinics midwife logs.
                </p>
              </div>
            </div>
          </AhnaraCard>
        </div>

      </div>
    </motion.div>
  );
}
