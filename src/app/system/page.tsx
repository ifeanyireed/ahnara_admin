"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconSettings, 
  IconCreditCard, 
  IconPlus, 
  IconCheck, 
  IconX, 
  IconUser,
  IconShield,
  IconClock
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";
import { AhnaraInput } from "@/components/ahnara/AhnaraInput";

export default function TenantBillingManager() {
  const [tenants, setTenants] = useState([
    { id: 1, name: "AXA Health Nigeria", model: "Per-User License", workspaces: ["Mama", "Kids", "Seniors", "Circle", "Market", "AI"], billing: "$4,250 / mo", status: "Paid" },
    { id: 2, name: "Lagos State Primary Health Board", model: "Grant Funded", workspaces: ["Mama", "Kids", "Home", "Dispatch", "Insights"], billing: "$0 (Grant)", status: "Active" },
    { id: 3, name: "Leadway Assurance", model: "Per-User License", workspaces: ["Mama", "Lady", "Consult", "Provider", "Hospital"], billing: "$2,890 / mo", status: "Unpaid" }
  ]);

  const [transactions, setTransactions] = useState([
    { date: "2026-07-09", ref: "TXN-809-122", amount: "$4,250.00", tenant: "AXA Health", status: "Successful" },
    { date: "2026-07-08", ref: "TXN-712-401", amount: "$2,890.00", tenant: "Leadway Assurance", status: "Pending" }
  ]);

  const [showB2BModal, setShowB2BModal] = useState(false);
  const [b2bName, setB2bName] = useState("");
  const [b2bDomain, setB2bDomain] = useState("");
  const [b2bCode, setB2bCode] = useState("");

  const handleCreateB2B = (e: React.FormEvent) => {
    e.preventDefault();
    if (!b2bName || !b2bDomain || !b2bCode) {
      alert("Please fill in all fields.");
      return;
    }
    const newTenant = {
      id: tenants.length + 1,
      name: b2bName,
      model: "B2B Per-User",
      workspaces: ["Mama", "Kids", "AI"],
      billing: "$1,200 / mo",
      status: "Paid"
    };
    setTenants(prev => [...prev, newTenant]);
    setShowB2BModal(false);
    setB2bName("");
    setB2bDomain("");
    setB2bCode("");
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
          <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">Global Tenant &amp; Billing Manager</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Track pricing tiers, monitor B2B partner domains, and observe monthly transaction pipelines.
          </p>
        </div>

        <AhnaraButton 
          variant="primary" 
          onClick={() => {
            setB2bCode("AXA-" + Math.floor(100 + Math.random() * 900) + "-LINK");
            setShowB2BModal(true);
          }}
          leftIcon={<IconPlus className="w-5 h-5" />}
          className="!rounded-xl bg-[#1E293B] text-white hover:bg-slate-800 text-xs font-black uppercase tracking-wider"
        >
          Add B2B Partner
        </AhnaraButton>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        
        {/* LEFT PANEL: Tenant accounts ledger (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider font-display">Tenant Accounts Ledger</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider">
                    <th className="p-3">Tenant Account</th>
                    <th className="p-3">Pricing Plan</th>
                    <th className="p-3">Active Workspaces</th>
                    <th className="p-3 text-center">Billing amount</th>
                    <th className="p-3 text-right">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                  {tenants.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-extrabold text-slate-900 text-sm">{t.name}</td>
                      <td className="p-3 text-slate-500">{t.model}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {t.workspaces.map((w, idx) => (
                            <span key={idx} className="bg-[#DDEEF3] text-[#0089C1] px-1 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                              {w}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-center font-black text-slate-800">{t.billing}</td>
                      <td className="p-3 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          t.status === "Paid" || t.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-250" : "bg-red-50 text-red-750 border border-red-250"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AhnaraCard>
        </div>

        {/* RIGHT PANEL: Transaction logs (4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider font-display">Transaction Pipeline</h3>
            </div>

            <div className="flex flex-col gap-3">
              {transactions.map((txn, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5 text-xs text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-850">{txn.tenant}</span>
                    <span className="text-[9px] text-slate-400 font-semibold">{txn.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 font-bold">
                    <span>Reference: <span className="font-mono text-slate-800 select-all">{txn.ref}</span></span>
                    <span className="text-slate-900 font-black">{txn.amount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`w-2 h-2 rounded-full ${txn.status === "Successful" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">{txn.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>

      </div>

      {/* B2B Wizard Modal */}
      <AnimatePresence>
        {showB2BModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowB2BModal(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-0 m-auto max-w-md h-fit bg-white rounded-3xl z-50 p-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-black text-slate-900 text-base">Setup B2B Insurer</h3>
                <button 
                  onClick={() => setShowB2BModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-150 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateB2B} className="flex flex-col gap-4">
                <AhnaraInput
                  label="Partner Company Name"
                  value={b2bName}
                  onChange={(e) => setB2bName(e.target.value)}
                  placeholder="e.g. AXA Mansard"
                  required
                />
                
                <AhnaraInput
                  label="Whitelisted Email Domain"
                  value={b2bDomain}
                  onChange={(e) => setB2bDomain(e.target.value)}
                  placeholder="e.g. axamansard.com"
                  required
                />

                <AhnaraInput
                  label="Subscriber Onboarding Match Code"
                  value={b2bCode}
                  onChange={(e) => setB2bCode(e.target.value)}
                  placeholder="AXA-901-LINK"
                  required
                  readOnly
                />

                <AhnaraButton 
                  type="submit" 
                  variant="primary" 
                  className="w-full bg-[#1E293B] hover:bg-slate-800 text-white rounded-xl font-bold py-3 mt-2"
                >
                  Save Partner Contract
                </AhnaraButton>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
