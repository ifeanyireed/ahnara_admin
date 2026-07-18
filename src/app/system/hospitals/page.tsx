"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconBuildingHospital, 
  IconPlus, 
  IconCheck, 
  IconX, 
  IconActivity,
  IconShield,
  IconDatabase,
  IconSearch,
  IconAlertTriangle,
  IconHeartbeat,
  IconInfoCircle
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";
import { AhnaraInput } from "@/components/ahnara/AhnaraInput";

export default function SystemHospitalsManager() {
  const [hospitals, setHospitals] = useState([
    { id: "HSP-101", name: "Lagos Central General Hospital", location: "Lagos Mainland, NG", capacity: 150, practitioners: 45, tier: "Enterprise", status: "Active", fhirConnected: true, lastAudit: "10 mins ago" },
    { id: "HSP-102", name: "Grace Outpatient Clinic & Ward", location: "Ikeja, Lagos, NG", capacity: 30, practitioners: 12, tier: "Premium", status: "Active", fhirConnected: true, lastAudit: "1 hour ago" },
    { id: "HSP-103", name: "St. Nicholas Hospital Operations", location: "Lagos Island, NG", capacity: 80, practitioners: 28, tier: "Enterprise", status: "Active", fhirConnected: false, lastAudit: "Never" },
    { id: "HSP-104", name: "Redcare Inpatient Care", location: "Lekki, Lagos, NG", capacity: 20, practitioners: 8, tier: "Free Trial", status: "Pending Verification", fhirConnected: false, lastAudit: "Never" }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newHspName, setNewHspName] = useState("");
  const [newHspLocation, setNewHspLocation] = useState("");
  const [newHspCapacity, setNewHspCapacity] = useState("50");
  const [newHspTier, setNewHspTier] = useState("Premium");

  // Central subscription limits state
  const [subLimits, setSubLimits] = useState({
    freeTrialMaxBeds: 20,
    premiumMaxBeds: 50,
    enterpriseMaxBeds: 500,
    enforcementMode: "Strict Middleware"
  });

  const handleRegisterHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHspName || !newHspLocation) {
      alert("Please fill in all required fields.");
      return;
    }

    const newHsp = {
      id: `HSP-${Math.floor(105 + Math.random() * 900)}`,
      name: newHspName,
      location: newHspLocation,
      capacity: parseInt(newHspCapacity) || 50,
      practitioners: 1,
      tier: newHspTier,
      status: "Active",
      fhirConnected: true,
      lastAudit: "Just Now"
    };

    setHospitals(prev => [...prev, newHsp]);
    setShowAddModal(false);
    setNewHspName("");
    setNewHspLocation("");
    setNewHspCapacity("50");
    setNewHspTier("Premium");
  };

  const handleToggleFHIR = (id: string) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === id) {
        return {
          ...h,
          fhirConnected: !h.fhirConnected,
          lastAudit: !h.fhirConnected ? "Just Now (Sync Complete)" : h.lastAudit
        };
      }
      return h;
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-4 text-left relative"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">Global Hospitals Operations Manager</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Register hospital tenants, manage centralized subscription limits, and audit FHIR registry status.
          </p>
        </div>

        <AhnaraButton 
          variant="primary" 
          onClick={() => setShowAddModal(true)}
          leftIcon={<IconPlus className="w-5 h-5" />}
          className="!rounded-xl bg-[#1E293B] text-white hover:bg-slate-800 text-xs font-black uppercase tracking-wider"
        >
          Register Hospital Tenant
        </AhnaraButton>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        
        {/* LEFT PANEL: Registered Hospitals Directory */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider font-display">Hospital Registry Ledger</h3>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                <IconSearch className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter by name..." 
                  className="bg-transparent border-none text-xs focus:outline-none w-32"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider">
                    <th className="p-3">Hospital / Location</th>
                    <th className="p-3">Limit Tier</th>
                    <th className="p-3 text-center">Bed Capacity</th>
                    <th className="p-3 text-center">Staff Count</th>
                    <th className="p-3 text-center">FHIR Synced</th>
                    <th className="p-3">Audit Log</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((hsp) => (
                    <tr key={hsp.id} className="border-b border-slate-50 hover:bg-slate-50/40 transition-colors">
                      <td className="p-3 font-semibold">
                        <div className="flex flex-col">
                          <span className="text-slate-800 font-bold">{hsp.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{hsp.location} • ID: {hsp.id}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                          hsp.tier === "Enterprise" 
                            ? "bg-purple-50 text-purple-700 border border-purple-100" 
                            : hsp.tier === "Premium"
                              ? "bg-sky-50 text-sky-700 border border-sky-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          {hsp.tier}
                        </span>
                      </td>
                      <td className="p-3 text-center font-bold text-slate-700">{hsp.capacity}</td>
                      <td className="p-3 text-center font-semibold text-slate-600">{hsp.practitioners} staff</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleToggleFHIR(hsp.id)}
                          className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center border transition-all cursor-pointer ${
                            hsp.fhirConnected 
                              ? "bg-green-50 border-green-200 text-green-600" 
                              : "bg-slate-100 border-slate-200 text-slate-400"
                          }`}
                        >
                          <IconCheck className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="p-3 text-slate-500 font-medium">{hsp.lastAudit}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              alert(`Auditing cryptographic Spine signature registry for ${hsp.name}...`);
                            }}
                            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 font-bold transition-all cursor-pointer"
                            title="Verify Signatures"
                          >
                            <IconShield className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AhnaraCard>
        </div>

        {/* RIGHT PANEL: Centrally Managed Subscription Limits */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          {/* Subscription Limits Configuration Box */}
          <AhnaraCard className="bg-[#1E293B] border border-slate-800 p-6 text-white flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-amber-400 border-b border-slate-800 pb-3">
              <IconBuildingHospital className="w-6 h-6" />
              <div className="text-left">
                <h3 className="font-extrabold text-xs uppercase tracking-wider">Subscription Limits</h3>
                <span className="text-[9px] font-bold text-slate-400">Centrally Managed System</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex gap-3 text-left">
              <IconInfoCircle className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col text-[11px] leading-normal text-slate-350">
                <span className="font-bold text-slate-200">Central Enforcement Rule:</span>
                <p className="mt-0.5">
                  Subscription limits are centrally managed in <code className="font-mono text-amber-400 bg-slate-950 px-1 rounded">SubscriptionHelper.ts</code> and enforced via middleware, overriding legacy database values for consistency.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 text-left pt-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Free Trial Bed Max</label>
                <AhnaraInput
                  type="number"
                  value={subLimits.freeTrialMaxBeds}
                  onChange={(e) => setSubLimits(prev => ({ ...prev, freeTrialMaxBeds: parseInt(e.target.value) || 0 }))}
                  className="bg-slate-900 border-slate-850 text-white rounded-xl py-2 px-3 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Premium Package Bed Max</label>
                <AhnaraInput
                  type="number"
                  value={subLimits.premiumMaxBeds}
                  onChange={(e) => setSubLimits(prev => ({ ...prev, premiumMaxBeds: parseInt(e.target.value) || 0 }))}
                  className="bg-slate-900 border-slate-850 text-white rounded-xl py-2 px-3 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Enterprise Package Bed Max</label>
                <AhnaraInput
                  type="number"
                  value={subLimits.enterpriseMaxBeds}
                  onChange={(e) => setSubLimits(prev => ({ ...prev, enterpriseMaxBeds: parseInt(e.target.value) || 0 }))}
                  className="bg-slate-900 border-slate-850 text-white rounded-xl py-2 px-3 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Enforcement Mode</span>
                <span className="text-xs font-black text-green-400 uppercase tracking-widest">{subLimits.enforcementMode}</span>
              </div>

              <AhnaraButton
                variant="primary"
                onClick={() => {
                  alert("Central subscription limits updated successfully in SubscriptionHelper.ts registry context.");
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-2.5 mt-2 font-bold text-xs uppercase"
              >
                Sync Limits Code Registry
              </AhnaraButton>
            </div>
          </AhnaraCard>

          {/* Spine FHIR Interop Hub Box */}
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-3 text-left">
            <div className="flex items-center gap-2 text-indigo-900">
              <IconDatabase className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Spine Interop Observatory</h3>
            </div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Global synchronization status of active hospital tenants to the central health observatory.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Total Active Hospital Synced:</span>
                <span className="text-indigo-600 font-black">2 of 4</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-1/2" />
              </div>
            </div>
          </AhnaraCard>

        </div>

      </div>

      {/* Register Tenant Modal Overlay */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-[#0D090C]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-3xl border border-slate-200/60 p-8 shadow-2xl flex flex-col gap-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Register Hospital Tenant</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRegisterHospital} className="flex flex-col gap-4">
                <AhnaraInput
                  label="Hospital Tenant Name"
                  placeholder="e.g. St. Nicholas General Ward"
                  value={newHspName}
                  onChange={(e) => setNewHspName(e.target.value)}
                  required
                />

                <AhnaraInput
                  label="Geographic Location / Region"
                  placeholder="e.g. Lagos Island, NG"
                  value={newHspLocation}
                  onChange={(e) => setNewHspLocation(e.target.value)}
                  required
                />

                <AhnaraInput
                  label="Allocated Bed Capacity"
                  type="number"
                  value={newHspCapacity}
                  onChange={(e) => setNewHspCapacity(e.target.value)}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Package Subscription Tier</label>
                  <select
                    value={newHspTier}
                    onChange={(e) => setNewHspTier(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#0089C1] transition-colors"
                  >
                    <option value="Free Trial">Free Trial (Max 20 beds)</option>
                    <option value="Premium">Premium (Max 50 beds)</option>
                    <option value="Enterprise">Enterprise (Max 500 beds)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3.5 bg-amber-50/65 border border-amber-100 p-3 rounded-2xl text-[11px] leading-normal text-amber-850 mt-1">
                  <IconAlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p>
                    All new hospital registrations automatically connect to the Ministry FHIR Registry Spine Observatory for compliance reporting.
                  </p>
                </div>

                <AhnaraButton
                  type="submit"
                  variant="primary"
                  className="w-full bg-[#1E293B] hover:bg-slate-800 text-white py-3 rounded-xl mt-2 font-bold uppercase tracking-wider text-xs"
                >
                  Confirm Registration
                </AhnaraButton>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
