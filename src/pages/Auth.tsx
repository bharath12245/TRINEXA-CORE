import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/trinexa/Logo";
import { ArrowRight, Smartphone, Mail, Lock, ChevronLeft, ShieldCheck, Fingerprint } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AuthMode = 'login' | 'register' | 'otp' | 'forgot';

export const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login' || mode === 'otp') {
        toast.success("Identity Verified", { description: "Establishing secure command link." });
        navigate('/dashboard');
      } else if (mode === 'register') {
        setMode('otp');
        toast.success("Verification Code Sent", { description: "Please check your registered mobile." });
      } else if (mode === 'forgot') {
        setMode('login');
        toast.success("Recovery Link Sent", { description: "Check your inbox for instructions." });
      }
    }, 1500);
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(var(--primary-rgb),0.1),transparent_70%)]"/>
      <div className="absolute inset-0 grid-bg opacity-10"/>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div 
          key={mode}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-border"
        >
          <div className="flex justify-center mb-10">
            <Logo />
          </div>

          <form onSubmit={handleAction} className="space-y-6">
            {mode === 'login' && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Welcome Back</h1>
                  <p className="text-sm text-muted-foreground font-medium">Synchronize with your Trinexa command center</p>
                </div>
                <div className="space-y-4">
                  <div className="relative group">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition" />
                    <input required placeholder="Mobile number" className="w-full pl-11 pr-4 py-4 rounded-2xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition" />
                    <input required type="password" placeholder="Access key" className="w-full pl-11 pr-4 py-4 rounded-2xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer font-medium">
                    <input type="checkbox" className="rounded border-border bg-transparent text-primary focus:ring-0" />
                    Remember device
                  </label>
                  <button type="button" onClick={() => setMode('forgot')} className="text-xs text-secondary font-bold hover:underline transition">Forgot key?</button>
                </div>
              </>
            )}

            {mode === 'register' && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Connect Farm</h1>
                  <p className="text-sm text-muted-foreground font-medium">Join the global neural farming network</p>
                </div>
                <div className="space-y-4">
                  <div className="relative group">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition" />
                    <input required placeholder="Full name" className="w-full pl-11 pr-4 py-4 rounded-2xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="relative group">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition" />
                    <input required placeholder="Mobile number" className="w-full pl-11 pr-4 py-4 rounded-2xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition" />
                    <input required type="password" placeholder="Create access key" className="w-full pl-11 pr-4 py-4 rounded-2xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
              </>
            )}

            {mode === 'otp' && (
              <>
                <button type="button" onClick={() => setMode('register')} className="absolute left-8 top-10 text-muted-foreground hover:text-primary transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Verify Signal</h1>
                  <p className="text-sm text-muted-foreground px-4 font-medium">We've sent a 6-digit verification code to your device</p>
                </div>
                <div className="flex justify-between gap-2 px-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input key={i} maxLength={1} className="w-12 h-14 rounded-xl bg-muted/30 border border-border text-center text-xl font-bold focus:outline-none focus:border-primary/50 focus:bg-white transition-all" />
                  ))}
                </div>
                <div className="text-center mt-4">
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary font-bold transition">Resend code in 42s</button>
                </div>
              </>
            )}

            {mode === 'forgot' && (
              <>
                <button type="button" onClick={() => setMode('login')} className="absolute left-8 top-10 text-muted-foreground hover:text-primary transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Key Recovery</h1>
                  <p className="text-sm text-muted-foreground font-medium">Enter your registered email to reset access</p>
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition" />
                  <input required type="email" placeholder="Email address" className="w-full pl-11 pr-4 py-4 rounded-2xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" />
                </div>
              </>
            )}

            <button 
              disabled={loading}
              className="w-full py-4.5 rounded-2xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : (
                  <>
                    {mode === 'login' ? 'Establish Link' : mode === 'register' ? 'Generate Identity' : mode === 'otp' ? 'Verify Identity' : 'Send Recovery Link'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </>
                )}
              </span>
            </button>

            {mode === 'login' && (
              <div className="text-center text-xs text-muted-foreground font-medium">
                First time at Trinexa? <button type="button" onClick={() => setMode('register')} className="text-primary font-bold hover:underline">Register Farm →</button>
              </div>
            )}
            {mode === 'register' && (
              <div className="text-center text-xs text-muted-foreground font-medium">
                Already connected? <button type="button" onClick={() => setMode('login')} className="text-primary font-bold hover:underline">Sign in →</button>
              </div>
            )}
          </form>
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold text-center">
        Secured by Trinexa Neural Shield · v3.0.4
      </div>
    </div>
  );
};

export const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden p-6 flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(var(--primary-rgb),0.1),transparent_70%)]"/>
      <div className="absolute inset-0 grid-bg opacity-10"/>
      
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-10 md:p-12 border border-border shadow-2xl">
        <div className="flex justify-center mb-8"><Logo/></div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold text-center mb-3">Module Configuration · Step 01</div>
        <h1 className="text-4xl font-black text-center mb-3 tracking-tight text-foreground">Calibrate Your Ecosystem</h1>
        <p className="text-sm text-muted-foreground text-center mb-10 max-w-md mx-auto leading-relaxed font-medium">
          Help Trinexa Core understand your farmland environment for precise AI orchestration.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { l: "Farm Identification", p: "e.g. Green Valley Estate" },
            { l: "Estate Dimension (Acres)", p: "e.g. 14.5" },
            { l: "Primary Bio-Type", p: "e.g. Rice + Wheat" },
            { l: "Soil Composition", p: "e.g. Clay Loam" },
            { l: "Hydration Method", p: "e.g. Drip Irrigation" },
            { l: "Energy Source", p: "e.g. Solar Hybrid" }
          ].map(field => (
            <div key={field.l} className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold ml-1">{field.l}</label>
              <input placeholder={field.p} className="w-full px-5 py-3.5 rounded-2xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" />
            </div>
          ))}
        </div>

        <motion.div 
          whileHover={{ scale: 1.01, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
          className="mt-8 border-2 border-dashed border-primary/20 rounded-3xl p-8 text-center cursor-pointer hover:border-primary/40 transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div className="font-bold text-lg text-foreground">Initialize Field Mapping</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">Capture GPS coordinates and field imagery for satellite sync</div>
        </motion.div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-8 w-full py-4.5 rounded-2xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
        >
          Continue to Pairing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </button>
      </motion.div>
    </div>
  );
};
