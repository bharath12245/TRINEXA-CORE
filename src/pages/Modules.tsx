import { Page, PageHeader } from "@/components/trinexa/Page";
import { motion } from "framer-motion";
import { Cpu, Wifi, Battery, Activity, Plus, Heart } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { generateSparkData } from "@/lib/mockData";

export const Analytics = () => {
  const data = Array.from({length:12},(_,i)=>({m:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], water:60+Math.random()*40, energy:40+Math.random()*30}));
  return (
    <Page>
      <PageHeader tag="08 · Analytics" title="Business intelligence" desc="Sustainability, efficiency, and profitability metrics"/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{v:"37%",l:"Water saved"},{v:"+24%",l:"Yield uplift"},{v:"₹2.4L",l:"Profit/season"},{v:"68%",l:"Solar share"},{v:"99.7%",l:"Sensor uptime"},{v:"0.4t",l:"CO₂ saved"},{v:"94/100",l:"AI efficiency"},{v:"42min",l:"Avg auto-irrig"}].map(s=>(
          <div key={s.l} className="glass rounded-2xl p-5"><div className="text-3xl font-bold text-gradient">{s.v}</div><div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div></div>
        ))}
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold mb-3">Resource usage · 12 months</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11}/>
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11}/>
            <Tooltip contentStyle={{background:"hsl(var(--card))",border:"1px solid hsl(var(--border))",borderRadius:12}}/>
            <Bar dataKey="water" fill="hsl(var(--neon-cyan))" radius={[6,6,0,0]}/>
            <Bar dataKey="energy" fill="hsl(var(--neon-lime))" radius={[6,6,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Page>
  );
};

