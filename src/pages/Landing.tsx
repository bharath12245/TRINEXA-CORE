import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Droplets, CloudSun, Brain, BarChart3, Zap, Satellite, Bot, Sprout, Activity, Container, Sun, Wind, Hexagon, ChevronDown, ShieldCheck, Globe, Network } from "lucide-react";
import { Logo } from "@/components/trinexa/Logo";

const FloatParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/20"
        style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
        animate={{ 
          y: [0, -60, 0], 
          x: [0, (Math.random()-0.5)*40, 0],
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 2, 1]
        }}
        transition={{ duration: 6 + Math.random()*8, repeat: Infinity, delay: Math.random()*5 }}
      />
    ))}
  </div>
);

const NeuralNode = ({ delay = 0, style = {} }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2], 
      scale: [1, 1.2, 1],
      y: [0, -10, 0],
      rotate: [0, 90, 0]
    }}
    transition={{ duration: 5, repeat: Infinity, delay }}
    className="absolute pointer-events-none z-0"
    style={style}
  >
    <div className="w-4 h-4 rounded-full border border-primary/30 flex items-center justify-center backdrop-blur-sm">
      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
    </div>
    <div className="absolute top-1/2 left-full w-12 h-px bg-gradient-to-r from-primary/20 to-transparent" />
  </motion.div>
);

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8 border border-primary/10">
    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
    {children}
  </div>
);

