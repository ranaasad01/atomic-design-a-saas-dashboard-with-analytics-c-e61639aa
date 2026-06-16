"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, TrendingDown, Users, MousePointerClick, Globe, ArrowUpRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const activeUsersByPeriod: Record<string, { date: string; users: number; sessions: number }[]> = {
  "7d": [
    { date: "Jun 10", users: 3120, sessions: 5400 },
    { date: "Jun 11", users: 2980, sessions: 5100 },
    { date: "Jun 12", users: 3450, sessions: 5900 },
    { date: "Jun 13", users: 3700, sessions: 6200 },
    { date: "Jun 14", users: 4100, sessions: 6800 },
    { date: "Jun 15", users: 3890, sessions: 6500 },
    { date: "Jun 16", users: 4320, sessions: 7100 },
  ],
  "30d": [
    { date: "May 17", users: 2800, sessions: 4700 },
    { date: "May 21", users: 3100, sessions: 5200 },
    { date: "May 25", users: 3300, sessions: 5600 },
    { date: "May 29", users: 3050, sessions: 5100 },
    { date: "Jun 02", users: 3600, sessions: 6000 },
    { date: "Jun 06", users: 3900, sessions: 6500 },
    { date: "Jun 10", users: 3750, sessions: 6200 },
    { date: "Jun 14", users: 4100, sessions: 6800 },
    { date: "Jun 16", users: 4320, sessions: 7100 },
  ],
  "90d": [
    { date: "Mar 18", users: 2100, sessions: 3500 },
    { date: "Apr 01", users: 2400, sessions: 4000 },
    { date: "Apr 15", users: 2700, sessions: 4500 },
    { date: "Apr 29", users: 2900, sessions: 4900 },
    { date: "May 13", users: 3200, sessions: 5400 },
    { date: "May 27", users: 3500, sessions: 5900 },
    { date: "Jun 10", users: 3900, sessions: 6500 },
    { date: "Jun 16", users: 4320, sessions: 7100 },
  ],
  "1y": [
    { date: "Jul '23", users: 1400, sessions: 2300 },
    { date: "Aug '23", users: 1700, sessions: 2800 },
    { date: "Sep '23", users: 1900, sessions: 3100 },
    { date: "Oct '23", users: 2100, sessions: 3500 },
    { date: "Nov '23", users: 2300, sessions: 3800 },
    { date: "Dec '23", users: 2000, sessions: 3300 },
    { date: "Jan '24", users: 2500, sessions: 4100 },
    { date: "Feb '24", users: 2800, sessions: 4600 },
    { date: "Mar '24", users: 3100, sessions: 5200 },
    { date: "Apr '24", users: 3400, sessions: 5700 },
    { date: "May '24", users: 3800, sessions: 6300 },
    { date: "Jun '24", users: 4320, sessions: 7100 },
  ],
};

const trafficSources = [
  { name: "Organic Search", value: 38, color: BRAND_COLORS.primary },
  { name: "Paid Ads", value: 24, color: BRAND_COLORS.secondary },
  { name: "Referral", value: 21, color: "#06b6d4" },
  { name: "Direct", value: 17, color: BRAND_COLORS.success },
];

const signupComparisonByPeriod: Record<string, { label: string; current: number; previous: number }[]> = {
  "7d": [
    { label: "Mon", current: 142, previous: 118 },
    { label: "Tue", current: 165, previous: 130 },
    { label: "Wed", current: 189, previous: 145 },
    { label: "Thu", current: 210, previous: 160 },
    { label: "Fri", current: 198, previous: 172 },
    { label: "Sat", current: 134, previous: 110 },
    { label: "Sun", current: 121, previous: 98 },
  ],
  "30d": [
    { label: "Wk 1", current: 820, previous: 690 },
    { label: "Wk 2", current: 940, previous: 760 },
    { label: "Wk 3", current: 1050, previous: 830 },
    { label: "Wk 4", current: 1180, previous: 910 },
  ],
  "90d": [
    { label: "Mar", current: 2800, previous: 2200 },
    { label: "Apr", current: 3400, previous: 2700 },
    { label: "May", current: 3900, previous: 3100 },
  ],
  "1y": [
    { label: "Q3 '23", current: 5200, previous: 3900 },
    { label: "Q4 '23", current: 6100, previous: 4700 },
    { label: "Q1 '24", current: 7800, previous: 5900 },
    { label: "Q2 '24", current: 9400, previous: 7100 },
  ],
};

const kpiStats = [
  { label: "Active Users", value: "4,320", change: 11.4, icon: Users, color: "indigo" },
  { label: "Avg. Session", value: "3m 42s", change: 5.2, icon: MousePointerClick, color: "violet" },
  { label: "Bounce Rate", value: "34.8%", change: -3.1, icon: TrendingDown, color: "cyan" },
  { label: "New Visitors", value: "61.2%", change: 8.7, icon: Globe, color: "emerald" },
];

