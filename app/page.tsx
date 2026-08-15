"use client";

import React, { useState, useEffect } from "react";

// --- INLINE SVG ICONS (Zero Dependency) ---
function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ShieldIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function LocationPinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.015-5.199-3.386-6.214-6.214l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

// --- DATA ARRAYS ---
const ASSET_CLASSES = [
  {
    id: "01",
    name: "FOREX",
    description: "Foreign exchange market sebagai salah satu tactical capital allocation untuk memanfaatkan likuiditas global.",
    tag: "Tactical Allocation",
  },
  {
    id: "02",
    name: "BITCOIN",
    description: "Digital asset exposure dengan fokus utama pada Bitcoin sebagai aset simpanan nilai terdesentralisasi jangka panjang.",
    tag: "Digital Reserve",
  },
  {
    id: "03",
    name: "LOCAL PUBLIC EQUITY",
    description: "Investasi pada perusahaan publik di pasar saham Indonesia dengan fundamental bisnis unggul dan parit ekonomi kuat.",
    tag: "Domestic Growth",
  },
  {
    id: "04",
    name: "GLOBAL INDEX & U.S. TREASURIES",
    description: "Eksposur terhadap indeks ekuitas global dan obligasi pemerintah AS untuk menjaga keamanan modal dasar.",
    tag: "Capital Preservation",
  },
  {
    id: "05",
    name: "PRIVATE EQUITY",
    description: "Investasi strategis pada bisnis privat berprospek tinggi serta penciptaan nilai jangka panjang langsung.",
    tag: "Direct Value Creation",
  },
  {
    id: "06",
    name: "SECTORAL ETFs",
    description: "Alokasi terstruktur pada sektor-sektor kunci yang menggerakkan pertumbuhan ekonomi masa depan.",
    tag: "Theme & Megatrend",
  },
];

const PHILOSOPHIES = [
  {
    title: "Long-Term Thinking",
    description: "Menghindari keputusan tergesa-gesa yang didorong oleh kebisingan pasar jangka pendek. Menitikberatkan horizon dekade, bukan kuartal.",
  },
  {
    title: "Risk First",
    description: "Memahami dan mengamankan potensi penurunan modal (downside) secara matang sebelum berfokus mengejar kenaikan (upside).",
  },
  {
    title: "Compounding",
    description: "Konsistensi reinvestasi modal tanpa interupsi agar keajaiban eksponensial compound interest bekerja maksimal.",
  },
  {
    title: "Diversification",
    description: "Penggunaan berbagai kelas aset yang tidak berkorelasi penuh untuk membangun portofolio yang tahan banting dalam berbagai siklus makro.",
  },
  {
    title: "Asymmetric Opportunities",
    description: "Mencari dan mengeksekusi peluang investasi dengan batas risiko terukur namun memiliki potensi hasil bernilai berlipat.",
  },
];

const FRAMEWORK_STEPS = [
  { step: "01", title: "RESEARCH", desc: "Menganalisis tren makroekonomi, siklus likuiditas, dan fundamental dasar." },
  { step: "02", title: "THESIS", desc: "Menyusun hipotesis investasi dengan rasio risk/reward yang asimetris." },
  { step: "03", title: "CAPITAL ALLOCATION", desc: "Eksekusi alokasi modal secara presisi sesuai profil risiko portofolio." },
  { step: "04", title: "RISK MANAGEMENT", desc: "Pemantauan dinamis dan perlindungan terhadap volatilitas mendadak." },
  { step: "05", title: "COMPOUNDING", desc: "Proses reinvestasi hasil secara berkelanjutan untuk pertumbuhan eksponensial." },
  { step: "06", title: "PRESERVATION", desc: "Memastikan modal inti terlindungi dari krisis dan inflasi sistemik." },
  { step: "07", title: "LEGACY", desc: "Restrukturisasi kekayaan yang siap diteruskan dengan aman ke generasi berikutnya." },
];

