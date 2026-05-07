import * as Icons from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Page, PageHeader } from "@/components/trinexa/Page";
import { generateSparkData } from "@/lib/mockData";
import { useSimulation } from "@/lib/SimulationContext";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export const Sensors = () => {
  const { sensors } = useSimulation();
  return (
    <Page>
      <PageHeader tag="01 · Sensor Network" title="Live sensor grid" desc="All field sensors streaming in real time" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {sensors.map(s => {
          const Icon = (Icons as any)[s.icon] || Icons.Activity;
          return (
            <Link key={s.id} to={`/sensors/${s.id}`} className="bg-white border border-border rounded-2xl p-4 md:p-5 hover:shadow-md transition group border-transparent hover:border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-${s.color}/10 flex items-center justify-center`}><Icon className={`w-4 h-4 md:w-5 md:h-5 text-${s.color}`} /></div>
                <span className={`text-[9px] md:text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary`}>{s.status}</span>
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground font-bold truncate">{s.name}</div>
              <div className="text-2xl md:text-3xl font-bold mt-1 text-foreground">{s.value}<span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">{s.unit}</span></div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-2 font-mono flex items-center gap-1">
                <span className={`font-bold ${s.trend > 0 ? 'text-primary' : 'text-accent'}`}>{s.trend > 0 ? '▲' : '▼'} {Math.abs(s.trend)}%</span> vs yesterday
              </div>
            </Link>
          );
        })}
      </div>
    </Page>
  );
};

type Timeframe = 'H' | 'D' | 'W' | 'M' | 'Y';

