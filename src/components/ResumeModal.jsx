import React, { useState } from 'react';
import { X, Printer, Download, Copy, CheckCircle2, Mail, Phone, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import { personalInfo, verifiedExperience, education, verifiedAchievements, skillCategories } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose = () => {} }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
NUNE SATYA SAI KUMAR
Hyderabad, India | +91 9849086132 | nsatyasaichowdary1616@gmail.com
linkedin.com/in/nsatyasai | github.com/nsatyasaichowdary1616-debugk

PROFESSIONAL SUMMARY
Data Analyst with 1+ year of experience in building automated ETL pipelines, tuning relational databases, and deploying Generative AI and Agentic AI workflows. Proven track record of reducing query latency by 82%, engineering enterprise RAG retrieval systems over unstructured data, and building executive Power BI dashboards that eliminate manual reporting overhead.

TECHNICAL SKILLS
Data Analytics & BI: SQL (MySQL, PostgreSQL), Power BI, Tableau, DAX, Advanced Excel, Pandas, NumPy, Scikit-learn, Data Modeling, ETL Pipelines, Query Optimization, Data Quality, KPI Reporting, Business Insights
Generative AI & Agentic AI: LangChain, AutoGen, Agentic AI, Retrieval-Augmented Generation (RAG), Vector DB, HuggingFace, Prompt Engineering, GenAI
Core Tools, LLMs & Cloud: Python, ChatGPT, Claude AI, Gemini, AWS (EC2, S3), Git, GitHub, REST APIs

PROFESSIONAL EXPERIENCE
Data Analyst | Vangrove Tech (October 2025 – October 2026, Hyderabad, India)
• Accomplished ingestion and automated transformation of 1.4M+ monthly transactional records with 99.4% data integrity by authoring Python ETL pipelines that systematically handled schema drift and scrubbed duplicate entries.
• Slashed recurring reporting query runtime by 82% (from 4.2 minutes down to 45 seconds) across 1.2M+ records by refactoring complex multi-table JOINs and implementing composite index partitioning.
• Delivered 5 interactive Power BI and Tableau dashboards deployed to cross-functional stakeholders, saving 16 analyst hours weekly through automated cloud data refreshes and DAX modeling.
• Engineered an enterprise Retrieval-Augmented Generation (RAG) assistant indexing 15K+ internal documents into a Vector DB, slashing query lookup time by 75% while eliminating hallucinations via hybrid semantic retrieval.
• Automated anomaly auditing on streaming ledger records by developing a multi-agent system using AutoGen, reducing weekly manual data triage time from 14 hours to 35 minutes.
• Programmed automated data sanitization and retry algorithms that trapped REST API rate-limit dropouts and malformed payloads at ingestion, reducing downstream reporting discrepancies from 8.6% to under 0.5%.

EDUCATION
Bachelor of Technology in Computer Science and Engineering (2021 – 2025)
MLR Institute of Technology (MLRIT), Hyderabad, India | CGPA: 7.34 / 10.0