const topPages = [
  { path: "/dashboard", views: 18420, change: 12.3 },
  { path: "/analytics", views: 11850, change: 8.7 },
  { path: "/revenue", views: 9340, change: -2.1 },
  { path: "/users", views: 7620, change: 15.4 },
  { path: "/settings", views: 4210, change: 3.8 },
  { path: "/sign-in", views: 3890, change: -5.2 },
];

// ─── Period Tabs ──────────────────────────────────────────────────────────────

const PERIODS = [
  { key: "7d", label: "7 Days" },
  { key: "30d", label: "30 Days" },
  { key: "90d", label: "90 Days" },
  { key: "1y", label: "1 Year" },
] as const;

type Period = "7d" | "30d" | "90d" | "1y";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomAreaTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { color: string } }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
      <div className="flex items-center gap-2 text-sm">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item?.payload?.color }} />
        <span className="text-slate-300">{item?.name}:</span>
        <span className="text-white font-semibold">{item?.value ?? 0}%</span>
      </div>
    </div>
  );
}

// ─── Color helpers ────────────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
  indigo: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20 text-indigo-400",
  violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400",
  cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 text-cyan-400",
  emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
};

const iconBgMap: Record<string, string> = {
  indigo: "bg-indigo-500/15 text-indigo-400",
  violet: "bg-violet-500/15 text-violet-400",
  cyan: "bg-cyan-500/15 text-cyan-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");

  const areaData = activeUsersByPeriod[period] ?? [];
  const barData = signupComparisonByPeriod[period] ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-widest">Live Analytics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Analytics Overview
            </h1>
            <p className="mt-1.5 text-slate-400 text-sm max-w-lg">
              Deep-dive into user behavior, traffic sources, and growth trends across your product.
            </p>
          </motion.div>

          {/* Period Picker */}
          <motion.div variants={fadeInUp} className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
            <Calendar className="w-4 h-4 text-slate-500 ml-2 mr-1 shrink-0" />
            {PERIODS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  period === p.key
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {kpiStats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;
            return (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 ${colorMap[stat.color] ?? ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBgMap[stat.color] ?? ""}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isPositive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                  }`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Area Chart: Active Users ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Active Users Trend</h2>
              <p className="text-xs text-slate-500 mt-0.5">Unique users and total sessions over the selected period</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-500 inline-block" />
                Users
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-violet-400 inline-block" />
                Sessions
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={areaData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.primary} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={BRAND_COLORS.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.secondary} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={BRAND_COLORS.secondary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))} />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area type="monotone" dataKey="users" stroke={BRAND_COLORS.primary} strokeWidth={2.5} fill="url(#gradUsers)" dot={false} activeDot={{ r: 5, fill: BRAND_COLORS.primary, strokeWidth: 0 }} />
              <Area type="monotone" dataKey="sessions" stroke={BRAND_COLORS.secondary} strokeWidth={2} fill="url(#gradSessions)" dot={false} activeDot={{ r: 5, fill: BRAND_COLORS.secondary, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Row: Donut + Bar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Donut: Traffic Sources */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Traffic Sources</h2>
            <p className="text-xs text-slate-500 mb-5">Breakdown of how visitors find your product</p>

            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {trafficSources.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="w-full mt-4 space-y-2.5">
                {trafficSources.map((src) => (
                  <div key={src.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: src.color }} />
                      <span className="text-sm text-slate-300">{src.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${src.value}%`, backgroundColor: src.color }} />
                      </div>
                      <span className="text-sm font-semibold text-white w-8 text-right">{src.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bar: Signup Comparison */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Signup Comparison</h2>
                <p className="text-xs text-slate-500 mt-0.5">Current vs previous period new signups</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-2.5 rounded-sm bg-indigo-500 inline-block" />
                  Current
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-2.5 rounded-sm bg-slate-600 inline-block" />
                  Previous
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="current" name="current" fill={BRAND_COLORS.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="previous" name="previous" fill="#334155" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Top Pages Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Top Pages</h2>
              <p className="text-xs text-slate-500 mt-0.5">Most visited routes in the selected period</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <div className="divide-y divide-slate-800/50">
            {/* Header row */}
            <div className="grid grid-cols-12 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="col-span-6">Page Path</span>
              <span className="col-span-3 text-right">Page Views</span>
              <span className="col-span-3 text-right">Change</span>
            </div>

            {(topPages ?? []).map((page, idx) => {
              const isPositive = page.change >= 0;
              return (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.35, ease: "easeOut" }}
                  whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                  className="grid grid-cols-12 px-6 py-4 items-center transition-colors duration-150"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-mono text-slate-200 truncate">{page.path}</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="text-sm font-semibold text-white">{(page.views ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isPositive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                    }`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(page.change ?? 0).toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Bottom Insight Banner ── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/10 via-violet-600/8 to-transparent p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Growth Insight</p>
              <p className="text-sm text-slate-400 mt-0.5 max-w-md">
                Active users are up <span className="text-indigo-300 font-semibold">11.4%</span> compared to the previous period. Organic search is your top acquisition channel — consider doubling down on SEO content.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/25"
          >
            View Report
          </motion.button>
        </motion.div>

      </div>
    </main>
  );
}