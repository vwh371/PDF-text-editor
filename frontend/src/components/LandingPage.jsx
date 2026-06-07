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
  Check, 
  Palette 
} from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  // Local state for the interactive mock editor demo
  const [demoSelectedBlock, setDemoSelectedBlock] = useState('title'); // 'title' or 'desc'
  const [demoTitle, setDemoTitle] = useState('Invoice & Work Summary');
  const [demoDesc, setDemoDesc] = useState('This is an interactive mock PDF preview. Click on any text block on the left to edit its content and see changes instantly.');
  const [demoTitleColor, setDemoTitleColor] = useState('#2563eb');
  const [demoTitleSize, setDemoTitleSize] = useState(24);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-inter overflow-x-hidden relative">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                PDFlow <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent text-sm font-semibold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">PRO</span>
              </span>
            </div>
          </div>
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-semibold rounded-xl group bg-gradient-to-br from-blue-600 to-indigo-500 group-hover:from-blue-600 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-slate-900 rounded-lg group-hover:bg-opacity-0">
              Get Started
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column - Content */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Direct PDF Editor
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Edit PDF Text<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              In Real-Time
            </span>
          </h2>
          
          <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
            No messy formats. No conversion to Word. Just import your PDF file, select any text segment, modify it in seconds, and export your polished output.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onGetStarted}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-base transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              Start Editing Now
            </button>
            <button
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-semibold text-base transition-all border border-slate-800 cursor-pointer"
            >
              See How It Works
            </button>
          </div>
          
          <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Web-based (No install)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" /> 100% Client-side Security
            </div>
          </div>
        </div>

        {/* Right column - Interactive Live Demo Simulator */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-[40px] pointer-events-none" />
          
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
            {/* Window header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
                <span className="text-xs text-slate-500 font-mono ml-2">live-editor-demo.pdf</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Interactive Preview
              </span>
            </div>

            {/* Editor Workspace Simulator */}
            <div className="grid sm:grid-cols-12 gap-4">
              {/* Simulator Left: Mock PDF Page */}
              <div className="sm:col-span-7 bg-white rounded-lg p-4 text-slate-900 min-h-[220px] relative border border-slate-200 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
                    <div className="text-[10px] text-slate-400 font-mono">PAGE 1 OF 1</div>
                  </div>
                  
                  {/* Title Block */}
                  <div 
                    onClick={() => setDemoSelectedBlock('title')}
                    className={`p-2 rounded cursor-pointer transition-all group/box border ${
                      demoSelectedBlock === 'title' 
                        ? 'border-red-500 bg-red-500/5 shadow-sm' 
                        : 'border-blue-400/30 hover:border-blue-500 bg-blue-500/5'
                    }`}
                  >
                    <div 
                      className="font-bold flex items-center justify-between"
                      style={{ color: demoTitleColor, fontSize: `${demoTitleSize}px` }}
                    >
                      <span>{demoTitle}</span>
                      <MousePointer className="w-4 h-4 text-blue-500 opacity-0 group-hover/box:opacity-100 transition-opacity ml-1 shrink-0" />
                    </div>
                  </div>

                  {/* Description Block */}
                  <div 
                    onClick={() => setDemoSelectedBlock('desc')}
                    className={`mt-4 p-2 rounded cursor-pointer transition-all group/box border ${
                      demoSelectedBlock === 'desc' 
                        ? 'border-red-500 bg-red-500/5 shadow-sm' 
                        : 'border-blue-400/30 hover:border-blue-500 bg-blue-500/5'
                    }`}
                  >
                    <p className="text-xs leading-relaxed text-slate-700 flex items-start justify-between">
                      <span>{demoDesc}</span>
                      <MousePointer className="w-4 h-4 text-blue-500 opacity-0 group-hover/box:opacity-100 transition-opacity ml-1 shrink-0" />
                    </p>
                  </div>
                </div>

                <div className="h-4 w-full bg-slate-100 rounded mt-6" />
              </div>

              {/* Simulator Right: Sidebar controls */}
              <div className="sm:col-span-5 bg-slate-950 rounded-lg p-3.5 border border-slate-800 flex flex-col justify-between text-left text-xs space-y-3">
                <div>
                  <span className="font-bold text-slate-300 block mb-2">📝 Edit Block</span>
                  
                  {demoSelectedBlock === 'title' ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">TEXT CONTENT</label>
                        <input 
                          type="text" 
                          value={demoTitle}
                          onChange={(e) => setDemoTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1">SIZE (PX)</label>
                          <input 
                            type="number" 
                            value={demoTitleSize}
                            onChange={(e) => setDemoTitleSize(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1">COLOR</label>
                          <div className="flex gap-1.5 items-center">
                            <input 
                              type="color" 
                              value={demoTitleColor}
                              onChange={(e) => setDemoTitleColor(e.target.value)}
                              className="w-6 h-6 border-0 bg-transparent rounded cursor-pointer"
                            />
                            <span className="text-[10px] text-slate-400 uppercase font-mono">{demoTitleColor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 block mb-1">TEXT CONTENT</label>
                      <textarea 
                        rows="4" 
                        value={demoDesc}
                        onChange={(e) => setDemoDesc(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-2 rounded text-[10px] text-center leading-normal">
                  💡 Type to edit! The PDF rendering reflects updates instantly.
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Designed for Instant Edits
          </h3>
          <p className="text-slate-400">
            A comprehensive, high-fidelity experience built from the ground up to solve PDF frustrations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group bg-slate-900/40 backdrop-blur border border-slate-900 rounded-2xl p-8 hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600/10 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <Edit3 className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Direct Editing</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Target text elements in the canvas and modify them directly. The document maintains original alignments, margins, and page structures.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-slate-900/40 backdrop-blur border border-slate-900 rounded-2xl p-8 hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600/10 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-indigo-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Lightning Speed</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload, edit, and download your finalized files in a matter of seconds. We minimize roundtrips to deliver instant responsiveness.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-slate-900/40 backdrop-blur border border-slate-900 rounded-2xl p-8 hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-600/10 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Secure Processing</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your files are stored in self-cleaning backend sessions. We implement strong industry security standards to keep your data confidential.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">How It Works</h3>
          <p className="text-slate-400">Get your edited document in 3 straightforward steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          
          {/* Connector Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-slate-900 z-0 pointer-events-none" />

          {/* Step 1 */}
          <div className="text-center relative z-10 space-y-4 group">
            <div className="flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl mb-4 mx-auto group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-colors duration-300 shadow-md">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">1</span>
            </div>
            <h4 className="text-lg font-bold text-white">Upload Your PDF</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Drag-and-drop or select a document from your files. Our processor analyzes text segments and page geometry instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center relative z-10 space-y-4 group">
            <div className="flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl mb-4 mx-auto group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-colors duration-300 shadow-md">
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">2</span>
            </div>
            <h4 className="text-lg font-bold text-white">Click & Modify</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Select elements directly on the high-fidelity rendering. Change content, modify sizing, or swap text colors in real time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center relative z-10 space-y-4 group">
            <div className="flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl mb-4 mx-auto group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-colors duration-300 shadow-md">
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">3</span>
            </div>
            <h4 className="text-lg font-bold text-white">Save and Export</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Click "Save PDF" to rebuild your document. Your browser immediately triggers the download with all vector features intact.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl p-12 text-center shadow-xl shadow-indigo-950/20 border border-indigo-500/20">
          {/* Overlay Grid lines for layout depth */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to Edit Your PDF?
            </h3>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              No signups, no watermarks, and no software installations. Try PDFlow Edit Pro today and see how fast editing can be.
            </p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-indigo-700 rounded-xl font-bold text-base transition-all transform hover:scale-[1.03] shadow-lg hover:shadow-xl cursor-pointer"
            >
              Get Started Now
              <ChevronRight className="w-5 h-5 text-indigo-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-slate-500 text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-white text-sm">PDFlow Edit Pro</span>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} PDFlow Edit Pro. All rights reserved. Self-cleaning, secure document workspace.</p>
        </div>
      </footer>
    </div>
  );
}