export const Devices = () => {
  const devs = [
    {n:"Trinexa Core X3",s:"online",fw:"v3.0.4",sig:-68,bat:96},
    {n:"Soil node A1",s:"online",fw:"v2.1.0",sig:-72,bat:88},
    {n:"Soil node A2",s:"online",fw:"v2.1.0",sig:-78,bat:74},
    {n:"Weather station",s:"online",fw:"v1.8.2",sig:-65,bat:91},
    {n:"Water pump relay",s:"online",fw:"v1.4.0",sig:-70,bat:100},
    {n:"NPK probe",s:"warning",fw:"v2.0.1",sig:-85,bat:42},
  ];
  return (
    <Page>
      <PageHeader tag="09 · Hardware" title="Device health" desc="Connected sensors and edge devices"
        actions={<button className="px-4 py-2 rounded-xl bg-gradient-primary text-background text-sm font-semibold flex items-center gap-2"><Plus className="w-4 h-4"/>Pair device</button>}/>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devs.map(d=>(
          <div key={d.n} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center"><Cpu className="w-5 h-5 text-neon-green"/></div>
              <span className={`text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full ${d.s==='online' ? 'bg-neon-green/15 text-neon-green' : 'bg-neon-lime/15 text-neon-lime'}`}>{d.s}</span>
            </div>
            <div className="font-semibold">{d.n}</div>
            <div className="text-xs text-muted-foreground font-mono mt-1">{d.fw}</div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-2 text-xs"><Wifi className="w-3 h-3 text-neon-cyan"/>{d.sig} dBm</div>
              <div className="flex items-center gap-2 text-xs"><Battery className="w-3 h-3 text-neon-lime"/>{d.bat}%</div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export const FarmHealth = () => (
  <Page>
    <PageHeader tag="10 · Health" title="Farm health score" desc="Holistic vitals across soil, climate, devices, and yield"/>
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="glass-strong rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"/>
        <svg className="w-56 h-56 -rotate-90 relative" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke="hsl(var(--muted))" strokeWidth="14" fill="none"/>
          <motion.circle cx="100" cy="100" r="80" stroke="url(#hg)" strokeWidth="14" strokeLinecap="round" fill="none"
            strokeDasharray="502" initial={{strokeDashoffset:502}} animate={{strokeDashoffset:502*(1-0.87)}} transition={{duration:2,ease:"easeOut"}}/>
          <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="hsl(var(--neon-green))"/><stop offset="100%" stopColor="hsl(var(--neon-cyan))"/></linearGradient></defs>
        </svg>
        <div className="absolute flex flex-col items-center"><div className="text-6xl font-bold text-gradient">87</div><div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">/ 100</div><div className="text-sm text-neon-green mt-2 font-mono">Excellent</div></div>
      </div>
      <div className="lg:col-span-2 grid grid-cols-2 gap-3">
        {[{l:"Soil quality",v:92},{l:"Irrigation efficiency",v:96},{l:"Weather conditions",v:85},{l:"Crop health",v:88},{l:"Sensor stability",v:99},{l:"Device health",v:94}].map(m=>(
          <div key={m.l} className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2"><span className="text-sm">{m.l}</span><span className="font-bold text-neon-green">{m.v}</span></div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-gradient-primary" style={{width:`${m.v}%`}}/></div>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

export const Automation = () => {
  const rules = [
    {n:"Smart irrigation",c:"IF moisture < 30% AND rain < 40% THEN irrigate(zone_b, 18min)",s:"active"},
    {n:"Solar priority",c:"IF solar_output > 200W THEN switch(solar_mode)",s:"active"},
    {n:"Disease alert",c:"IF humidity > 80% AND temp > 28°C THEN notify(disease_risk)",s:"active"},
    {n:"Night water save",c:"IF time BETWEEN 22:00-05:00 THEN reduce_flow(50%)",s:"paused"},
  ];
  return (
    <Page>
      <PageHeader tag="11 · Rules" title="Automation engine" desc="Compose IF-THEN automations executed at the edge"
        actions={<button className="px-4 py-2 rounded-xl bg-gradient-primary text-background text-sm font-semibold flex items-center gap-2"><Plus className="w-4 h-4"/>New rule</button>}/>
      <div className="space-y-3">
        {rules.map(r=>(
          <div key={r.n} className="glass rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold">{r.n}</div>
              <code className="text-xs text-muted-foreground font-mono">{r.c}</code>
            </div>
            <span className={`text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded-full ${r.s==='active' ? 'bg-neon-green/15 text-neon-green' : 'bg-muted text-muted-foreground'}`}>{r.s}</span>
          </div>
        ))}
      </div>
    </Page>
  );
};

export const Reports = () => (
  <Page>
    <PageHeader tag="12 · Reports" title="Generate reports" desc="Export PDFs and analytics across every module"/>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {["Sensor report","Irrigation report","Expense report","Yield estimate","Weather log","AI insights digest","Device health audit","Sustainability report","Season summary"].map(r=>(
        <div key={r} className="glass rounded-2xl p-5 hover:shadow-glow transition cursor-pointer">
          <Activity className="w-6 h-6 text-neon-green mb-3"/>
          <div className="font-semibold">{r}</div>
          <div className="text-xs text-muted-foreground mt-1">Last generated 2d ago</div>
          <button className="mt-3 text-xs text-neon-cyan hover:underline">Download PDF →</button>
        </div>
      ))}
    </div>
  </Page>
);

export const Settings = () => (
  <Page>
    <PageHeader tag="13 · Settings" title="Account & preferences" desc="Profile, language, notifications, and integrations"/>
    <div className="grid lg:grid-cols-2 gap-4">
      {[
        {t:"Profile",d:"Arjun Kulkarni · +91 98765 43210"},
        {t:"Language",d:"English (auto-translate to Marathi enabled)"},
        {t:"Notifications",d:"Push, SMS, and WhatsApp alerts enabled"},
        {t:"Integrations",d:"Mandi APIs · Weather APIs · Bank ledger"},
        {t:"Voice assistant",d:"Hindi + English · always-listening off"},
        {t:"Data & sync",d:"Offline cache enabled · cloud sync hourly"},
      ].map(s=>(
        <div key={s.t} className="glass rounded-2xl p-5">
          <div className="font-semibold">{s.t}</div>
          <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
        </div>
      ))}
    </div>
  </Page>
);
