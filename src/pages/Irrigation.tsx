import { Page, PageHeader } from "@/components/trinexa/Page";
import { Droplets, Power, PauseCircle, AlarmClock, ShieldAlert, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Irrigation = () => {
  const data = Array.from({length:7},(_,i)=>({day:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], used: 80+Math.random()*60, saved: 30+Math.random()*40}));
  return (
    <Page>
      <PageHeader tag="04 · Smart Irrigation" title="Irrigation control center" desc="Live water flow, automation, and efficiency"
        actions={<>
          <button className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-bold flex items-center gap-2 hover:bg-muted/80 transition"><PauseCircle className="w-4 h-4"/>Pause auto</button>
          <button className="px-4 py-2 rounded-xl bg-destructive text-white text-xs font-bold flex items-center gap-2 hover:bg-destructive/90 shadow-md transition active:scale-95"><ShieldAlert className="w-4 h-4"/>Emergency stop</button>
        </>}
      />
      <div className="grid lg:grid-cols-3 gap-6 mb-6 mt-4">
        <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground">Zone B · Irrigation active</h3>
              <p className="text-xs text-muted-foreground font-medium">Auto-triggered by AI · 12 min remaining</p>
            </div>
            <div className="px-3 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">ACTIVE</div>
          </div>
          <div className="relative h-44 rounded-2xl bg-muted/30 overflow-hidden border border-border/50">
            <motion.div className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-secondary/20 to-transparent" animate={{x:["-20%","120%"]}} transition={{duration:3, repeat:Infinity, ease:"linear"}}/>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold text-foreground">14.2</div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">litres / minute</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[{l:"Used today",v:"284 L", c:"text-primary"},{l:"Saved",v:"37%", c:"text-secondary"},{l:"Efficiency",v:"96%", c:"text-primary"},{l:"Mode",v:"Auto", c:"text-accent"}].map(x=>(
              <div key={x.l} className="bg-muted/30 rounded-xl p-3 text-center border border-border/50">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-0.5">{x.l}</div>
                <div className={`font-bold text-sm ${x.c}`}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {[
            {i:Power,t:"Start Motor",c:"text-primary bg-primary/10", d: "Manual override"},
            {i:Power,t:"Stop Motor",c:"text-destructive bg-destructive/10", d: "Immediate kill"},
            {i:AlarmClock,t:"Schedule Cycle",c:"text-secondary bg-secondary/10", d: "Planning module"},
            {i:Zap,t:"Auto Mode",c:"text-accent bg-accent/10", d: "AI-driven logic"}
          ].map(b=>(
            <button key={b.t} className="w-full bg-white border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-primary/20 transition group">
              <div className={`w-10 h-10 rounded-xl ${b.c} flex items-center justify-center transition-transform group-hover:scale-110`}><b.i className="w-5 h-5"/></div>
              <div className="text-left">
                <div className="font-bold text-foreground text-sm">{b.t}</div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{b.d}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white border border-border rounded-2xl p-5 mb-8 shadow-sm">
        <h3 className="font-bold mb-4 text-foreground">Weekly water · used vs saved (litres)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} tick={{fontWeight:600}}/>
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} tick={{fontWeight:600}}/>
            <Tooltip contentStyle={{background:"hsl(var(--card))",border:"1px solid hsl(var(--border))",borderRadius:12,boxShadow:"0 10px 15px -3px rgba(0,0,0,0.1)"}}/>
            <Bar dataKey="used" fill="hsl(var(--secondary))" radius={[6,6,0,0]} barSize={30} />
            <Bar dataKey="saved" fill="hsl(var(--primary))" radius={[6,6,0,0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Page>
  );
};
