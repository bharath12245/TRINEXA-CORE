import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { AppShell } from "@/components/trinexa/AppShell";
import { Sparkline } from "@/components/trinexa/Sparkline";
import { generateSparkData } from "@/lib/mockData";
import { useSimulation } from "@/lib/SimulationContext";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const { sensors, farms, activities, addFarm } = useSimulation();
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false);
  const [newFarmName, setNewFarmName] = useState("");
  const [newFarmSize, setNewFarmSize] = useState("");

  const yieldData = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    yield: 40 + Math.sin(i / 2) * 20 + i * 3,
    forecast: 45 + Math.sin(i / 2) * 18 + i * 3.5,
  }));

  const handleAddFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmName || !newFarmSize) return;
    
    addFarm({
      id: Date.now(),
      name: newFarmName,
      location: "New Zone",
      area: `${newFarmSize} acres`,
      crop: "Mixed",
      health: 100,
      status: "syncing"
    });
    
    setIsAddFarmOpen(false);
    setNewFarmName("");
    setNewFarmSize("");
    toast.success("Farm Added", { description: "Establishing satellite uplink..." });
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Greeting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2">{t("system_commander")}</div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Your farms are <span className="text-primary">{t("operating_optimally")}</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">{farms.length} farms · 44.7 acres · last sync 2 seconds ago</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex-1 md:flex-none px-4 py-2.5 md:py-2 rounded-xl border border-border bg-white text-xs font-bold hover:bg-muted/50 transition">Export report</button>
            <button onClick={() => setIsAddFarmOpen(true)} className="flex-1 md:flex-none px-4 py-2.5 md:py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-lg hover:shadow-xl transition active:scale-95">
              + {t("add_farm")}
            </button>
          </div>
        </div>

        {/* System status strip */}
        <div className="bg-white border border-border shadow-sm rounded-2xl p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { l: "System", v: "Active", c: "bg-primary", pulse: true },
            { l: "Device health", v: "98%", c: "bg-secondary" },
            { l: "Battery", v: "96% · 8h", c: "bg-primary" },
            { l: "Solar", v: "Charging", c: "bg-primary", pulse: true },
            { l: "Signal", v: "5G · -68 dBm", c: "bg-secondary" },
          ].map(s => (
            <div key={s.l} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${s.c} ${s.pulse ? 'animate-pulse' : ''}`} />
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{s.l}</div>
                <div className="text-sm font-bold text-foreground">{s.v}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sensor grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">{t("live_sensors")}</h2>
            <Link to="/sensors" className="text-xs text-primary font-bold hover:underline">{t("view_all")} →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {sensors.slice(0, 10).map((s, i) => {
              const Icon = (Icons as any)[s.icon] || Icons.Activity;
              const colorClass = s.color === 'neon-green' ? 'text-primary' : s.color === 'neon-cyan' ? 'text-secondary' : 'text-accent';
              const bgClass = s.color === 'neon-green' ? 'bg-primary/10' : s.color === 'neon-cyan' ? 'bg-secondary/10' : 'bg-accent/10';
              
              return (
                <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to={`/sensors/${s.id}`} className="block bg-white border border-border rounded-2xl p-3 md:p-4 hover:shadow-md transition group">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl ${bgClass} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${colorClass}`} />
                      </div>
                      <span className={`text-[9px] md:text-[10px] uppercase tracking-widest font-bold ${s.trend > 0 ? 'text-primary' : 'text-accent'}`}>
                        {s.trend > 0 ? '▲' : '▼'} {Math.abs(s.trend)}%
                      </span>
                    </div>
                    <div className="text-[10px] md:text-[11px] uppercase tracking-wider text-muted-foreground truncate font-bold">{s.name}</div>
                    <div className="text-xl md:text-2xl font-bold mt-1 text-foreground">{s.value}<span className="text-[10px] md:text-xs text-muted-foreground ml-1 font-normal">{s.unit}</span></div>
                    <div className="mt-2 -mx-1">
                      <Sparkline data={generateSparkData(20, s.value, 15)} color={s.color === 'neon-green' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Yield chart + AI insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-4 md:p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="font-bold text-foreground">Yield performance vs forecast</h3>
                <p className="text-xs text-muted-foreground font-medium">Quintals per acre · last 12 months</p>
              </div>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Actual</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary" />Forecast</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="yg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="yc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} width={30} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                <Area type="monotone" dataKey="forecast" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="4 4" fill="url(#yc)" />
                <Area type="monotone" dataKey="yield" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#yg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-sm">
            <h3 className="font-bold mb-1 text-foreground">{t("ai_insights")}</h3>
            <p className="text-xs text-muted-foreground mb-4 font-medium">Generated 2 minutes ago</p>
            <div className="space-y-3">
              {[
                { i: Icons.Droplets, t: "Irrigate Zone B", d: "18 min recommended", c: "text-secondary bg-secondary/10" },
                { i: Icons.Brain, t: "Apply foliar spray", d: "Risk 14% — preventive", c: "text-accent bg-accent/10" },
                { i: Icons.TrendingUp, t: "Sell wheat now", d: "Price up 4.2%, peak window", c: "text-primary bg-primary/10" },
                { i: Icons.CloudRain, t: "Pause irrigation tomorrow", d: "Rainfall in 14h", c: "text-secondary bg-secondary/10" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg ${c.c} flex items-center justify-center flex-shrink-0`}>
                    <c.i className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-foreground">{c.t}</div>
                    <div className="text-[11px] text-muted-foreground font-medium">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Farms + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-8">
          <div className="lg:col-span-2">
            <h3 className="font-bold mb-3 text-foreground">Your farms</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {farms.map(f => (
                <div key={f.id} className="bg-white border border-border rounded-2xl p-4 md:p-5 hover:shadow-md transition group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{f.name}</div>
                      <div className="text-xs text-muted-foreground font-medium">{f.location} · {f.area}</div>
                    </div>
                    <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${f.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                      {f.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-bold">{f.crop}</div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 md:w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${f.health}%` }} />
                      </div>
                      <span className="text-sm font-bold text-foreground">{f.health}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-sm">
            <h3 className="font-bold mb-3 text-foreground">Activity timeline</h3>
            <div className="space-y-4 max-h-80 overflow-auto scrollbar-hide pr-2">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40 mt-1.5" />
                    {i < activities.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-2 min-w-0">
                    <div className="text-[10px] text-muted-foreground font-bold tracking-wider mb-0.5 uppercase">{a.time}</div>
                    <div className="text-sm text-foreground/90 font-bold leading-snug">{a.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Farm Modal */}
      <AnimatePresence>
        {isAddFarmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddFarmOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-border"
            >
              <h2 className="text-2xl font-black mb-2 text-foreground">Register New Node</h2>
              <p className="text-sm text-muted-foreground mb-6 font-medium">Initialize a new farm node to the neural grid.</p>
              <form onSubmit={handleAddFarm} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Farm Designation</label>
                  <input 
                    required autoFocus
                    value={newFarmName} onChange={(e) => setNewFarmName(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" 
                    placeholder="e.g. Sector 7 Orchards" 
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Area (Acres)</label>
                  <input 
                    required type="number" step="0.1"
                    value={newFarmSize} onChange={(e) => setNewFarmSize(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-muted/30 border border-border text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium" 
                    placeholder="e.g. 14.5" 
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsAddFarmOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-bold hover:bg-muted/30">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg hover:shadow-xl transition">Initialize</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppShell>
  );
};

export default Dashboard;