export const SensorDetail = () => {
  const { id } = useParams();
  const { sensors, updateSensor, logActivity } = useSimulation();
  const [timeframe, setTimeframe] = useState<Timeframe>('D');
  const [isExporting, setIsExporting] = useState(false);
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const s = sensors.find(x => x.id === id) || sensors[0];
  const Icon = (Icons as any)[s.icon] || Icons.Activity;

  const chartData = useMemo(() => {
    const points = timeframe === 'H' ? 60 : timeframe === 'D' ? 24 : timeframe === 'W' ? 7 : timeframe === 'M' ? 30 : 12;
    return generateSparkData(points, s.value, 15);
  }, [timeframe, s.value]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Report Exported", {
        description: `${s.name} ${timeframe} report saved to devices.`
      });
      logActivity({ time: "Just now", type: "sensor", text: `Exported ${s.name} analytics report` });
    }, 1500);
  };

  const handleRecalibrate = () => {
    setIsRecalibrating(true);
    setTimeout(() => {
      setIsRecalibrating(false);
      updateSensor(s.id, { status: 'optimal' });
      toast.success("Sensor Recalibrated", { description: `${s.name} is now operating within optimal parameters.` });
      logActivity({ time: "Just now", type: "sensor", text: `Recalibrated ${s.name} successfully` });
    }, 2000);
  };

  const handleSaveThresholds = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    toast.success("Thresholds Updated", { description: "New alert parameters synced to the edge device." });
    logActivity({ time: "Just now", type: "sensor", text: `Updated alert thresholds for ${s.name}` });
  };

  return (
    <Page>      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Link to="/sensors" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mb-2 transition font-bold">
            <Icons.ArrowLeft className="w-3 h-3" /> BACK TO NETWORK
          </Link>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-${s.color}/10 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${s.color}`} /></div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{s.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 bg-white border border-border p-1 rounded-xl w-full md:w-auto shadow-sm">
          {(['H', 'D', 'W', 'M', 'Y'] as Timeframe[]).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`flex-1 md:flex-none px-3 md:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === t 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Chart */}
          <div className="bg-white border border-border rounded-3xl p-4 md:p-6 relative overflow-hidden shadow-sm">
            <div className="flex items-end justify-between mb-8 relative z-10">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-foreground">{s.value}<span className="text-base md:text-lg text-muted-foreground ml-2 font-normal">{s.unit}</span></div>
                <div className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1.5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live stream active
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Avg {timeframe}</div>
                <div className="text-lg md:text-xl font-bold text-foreground">{(Number(s.value) * 0.98).toFixed(1)} {s.unit}</div>
              </div>
            </div>
            
            <div className="h-[250px] md:h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={`hsl(var(--${s.color}))`} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={`hsl(var(--${s.color}))`} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="x" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontWeight: 600 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10} 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}${s.unit}`}
                    width={40}
                    tick={{ fontWeight: 600 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: 12,
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
                    }} 
                    itemStyle={{ color: `hsl(var(--${s.color}))`, fontSize: 12, fontWeight: 700 }}
                    labelStyle={{ fontSize: 10, color: "hsl(var(--muted-foreground))", fontWeight: 700, marginBottom: 4 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="y" 
                    stroke={`hsl(var(--${s.color}))`} 
                    strokeWidth={3} 
                    fill="url(#sg)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-border rounded-2xl p-5 md:p-6 border-l-4 border-secondary">
              <div className="flex items-center gap-2 mb-4">
                <Icons.Brain className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-foreground">AI Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                The {s.name.toLowerCase()} levels are <span className="text-primary font-bold">Optimal</span>. 
                Based on weather forecasts, we expect a 12% drop in {timeframe === 'D' ? 'the next 6 hours' : 'the coming week'}. 
                No manual adjustment required.
              </p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-5 md:p-6 border-l-4 border-accent">
              <div className="flex items-center gap-2 mb-4">
                <Icons.FileText className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-foreground">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition group"
                >
                  <span className="text-sm font-bold text-foreground">Export Data (.csv)</span>
                  {isExporting ? <Icons.Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Icons.Download className="w-4 h-4 text-muted-foreground group-hover:translate-y-0.5 transition" />}
                </button>
                <button 
                  onClick={handleRecalibrate}
                  disabled={isRecalibrating}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition group"
                >
                  <span className="text-sm font-bold text-foreground">Recalibrate Sensor</span>
                  {isRecalibrating ? <Icons.Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Icons.RefreshCw className="w-4 h-4 text-muted-foreground group-hover:rotate-180 transition duration-500" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pb-8">
          {/* Threshold Alerts */}
          <div className="bg-white border border-border rounded-3xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Icons.BellRing className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Threshold Alerts</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: "Critical Low", value: (Number(s.value) * 0.5).toFixed(1), color: "text-destructive" },
                { label: "Warning Low", value: (Number(s.value) * 0.7).toFixed(1), color: "text-accent" },
                { label: "Warning High", value: (Number(s.value) * 1.3).toFixed(1), color: "text-accent" },
                { label: "Critical High", value: (Number(s.value) * 1.5).toFixed(1), color: "text-destructive" },
              ].map((t) => (
                <div key={t.label} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{t.label}</span>
                    <span className={`text-sm font-bold font-mono ${t.color}`}>{t.value} {s.unit}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full opacity-60 bg-current ${t.color}`} style={{ width: `${Math.random() * 40 + 30}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setIsEditModalOpen(true)} className="w-full mt-6 py-3 rounded-xl border-2 border-primary/20 text-primary text-xs font-bold hover:bg-primary/5 transition">
              EDIT THRESHOLDS
            </button>
          </div>

          {/* Sensor Info */}
          <div className="bg-white border border-border rounded-3xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Icons.Info className="w-5 h-5 text-secondary" />
              <h3 className="font-bold text-foreground">Device Status</h3>
            </div>
            <div className="space-y-4">
              {[
                { l: "Uptime", v: "142 days" },
                { l: "Battery", v: "94%", c: "text-primary" },
                { l: "Signal", v: "-64 dBm", c: "text-secondary" },
                { l: "Firmware", v: "v2.4.1" },
                { l: "Last Sync", v: "2s ago" },
              ].map(i => (
                <div key={i.l} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">{i.l}</span>
                  <span className={`font-mono font-bold ${i.c || 'text-foreground'}`}>{i.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Thresholds Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white border border-border rounded-3xl p-6 shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-1 text-foreground">Configure Thresholds</h2>
              <p className="text-xs text-muted-foreground mb-6 font-medium">Set alert parameters for {s.name.toLowerCase()}</p>
              
              <form onSubmit={handleSaveThresholds} className="space-y-4">
                {['Critical Low', 'Warning Low', 'Warning High', 'Critical High'].map((label, idx) => (
                   <div key={label}>
                     <div className="flex justify-between text-xs mb-1 font-bold">
                       <span className="text-muted-foreground">{label}</span>
                       <span className="font-mono text-primary">{(Number(s.value) * (0.5 + idx*0.2)).toFixed(1)} {s.unit}</span>
                     </div>
                     <input type="range" className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer" />
                   </div>
                ))}
                
                <div className="pt-4 flex gap-3">
                   <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-xs font-bold text-muted-foreground hover:bg-muted/80 transition">Cancel</button>
                   <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary/90 transition">Sync to Device</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Page>
  );
};
