"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  IconDatabase, 
  IconCheck, 
  IconAlertTriangle, 
  IconActivity, 
  IconFlame, 
  IconShieldCheck,
  IconTerminal
} from "@tabler/icons-react";
import { AhnaraCard } from "@/components/ahnara/AhnaraCard";
import { AhnaraButton } from "@/components/ahnara/AhnaraButton";

export default function FhirIntegrationEngine() {
  const [fhirEndpoint, setFhirEndpoint] = useState("https://spine.ahnara.com/fhir/v4");
  const [clientId, setClientId] = useState("nara-app-spine-client-01");
  const [tokenStatus, setTokenStatus] = useState("Active - Token Expires in 4hr");

  const [mappings, setMappings] = useState([
    { local: "user_email", fhir: "Patient.telecom.value", resource: "Patient" },
    { local: "gestation_week", fhir: "Observation.valueQuantity.value", resource: "Observation" },
    { local: "baby_birth_weight", fhir: "Observation.valueQuantity.value", resource: "Observation" },
    { local: "apgar_score", fhir: "Observation.component.valueInteger", resource: "Observation" },
    { local: "maternal_blood_pressures", fhir: "Observation.component.valueString", resource: "Observation" },
    { local: "birth_plan_backup_hosp", fhir: "CarePlan.activity.detail.location", resource: "CarePlan" }
  ]);

  const [selectedMapping, setSelectedMapping] = useState<any>(mappings[0]);

  const [errorLogs, setErrorLogs] = useState([
    { timestamp: "2026-07-09 07:44:12", status: 500, message: "FHIR Server Timeout on Patient resource search", payload: '{"resourceType":"OperationOutcome","issue":[{"severity":"error","code":"timeout"}]}' },
    { timestamp: "2026-07-09 06:12:49", status: 400, message: "Bad Request: Missing Observation.status parameter", payload: '{"resourceType":"OperationOutcome","issue":[{"severity":"error","code":"value","diagnostics":"Missing status"}]}' }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col gap-4 text-left"
    >
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight text-display">EHR Integration &amp; FHIR Engine</h2>
        <p className="text-sm text-slate-500 font-semibold mt-1">
          Sync local database fields with international HL7 FHIR standards and monitor interoperability health.
        </p>
      </div>

      {/* Latency and API Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <AhnaraCard className="bg-white border border-slate-200/50 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Spine Response Latency</span>
            <span className="text-2xl font-black text-slate-850 text-display block mt-1">118 ms</span>
            <span className="text-xs text-emerald-600 font-bold mt-1 block">Optimal Sync Speed</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <IconActivity className="w-5 h-5" />
          </div>
        </AhnaraCard>

        <AhnaraCard className="bg-white border border-slate-200/50 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sync Success Rate</span>
            <span className="text-2xl font-black text-slate-850 text-display block mt-1">99.85%</span>
            <span className="text-xs text-emerald-600 font-bold mt-1 block">No major packet drops</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <IconShieldCheck className="w-5 h-5" />
          </div>
        </AhnaraCard>

        <AhnaraCard className="bg-white border border-slate-200/50 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sync Load Queue</span>
            <span className="text-2xl font-black text-slate-850 text-display block mt-1">0 Pending</span>
            <span className="text-xs text-slate-400 font-bold mt-1 block">Real-time WebSockets Sync</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <IconFlame className="w-5 h-5" />
          </div>
        </AhnaraCard>
      </div>

      {/* Split-pane Developer Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        
        {/* LEFT COLUMN: Endpoint Config and Mappings list (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          
          {/* Server Config */}
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">FHIR Server Connection</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
              <div className="flex flex-col gap-2">
                <span>FHIR EndPoint URL</span>
                <input 
                  type="text" 
                  value={fhirEndpoint}
                  onChange={(e) => setFhirEndpoint(e.target.value)}
                  className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span>Client Credentials Identifier</span>
                <input 
                  type="text" 
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-[#F1F5F9]/50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:bg-white font-semibold text-slate-800"
                />
              </div>
            </div>
          </AhnaraCard>

          {/* Mappings Table */}
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider font-display">Data-Field Mapping Schema</h3>
            </div>

            <div className="overflow-y-auto max-h-[220px] scrollbar-none">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider">
                    <th className="p-2.5 pl-4">Local DB Field</th>
                    <th className="p-2.5">Mapped FHIR Resource</th>
                    <th className="p-2.5">FHIR Schema Target</th>
                    <th className="p-2.5 pr-4 text-right">View Mapper</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                  {mappings.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-2.5 pl-4 font-mono font-bold text-[#0089C1]">{m.local}</td>
                      <td className="p-2.5">
                        <span className="bg-indigo-50 border border-indigo-150 text-indigo-700 px-1.5 py-0.5 rounded font-black text-[9px] uppercase tracking-wider">
                          {m.resource}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-slate-500 text-[10px]">{m.fhir}</td>
                      <td className="p-2.5 pr-4 text-right">
                        <button 
                          onClick={() => setSelectedMapping(m)}
                          className="bg-slate-100 hover:bg-slate-200 font-bold px-2 py-1 rounded text-[10px]"
                        >
                          Code JSON
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AhnaraCard>
        </div>

        {/* RIGHT COLUMN: JSON Mapper Code Box (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          
          {/* JSON Data Mapper */}
          <AhnaraCard className="flex-1 bg-slate-900 border border-slate-700 text-slate-300 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-[#0089C1] uppercase tracking-wider flex items-center gap-1.5">
                <IconTerminal className="w-5 h-5" />
                JSON Data Schema Mapper
              </h3>
            </div>

            {/* Mapped JSON Code Viewer */}
            <div className="flex-1 font-mono text-[10px] bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-y-auto leading-relaxed select-all">
              <pre className="text-left">{`{
  "resourceType": "${selectedMapping.resource}",
  "id": "obs-sample-09",
  "status": "final",
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "883-9",
        "display": "${selectedMapping.local}"
      }
    ]
  },
  "subject": {
    "reference": "Patient/mock-id"
  },
  "valueQuantity": {
    "value": "DatabaseValue",
    "system": "http://unitsofmeasure.org",
    "target": "${selectedMapping.fhir}"
  }
}`}</pre>
            </div>
          </AhnaraCard>

          {/* Error Logs */}
          <AhnaraCard className="bg-white border border-slate-200/50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider font-display">Integration Error logs</h3>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-[140px] scrollbar-none text-[10px]">
              {errorLogs.map((log, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-red-250 bg-red-50/60 text-slate-700 text-left flex flex-col gap-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-red-650 font-black">Status: {log.status}</span>
                    <span className="text-slate-400 font-semibold">{log.timestamp}</span>
                  </div>
                  <p className="font-bold text-slate-800 leading-tight">{log.message}</p>
                </div>
              ))}
            </div>
          </AhnaraCard>
        </div>

      </div>
    </motion.div>
  );
}
