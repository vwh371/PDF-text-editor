import React, { useState } from 'react';
import {
  FileText, Zap, Shield, Clock, Edit3,
  Sparkles, ChevronRight, MousePointer,
  UploadCloud, CheckCircle2, HelpCircle,
  ChevronDown, Lock, Settings2, FileSignature
} from 'lucide-react';

export default function LandingPage({ onGetStarted, onFileUpload, loading }) {
  // --- Drag and Drop State ---
  const [dragActive, setDragActive] = useState(false);

  // --- Multi-template Interactive Demo State ---
  const [activeTab, setActiveTab] = useState('invoice');
  const [selectedBlockId, setSelectedBlockId] = useState('title');

  // Individual template states (Updated to match green/light styling)
  const [invoiceStates, setInvoiceStates] = useState({
    title: 'Invoice & Work Summary',
    desc: 'React dashboard development with MySQL integration, user management, and canvas tools.',
    meta: 'Invoice #INV-2026-004',
    value: '$2,850.00',
    titleColor: '#16a34a', titleSize: 20,
    descColor: '#475569', descSize: 11,
    metaColor: '#64748b', metaSize: 10,
    valueColor: '#16a34a', valueSize: 16,
  });

  const [resumeStates, setResumeStates] = useState({
    title: 'Alexander Wright',
    desc: 'Design-focused React developer specializing in interactive systems, custom rendering engines, and interface engineering.',
    meta: 'Senior Frontend Architect',
    value: 'React • TypeScript • Tailwind • Node.js',
    titleColor: '#1e3a8a', titleSize: 22,
    descColor: '#475569', descSize: 11,
    metaColor: '#2563eb', metaSize: 12,
    valueColor: '#334155', valueSize: 10,
  });

  const [agreementStates, setAgreementStates] = useState({
    title: 'MUTUAL NDA & AGREEMENT',
    desc: 'All proprietary design frameworks, layout coordinates, and font mapping structures shall remain confidential.',
    meta: 'PDFlow Corp. & Enterprise Partner Ltd.',
    value: 'Effective Date: June 11, 2026',
    titleColor: '#b45309', titleSize: 18,
    descColor: '#334155', descSize: 10,
    metaColor: '#475569', metaSize: 11,
    valueColor: '#b45309', valueSize: 12,
  });

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Helper bindings
  const activeData = activeTab === 'invoice' ? invoiceStates : activeTab === 'resume' ? resumeStates : agreementStates;
  const setActiveData = activeTab === 'invoice' ? setInvoiceStates : activeTab === 'resume' ? setResumeStates : setAgreementStates;

  // --- Drag handlers ---
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        const dummyEvent = { target: { files: [file] } };
        onFileUpload(dummyEvent);
      } else {
        alert("Please drop a valid PDF file.");
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('dropzone-file-input')?.click();
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-screen min-h-screen bg-white text-slate-800 flex flex-col overflow-x-hidden relative font-inter">

      {/* ── Background Grid Pattern & Soft Ambient Glows ────────────────────── */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-mask opacity-70 pointer-events-none z-0" />
      
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-green-100/40 rounded-full blur-[140px] animate-float-slow z-0" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] bg-green-150/40 rounded-full blur-[160px] animate-float-medium z-0" />
      <div className="pointer-events-none fixed top-[30%] right-[15%] w-[35vw] h-[35vh] bg-emerald-50/20 rounded-full blur-[120px] z-0" />

      {/* ══ NAVBAR ════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-600/15 border border-green-400/20">
              <FileText className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-850 tracking-tight">
              PDFlow{' '}
              <span className="text-[10px] font-black tracking-widest bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-md ml-1 align-middle uppercase">
                Pro
              </span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer hidden sm:block"
            >
              How it Works
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer hidden sm:block"
            >
              FAQ
            </button>
            <button
              onClick={onGetStarted}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs md:text-sm font-bold rounded-xl transition-all shadow-md shadow-green-600/10 hover:scale-[1.02] cursor-pointer border border-green-500/20"
            >
              Open Editor →
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO SECTION (Two-Column Layout) ══════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline and Upload zone */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 w-fit rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-green-600" />
            Zero-Conversion Direct PDF Editor
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Modify PDF Text{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Directly & Instantly
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-550 leading-relaxed max-w-xl">
            Skip the conversions to Word. Upload any PDF file, click on any text block on the canvas, rewrite the content, tweak styles, and save the rebuilt vector output instantly.
          </p>

          {/* Interactive Drag & Drop Box */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`w-full max-w-xl group relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
              dragActive 
                ? 'border-green-500 bg-green-50/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
                : 'border-slate-200 bg-slate-50/60 hover:border-green-400 hover:bg-white hover:shadow-xl'
            }`}
          >
            <input
              type="file"
              id="dropzone-file-input"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
              disabled={loading}
            />

            {loading ? (
              <div className="space-y-4 py-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto border border-green-200">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Uploading & Analyzing...</p>
                  <p className="text-xs text-slate-400 mt-1">Reading page layout data</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto border border-green-200 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300">
                  <UploadCloud className="w-7.5 h-7.5 text-green-600 group-hover:animate-bounce" />
                </div>
                <div>
                  <p className="text-sm md:text-base font-bold text-slate-700 group-hover:text-green-600 transition-colors">
                    Drag and drop your PDF here, or <span className="underline text-green-600">browse</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Supports documents up to 25MB • 100% private in-browser mapping
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 text-[11px] md:text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-green-600" /> Ephemeral session cache
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> High-fidelity vector rebuild
            </span>
          </div>
        </div>

        {/* Right Column: High-Fidelity Interactive Preview Widget */}
        <div className="lg:col-span-6 flex items-center justify-center w-full">
          <div className="w-full max-w-xl bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-xl rounded-full" />
            
            {/* Header chrome */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[11px] text-slate-400 font-mono ml-2">try-interactive-canvas.pdf</span>
              </div>
              <span className="text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded bg-green-550 bg-green-50 text-green-600 border border-green-200">
                Live Simulator
              </span>
            </div>

            {/* Template Selector Tabs */}
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/80 text-xs">
              {[
                { id: 'invoice', label: '📄 Invoice', activeStyle: 'border-green-600 text-green-700 bg-green-50' },
                { id: 'resume', label: '👤 Resume', activeStyle: 'border-blue-500 text-blue-700 bg-blue-50/60' },
                { id: 'agreement', label: '🖋️ Agreement', activeStyle: 'border-amber-500 text-amber-700 bg-amber-50/60' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedBlockId('title');
                  }}
                  className={`py-3 text-center font-bold border-b-2 cursor-pointer transition-all ${
                    activeTab === tab.id 
                      ? tab.activeStyle
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Simulated Workspace Area */}
            <div className="grid md:grid-cols-12 gap-0 min-h-[300px]">
              
              {/* PDF Document Preview Canvas */}
              <div className="md:col-span-7 bg-[#eaecf0] p-4 flex items-center justify-center">
                <div 
                  className={`w-full max-w-[260px] aspect-[1/1.4] bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-colors duration-300 relative ${
                    activeTab === 'agreement' ? 'bg-[#faf9f5]' : 'bg-white'
                  }`}
                >
                  {/* Subtle PDF elements layout based on active tab */}
                  <div className="space-y-4">
                    {/* Top decoration */}
                    <div className="flex justify-between items-center text-[8px] text-gray-400 border-b border-gray-100 pb-1.5 font-mono">
                      <span>{activeTab.toUpperCase()} TEMPLATE</span>
                      <span>PAGE 1 OF 1</span>
                    </div>

                    {/* Block 1: TITLE */}
                    <div
                      onClick={() => setSelectedBlockId('title')}
                      className={`p-1.5 rounded cursor-pointer transition-all border-2 group/b relative ${
                        selectedBlockId === 'title'
                          ? `border-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500 bg-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-50/60`
                          : 'border-dashed border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                      }`}
                    >
                      <div 
                        className="font-bold leading-none break-words flex items-center justify-between gap-1"
                        style={{ color: activeData.titleColor, fontSize: `${activeData.titleSize}px` }}
                      >
                        <span>{activeData.title}</span>
                        <MousePointer className={`w-3 h-3 shrink-0 opacity-0 group-hover/b:opacity-100 transition-opacity text-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500`} />
                      </div>
                    </div>

                    {/* Block 3: META INFO */}
                    <div
                      onClick={() => setSelectedBlockId('meta')}
                      className={`p-1.5 rounded cursor-pointer transition-all border-2 group/b relative ${
                        selectedBlockId === 'meta'
                          ? `border-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500 bg-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-50/60`
                          : 'border-dashed border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                      }`}
                    >
                      <div 
                        className="font-semibold leading-tight break-words flex items-center justify-between gap-1"
                        style={{ color: activeData.metaColor, fontSize: `${activeData.metaSize}px` }}
                      >
                        <span>{activeData.meta}</span>
                        <MousePointer className={`w-3 h-3 shrink-0 opacity-0 group-hover/b:opacity-100 transition-opacity text-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500`} />
                      </div>
                    </div>

                    {/* Block 2: DESCRIPTION */}
                    <div
                      onClick={() => setSelectedBlockId('desc')}
                      className={`p-1.5 rounded cursor-pointer transition-all border-2 group/b relative ${
                        selectedBlockId === 'desc'
                          ? `border-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500 bg-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-50/60`
                          : 'border-dashed border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                      }`}
                    >
                      <div 
                        className="leading-relaxed break-words flex items-start justify-between gap-1"
                        style={{ color: activeData.descColor, fontSize: `${activeData.descSize}px` }}
                      >
                        <span>{activeData.desc}</span>
                        <MousePointer className={`w-3 h-3 mt-0.5 shrink-0 opacity-0 group-hover/b:opacity-100 transition-opacity text-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500`} />
                      </div>
                    </div>
                  </div>

                  {/* Block 4: VALUE/TOTAL/DATE */}
                  <div>
                    <div
                      onClick={() => setSelectedBlockId('value')}
                      className={`p-1.5 rounded cursor-pointer transition-all border-2 group/b relative ${
                        selectedBlockId === 'value'
                          ? `border-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500 bg-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-50/60`
                          : 'border-dashed border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                      }`}
                    >
                      <div 
                        className="font-bold leading-none break-words flex items-center justify-between gap-1"
                        style={{ color: activeData.valueColor, fontSize: `${activeData.valueSize}px` }}
                      >
                        <span>{activeData.value}</span>
                        <MousePointer className={`w-3 h-3 shrink-0 opacity-0 group-hover/b:opacity-100 transition-opacity text-${activeTab === 'invoice' ? 'green' : activeTab === 'resume' ? 'blue' : 'amber'}-500`} />
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-3" />
                  </div>

                </div>
              </div>

              {/* Side Editor Settings Simulator Panel */}
              <div className="md:col-span-5 bg-white p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 text-xs text-slate-700">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Settings2 className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Canvas Control Panel</span>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Selected Segment</label>
                    <div className="px-2.5 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-lg font-bold capitalize text-[10px] w-fit">
                      📍 {selectedBlockId} block
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Modify Content</label>
                    {selectedBlockId === 'desc' ? (
                      <textarea
                        rows={4}
                        value={activeData.desc}
                        onChange={(e) => setActiveData(prev => ({ ...prev, desc: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={activeData[selectedBlockId] || ''}
                        onChange={(e) => setActiveData(prev => ({ ...prev, [selectedBlockId]: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Font Size</label>
                      <input
                        type="number"
                        min={8}
                        max={36}
                        value={activeData[`${selectedBlockId}Size`] || 12}
                        onChange={(e) => setActiveData(prev => ({ ...prev, [`${selectedBlockId}Size`]: Number(e.target.value) }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Hex Color</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={activeData[`${selectedBlockId}Color`] || '#000000'}
                          onChange={(e) => setActiveData(prev => ({ ...prev, [`${selectedBlockId}Color`]: e.target.value }))}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                        />
                        <span className="text-[10px] text-slate-550 font-mono select-all uppercase">
                          {activeData[`${selectedBlockId}Color`]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 bg-green-50 border border-green-100 rounded-xl p-2.5 text-[10px] leading-relaxed text-green-700 text-center">
                  ✨ Try modifying the control panel values. The mock PDF document scales instantly!
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ══ STATS / TRUST METRICS BANNER ═══════════════════════ */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-12 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '100%', label: 'Session Privacy', desc: 'Runs client-side in secure sandbox.' },
            { value: '< 450ms', label: 'Processing Speed', desc: 'No remote file rendering delays.' },
            { value: '0 bytes', label: 'Permanent Storage', desc: 'Files auto-purged from workspace.' },
            { value: 'Vector-Strict', label: 'Rebuild Quality', desc: 'Preserves PDF font descriptors.' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <p className="text-xs font-bold text-slate-800 tracking-wide uppercase">{stat.label}</p>
              <p className="text-[11px] text-slate-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES SECTION (Grid) ═════════════════════════ */}
      <section id="features" className="w-full py-24 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Seamless Editing
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              Say goodbye to messy exports. PDFlow maps document dimensions directly for native PDF restructuring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Edit3 className="w-6 h-6 text-green-600" />, 
                bg: 'bg-green-50 border-green-200', 
                title: 'Click-to-Edit Canvas', 
                desc: 'Hover over sections, click to select, and modify content, colors, and styling coordinates instantly.' 
              },
              { 
                icon: <Lock className="w-6 h-6 text-emerald-600" />, 
                bg: 'bg-emerald-50 border-emerald-250', 
                title: 'Transient Sandbox Session', 
                desc: 'Your files are processed in-memory during active sessions. Exiting the tab purges all document nodes.' 
              },
              { 
                icon: <Zap className="w-6 h-6 text-teal-600" />, 
                bg: 'bg-teal-50 border-teal-250', 
                title: 'Instant Native Exports', 
                desc: 'Downloads a reconstructed PDF file containing exact fonts and vector sizing with zero watermarks.' 
              },
            ].map((f, i) => (
              <div 
                key={i} 
                className="glow-hover bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`flex items-center justify-center w-12 h-12 ${f.bg} border rounded-xl mb-6`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS (Timeline Workflow) ══════════════════════ */}
      <section id="how-it-works" className="w-full py-24 bg-slate-50/50 border-t border-slate-200 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Three Simple Steps</h2>
            <p className="text-slate-500 text-base md:text-lg">No forms. No watermarks. Just instant results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 pointer-events-none" />
            
            {[
              { 
                step: '01', 
                icon: <UploadCloud className="w-6 h-6 text-green-600" />, 
                title: 'Drop PDF File', 
                desc: 'Upload your document to the dropzone. Our analyzer immediately extracts editable blocks and calculates coordinates.' 
              },
              { 
                step: '02', 
                icon: <FileSignature className="w-6 h-6 text-emerald-600" />, 
                title: 'Modify Text Canvas', 
                desc: 'Click on any paragraph or value. Tweak text contents, alter font dimensions, or swap hex colors inside the editor panel.' 
              },
              { 
                step: '03', 
                icon: <CheckCircle2 className="w-6 h-6 text-teal-600" />, 
                title: 'Export Vector Rebuild', 
                desc: 'Click save to download the reconstructed PDF directly to your disk, compiled with identical document properties.' 
              },
            ].map((s, i) => (
              <div key={i} className="text-center space-y-4 group relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-white border border-slate-200 rounded-2xl mx-auto group-hover:border-green-500/50 group-hover:bg-green-50/20 transition-all duration-300 shadow-sm">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 flex items-center justify-center gap-2">
                  <span className="text-green-600 text-xs font-mono font-bold tracking-wider">{s.step}</span>
                  {s.title}
                </h3>
                <p className="text-white/45 text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ SECTION (Accordion) ═══════════════════════════ */}
      <section id="faq" className="w-full py-24 border-t border-slate-200 relative z-10">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-base">Got questions? We have got detailed answers.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is PDFlow safe for confidential documents?",
                a: "Absolutely. PDFlow operates using ephemeral session caches in your browser and backend memory. We do not write files permanently to disc, share documents, or collect analytics on your text. Closing your workspace tab purges all active memory traces immediately."
              },
              {
                q: "Can I modify images or draw signatures?",
                a: "PDFlow specializes in direct vector text edits (such as updating invoice descriptions, correcting names, resizing lines, or modifying currency values). We are working on incorporating image uploads and signature stamps into our next release."
              },
              {
                q: "What happens if the text overflows its box?",
                a: "When you type longer text blocks, our system scales the boundaries dynamically. If you need it aligned precisely, you can modify its font size in the sidebar settings panel to fit your document design perfectly."
              },
              {
                q: "Is there any watermark, subscription wall, or limit?",
                a: "No. PDFlow is designed as a developer utility. It features zero watermarks, zero subscription signups, and provides fully clean, native exports for any document under 25MB."
              }
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 transition-colors focus:outline-none font-inter"
                  >
                    <span className="text-sm md:text-base font-bold text-slate-800">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? 'transform rotate-180 text-green-650' : ''
                      }`} 
                    />
                  </button>
                  
                  <div
                    className={`faq-transition ${
                      isOpen ? 'max-h-60 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 py-5 text-xs md:text-sm text-slate-500 leading-relaxed bg-slate-50/50 font-inter">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER (Gradient Backdrop) ═══════════════════════ */}
      <section className="w-full py-0 relative z-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-green-850 from-green-800 via-green-600 to-emerald-700 py-24 border-t border-green-500/20">
          <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to Polish Your Document?
            </h2>
            <p className="text-green-50 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-inter">
              No registration required. Try our direct editing layout and download clean files.
            </p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-green-50 text-green-700 rounded-xl font-bold text-base transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              Start Free Editing Now <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer className="w-full bg-slate-50 border-t border-slate-200 py-10 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-550">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-650" />
            <span className="font-bold text-slate-500">PDFlow Edit Pro</span>
          </div>
          <p>&copy; {new Date().getFullYear()} PDFlow Edit Pro. Ephemeral PDF editor utility.</p>
        </div>
      </footer>
    </div>
  );
}
