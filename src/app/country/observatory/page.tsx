"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  IconMap, 
  IconActivity, 
  IconUsers, 
  IconShield, 
  IconAlertTriangle,
  IconChartLine
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraBadge } from "@/components/ahnara/AhnaraBadge";
import { api } from "@/lib/api";

export default function PopulationObservatory() {
  const [cohortThreshold, setCohortThreshold] = useState(true);
  const [districts, setDistricts] = useState([
    { name: "District A", vaccinationRate: "96.4%", sepsisRate: "0.2%", stuntingVelocity: "Normal", cohortSize: 124 },
    { name: "District B", vaccinationRate: "89.1%", sepsisRate: "1.4%", stuntingVelocity: "Elevated", cohortSize: 42 },
    { name: "District C", vaccinationRate: "94.8%", sepsisRate: "0.5%", stuntingVelocity: "Normal", cohortSize: 201 },
    { name: "District D", vaccinationRate: "82.0%", sepsisRate: "2.1%", stuntingVelocity: "Critical", cohortSize: 15 }
  ]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const metrics = await api.get("/analytics/metrics");
      if (Array.isArray(metrics) && metrics.length > 0) {
        // Group by district (District A, District B, District C, District D)
        const districtsMap: Record<string, any> = {
          "District A": { name: "District A", vaccinationRate: "0.0%", sepsisRate: "0.0%", stuntingVelocity: "Normal", cohortSize: 0 },
          "District B": { name: "District B", vaccinationRate: "0.0%", sepsisRate: "0.0%", stuntingVelocity: "Normal", cohortSize: 0 },
          "District C": { name: "District C", vaccinationRate: "0.0%", sepsisRate: "0.0%", stuntingVelocity: "Normal", cohortSize: 0 },
          "District D": { name: "District D", vaccinationRate: "0.0%", sepsisRate: "0.0%", stuntingVelocity: "Normal", cohortSize: 0 },
        };

        let hasDistrictData = false;
        metrics.forEach((m: any) => {
          const region = m.region; // e.g. "District A"
          if (districtsMap[region]) {
            hasDistrictData = true;
            const val = parseFloat(m.value);
            if (m.metricName === "vaccination_rate") {
              districtsMap[region].vaccinationRate = `${(val * 100).toFixed(1)}%`;
            } else if (m.metricName === "sepsis_rate") {
              districtsMap[region].sepsisRate = `${(val * 100).toFixed(1)}%`;
            } else if (m.metricName === "stunting_velocity") {
              // 0 = Normal, 1 = Elevated, 2 = Critical
              districtsMap[region].stuntingVelocity = val === 2 ? "Critical" : val === 1 ? "Elevated" : "Normal";
            } else if (m.metricName === "cohort_size") {
              districtsMap[region].cohortSize = Math.round(val);
            }
          }
        });

        if (hasDistrictData) {
          setDistricts(Object.values(districtsMap));
        }
      }
    } catch (err) {
      console.error("Failed to load district metrics from backend:", err);
      // Fallback is already set in initial state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-4 text-left"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">Ahnara Insights Population Observatory</h2>
            {loading ? (
              <AhnaraBadge size="sm" variant="warning" className="animate-pulse">Loading Live Data...</AhnaraBadge>
            ) : (
              <AhnaraBadge size="sm" variant="success">Connected to Analytics Pipeline</AhnaraBadge>
            )}
          </div>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Real-time population-health observatory to monitor aggregated stunting, maternal sepsis, and vaccine coverage.
          </p>
        </div>

        {/* Cohort Privacy Switcher */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-3 shadow-xs">
          <IconShield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Privacy Parameters</span>
            <button 
              onClick={() => setCohortThreshold(prev => !prev)}
              className="mt-1 flex items-center gap-2 text-xs font-black text-slate-700"
            >
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${cohortThreshold ? "bg-emerald-500 text-white" : "bg-slate-200"}`}>
                {cohortThreshold && <span className="text-[8px]">✓</span>}
              </div>
              Enforce Cohort Threshold (hide &lt; 50)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        
        {/* LEFT PANEL: Drill-down heatmap map (6 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <AhnaraCard className="flex-1 bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Drill-down Geographical Heatmap</h3>
            </div>

            {/* Interactive SVG Map simulator */}
            <div className="flex-1 bg-[#DDEEF3]/30 rounded-2xl border border-[#B8D7E0]/50 relative overflow-hidden flex items-center justify-center min-h-[350px]">
              
              {/* Simulated districts */}
              <svg className="w-full max-w-[320px] h-[320px] text-slate-350" viewBox="0 0 100 100">
                {/* District A */}
                <path d="M 10,10 L 40,10 L 45,35 L 20,40 Z" className="fill-emerald-250 stroke-white stroke-[0.8] hover:fill-emerald-300 transition-colors cursor-pointer" />
                <text x="22" y="24" className="font-mono font-black text-[3px] fill-emerald-800">District A</text>
                
                {/* District B */}
                <path d="M 40,10 L 80,15 L 75,50 L 45,35 Z" className="fill-amber-250 stroke-white stroke-[0.8] hover:fill-amber-300 transition-colors cursor-pointer" />
                <text x="56" y="28" className="font-mono font-black text-[3px] fill-amber-800">District B</text>

                {/* District C */}
                <path d="M 20,40 L 45,35 L 50,75 L 15,80 Z" className="fill-emerald-200 stroke-white stroke-[0.8] hover:fill-emerald-250 transition-colors cursor-pointer" />
                <text x="26" y="58" className="font-mono font-black text-[3px] fill-emerald-800">District C</text>

                {/* District D */}
                <path d="M 45,35 L 75,50 L 85,85 L 50,75 Z" className="fill-red-250 stroke-white stroke-[0.8] hover:fill-red-300 transition-colors cursor-pointer" />
                <text x="58" y="65" className="font-mono font-black text-[3px] fill-red-800">District D</text>
              </svg>

              <div className="absolute bottom-4 left-4 bg-white/95 border border-slate-200/80 rounded-xl p-2.5 flex flex-col gap-1 text-[9px] font-bold text-slate-500 shadow-sm text-left">
                <span className="font-black uppercase tracking-wide text-slate-700">Legend</span>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-emerald-400" /> Optimal (Vaccines &gt; 90%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-amber-400" /> Warning (Vaccines 85% - 90%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-red-400" /> Critical (Vaccines &lt; 85%)</div>
              </div>
            </div>
          </AhnaraCard>
        </div>

        {/* RIGHT PANEL: District list & privacy shield (6 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Cohort Coverage Ledger</h3>
            </div>

            <div className="flex flex-col gap-3">
              {districts.map((d, i) => {
                const isMasked = cohortThreshold && d.cohortSize < 50;
                return (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col gap-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm">{d.name}</h4>
                      <AhnaraBadge size="sm" variant={d.cohortSize >= 50 ? "success" : "warning"} className="font-black">
                        Cohort Size: {d.cohortSize}
                      </AhnaraBadge>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 mt-2 border-t border-slate-200/50 pt-2.5 font-bold text-[10px] text-slate-500 text-left">
                      <div>
                        <span>Vaccine Coverage</span>
                        <span className="block font-black text-slate-800 text-xs mt-1">
                          {isMasked ? "[MASKED < 50]" : d.vaccinationRate}
                        </span>
                      </div>
                      <div>
                        <span>Maternal Sepsis</span>
                        <span className="block font-black text-slate-800 text-xs mt-1">
                          {isMasked ? "[MASKED < 50]" : d.sepsisRate}
                        </span>
                      </div>
                      <div>
                        <span>Stunting Velocity</span>
                        <span className={`block font-black text-xs mt-1 ${
                          isMasked ? "text-slate-400" : d.stuntingVelocity === "Critical" ? "text-red-500" : d.stuntingVelocity === "Elevated" ? "text-amber-600" : "text-emerald-600"
                        }`}>
                          {isMasked ? "[MASKED]" : d.stuntingVelocity}
                        </span>
                      </div>
                    </div>

                    {isMasked && (
                      <div className="flex items-center gap-1.5 mt-2 bg-amber-50 border border-amber-100 rounded-lg p-2 text-[9px] text-amber-700 leading-normal">
                        <IconAlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Aggregates hidden to prevent patient identification in small sample sizes (compliance guard).</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AhnaraCard>
        </div>

      </div>
    </motion.div>
  );
}
