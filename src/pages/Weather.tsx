import { Page, PageHeader } from "@/components/trinexa/Page";
import { Sun, CloudRain, CloudSun, Wind, AlertTriangle } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Weather = () => {
  const hourly = Array.from({length:24},(_,i)=>({h:`${i}h`, t:24+Math.sin(i/4)*6, r:i>14 && i<22 ? 60+Math.random()*30 : Math.random()*15}));
  return (
    <Page>
      <PageHeader tag="05 · Weather" title="Hyperlocal weather intelligence" desc="GPS-precise forecasts blended with on-farm sensors"/>
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <CloudSun className="w-16 h-16 md:w-20 md:h-20 text-secondary"/>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-foreground">28.6°</div>
              <div className="text-muted-foreground font-medium">Partly cloudy · feels like 30°</div>
              <div className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-widest mt-1">Pune, Maharashtra · 18.52°N, 73.85°E</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[{i:Wind,l:"Wind",v:"12 km/h"},{i:CloudRain,l:"Rain",v:"32%"},{i:Sun,l:"UV",v:"6 high"},{i:CloudSun,l:"Humidity",v:"67%"}].map(x=>(
              <div key={x.l} className="bg-muted/30 rounded-xl p-3 text-center border border-border/50">
                <x.i className="w-4 h-4 text-secondary mx-auto mb-1.5"/>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-0.5">{x.l}</div>
                <div className="font-bold text-sm text-foreground">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5 shadow-sm border-l-8 border-l-accent flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-accent"/>
            <h3 className="font-bold text-foreground">Storm Advisory</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-medium">Heavy rainfall (45-60mm) expected in 14h. Auto-irrigation paused, drainage prepared.</p>
          <div className="text-[10px] font-bold text-accent uppercase tracking-widest">⚠ Action automated by Core OS</div>
        </div>
      </div>
      <div className="bg-white border border-border rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="font-bold mb-4 text-foreground">Next 24h · Temperature & Rain</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={hourly}>
            <defs>
              <linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.15}/><stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0}/></linearGradient>
              <linearGradient id="wr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.15}/><stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="h" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} tick={{fontWeight:600}} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} tick={{fontWeight:600}} />
            <Tooltip contentStyle={{background:"hsl(var(--card))",border:"1px solid hsl(var(--border))",borderRadius:12,boxShadow:"0 10px 15px -3px rgba(0,0,0,0.1)"}}/>
            <Area type="monotone" dataKey="r" stroke="hsl(var(--secondary))" fill="url(#wr)" strokeWidth={2.5}/>
            <Area type="monotone" dataKey="t" stroke="hsl(var(--accent))" fill="url(#wt)" strokeWidth={2.5}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 pb-8">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>(
          <div key={d} className="bg-white border border-border rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{d}</div>
            <div className="text-3xl my-3">{["☀️","⛅","🌧️","🌧️","⛈️","☁️","☀️"][i]}</div>
            <div className="font-bold text-sm text-foreground">{28+i%3}° / {18+i%3}°</div>
          </div>
        ))}
      </div>
    </Page>
  );
};