const PreviewCard = ({ icon: Icon, title, value, color }: any) => {
  const colorMap: any = {
    "neon-cyan": "text-secondary bg-secondary/10",
    "neon-green": "text-primary bg-primary/10",
    "neon-lime": "text-accent bg-accent/10"
  };
  const theme = colorMap[color] || colorMap["neon-green"];
  const barColor = color === "neon-cyan" ? "bg-secondary" : color === "neon-lime" ? "bg-accent" : "bg-primary";

  return (
    <motion.div 
        whileHover={{ y: -10, scale: 1.03, rotateY: 5, rotateX: -2 }}
        className="bg-white rounded-3xl p-6 border border-border shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 relative group overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className={`w-12 h-12 rounded-2xl ${theme} flex items-center justify-center mb-6`}>
        <Icon className="w-6 h-6" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{title}</div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "70%" }}
            className={`h-full ${barColor}`}
        />
        </div>
    </motion.div>
  );
};

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroScroll = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(heroScroll.scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-background overflow-x-hidden selection:bg-primary selection:text-white">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 border-b border-border backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
            <a href="#ecosystem" className="hover:text-primary transition-colors">Neural Grid</a>
            <a href="#hardware" className="hover:text-primary transition-colors">Core Hardware</a>
            <a href="#ai" className="hover:text-primary transition-colors">AI Synthesis</a>
            <a href="#future" className="hover:text-primary transition-colors">Bio-Twin</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="px-5 py-2 text-xs uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition">Sign In</Link>
            <Link to="/dashboard" className="px-6 py-2.5 text-xs uppercase tracking-widest font-bold rounded-2xl bg-primary text-white shadow-md hover:bg-primary/90 hover:scale-105 transition-all">Launch OS</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
        <div className="absolute inset-0 grid-bg opacity-10" />
        <FloatParticles />
        <NeuralNode style={{ top: '25%', left: '15%' }} delay={1} />
        <NeuralNode style={{ top: '65%', left: '80%' }} delay={2.5} />
        <NeuralNode style={{ top: '45%', right: '10%' }} delay={0.5} />

        {/* Cinematic Rings */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div key={i}
              className="absolute rounded-full border border-primary/5"
              style={{ width: `${i * 350}px`, height: `${i * 350}px` }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
            >
              {i === 3 && (
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SectionTag>System Online · Global Neural Network Active</SectionTag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
            className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8 text-foreground">
            TRINEXA
            <br />
            <span className="text-primary">CORE OS</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-muted-foreground mb-4 font-medium tracking-tight">
            AI-Powered <span className="text-secondary">Smart Farm Operating System</span>
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Harness the power of planetary-scale satellite intelligence and localized neural edge-computing to orchestrate your entire agricultural ecosystem.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dashboard" className="group px-10 py-5 rounded-3xl bg-primary text-white font-bold text-lg shadow-lg hover:bg-primary/90 hover:scale-105 transition-all flex items-center gap-3">
              Establish Uplink <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/dashboard" className="px-10 py-5 rounded-3xl bg-white border border-border text-lg font-bold text-foreground hover:bg-muted/50 transition-all">View Simulation</Link>
          </motion.div>

          {/* Real-time stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { v: "1.2PB", l: "Processed Data", i: Cpu, c: "text-primary" },
              { v: "42ms", l: "Edge Latency", i: Zap, c: "text-secondary" },
              { v: "14.2K", l: "Connected Nodes", i: Network, c: "text-primary" },
              { v: "99.9%", l: "Network Uptime", i: ShieldCheck, c: "text-accent" },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-border rounded-3xl px-6 py-6 shadow-sm flex flex-col items-center gap-2">
                <s.i className={`w-5 h-5 ${s.c} opacity-80`} />
                <div className={`text-3xl font-bold ${s.c}`}>{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground/60 text-[10px] flex flex-col items-center gap-2 uppercase tracking-[0.4em] font-bold">
          <span>Initiate Descent</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* JOURNEY PATH */}
      <div className="relative pt-24 pb-48">
        {/* JOURNEY PATH - Background Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1px] z-[-1] hidden md:block opacity-30">
          <div className="h-full w-full bg-primary/10" />
          <motion.div 
            className="absolute top-0 left-0 w-full bg-primary/40 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
            style={{ height: useTransform(scaleProgress, [0, 1], ["0%", "100%"]) }}
          />
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map(p => (
            <div key={p} className="absolute w-2 h-2 rounded-full bg-white border border-primary/20 shadow-sm -translate-x-[3.5px] blur-[1px]" style={{ top: `${p * 100}%` }} />
          ))}
        </div>

        {/* SECTION 1 - GLOBAL NETWORK */}
        <Section id="ecosystem" tag="01 · Neural Grid" title="Planetary-scale orchestration"
          desc="Synchronize your entire agricultural estate across districts, states, and borders through a unified neural bridge.">
          <div className="relative h-[500px] rounded-[3rem] bg-white border border-border shadow-xl overflow-hidden group">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="w-64 h-64 text-primary/10 animate-pulse" strokeWidth={0.5} />
              {[...Array(12)].map((_, i) => (
                <motion.div key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary/40 shadow-sm"
                  style={{ left: `${25 + Math.random()*50}%`, top: `${30 + Math.random()*40}%` }}
                  animate={{ scale: [1, 2, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3 + Math.random()*3, repeat: Infinity }}
                />
              ))}
            </div>
            
            <div className="absolute bottom-10 left-10 md:left-auto md:right-10 flex flex-wrap gap-4">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg">
                <div className="text-3xl font-bold text-primary">14,247</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">Nodes Active</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg">
                <div className="text-3xl font-bold text-secondary">8.4TB/s</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">Live Telemetry</div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 2 - CORE HARDWARE */}
        <Section id="hardware" tag="02 · Core Edge" title="The field intelligence unit"
          desc="Ruggedized neural computers that process data at the edge, ensuring zero-latency automation even without internet.">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[450px] rounded-[3rem] bg-white border border-border shadow-xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-10" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] rounded-full border border-secondary/10 border-dashed"
              />
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-56 h-56 rounded-[3rem] bg-white border border-border shadow-2xl flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 rounded-3xl bg-primary/5 flex items-center justify-center mb-4">
                    <Hexagon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                </div>
                <div className="text-[10px] font-bold tracking-[0.4em] text-secondary uppercase">CORE-X3 UNIT</div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                  <Cpu className="w-6 h-6" />
                </div>
              </motion.div>
            </div>
            <div className="space-y-4">
              {[
                { t: "Neural Processing", d: "14 TOPS AI performance at the soil edge", i: Brain, c: "text-primary" },
                { t: "Long-Range Telemetry", d: "15km LoRaWAN coverage radius", i: Satellite, c: "text-secondary" },
                { t: "Atomic Clock Sync", d: "Precision timing for synchronized robotics", i: Activity, c: "text-primary" },
                { t: "Energy Autonomous", d: "Built-in solar-hybrid power management", i: Zap, c: "text-accent" }
              ].map((f, i) => (
                <motion.div key={f.t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i*0.1 }}
                  className="bg-white rounded-3xl p-6 flex items-start gap-5 border border-border shadow-sm group hover:shadow-md transition-all">
                  <div className={`w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center group-hover:scale-110 transition ${f.c}`}>
                    <f.i className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">{f.t}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{f.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* SECTION 3 - INTERACTIVE PREVIEW */}
        <Section id="ai" tag="03 · UI Synthesis" title="Unified Control Center"
          desc="Experience agricultural management like never before through our multi-dimensional command interface.">
          <div className="grid md:grid-cols-3 gap-6">
            <PreviewCard icon={Droplets} title="Hydro-Orchestration" value="14.2L / min" color="neon-cyan" />
            <PreviewCard icon={Activity} title="Bio-Vitals" value="92/100 Health" color="neon-green" />
            <PreviewCard icon={BarChart3} title="Yield Projection" value="+24% ROI" color="neon-lime" />
          </div>
          <div className="mt-12 bg-white rounded-[3rem] p-10 border border-border shadow-2xl relative overflow-hidden h-[500px] flex items-center justify-center group">
            {/* Background Visuals */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="/dashboard-mockup.png" 
                 alt="Dashboard Preview" 
                 className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-110 transition-transform duration-[2s] blur-[2px]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40" />
            </div>

            {/* Centered Content */}
            <div className="relative z-20 text-center flex flex-col items-center">
               <motion.div 
                 whileHover={{ scale: 1.05 }} 
                 whileTap={{ scale: 0.95 }}
                 className="inline-block"
               >
                 <Link to="/dashboard" className="px-12 py-6 rounded-3xl bg-primary text-white font-black text-xl shadow-2xl hover:bg-primary/90 transition-all flex items-center gap-3 backdrop-blur-md border border-white/20">
                   Enter Command Center <ArrowRight className="w-7 h-7" />
                 </Link>
               </motion.div>
               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8 text-[11px] font-black text-primary uppercase tracking-[0.6em] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10 shadow-sm"
               >
                 Real-time Telemetry Synthesis Active
               </motion.p>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 p-4 border border-primary/10 rounded-2xl bg-white/60 backdrop-blur-md hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest">UPLINK ESTABLISHED</span>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 p-4 border border-secondary/10 rounded-2xl bg-white/60 backdrop-blur-md hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest">ENCRYPTION ACTIVE</span>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <section className="relative py-48 px-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative max-w-4xl mx-auto"
          >
            <SectionTag>Initialize Protocol</SectionTag>
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-foreground">
              Ready to <span className="text-primary">Ascend?</span>
            </h2>
            <p className="text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Join 14,000+ pioneering farmers who have already established their neural agricultural network.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/dashboard" className="px-12 py-6 rounded-3xl bg-primary text-white font-black text-xl shadow-xl hover:bg-primary/90 hover:scale-105 transition-all flex items-center gap-3">
                Establish Link <ArrowRight className="w-6 h-6" />
              </Link>
              <Link to="/onboarding" className="px-12 py-6 rounded-3xl bg-white border border-border text-xl font-bold text-foreground hover:bg-muted/50 transition-all">
                Connect Farm
              </Link>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-border bg-white py-20 px-8 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <Logo />
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-left w-full max-w-4xl">
              {[
                { t: "Protocol", l: ["Satellite Sync", "Edge Processing", "Bio-Intelligence"] },
                { t: "Network", l: ["Global Nodes", "Security Shield", "API Access"] },
                { t: "Resources", l: ["Neural Docs", "Hardware Guide", "Support Uplink"] },
                { t: "Legal", l: ["Privacy Policy", "Terms of Service"] }
              ].map(group => (
                <div key={group.t}>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6">{group.t}</div>
                  <div className="flex flex-col gap-4 text-sm text-muted-foreground font-medium">
                    {group.l.map(link => <a key={link} href="#" className="hover:text-primary transition">{link}</a>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-24 pt-10 border-t border-border w-full flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-bold">
                © 2026 Trinexa Systems · Cultivating the future
              </div>
              <div className="flex gap-8 text-muted-foreground">
                <Globe className="w-5 h-5 hover:text-primary cursor-pointer transition" />
                <Network className="w-5 h-5 hover:text-primary cursor-pointer transition" />
                <ShieldCheck className="w-5 h-5 hover:text-primary cursor-pointer transition" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const Section = ({ id, tag, title, desc, children }: any) => (
  <section id={id} className="relative py-32 px-8 overflow-visible">
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20 relative"
      >
        {/* Background clearing for line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background/80 blur-3xl -z-10" />
        
        <SectionTag>{tag}</SectionTag>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9] text-foreground relative">
           {title}
           <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
           <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/5 rounded-full blur-3xl" />
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed font-medium">{desc}</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, perspective: 1000, rotateX: 5 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  </section>
);

export default Landing;