export default function ZigftLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "Investments", href: "#investments" },
    { name: "Framework", href: "#framework" },
    { name: "Founder", href: "#founder" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans selection:bg-amber-500/20 selection:text-amber-300 antialiased relative overflow-x-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 bg-[radial-gradient(#1f1f2e_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none z-0" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-40 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070709]/85 backdrop-blur-md border-b border-zinc-800/60 py-4 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/icon.png" 
              alt="ZIGFT Logo" 
              className="w-9 h-9 object-contain rounded group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="flex flex-col">
              <span className="font-sans tracking-[0.25em] font-semibold text-lg text-zinc-100 group-hover:text-amber-300 transition-colors">
                ZIGFT
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 -mt-1 font-mono">
                Family Office
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-amber-300 transition-colors duration-200">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-5 py-2.5 rounded border border-amber-500/30 bg-amber-500/5 text-amber-300 hover:bg-amber-500/15 hover:border-amber-400 transition-all duration-300"
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-amber-400 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0e] border-b border-zinc-800/80 px-6 py-6 absolute top-full left-0 right-0 flex flex-col gap-5 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-zinc-300 hover:text-amber-400 py-1"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs uppercase tracking-widest px-5 py-3 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300 mt-2"
            >
              Contact Us
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-12 overflow-hidden border-b border-zinc-800/40">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-start space-y-8">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Private Family Wealth Initiative
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-zinc-100 leading-[1.08] uppercase font-sans">
                Build Wealth. <br />
                <span className="font-serif italic font-normal text-amber-200/90 lowercase">
                  preserve
                </span>{" "}
                Legacy.
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                A private family office built to compound, preserve, and develop wealth across generations with disciplined capital allocation and long-term vision.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded bg-amber-500/90 text-zinc-950 font-medium text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10"
                >
                  Explore ZIGFT
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
                <a
                  href="#philosophy"
                  className="inline-flex items-center justify-center px-8 py-4 rounded border border-zinc-700/80 hover:border-amber-500/50 text-zinc-300 hover:text-zinc-100 text-xs uppercase tracking-widest transition-all bg-zinc-900/40"
                >
                  Our Philosophy
                </a>
              </div>

              <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-zinc-800/60 w-full">
                <div>
                  <span className="block text-2xl font-light text-zinc-200 font-mono">100%</span>
                  <span className="text-xs text-zinc-500 tracking-wider uppercase">Private Alignment</span>
                </div>
                <div>
                  <span className="block text-2xl font-light text-zinc-200 font-mono">Multi-Asset</span>
                  <span className="text-xs text-zinc-500 tracking-wider uppercase">Global Exposure</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-2xl font-light text-zinc-200 font-mono">Multi-Gen</span>
                  <span className="text-xs text-zinc-500 tracking-wider uppercase">Horizon Strategy</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-transparent to-zinc-900/80 p-8 flex items-center justify-center shadow-2xl">
                <div className="absolute inset-2 rounded-full border border-zinc-800/80 border-dashed animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-8 rounded-full border border-amber-500/10" />
                <div className="text-center p-6 space-y-2">
                  <img 
                    src="/icon.png" 
                    alt="ZIGFT Logo" 
                    className="w-14 h-14 mx-auto object-contain rounded mb-3" 
                  />
                  <span className="block text-xs font-mono tracking-widest text-amber-400 uppercase">
                    Intergenerational
                  </span>
                  <span className="block text-xl font-light tracking-wider text-zinc-200">
                    CAPITAL
                  </span>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest max-w-[160px] mx-auto">
                    Built to Endure Systemic Market Cycles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section id="about" className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40 bg-zinc-950/40">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
              <span className="w-8 h-px bg-amber-500/40" />
              01 / Introduction
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-zinc-100 leading-snug">
              What is <span className="text-amber-300 font-serif italic">ZIGFT</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
              <p className="border-l-2 border-amber-500/30 pl-6">
                <strong className="text-zinc-100 font-medium">ZIGFT</strong> adalah private family office fund yang dirancang sebagai kendaraan eksklusif untuk membangun, mengelola, dan menumbuhkan kekayaan keluarga dalam jangka panjang.
              </p>
              <p className="text-zinc-400">
                Fokus ZIGFT bukan sekadar mengejar return jangka pendek atau volatilitas sesaat, melainkan membangun sistem <span className="text-zinc-200 font-medium">capital allocation</span> terdisiplin yang memungkinkan kekayaan untuk terus berkembang, terlindungi secara struktural, dan siap diwariskan ke generasi berikutnya.
              </p>
            </div>
          </div>
        </section>

        {/* PURPOSE */}
        <section className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest mb-3">
                  <span className="w-8 h-px bg-amber-500/40" />
                  02 / Purpose
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-zinc-100 tracking-tight">
                  Built for Generations.
                </h2>
              </div>
              <p className="text-zinc-400 max-w-md text-sm font-light">
                Empat pilar utama yang menjadi pondasi arsitektur pengelolaan modal ZIGFT.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: "01", title: "BUILD", subtitle: "Membangun Kekayaan", desc: "Membangun kekayaan secara konsisten melalui berbagai instrumen dan sumber modal berpotensi tinggi." },
                { num: "02", title: "COMPOUND", subtitle: "Mengembangkan Capital", desc: "Mengembangkan modal melalui prinsip reinvestasi cerdas dan pemanfaatan efek compounding jangka panjang." },
                { num: "03", title: "PRESERVE", subtitle: "Menjaga Aset", desc: "Menjaga kekayaan dari penurunan nilai sistemik melalui diversifikasi terukur dan manajemen risiko ketat." },
                { num: "04", title: "TRANSFER", subtitle: "Eksistensi Lintas Generasi", desc: "Membangun struktur legal dan finansial yang solid agar kekayaan dapat bertahan dan diwariskan dengan lancar." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative p-8 rounded border border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900/60 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="text-xs font-mono text-amber-500/70 block mb-6">{item.num}</span>
                    <h3 className="text-2xl font-light tracking-wider text-zinc-100 mb-1 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-mono">{item.subtitle}</p>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-zinc-800/50 flex justify-end">
                    <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INVESTMENTS */}
        <section id="investments" className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                <span className="w-8 h-px bg-amber-500/40" />
                03 / Capital Allocation
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-zinc-100">Where We Allocate Capital</h2>
              <p className="text-zinc-400 font-light text-base">
                A multi-asset approach designed for opportunity, diversification, and long-term capital growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ASSET_CLASSES.map((asset) => (
                <div
                  key={asset.id}
                  className="p-8 rounded border border-zinc-800/70 bg-[#0c0c12] hover:border-amber-500/40 hover:bg-[#101018] transition-all duration-300 space-y-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">{asset.id}</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 px-2.5 py-1 rounded border border-amber-500/20 bg-amber-500/5">
                        {asset.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium tracking-wide text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">{asset.description}</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-800/40 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>Portfolio Strategic Asset</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                <span className="w-8 h-px bg-amber-500/40" />
                04 / Core Doctrine
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-zinc-100">Capital Is a Long Game.</h2>
              <p className="text-zinc-400 font-light text-base">
                ZIGFT memandang modal sebagai instrumen berdaya tahan yang harus dialokasikan dengan disiplin ketat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PHILOSOPHIES.map((item, idx) => (
                <div key={item.title} className="p-8 rounded border border-zinc-800/60 bg-zinc-900/10 space-y-4">
                  <span className="text-xs font-mono text-amber-500/60 block">PHILOSOPHY_0{idx + 1}</span>
                  <h3 className="text-xl font-light text-zinc-100">{item.title}</h3>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">{item.description}</p>
                </div>
              ))}

              <div className="p-8 rounded border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900/30 to-transparent flex flex-col justify-between space-y-6">
                <ShieldIcon className="w-8 h-8 text-amber-400" />
                <blockquote className="text-lg font-serif italic text-amber-200/90 leading-relaxed">
                  &ldquo;Kekayaan sejati tidak diukur dari seberapa cepat modal berlipat dalam sehari, melainkan seberapa kokoh modal tersebut bertahan melewati berganti generasi.&rdquo;
                </blockquote>
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-t border-amber-500/20 pt-4">
                  — ZIGFT Wisdom
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FRAMEWORK */}
        <section id="framework" className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40 bg-zinc-950/60">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                <span className="w-6 h-px bg-amber-500/40" />
                05 / Methodology
                <span className="w-6 h-px bg-amber-500/40" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-zinc-100">The ZIGFT Framework</h2>
              <p className="text-zinc-400 font-light text-sm sm:text-base">
                Proses terstruktur yang kami terapkan dalam setiap keputusan alokasi kekayaan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {FRAMEWORK_STEPS.map((item, index) => (
                <div
                  key={item.step}
                  className="p-5 rounded border border-zinc-800/80 bg-zinc-900/30 space-y-3 flex flex-col justify-between relative group hover:border-amber-500/40 transition-all"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-amber-400/80 block">STEP {item.step}</span>
                    <h3 className="text-xs font-semibold tracking-wider text-zinc-200 uppercase group-hover:text-amber-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                  {index < FRAMEWORK_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-zinc-600">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section id="founder" className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded border border-zinc-800 bg-gradient-to-b from-zinc-800/40 to-zinc-900/90 p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
                    Founder & Visionary
                  </span>
                  <h3 className="text-2xl font-light text-zinc-100">M. IDRIS PRATAMA</h3>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Palembang, Indonesia</p>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="w-12 h-0.5 bg-amber-500/60" />
                  <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                    &ldquo;ZIGFT didirikan untuk membangun sistem akumulasi dan perlindungan modal yang mampu melampaui batas waktu generasi.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                <span className="w-8 h-px bg-amber-500/40" />
                06 / Leadership
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-zinc-100">The Founder</h2>
              <p className="text-zinc-300 font-light text-base leading-relaxed">
                <strong className="text-zinc-100 font-medium">M. Idris Pratama</strong> adalah investor muda asal Palembang dan founder ZIGFT.
              </p>
              <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                Ia membangun ZIGFT dengan visi menciptakan sebuah private family office yang berorientasi pada long-term capital allocation, wealth creation, dan intergenerational wealth preservation.
              </p>
              <div className="pt-4 flex items-center gap-6 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span>• Long-Term Focused</span>
                <span>• Multi-Asset Strategy</span>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40 bg-zinc-950/40">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                <span className="w-8 h-px bg-amber-500/40" />
                07 / Presence
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-zinc-100">
                Based in Indonesia. <br />
                <span className="font-serif italic text-amber-300">Thinking Globally.</span>
              </h2>
              <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                Berakar kuat di Indonesia dengan sudut pandang dan jangkauan alokasi pasar keuangan internasional.
              </p>
            </div>

            <div className="p-8 rounded border border-zinc-800 bg-zinc-900/30 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <LocationPinIcon />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">Primary Office Hub</h4>
                  <p className="text-lg text-zinc-100 font-medium">Palembang, South Sumatra</p>
                  <p className="text-sm text-zinc-400 font-light">Indonesia</p>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-800/80 text-xs text-zinc-500 font-mono leading-relaxed">
                Menghubungkan peluang ekosistem lokal dengan stabilitas pasar modal global.
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 sm:py-32 px-6 md:px-12 border-b border-zinc-800/40">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                <span className="w-6 h-px bg-amber-500/40" />
                08 / Engagement
                <span className="w-6 h-px bg-amber-500/40" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-zinc-100">Start a Conversation.</h2>
              <p className="text-zinc-400 font-light text-sm sm:text-base">
                Hubungi saluran resmi ZIGFT untuk korespondensi langsung dan pertanyaan seputar inisiatif pengolahan modal keluarga.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded border border-zinc-800 bg-zinc-900/20 hover:border-amber-500/40 transition-all space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <MailIcon />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">Direct Email</span>
                    <h3 className="text-base sm:text-lg text-zinc-200 font-mono break-all">zenaiskandewigroup@gmail.com</h3>
                  </div>
                </div>
                <a
                  href="mailto:zenaiskandewigroup@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded border border-zinc-700 hover:border-amber-400 text-xs font-mono uppercase tracking-widest text-zinc-200 hover:text-amber-300 transition-all bg-zinc-900/60"
                >
                  Email ZIGFT
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-8 rounded border border-zinc-800 bg-zinc-900/20 hover:border-amber-500/40 transition-all space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <PhoneIcon />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">WhatsApp Communications</span>
                    <h3 className="text-base sm:text-lg text-zinc-200 font-mono">+62 858-0958-2351</h3>
                  </div>
                </div>
                <a
                  href="https://wa.me/6285809582351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono uppercase tracking-widest text-amber-300 transition-all"
                >
                  WhatsApp ZIGFT
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 sm:py-32 px-6 md:px-12 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl sm:text-6xl font-light text-zinc-100 uppercase tracking-tight">
              BUILD CAPITAL. <br />
              <span className="font-serif italic font-normal text-amber-300 lowercase">preserve</span> LEGACY.
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto font-light text-base">
              ZIGFT is built for the long term. Disciplined capital management for intergenerational value.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-10 py-4 rounded bg-amber-500/90 hover:bg-amber-400 text-zinc-950 text-xs uppercase tracking-widest font-medium transition-all shadow-xl shadow-amber-500/10"
              >
                Contact ZIGFT
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/80 bg-[#040406] py-16 px-6 md:px-12 text-xs text-zinc-500 font-light relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <img 
                  src="/icon.png" 
                  alt="ZIGFT Logo" 
                  className="w-6 h-6 object-contain rounded" 
                />
                <span className="font-semibold text-sm tracking-widest text-zinc-200">ZIGFT</span>
              </div>
              <p className="text-zinc-400 font-mono text-[11px]">Private Family Office</p>
              <p className="text-zinc-500 text-xs">Palembang, South Sumatra, Indonesia</p>
            </div>

            <div className="md:col-span-4 space-y-2 font-mono text-[11px]">
              <p className="text-zinc-400">Contact Channels:</p>
              <p className="text-zinc-500">Email: zenaiskandewigroup@gmail.com</p>
              <p className="text-zinc-500">WA: +62 858-0958-2351</p>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2 uppercase tracking-widest text-[10px] font-mono">
              <span className="text-zinc-400 mb-1">Navigation</span>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-amber-400 transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-zinc-600">
            <p>© 2026 ZIGFT. All rights reserved.</p>
            <p className="text-center sm:text-right">Built for generations.</p>
          </div>

          <div className="pt-4 text-[10px] leading-relaxed text-zinc-600 border-t border-zinc-900/50">
            <p>
              <strong>Disclaimer:</strong> ZIGFT is a private family wealth initiative. Information presented on this website is for informational purposes only and does not constitute investment advice, an offer, or a solicitation to invest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
