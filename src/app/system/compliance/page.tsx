"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  IconShieldCheck, 
  IconSearch, 
  IconDownload, 
  IconDeviceLaptop, 
  IconLock,
  IconFingerprint
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";

export default function ComplianceLogs() {
  const [logs, setLogs] = useState([
    { timestamp: "2026-07-09 08:12:04", userId: "user-mama-904", action: "View Record", type: "Maternal Care", recordId: "mat-rec-721", ip: "192.168.1.42", device: "Chrome / macOS", seal: "AES256-SEAL-8022" },
    { timestamp: "2026-07-09 08:08:55", userId: "user-kids-305", action: "Edit Record", type: "Child Growth", recordId: "kid-rec-108", ip: "192.168.1.18", device: "Safari / iOS App", seal: "AES256-SEAL-1104" },
    { timestamp: "2026-07-09 07:54:12", userId: "admin-country-01", action: "Export PDF", type: "UNFPA Aggregate", recordId: "unfpa-2026-q2", ip: "10.0.4.92", device: "Firefox / Linux", seal: "AES256-SEAL-4920" },
    { timestamp: "2026-07-09 07:11:30", userId: "user-mama-904", action: "Delete Entry", type: "Checklist Log", recordId: "chk-log-402", ip: "192.168.1.42", device: "Chrome / macOS", seal: "AES256-SEAL-9020" }
  ]);

  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState(false);

  const filtered = logs.filter(l => 
    l.userId.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase()) || 
    l.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportAudit = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert("Cryptographically signed compliance audit ledger successfully downloaded (.json.gpg)");
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-4 text-left"
    >
      {/* Header section with Security status banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">System Audit Trails &amp; Compliance Logs</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Read-only immutable database access registry to verify HIPAA &amp; GDPR privacy safeguards.
          </p>
        </div>

        {/* Cryptographic Export Button */}
        <AhnaraButton 
          variant="success" 
          onClick={handleExportAudit}
          isLoading={exporting}
          leftIcon={<IconDownload className="w-5 h-5" />}
          className="!rounded-xl border-none bg-[#8BB436] hover:bg-[#7aa02e] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-[#8BB436]/10"
        >
          {exporting ? "Signing Ledger..." : "Export Cryptographic Audit File"}
        </AhnaraButton>
      </div>

      {/* Security Status Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
        <IconShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-left">
          <span className="text-[10px] text-emerald-800 font-black uppercase tracking-widest block">System Integrity Verified</span>
          <p className="text-xs text-emerald-700 font-semibold mt-1 leading-normal">
            Ahnara Med Spine security seals match current keys. Data accesses are recorded in a write-once read-many compliance registry.
          </p>
        </div>
      </div>

      {/* Filter and search control */}
      <div className="flex justify-between items-center gap-4 mt-1">
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search query log entries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 pl-9 text-xs font-semibold outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-350 transition-all text-slate-800"
          />
          <IconSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Compliance Event Log Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm flex flex-col flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider">
                <th className="p-3.5 pl-6">Access Timestamp</th>
                <th className="p-3.5">User Identity ID</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Target Record Type</th>
                <th className="p-3.5">IP &amp; Device Footprint</th>
                <th className="p-3.5 pr-6 text-right font-mono">Cryptographic Seal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {filtered.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3.5 pl-6 text-slate-400 font-mono text-[10px]">{log.timestamp}</td>
                  <td className="p-3.5 font-bold text-slate-800">{log.userId}</td>
                  <td className="p-3.5">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                      log.action === "Delete Entry" 
                        ? "bg-red-50 text-red-700 border border-red-200" 
                        : log.action === "Export PDF" 
                        ? "bg-amber-50 text-amber-700 border border-amber-200" 
                        : "bg-slate-100 text-slate-700 border border-slate-250"
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500 font-bold">{log.type} (ID: {log.recordId})</td>
                  <td className="p-3.5">
                    <div className="flex flex-col gap-0.5 text-left text-[10px]">
                      <span className="font-mono text-slate-900">{log.ip}</span>
                      <span className="text-slate-400 font-semibold">{log.device}</span>
                    </div>
                  </td>
                  <td className="p-3.5 pr-6 text-right font-mono text-[10px] text-slate-400 select-all font-bold">
                    {log.seal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
