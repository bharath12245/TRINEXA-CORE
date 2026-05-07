import { Page, PageHeader } from "@/components/trinexa/Page";
import { marketPrices, expenses } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Plus, Receipt } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export const Market = () => {
  const trend = Array.from({length:30},(_,i)=>({d:i, p: 4000 + Math.sin(i/3)*200 + i*8}));
  return (
    <Page>
      <PageHeader tag="06 · Market" title="Live mandi prices" desc="Best windows, demand forecasts, and nearby market comparisons"/>
      <div className="grid lg:grid-cols-3 gap-6 mb-6 mt-4">
        <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="font-bold text-foreground">Basmati Rice · 30-day price trend</h3>
                <p className="text-xs text-muted-foreground font-medium">Pune APMC · Average quality</p>
            </div>
            <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">▲ 4.2%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <Line type="monotone" dataKey="p" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} animationDuration={2000}/>
              <Tooltip contentStyle={{background:"hsl(var(--card))",border:"1px solid hsl(var(--border))",borderRadius:12,boxShadow:"0 10px 15px -3px rgba(0,0,0,0.1)"}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm border-l-8 border-l-primary flex flex-col justify-center">
          <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mb-2">Best sell window</h3>
          <div className="text-3xl font-bold text-primary">Next 5 Days</div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-medium">AI predicts peak ₹4,540/q in Pune APMC. Recommend selling before Friday to maximize margin.</p>
        </div>
      </div>
      <div className="bg-white border border-border rounded-2xl p-5 shadow-sm mb-8">
        <h3 className="font-bold mb-4 text-foreground px-1">Nearby Mandis</h3>
        <div className="space-y-1">
          {marketPrices.map(m => (
            <div key={m.crop} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/30 transition border border-transparent hover:border-border">
              <div>
                <div className="font-bold text-foreground">{m.crop}</div>
                <div className="text-xs text-muted-foreground font-medium">{m.mandi} · demand <span className="text-secondary font-bold uppercase">{m.demand}</span></div>
              </div>
              <div className="flex items-center gap-6">
                <div className={`text-xs font-bold flex items-center gap-1.5 ${m.change > 0 ? 'text-primary' : 'text-destructive'}`}>
                  {m.change > 0 ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>} {Math.abs(m.change)}%
                </div>
                <div className="text-xl font-bold text-foreground">₹{m.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export const Expenses = () => {
  const total = expenses.reduce((s,e)=>s+e.amount,0);
  return (
    <Page>
      <PageHeader tag="07 · Finance" title="Expense management" desc="Track every rupee with AI-powered cost reduction"
        actions={<button className="px-5 py-2.5 rounded-2xl bg-primary text-white text-sm font-bold shadow-md hover:bg-primary/90 transition active:scale-95 flex items-center gap-2"><Plus className="w-4 h-4"/>Add expense</button>}
      />
      <div className="grid lg:grid-cols-3 gap-6 mb-6 mt-4">
        {[
          {l:"Total spend",v:`₹${(total/1000).toFixed(1)}k`,s:"this season", c: "text-secondary"},
          {l:"Estimated profit",v:"₹2.4L",s:"+24% YoY", c: "text-primary"},
          {l:"AI savings",v:"₹38k",s:"automated", c: "text-accent"}
        ].map(x=>(
          <div key={x.l} className="bg-white border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{x.l}</div>
            <div className={`text-3xl font-bold ${x.c} mt-1`}>{x.v}</div>
            <div className="text-xs text-muted-foreground mt-2 font-medium">{x.s}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 pb-12">
        <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold mb-6 text-foreground">Spend Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={expenses} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4}>
                {expenses.map((e,i)=><Cell key={i} fill={e.color} strokeWidth={0}/>)}
              </Pie>
              <Tooltip contentStyle={{background:"hsl(var(--card))",border:"1px solid hsl(var(--border))",borderRadius:12,boxShadow:"0 10px 15px -3px rgba(0,0,0,0.1)"}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold mb-6 text-foreground">Categories</h3>
          <div className="space-y-3">
            {expenses.map(e=>(
              <div key={e.category} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/30 transition border border-transparent hover:border-border">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform hover:rotate-12" style={{background:`${e.color}15`}}><Receipt className="w-5 h-5" style={{color:e.color}}/></div>
                <div className="flex-1">
                    <div className="font-bold text-foreground text-sm">{e.category}</div>
                    <div className="text-xs text-muted-foreground font-medium">{((e.amount/total)*100).toFixed(1)}% of total seasonal spend</div>
                </div>
                <div className="font-bold text-foreground text-lg">₹{e.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};
