"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  IconCheck, 
  IconArrowRight, 
  IconArrowLeft, 
  IconQrcode, 
  IconInfoCircle,
  IconShieldCheck,
  IconAlertTriangle,
  IconSparkles,
  IconActivity,
  IconDatabase,
  IconBriefcase
} from "@tabler/icons-react";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";
import { useAuth } from "@/components/ahnara/AuthContext";
import { getAuthToken } from "@/lib/api";

export default function AdminOnboardingPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  // Step 0: Admin Workspace profile
  const [profileType, setProfileType] = useState<"country" | "system" | null>(null);
  const [currentStep, setCurrentStep] = useState(0); 

  // ==========================================
  // COUNTRY PORTAL STATE
  // ==========================================
  const [ministryName, setMinistryName] = useState("Ministry of Health");
  const [regionId, setRegionId] = useState("MOH-NG-721");
  const [observeFocus, setObserveFocus] = useState<"Maternal" | "Pediatric" | "Elder" | "All">("All");
  
  const [privilegeToggles, setPrivilegeToggles] = useState({
    telehealth: true,
    vaccineAdmin: true,
    prescriptions: false,
    elderPlans: true,
  });

  const [sosSyncCode, setSosSyncCode] = useState("");
  const [sosSynced, setSosSynced] = useState(false);

  // ==========================================
  // SYSTEM CONSOLE STATE
  // ==========================================
  const [tenantName, setTenantName] = useState("Ahnara Spine (Primary)");
  const [fhirEndpoint, setFhirEndpoint] = useState("https://spine.ahnara.com/fhir/v4");
  const [syncFrequency, setSyncFrequency] = useState("10 minutes");
  
  const [fhirResources, setFhirResources] = useState({
    Patient: true,
    Observation: true,
    Encounter: true,
    CarePlan: false,
    Immunization: true
  });

  const [dbEncryptionKey, setDbEncryptionKey] = useState("");
  const [complianceSealsVerified, setComplianceSealsVerified] = useState(true);

  // ==========================================
  // INITIALIZATIONS
  // ==========================================
  useEffect(() => {
    // Generate mock codes
    const codeC = "NARA-SOS-" + Math.floor(100 + Math.random() * 900) + "-" + Math.floor(100 + Math.random() * 900);
    setSosSyncCode(codeC);

    const codeS = "AES256-SEAL-" + Math.floor(1000 + Math.random() * 9000) + "-INTEGRITY";
    setDbEncryptionKey(codeS);
  }, []);

  // Pre-populate based on role
  useEffect(() => {
    if (user?.role === "SUPER") {
      setProfileType("system");
    } else if (user?.role === "ADMIN") {
      setProfileType("country");
    }
  }, [user]);

  const togglePrivilege = (key: keyof typeof privilegeToggles) => {
    setPrivilegeToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFhirResource = (key: keyof typeof fhirResources) => {
    setFhirResources(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!profileType) {
        alert("Please select a workspace profile to continue.");
        return;
      }
      setCurrentStep(1);
      return;
    }

    if (profileType === "country") {
      if (currentStep === 1 && !ministryName.trim()) {
        alert("Please enter the Ministry / NGO Name.");
        return;
      }
    } else {
      if (currentStep === 1 && !tenantName.trim()) {
        alert("Please enter the Tenant Database Name.");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = () => {
    // Update role
    const updatedRole = profileType === "country" ? "ADMIN" : "SUPER";
    if (user) {
      const token = getAuthToken() || "mock-token";
      login(token, {
        ...user,
        role: updatedRole
      });
    }

    if (profileType === "country") {
      const onboardingData = {
        ministryName,
        regionId,
        observeFocus,
        privileges: privilegeToggles,
        sosSyncCode,
        sosSynced,
        setupCompleted: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("admin_country_data", JSON.stringify(onboardingData));
      router.push("/country");
    } else {
      const onboardingData = {
        tenantName,
        fhirEndpoint,
        syncFrequency,
        resources: fhirResources,
        dbEncryptionKey,
        complianceSealsVerified,
        setupCompleted: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("admin_super_data", JSON.stringify(onboardingData));
      router.push("/system");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8EFF4] text-[#0D090C] font-sans flex flex-col items-center justify-center p-4 md:p-8">
      {/* Container Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Header Branding */}
        <div className="px-6 pt-8 pb-4 text-center border-b border-slate-100 bg-[#E8F3CE]/20 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#D4F475] flex items-center justify-center mb-3 shadow-md">
            <img src="/logo.png" alt="Ahnara Logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#0D090C] text-display">Ahnara Admin</h1>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Administrative observatories &amp; console</p>
        </div>

        {/* Multi-step progress indicator */}
        {currentStep > 0 && (
          <div className="px-8 pt-6 flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2.5">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      currentStep === step 
                        ? "bg-[#1E293B] text-white ring-4 ring-slate-200"
                        : currentStep > step 
                        ? "bg-[#8BB436] text-white"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {currentStep > step ? <IconCheck className="w-4 h-4" /> : step}
                  </div>
                  <span className={`text-xs font-bold hidden sm:inline ${
                    currentStep === step ? "text-[#0D090C]" : "text-slate-400"
                  }`}>
                    {profileType === "country" ? (
                      <>
                        {step === 1 && "Identity"}
                        {step === 2 && "Privileges"}
                        {step === 3 && "SOS Dispatch"}
                      </>
                    ) : (
                      <>
                        {step === 1 && "Spine & FHIR"}
                        {step === 2 && "FHIR Resources"}
                        {step === 3 && "Audit & Encryption"}
                      </>
                    )}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 rounded-full transition-all duration-300 ${
                    currentStep > step ? "bg-[#8BB436]" : "bg-slate-100"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 md:p-8 flex-1">
          <AnimatePresence mode="wait">
            
            {/* STEP 0: WORKSPACE SELECTOR */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight text-display">Choose Admin Workspace</h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Select the admin role you wish to configure.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Country Portal */}
                  <button
                    onClick={() => setProfileType("country")}
                    className={`p-6 rounded-2xl border text-left flex flex-col gap-4 transition-all duration-300 ${
                      profileType === "country"
                        ? "bg-[#E8F3CE]/45 border-[#CDE0A4] ring-2 ring-[#8BB436]"
                        : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 hover:border-slate-350"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      profileType === "country" ? "bg-[#8BB436] text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      <IconBriefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-tight">Country Portal</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-relaxed">
                        For health ministries, NGO coordinators, and regional boards. Audit credentials, track SOS emergencies, and compile population KPIs.
                      </p>
                    </div>
                  </button>

                  {/* System Console */}
                  <button
                    onClick={() => setProfileType("system")}
                    className={`p-6 rounded-2xl border text-left flex flex-col gap-4 transition-all duration-300 ${
                      profileType === "system"
                        ? "bg-[#DDEEF3]/65 border-sky-350 ring-2 ring-[#0089C1]"
                        : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 hover:border-slate-350"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      profileType === "system" ? "bg-[#0089C1] text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      <IconDatabase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-tight">System Console</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-relaxed">
                        For system developers and super administrators. Configure FHIR database server links, audit tenant accounts, and monitor compliance logs.
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* COUNTRY PORTAL SCREENS */}
            {/* ========================================== */}
            {profileType === "country" && currentStep === 1 && (
              <motion.div
                key="cStep1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-5"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight text-display">Ministry &amp; NGO Identity</h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Enter details of your organization and observatories region scope.
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Organization / Ministry Name
                    </label>
                    <input
                      type="text"
                      value={ministryName}
                      onChange={(e) => setMinistryName(e.target.value)}
                      placeholder="e.g. Ministry of Health, Nigeria"
                      className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Regional observatory ID
                      </label>
                      <input
                        type="text"
                        value={regionId}
                        onChange={(e) => setRegionId(e.target.value)}
                        placeholder="e.g. MOH-NG-721"
                        className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Target Observational Focus
                      </label>
                      <select
                        value={observeFocus}
                        onChange={(e: any) => setObserveFocus(e.target.value)}
                        className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-800"
                      >
                        <option value="All">All Core Indicators</option>
                        <option value="Maternal">Maternal &amp; Prenatal Only</option>
                        <option value="Pediatric">Newborn &amp; Pediatric Only</option>
                        <option value="Elder">Geriatric Care Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {profileType === "country" && currentStep === 2 && (
              <motion.div
                key="cStep2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-5"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight text-display">Clinical Privileges Registry</h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Manage active clinical privilege overrides across regional clinics in your ledger.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 text-left">
                  {[
                    { key: "telehealth", label: "Permit Telehealth and Remote Consultation" },
                    { key: "vaccineAdmin", label: "Permit Vaccine Storage and Administration" },
                    { key: "prescriptions", label: "Permit Writing & Syncing Digital Prescriptions" },
                    { key: "elderPlans", label: "Permit Creating Geriatric Care Plans" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => togglePrivilege(item.key as keyof typeof privilegeToggles)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                        privilegeToggles[item.key as keyof typeof privilegeToggles]
                          ? "bg-[#E8F3CE]/45 border-[#CDE0A4] text-[#608216]"
                          : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
                        privilegeToggles[item.key as keyof typeof privilegeToggles]
                          ? "bg-[#8BB436] text-white"
                          : "border border-slate-300 bg-white"
                      }`}>
                        {privilegeToggles[item.key as keyof typeof privilegeToggles] && <IconCheck className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm font-semibold leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-2 text-left">
                  <div className="bg-[#DDEEF3] border border-slate-300/30 rounded-2xl p-4 flex items-start gap-3">
                    <IconShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#0089C1] uppercase tracking-wide">Registry Rules Configured</span>
                      <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                        These clinical flags will automatically bind as privileges when onboarding new clinics in the Ledger Directory.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {profileType === "country" && currentStep === 3 && (
              <motion.div
                key="cStep3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight text-display">Emergency SOS Dispatch Sync</h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Connect local ambulance routing coordinates to central ministry observational dashboards using NARA Link.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50/50 border border-slate-200/60 p-6 rounded-2xl">
                  <div className="relative bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <div className="w-32 h-32 flex items-center justify-center bg-slate-100 rounded-xl border border-dashed border-slate-300">
                      <IconQrcode className="w-20 h-20 text-[#0089C1] opacity-75" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-black tracking-widest mt-2 uppercase">Scan to Link</span>
                  </div>

                  <div className="flex-1 text-left">
                    <span className="text-[10px] font-bold text-[#0089C1] uppercase tracking-wider">Sync Activation Code</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono font-black text-xl text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2 select-all shadow-sm">
                        {sosSyncCode}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold mt-3.5 leading-relaxed">
                      Share this code with dispatch coordinators to map live ambulance ETAs and hospital emergency bed counts.
                    </p>

                    <button 
                      onClick={() => setSosSynced(prev => !prev)}
                      className={`mt-4 inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                        sosSynced 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                          : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${sosSynced ? "bg-emerald-500 text-white" : "bg-slate-200"}`}>
                        {sosSynced && <IconCheck className="w-2.5 h-2.5" />}
                      </div>
                      {sosSynced ? "Emergency Dispatch Synced" : "Mark as Synced (Simulate)"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ========================================== */}
            {/* SYSTEM CONSOLE SCREENS */}
            {/* ========================================== */}
            {profileType === "system" && currentStep === 1 && (
              <motion.div
                key="sStep1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-5"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight text-display">FHIR Core Server link</h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Configure base integration settings for the interoperability data-spine.
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Spine Tenant Database Name
                    </label>
                    <input
                      type="text"
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                      placeholder="e.g. Ahnara Spine (Primary)"
                      className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        FHIR Base endpoint URL
                      </label>
                      <input
                        type="text"
                        value={fhirEndpoint}
                        onChange={(e) => setFhirEndpoint(e.target.value)}
                        placeholder="https://spine.ahnara.com/fhir/v4"
                        className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Database Sync Frequency
                      </label>
                      <select
                        value={syncFrequency}
                        onChange={(e) => setSyncFrequency(e.target.value)}
                        className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-800"
                      >
                        <option value="Real-time">Real-time WebSockets</option>
                        <option value="1 minute">Every 1 Minute</option>
                        <option value="10 minutes">Every 10 Minutes</option>
                        <option value="1 hour">Every 1 Hour</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {profileType === "system" && currentStep === 2 && (
              <motion.div
                key="sStep2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-5"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight text-display">Active FHIR Resources Schema</h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Select local data fields that will automatically map to HL7 FHIR specs.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 text-left">
                  {[
                    { key: "Patient", label: "Patient (Demographics, Biological sex, DOB)" },
                    { key: "Observation", label: "Observation (Vitals, Lab tests, Kicks counts)" },
                    { key: "Encounter", label: "Encounter (Appointments, Admissions triage)" },
                    { key: "CarePlan", label: "CarePlan (Maternal birth plan, Elder recovery schedules)" },
                    { key: "Immunization", label: "Immunization (EPI Vaccine coverage records)" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => toggleFhirResource(item.key as keyof typeof fhirResources)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                        fhirResources[item.key as keyof typeof fhirResources]
                          ? "bg-[#DDEEF3]/45 border-sky-200 text-[#0089C1]"
                          : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
                        fhirResources[item.key as keyof typeof fhirResources]
                          ? "bg-[#0089C1] text-white"
                          : "border border-slate-300 bg-white"
                      }`}>
                        {fhirResources[item.key as keyof typeof fhirResources] && <IconCheck className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm font-semibold leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {profileType === "system" && currentStep === 3 && (
              <motion.div
                key="sStep3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight text-display">Encryption &amp; Auditing Seals</h2>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    Initialize database compliance seals and verify HIPAA/GDPR immutable transaction trails.
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      System Integrity Cryptographic Seal Key
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={dbEncryptionKey}
                      className="w-full font-mono bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs outline-none select-all font-bold text-slate-700 shadow-sm"
                    />
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                    <IconShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">HIPAA Audit Trails Verified</span>
                      <p className="text-xs text-emerald-700 font-semibold mt-1 leading-relaxed">
                        Data-spine is configured with immutable audit trails. All accesses by users will log cryptographically signed event records.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {currentStep > 0 ? (
            <AhnaraButton 
              variant="outline" 
              onClick={handleBack}
              leftIcon={<IconArrowLeft className="w-4 h-4" />}
              className="!rounded-xl hover:bg-white text-slate-700"
            >
              Back
            </AhnaraButton>
          ) : (
            <div />
          )}

          {currentStep === 0 ? (
            <AhnaraButton 
              variant="primary" 
              onClick={handleNext}
              disabled={!profileType}
              rightIcon={<IconArrowRight className="w-4 h-4" />}
              className="!rounded-xl bg-[#1E293B] hover:bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </AhnaraButton>
          ) : currentStep < 3 ? (
            <AhnaraButton 
              variant="primary" 
              onClick={handleNext}
              rightIcon={<IconArrowRight className="w-4 h-4" />}
              className="!rounded-xl bg-[#1E293B] hover:bg-slate-800 text-white"
            >
              Next Step
            </AhnaraButton>
          ) : (
            <AhnaraButton 
              variant="success" 
              onClick={handleComplete}
              rightIcon={<IconCheck className="w-4 h-4" />}
              className="!rounded-xl bg-[#8BB436] hover:bg-[#7aa02e] border-none text-white font-bold"
            >
              Initialize Workspace
            </AhnaraButton>
          )}
        </div>

      </div>
    </div>
  );
}
