"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconUserCheck, 
  IconSearch, 
  IconCheck, 
  IconX, 
  IconShieldCheck, 
  IconAlertTriangle, 
  IconInfoCircle 
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";

export default function ProvidersDirectory() {
  const [providers, setProviders] = useState([
    { id: 1, name: "Health Center A", tier: "Tier 1 - Primary Care", midwives: 8, pediatricians: 3, geriatricians: 2, status: "Verified", certs: ["MOH-Lic-2024", "WHO-ANC-Cert"], telehealth: true, vaccines: true, prescriptions: false, elderPlans: true },
    { id: 2, name: "St. Jude Clinic", tier: "Tier 2 - General Clinic", midwives: 4, pediatricians: 2, geriatricians: 1, status: "Pending Review", certs: ["MOH-Lic-2025"], telehealth: true, vaccines: false, prescriptions: false, elderPlans: false },
    { id: 3, name: "Prestige Pediatric Hospital", tier: "Tier 3 - Specialist Hub", midwives: 0, pediatricians: 12, geriatricians: 0, status: "Verified", certs: ["MOH-Lic-Ped-22"], telehealth: true, vaccines: true, prescriptions: true, elderPlans: false },
    { id: 4, name: "District Elder Care Hub", tier: "Tier 1 - Primary Care", midwives: 2, pediatricians: 0, geriatricians: 6, status: "Suspended", certs: ["MOH-Lic-Ger-09"], telehealth: false, vaccines: false, prescriptions: false, elderPlans: true }
  ]);

  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  const filtered = providers.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleTelehealthToggle = (id: number) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, telehealth: !p.telehealth } : p));
    if (selectedProvider && selectedProvider.id === id) {
      setSelectedProvider((prev: any) => ({ ...prev, telehealth: !prev.telehealth }));
    }
  };

  const handleVaccinesToggle = (id: number) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, vaccines: !p.vaccines } : p));
    if (selectedProvider && selectedProvider.id === id) {
      setSelectedProvider((prev: any) => ({ ...prev, vaccines: !prev.vaccines }));
    }
  };

  const handlePrescriptionsToggle = (id: number) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, prescriptions: !p.prescriptions } : p));
    if (selectedProvider && selectedProvider.id === id) {
      setSelectedProvider((prev: any) => ({ ...prev, prescriptions: !prev.prescriptions }));
    }
  };

  const handleVerify = (id: number, status: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    if (selectedProvider && selectedProvider.id === id) {
      setSelectedProvider((prev: any) => ({ ...prev, status }));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-5 text-left relative"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">Clinic &amp; Provider Registry</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Verify provider credentials, onboard clinics, and audit practice privileges.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search provider name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 pl-9 text-xs font-semibold outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all text-slate-800"
          />
          <IconSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider">
                <th className="p-4 pl-6">Facility Name</th>
                <th className="p-4">Classification Tier</th>
                <th className="p-4 text-center">Staff Count</th>
                <th className="p-4">Status</th>
                <th className="p-4">Privileges Configured</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-6 font-extrabold text-slate-900 text-sm">{p.name}</td>
                  <td className="p-4 text-slate-500">{p.tier}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <span className="bg-[#E8F3CE] text-[#608216] px-1.5 py-0.5 rounded font-black text-[9px]">M: {p.midwives}</span>
                      <span className="bg-[#DDEEF3] text-[#0089C1] px-1.5 py-0.5 rounded font-black text-[9px]">P: {p.pediatricians}</span>
                      <span className="bg-amber-50 border border-amber-250 text-amber-700 px-1.5 py-0.5 rounded font-black text-[9px]">G: {p.geriatricians}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      p.status === "Verified" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : p.status === "Pending Review" 
                        ? "bg-amber-50 text-amber-700 border border-amber-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${p.telehealth ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-400"}`}>Telehealth</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${p.vaccines ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-400"}`}>Vaccines</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${p.prescriptions ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-400"}`}>Prescribe</span>
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button 
                      onClick={() => setSelectedProvider(p)}
                      className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Audit Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Slide Drawer */}
      <AnimatePresence>
        {selectedProvider && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProvider(null)}
              className="fixed inset-0 bg-black z-40"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 max-w-md w-full bg-white z-50 shadow-2xl p-6 flex flex-col gap-6"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Auditing Details</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1 leading-tight">{selectedProvider.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProvider(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              {/* Credentials Audit File list */}
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-2">Verification Uploaded Certificates</span>
                  <div className="flex flex-col gap-2">
                    {selectedProvider.certs.map((c: string, i: number) => (
                      <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between font-bold">
                        <span>{c}.pdf</span>
                        <span className="text-[#0089C1] hover:underline cursor-pointer">Preview File</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privileges Toggles */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Clinic Practice Privileges</span>
                  
                  {/* Telehealth Toggle */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div>
                      <span className="font-extrabold text-slate-800">Telehealth Overrides</span>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Permit remote audio/video clinical visits</p>
                    </div>
                    <button 
                      onClick={() => handleTelehealthToggle(selectedProvider.id)}
                      className={`w-12 h-6.5 rounded-full p-1 transition-all ${selectedProvider.telehealth ? "bg-[#8BB436] flex justify-end" : "bg-slate-200 flex justify-start"}`}
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>

                  {/* Vaccines Toggle */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div>
                      <span className="font-extrabold text-slate-800">Vaccine Privilege</span>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Permit Gavi vaccine storage &amp; audits</p>
                    </div>
                    <button 
                      onClick={() => handleVaccinesToggle(selectedProvider.id)}
                      className={`w-12 h-6.5 rounded-full p-1 transition-all ${selectedProvider.vaccines ? "bg-[#8BB436] flex justify-end" : "bg-slate-200 flex justify-start"}`}
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>

                  {/* Prescriptions Toggle */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div>
                      <span className="font-extrabold text-slate-800">Digital Prescription Exchange</span>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Permit syncing client prescription logs</p>
                    </div>
                    <button 
                      onClick={() => handlePrescriptionsToggle(selectedProvider.id)}
                      className={`w-12 h-6.5 rounded-full p-1 transition-all ${selectedProvider.prescriptions ? "bg-[#8BB436] flex justify-end" : "bg-slate-200 flex justify-start"}`}
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                </div>

                {/* Verification Actions */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5">Modify Facility Status</span>
                  <div className="grid grid-cols-2 gap-2">
                    <AhnaraButton 
                      variant="success" 
                      onClick={() => handleVerify(selectedProvider.id, "Verified")}
                      leftIcon={<IconCheck className="w-4 h-4" />}
                      className="!rounded-xl border-none bg-[#8BB436] text-white font-extrabold text-xs"
                    >
                      Verify Clinic
                    </AhnaraButton>
                    <AhnaraButton 
                      variant="danger" 
                      onClick={() => handleVerify(selectedProvider.id, "Suspended")}
                      leftIcon={<IconX className="w-4 h-4" />}
                      className="!rounded-xl border-none bg-red-600 text-white font-extrabold text-xs"
                    >
                      Suspend Facility
                    </AhnaraButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