ACHIEVEMENTS
• BRAIN-O-VISION AWS Hackathon 2023 – 1st Position, MLRIT, Hyderabad: Secured 1st place among competing teams by architecting scalable cloud infrastructure using AWS services and deploying a responsive, highly accessible full-stack web application.
• METALOOP 2023 Hackathon – Winner (Healthcare Domain), MLRIT, Hyderabad: Achieved victory in Healthcare domain by engineering an interactive VR solution in Unity to visualize and interact with molecular structures and spatial dynamics of 20+ pharmaceutical drugs.
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl glass-panel border border-cyan-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl bg-slate-950/95 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase">
              OFFICIAL VERIFIED RESUME DOSSIER
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
              title="Copy plain text"
            >
              {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'COPIED' : 'COPY TEXT'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
              title="Print resume"
            >
              <Printer size={13} />
              <span>PRINT</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-red-400 transition-colors ml-2"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="space-y-8 font-sans text-slate-200">
          
          {/* Header Name & Contact */}
          <div className="text-center space-y-2 border-b border-slate-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wider">
              NUNE SATYA SAI KUMAR
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1">
                <MapPin size={12} className="text-cyan-400" />
                <span>Hyderabad, India</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Phone size={12} className="text-cyan-400" />
                <span>+91 9849086132</span>
              </span>
              <span>•</span>
              <a href="mailto:nsatyasaichowdary1616@gmail.com" className="text-cyan-400 hover:underline">
                nsatyasaichowdary1616@gmail.com
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/nsatyasai" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                linkedin.com/in/nsatyasai
              </a>
              <span>•</span>
              <a href="https://github.com/nsatyasaichowdary1616-debugk" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
                github.com/nsatyasaichowdary1616-debugk
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest uppercase border-b border-slate-800 pb-1 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Data Analyst with 1+ year of experience in building automated ETL pipelines, tuning relational databases, and deploying Generative AI and Agentic AI workflows. Proven track record of reducing query latency by 82%, engineering enterprise RAG retrieval systems over unstructured data, and building executive Power BI dashboards that eliminate manual reporting overhead.
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest uppercase border-b border-slate-800 pb-1 mb-3">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-white">Data Analytics & BI: </span>
                <span className="text-slate-300">SQL (MySQL, PostgreSQL), Power BI, Tableau, DAX, Advanced Excel, Pandas, NumPy, Scikit-learn, Data Modeling, ETL Pipelines, Query Optimization, Data Quality, KPI Reporting, Business Insights</span>
              </div>
              <div>
                <span className="font-semibold text-white">Generative AI & Agentic AI: </span>
                <span className="text-slate-300">LangChain, AutoGen, Agentic AI, Retrieval-Augmented Generation (RAG), Vector DB, HuggingFace, Prompt Engineering, GenAI</span>
              </div>
              <div>
                <span className="font-semibold text-white">Core Tools, LLMs & Cloud: </span>
                <span className="text-slate-300">Python, ChatGPT, Claude AI, Gemini, AWS (EC2, S3), Git, GitHub, REST APIs</span>
              </div>
            </div>
          </div>

          {/* Section: Professional Experience */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest uppercase border-b border-slate-800 pb-1 mb-4">
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-white">
                    Data Analyst <span className="font-normal text-slate-400">| Vangrove Tech</span>
                  </h3>
                  <div className="text-xs font-mono text-cyan-400">
                    October 2025 – October 2026 • Hyderabad, India
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300">
                  <li>Accomplished ingestion and automated transformation of 1.4M+ monthly transactional records with 99.4% data integrity by authoring Python ETL pipelines that systematically handled schema drift and scrubbed duplicate entries.</li>
                  <li>Slashed recurring reporting query runtime by 82% (from 4.2 minutes down to 45 seconds) across 1.2M+ records by refactoring complex multi-table JOINs and implementing composite index partitioning.</li>
                  <li>Delivered 5 interactive Power BI and Tableau dashboards deployed to cross-functional stakeholders, saving 16 analyst hours weekly through automated cloud data refreshes and DAX modeling.</li>
                  <li>Engineered an enterprise Retrieval-Augmented Generation (RAG) assistant indexing 15K+ internal documents into a Vector DB, slashing query lookup time by 75% while eliminating hallucinations via hybrid semantic retrieval.</li>
                  <li>Automated anomaly auditing on streaming ledger records by developing a multi-agent system using AutoGen, reducing weekly manual data triage time from 14 hours to 35 minutes.</li>
                  <li>Programmed automated data sanitization and retry algorithms that trapped REST API rate-limit dropouts and malformed payloads at ingestion, reducing downstream reporting discrepancies from 8.6% to under 0.5%.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Education */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest uppercase border-b border-slate-800 pb-1 mb-3">
              EDUCATION
            </h2>
            <div className="flex flex-wrap justify-between items-baseline text-xs sm:text-sm">
              <div>
                <div className="font-bold text-white">Bachelor of Technology in Computer Science and Engineering</div>
                <div className="text-slate-400">MLR Institute of Technology (MLRIT), Hyderabad, India</div>
              </div>
              <div className="text-right font-mono text-xs text-slate-300">
                <div>2021 – 2025</div>
                <div className="text-cyan-400 font-bold">CGPA: 7.34 / 10.0</div>
              </div>
            </div>
          </div>

          {/* Section: Achievements */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest uppercase border-b border-slate-800 pb-1 mb-3">
              ACHIEVEMENTS
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-white">BRAIN-O-VISION AWS Hackathon 2023 – 1st Position</div>
                  <div className="text-xs font-mono text-slate-400">MLRIT, Hyderabad</div>
                </div>
                <p className="text-slate-300 mt-0.5">
                  Secured 1st place among competing teams by architecting scalable cloud infrastructure using AWS services and deploying a responsive, highly accessible full-stack web application.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-white">METALOOP 2023 Hackathon – Winner (Healthcare Domain)</div>
                  <div className="text-xs font-mono text-slate-400">MLRIT, Hyderabad</div>
                </div>
                <p className="text-slate-300 mt-0.5">
                  Achieved victory in the Healthcare domain by engineering an interactive VR solution in Unity to visualize and interact with the molecular structures and spatial dynamics of 20+ pharmaceutical drugs.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-mono font-bold text-xs hover:bg-white transition-colors"
          >
            RETURN TO EXPLORATION
          </button>
        </div>
      </div>
    </div>
  );
}
