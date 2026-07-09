"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  IconFileText, 
  IconCheck, 
  IconArrowDownBar, 
  IconActivity, 
  IconDeviceLaptop, 
  IconLock,
  IconSignature
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";

export default function ReportingSuite() {
  const [reports, setReports] = useState([
    { name: "UNFPA Maternal Survival Ledger", indicators: "Maternal Death Alerts, Midwife Attendance", status: "Ready", format: "PDF/CSV" },
    { name: "Gavi Pediatric Immunization Coverage", indicators: "DTP3/Measles District Overlays", status: "Ready", format: "PDF" },
    { name: "WHO Healthy Ageing Report", indicators: "Geriatric fall trends, cognitive scores", status: "Pending Update", format: "PDF" }
  ]);

  const [queryLogs, setQueryLogs] = useState([
    { timestamp: "2026-07-09 07:12:04", researcher: "Dr. Chloe (Lagos Uni)", query: "Average birth weight in District A", gdprChecked: true },
    { timestamp: "2026-07-09 06:45:11", researcher: "Dr. Chloe (Lagos Uni)", query: "Measles vaccination rate age group 0-12m", gdprChecked: true },
    { timestamp: "2026-07-09 04:30:29", researcher: "NGO Coordinator (WHO)", query: "Geriatric fall incident rates overall", gdprChecked: true }
  ]);

  const [signing, setSigning] = useState<string | null>(null);

  const handleSign = (reportName: string) => {
    setSigning(reportName);
    setTimeout(() => {
      setSigning(null);
      alert(`Report "${reportName}" has been cryptographically signed and exported.`);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-4 text-left"
    >
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">Government &amp; NGO Reporting Suite</h2>
        <p className="text-sm text-slate-500 font-semibold mt-1">
          Compile donor KPI indicators, export compliance templates, and audit academic research gateways.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        
        {/* LEFT PANEL: Export Templates List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider font-display">Donor Report Templates</h3>
            </div>

            <div className="flex flex-col gap-3">
              {reports.map((r, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 text-xs font-semibold text-slate-700">
                  <div className="flex flex-col gap-1 text-left">
                    <h4 className="font-extrabold text-slate-800 text-sm">{r.name}</h4>
                    <p className="text-slate-500 font-semibold mt-0.5">Indicators: {r.indicators}</p>
                    <div className="flex gap-2.5 mt-2">
                      <span className="bg-[#DDEEF3] text-[#0089C1] px-1.5 py-0.5 rounded font-black text-[9px] uppercase tracking-wider">{r.format}</span>
                      <span className="bg-[#E8F3CE] text-[#608216] px-1.5 py-0.5 rounded font-black text-[9px] uppercase tracking-wider">{r.status}</span>
                    </div>
                  </div>

                  <AhnaraButton 
                    variant="outline" 
                    onClick={() => handleSign(r.name)}
                    isLoading={signing === r.name}
                    leftIcon={<IconSignature className="w-4 h-4" />}
                    className="!rounded-xl border-[#8BB436] text-[#608216] bg-white hover:bg-[#E8F3CE]/30 text-xs font-black uppercase tracking-wider"
                  >
                    {signing === r.name ? "Signing..." : "Sign & Export"}
                  </AhnaraButton>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>

        {/* RIGHT PANEL: Research Query Logger (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Academic Research Query Log</h3>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[350px] scrollbar-none">
              {queryLogs.map((log, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-250 bg-slate-50/50 flex flex-col gap-1 text-xs text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 text-[10px]">{log.researcher}</span>
                    <span className="text-[9px] text-slate-400 font-semibold">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 font-semibold mt-1 leading-normal bg-white p-2 rounded-lg border border-slate-100 select-all font-mono text-[10px]">
                    {log.query}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <IconLock className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-wide">De-identified &amp; GDPR Validated</span>
                  </div>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>

      </div>
    </motion.div>
  );
}
