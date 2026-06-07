import React, { useState } from 'react';
import {
  FileText,
  Zap,
  Shield,
  Clock,
  Edit3,
  Download,
  Sparkles,
  ChevronRight,
  MousePointer,
} from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  const [demoSelectedBlock, setDemoSelectedBlock] = useState('title');
  const [demoTitle, setDemoTitle] = useState('Invoice & Work Summary');
  const [demoDesc, setDemoDesc] = useState(
    'Click any text block to the left, then type in this panel to see edits happen in real-time — just like the full editor.'
  );
  const [demoTitleColor, setDemoTitleColor] = useState('#dc2626');
  const [demoTitleSize, setDemoTitleSize] = useState(22);

  return (
    <div
      style={{ minHeight: '100vh', width: '100%' }}
      className="bg-[#0f0b0b] text-white flex flex-col overflow-x-hidden"
    >
      {/* ─── Ambient glow orbs ─────────────────────────────── */}
      <div className="pointer-events-none fixed top-[-15%] left-[-10%] w-[55%] h-[55%] bg-red-700/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none fixed bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-red-900/10 rounded-full blur-[140px]" />

      {/* ─── Navbar ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0f0b0b]/80 border-b border-red-950/60 w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              PDFlow{' '}
              <span className="text-xs font-bold bg-red-900/60 text-red-300 border border-red-700/40 px-2 py-0.5 rounded-md ml-1">
                PRO
              </span>
            </span>
          </div>
          <button
            onClick={onGetStarted}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-red-600/20 hover:shadow-red-500/30 hover:scale-[1.03] cursor-pointer"
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-center">

          {/* Left – copy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Next-Gen Direct PDF Editor
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
              Edit PDF Text{' '}
              <span className="bg-gradient-to-r from-red-400 via-rose-300 to-red-500 bg-clip-text text-transparent">
                In Real-Time
              </span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
              No messy conversions. No Word exports. Just upload your PDF, tap any text
              segment, tweak it instantly, and download your clean output.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                Start Editing Now
              </button>
              <button
                onClick={() =>
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-xl font-semibold text-base transition-all cursor-pointer"
              >
                See How It Works
              </button>
            </div>

            <div className="flex items-center gap-6 text-xs text-white/40 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                No install required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                100 % private & secure
              </span>
            </div>
          </div>

          {/* Right – interactive demo */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#1c1010] border border-red-950/60 rounded-2xl p-5 shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center justify-between pb-4 border-b border-red-950/50 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
                  <span className="text-xs text-white/30 font-mono ml-2">live-demo.pdf</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-600/10 text-red-400 border border-red-600/20">
                  Interactive Preview
                </span>
              </div>

              {/* Simulator workspace */}
              <div className="grid sm:grid-cols-12 gap-4">
                {/* Mock PDF page */}
                <div className="sm:col-span-7 bg-white rounded-lg p-4 text-gray-900 min-h-[220px] border border-gray-100 shadow-inner flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <div className="h-5 w-14 bg-gray-200 rounded animate-pulse" />
                      <span className="text-[10px] text-gray-400 font-mono">PAGE 1/1</span>
                    </div>

                    {/* Title block */}
                    <div
                      onClick={() => setDemoSelectedBlock('title')}
                      className={`p-2 rounded cursor-pointer transition-all group/b border ${
                        demoSelectedBlock === 'title'
                          ? 'border-red-500 bg-red-50'
                          : 'border-dashed border-red-300/60 hover:border-red-400 hover:bg-red-50/50'
                      }`}
                    >
                      <div
                        className="font-bold flex items-center justify-between"
                        style={{ color: demoTitleColor, fontSize: `${demoTitleSize}px` }}
                      >
                        <span>{demoTitle}</span>
                        <MousePointer className="w-3.5 h-3.5 text-red-400 opacity-0 group-hover/b:opacity-100 transition-opacity ml-1 shrink-0" />
                      </div>
                    </div>

                    {/* Description block */}
                    <div
                      onClick={() => setDemoSelectedBlock('desc')}
                      className={`mt-3 p-2 rounded cursor-pointer transition-all group/b border ${
                        demoSelectedBlock === 'desc'
                          ? 'border-red-500 bg-red-50'
                          : 'border-dashed border-red-300/60 hover:border-red-400 hover:bg-red-50/50'
                      }`}
                    >
                      <p className="text-xs leading-relaxed text-gray-600 flex items-start justify-between">
                        <span>{demoDesc}</span>
                        <MousePointer className="w-3.5 h-3.5 text-red-400 opacity-0 group-hover/b:opacity-100 transition-opacity ml-1 shrink-0" />
                      </p>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded mt-5" />
                </div>

                {/* Sidebar controls */}
                <div className="sm:col-span-5 bg-[#0f0b0b] border border-red-950/50 rounded-lg p-3.5 flex flex-col justify-between text-xs space-y-3">
                  <div>
                    <span className="font-bold text-white/80 block mb-2.5">📝 Edit Block</span>
                    {demoSelectedBlock === 'title' ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] text-white/40 block mb-1">TEXT CONTENT</label>
                          <input
                            type="text"
                            value={demoTitle}
                            onChange={(e) => setDemoTitle(e.target.value)}
                            className="w-full bg-[#1c1010] border border-red-950/60 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-white/40 block mb-1">SIZE (PX)</label>
                            <input
                              type="number"
                              value={demoTitleSize}
                              onChange={(e) => setDemoTitleSize(Number(e.target.value))}
                              className="w-full bg-[#1c1010] border border-red-950/60 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 block mb-1">COLOR</label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="color"
                                value={demoTitleColor}
                                onChange={(e) => setDemoTitleColor(e.target.value)}
                                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                              />
                              <span className="text-[9px] text-white/40 font-mono uppercase">
                                {demoTitleColor}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="text-[10px] text-white/40 block mb-1">TEXT CONTENT</label>
                        <textarea
                          rows={5}
                          value={demoDesc}
                          onChange={(e) => setDemoDesc(e.target.value)}
                          className="w-full bg-[#1c1010] border border-red-950/60 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-500 resize-none"
                        />
                      </div>
                    )}
                  </div>
                  <div className="bg-red-600/10 border border-red-600/20 text-red-300 p-2 rounded text-[10px] text-center leading-relaxed">
                    💡 Type above — the mock PDF updates instantly!
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Features ──────────────────────────────────────── */}
      <section className="w-full bg-[#0f0b0b] border-t border-red-950/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Designed for Instant Edits
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              A comprehensive workspace built from the ground up to solve PDF frustrations once and for all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Edit3 className="w-6 h-6 text-red-400" />,
                bg: 'bg-red-600/10',
                title: 'Direct Editing',
                desc: 'Target text elements in the canvas and modify them without ever leaving the PDF format.',
              },
              {
                icon: <Clock className="w-6 h-6 text-rose-400" />,
                bg: 'bg-rose-600/10',
                title: 'Lightning Speed',
                desc: 'Upload, edit, and download in seconds. Minimal round-trips, maximum responsiveness.',
              },
              {
                icon: <Shield className="w-6 h-6 text-red-300" />,
                bg: 'bg-red-800/10',
                title: 'Secure Processing',
                desc: 'Files are stored in self-cleaning backend sessions with no data shared to third parties.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group bg-[#1c1010] border border-red-950/50 rounded-2xl p-8 hover:border-red-800/60 hover:bg-[#2a1515] transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`flex items-center justify-center w-12 h-12 ${f.bg} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────── */}
      <section id="how-it-works" className="w-full py-24 border-t border-red-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">How It Works</h2>
            <p className="text-white/50">Three steps to a polished document</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-red-950 pointer-events-none" />
            {[
              { n: '1', from: 'from-red-400', to: 'to-rose-400', title: 'Upload Your PDF', desc: 'Drag-and-drop or select a file. Our engine analyses all text segments and page geometry.' },
              { n: '2', from: 'from-rose-400', to: 'to-red-500', title: 'Click & Modify',  desc: 'Select elements on the rendered page. Change content, size, or color in real time.'          },
              { n: '3', from: 'from-red-500', to: 'to-red-700', title: 'Save & Export',   desc: 'Hit "Save PDF" — your browser downloads the rebuilt document with all edits applied.'        },
            ].map((s) => (
              <div key={s.n} className="text-center relative z-10 space-y-4 group">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1c1010] border border-red-900/50 rounded-2xl mx-auto group-hover:border-red-600/60 group-hover:bg-[#2a1515] transition-all shadow-md">
                  <span className={`text-2xl font-black bg-gradient-to-r ${s.from} ${s.to} bg-clip-text text-transparent`}>
                    {s.n}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ────────────────────────────────────── */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-rose-600 rounded-3xl p-12 text-center border border-red-500/20 shadow-2xl shadow-red-900/40">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Ready to Edit Your PDF?
              </h2>
              <p className="text-red-100 text-base md:text-lg leading-relaxed">
                No signups, no watermarks, no installs. Try PDFlow Edit Pro and discover how fast editing can be.
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-red-50 text-red-700 rounded-xl font-bold text-base transition-all shadow-lg hover:scale-[1.03] cursor-pointer"
              >
                Get Started Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <footer className="w-full border-t border-red-950/40 bg-[#0f0b0b] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-500" />
            <span className="font-bold text-white/60">PDFlow Edit Pro</span>
          </div>
          <p>&copy; {new Date().getFullYear()} PDFlow Edit Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
