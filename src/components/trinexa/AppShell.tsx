import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Activity, Brain, Droplets, CloudSun, TrendingUp, Receipt, BarChart3, Cpu, Heart, Zap, FileText, Settings, Bell, Mic, ChevronDown, Wifi, Battery, Sun, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";
import { Drawer } from "vaul";
import { useTranslation } from "react-i18next";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const { isListening, startListening } = useVoiceAssistant();
  const [farm, setFarm] = useState("Green Valley Estate");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: t("dashboard") },
    { to: "/sensors", icon: Activity, label: t("sensors") },
    { to: "/crop-ai", icon: Brain, label: t("crop_ai") },
    { to: "/irrigation", icon: Droplets, label: t("irrigation") },
    { to: "/weather", icon: CloudSun, label: t("weather") },
    { to: "/market", icon: TrendingUp, label: t("market") },
    { to: "/expenses", icon: Receipt, label: t("expenses") },
    { to: "/settings", icon: Settings, label: t("settings") },
  ];

  const mobileNavItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: t("dashboard").substring(0, 4) },
    { to: "/sensors", icon: Activity, label: t("sensors") },
    { to: "/crop-ai", icon: Brain, label: t("crop_ai") },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex bg-background pb-20 md:pb-0">
      {/* Sidebar - Desktop Only */}
      <aside className="w-64 border-r border-border/50 glass-strong flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-border/50">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link key={item.to} to={item.to}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active ? 'text-primary bg-primary/5 font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}>
                {active && <motion.div layoutId="activeNav" className="absolute inset-0 rounded-xl border border-primary/20 bg-primary/5" />}
                <item.icon className={`w-4 h-4 relative z-10 ${active ? 'text-primary' : ''}`} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2 px-1">{t("language")}</div>
            <div className="grid grid-cols-3 gap-1 bg-muted/30 p-1 rounded-xl">
              {['en', 'hi', 'kn'].map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
                    i18n.language === lng ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-muted/30 border border-border/50 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">System</span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Active
              </span>
            </div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Last sync</span><span className="font-mono">2s</span></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border/50 glass-strong flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
               <Logo />
            </div>
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white text-sm hover:bg-muted/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-bold">{farm}</span>
              <ChevronDown className="w-4 h-4 opacity-60" />
            </button>
            <div className="hidden lg:flex items-center gap-3 text-xs text-muted-foreground font-bold">
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-primary" /> 5G</span>
              <span className="flex items-center gap-1"><Battery className="w-3 h-3 text-secondary" /> 96%</span>
              <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-accent" /> Solar</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white text-xs">
              <CloudSun className="w-4 h-4 text-secondary" />
              <span className="font-bold">28°C · Partly cloudy</span>
            </div>
            <button 
              onClick={startListening}
              className={`w-9 h-9 rounded-lg border border-border flex items-center justify-center transition-all ${
                isListening ? 'bg-primary border-primary animate-pulse' : 'bg-white hover:border-primary/40'
              }`}
            >
              <Mic className={`w-4 h-4 ${isListening ? 'text-white' : 'text-primary'}`} />
            </button>
            <button className="w-9 h-9 rounded-lg border border-border bg-white hover:border-primary/40 flex items-center justify-center relative transition">
              <Bell className="w-4 h-4 text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
            </button>
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-xs font-bold text-white shadow-md">AK</div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass-strong border-t border-border/50 z-50 flex items-center justify-around px-2 pb-safe">
        {mobileNavItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className="flex flex-col items-center justify-center w-full h-full gap-1">
              <div className={`p-2 rounded-xl transition-all ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold ${active ? 'text-primary' : 'text-muted-foreground'}`}>{item.label}</span>
            </Link>
          );
        })}
        <button onClick={() => setIsDrawerOpen(true)} className="flex flex-col items-center justify-center w-full h-full gap-1">
          <div className="p-2 rounded-xl transition-all text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">Menu</span>
        </button>
      </nav>

      {/* Mobile Drawer using Vaul */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[2rem] h-[85vh] mt-24 fixed bottom-0 left-0 right-0 z-50 border-t border-border shadow-2xl">
            <div className="p-4 bg-white rounded-t-[2rem] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-8" />
              <div className="flex items-center justify-between mb-6 px-2">
                <Logo />
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-muted/20 rounded-full text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-muted/30 border border-border rounded-xl p-4 mb-6">
                 <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">Active Farm</div>
                 <div className="flex items-center justify-between">
                   <div className="font-bold text-primary">{farm}</div>
                   <ChevronDown className="w-4 h-4 text-muted-foreground" />
                 </div>
              </div>

              <div className="space-y-1 mb-8">
                {navItems.map((item) => (
                  <Link 
                    key={item.to} 
                    to={item.to}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-all"
                  >
                    <item.icon className="w-5 h-5 text-primary/70" />
                    <span className="font-bold text-base">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-bold">System Status</span>
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground font-bold">Battery</span><span className="font-bold text-secondary">96%</span></div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};
