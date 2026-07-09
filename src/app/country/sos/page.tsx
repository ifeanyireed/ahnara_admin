"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  IconAlertOctagon, 
  IconPhoneCall, 
  IconCurrentLocation, 
  IconHeartFilled, 
  IconMapPin, 
  IconCheck, 
  IconCar 
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraBadge } from "@/components/ahnara/AhnaraBadge";
import { cn } from "@/lib/utils";

export default function SOSDispatchCoordinator() {
  const [activeSOS, setActiveSOS] = useState([
    { id: 1, patient: "Tyra Reed", type: "Maternal", blood: "O-Negative (O-)", age: "28 years", risks: "High Blood Pressure", coordinates: "GPS: 6.524, 3.379", status: "Ambulance Dispatched", ambulance: "AMB-402", driver: "Driver Dan", eta: "11 mins", hospital: "Health Center A" },
    { id: 2, patient: "Baby Aria", type: "Pediatric", blood: "A-Positive (A+)", age: "3 months", risks: "Low APGAR Score (4)", coordinates: "GPS: 6.453, 3.421", status: "Connecting...", ambulance: "Unassigned", driver: "None", eta: "Searching...", hospital: "Pending Allocation" },
    { id: 3, patient: "Baba Adebayo", type: "Geriatric", blood: "B-Positive (B+)", age: "72 years", risks: "Cardiovascular flags", coordinates: "GPS: 6.538, 3.361", status: "Hospital Notified", ambulance: "AMB-108", driver: "Driver Ken", eta: "6 mins", hospital: "Health Center A" }
  ]);

  const [hospitals, setHospitals] = useState([
    { name: "Health Center A", emptyIcuBeds: 4, activeStaffCount: 8, incubatorAvailable: true },
    { name: "Pediatric Care Hub", emptyIcuBeds: 2, activeStaffCount: 4, incubatorAvailable: true },
    { name: "District General Clinic", emptyIcuBeds: 0, activeStaffCount: 3, incubatorAvailable: false }
  ]);

  const handleAssignAmbulance = (sosId: number, ambId: string, driver: string, eta: string, hospName: string) => {
    setActiveSOS(prev => prev.map(s => s.id === sosId ? { 
      ...s, 
      status: "Ambulance Dispatched", 
      ambulance: ambId, 
      driver: driver, 
      eta: eta, 
      hospital: hospName 
    } : s));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-4 text-left"
    >
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">Emergency SOS &amp; Dispatch</h2>
        <p className="text-sm text-slate-500 font-semibold mt-1">
          Auto-match closest vehicles and pre-notify receiving hospitals during pediatric, obstetric, and geriatric crises.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        
        {/* LEFT PANEL: Live Emergency Dispatch List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          
          {/* Active Emergencies */}
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Active emergency dispatch list</h3>
              <AhnaraBadge size="sm" variant="outline" className="border-red-200 text-red-600 bg-red-50 animate-pulse font-black">
                {activeSOS.length} Cases Active
              </AhnaraBadge>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] scrollbar-none">
              {activeSOS.map((s) => (
                <div 
                  key={s.id} 
                  className={cn(
                    "p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-semibold text-slate-700 transition-all",
                    s.status === "Connecting..." ? "bg-red-50/60 border-red-200" : "bg-slate-50 border-slate-200"
                  )}
                >
                  {/* Left: Patient and Risk details */}
                  <div className="flex flex-col gap-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-sm">{s.patient}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                        s.type === "Maternal" ? "bg-purple-100 text-purple-700" : s.type === "Pediatric" ? "bg-[#DDEEF3] text-[#0089C1]" : "bg-amber-100 text-amber-700"
                      }`}>
                        {s.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-extrabold font-mono uppercase tracking-wider">{s.coordinates}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5 mt-2 text-[10px] text-slate-500 font-bold">
                      <div>Blood: <span className="text-slate-800">{s.blood}</span></div>
                      <div>Age: <span className="text-slate-800">{s.age}</span></div>
                      <div className="col-span-2">Risks: <span className="text-red-500">{s.risks}</span></div>
                    </div>
                    <div className="mt-3 flex items-center gap-2.5">
                      <IconCar className="w-4 h-4 text-slate-400" />
                      <span className="font-bold">Vehicle: <span className="text-slate-950 font-black">{s.ambulance}</span> ({s.driver})</span>
                      <span className="h-3 w-px bg-slate-300" />
                      <span className="font-bold">ETA: <span className="text-rose-600 font-black">{s.eta}</span></span>
                      <span className="h-3 w-px bg-slate-300" />
                      <span className="font-bold">Hospital: <span className="text-[#0089C1] font-black">{s.hospital}</span></span>
                    </div>
                  </div>

                  {/* Right: Allocation action */}
                  {s.status === "Connecting..." && (
                    <button 
                      onClick={() => handleAssignAmbulance(s.id, "AMB-205", "Driver John", "9 mins", "Health Center A")}
                      className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/10 flex-shrink-0"
                    >
                      Allocate AMB-205
                    </button>
                  )}
                </div>
              ))}
            </div>
          </AhnaraCard>

          {/* Hospital Capacity status list */}
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Hospital Preparedness Status</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {hospitals.map((h, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
                  <h4 className="font-black text-slate-800 text-xs">{h.name}</h4>
                  <div className="flex flex-col gap-1 text-[10px] font-bold text-slate-500 mt-1">
                    <div className="flex justify-between">
                      <span>Empty ICU Beds:</span>
                      <span className={cn("font-black", h.emptyIcuBeds > 0 ? "text-emerald-600" : "text-red-500")}>
                        {h.emptyIcuBeds}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Incubators Available:</span>
                      <span className={cn("font-black", h.incubatorAvailable ? "text-emerald-600" : "text-slate-400")}>
                        {h.incubatorAvailable ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-Shift Clinicians:</span>
                      <span className="text-slate-800 font-black">{h.activeStaffCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>

        {/* RIGHT PANEL: Simulated Ambulance Routing Map (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <AhnaraCard className="flex-1 bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Ambulance routing Route-map</h3>
              <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-black">Live Routing Map</span>
            </div>

            {/* Map Overlay */}
            <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
              
              {/* Route line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
                <path 
                  d="M 80,100 Q 150,80 200,180 T 120,240" 
                  fill="none" 
                  stroke="#0089C1" 
                  strokeWidth="3.5" 
                  strokeDasharray="5, 5" 
                  className="animate-pulse" 
                />
              </svg>

              {/* Pin 1: Patient location */}
              <div className="absolute top-[80px] left-[70px] flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
                <IconMapPin className="w-5 h-5 text-red-500" />
                <span className="text-[7px] bg-slate-900 border border-red-500 text-white px-1.5 py-0.5 rounded mt-0.5 font-mono">Tyra Reed</span>
              </div>

              {/* Pin 2: Ambulance */}
              <div className="absolute top-[160px] left-[180px] flex flex-col items-center">
                <IconMapPin className="w-5 h-5 text-[#8BB436]" />
                <span className="text-[7px] bg-slate-900 border border-[#8BB436] text-white px-1.5 py-0.5 rounded mt-0.5 font-mono">AMB-402</span>
              </div>

              {/* Pin 3: Hospital destination */}
              <div className="absolute top-[230px] left-[110px] flex flex-col items-center">
                <IconMapPin className="w-5 h-5 text-[#0089C1]" />
                <span className="text-[7px] bg-slate-900 border border-slate-700 text-white px-1.5 py-0.5 rounded mt-0.5">Health Center A</span>
              </div>

              <span className="text-white/40 text-xs font-semibold select-none mt-20">Live Route Mapping Observatories</span>
            </div>
          </AhnaraCard>
        </div>

      </div>
    </motion.div>
  );
}
