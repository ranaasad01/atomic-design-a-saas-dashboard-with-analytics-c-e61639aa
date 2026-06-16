"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
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
import { DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight, ChevronDown, Download, Filter, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS, type ChartPeriod } from "@/lib/data";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "total-revenue",
    label: "Total Revenue",
    value: "$1,284,390",
    rawValue: 1284390,
    change: 18.4,
    unit: "USD",
    icon: DollarSign,
    color: "#6366f1",
    bg: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    id: "arr",
    label: "Annual Recurring Revenue",
    value: "$948,120",
    rawValue: 948120,
    change: 22.1,
    unit: "USD",
    icon: TrendingUp,
    color: "#8b5cf6",
    bg: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
  },
  {
    id: "arpu",
    label: "Avg Revenue per User",
    value: "$124.50",
    rawValue: 124.5,
    change: -3.2,
    unit: "USD",
    icon: Users,
    color: "#06b6d4",
    bg: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/20",
  },
];

const revenueStreamData = [
  { month: "Jan", Subscriptions: 62000, "One-time": 14000, "Add-ons": 8200 },
  { month: "Feb", Subscriptions: 68000, "One-time": 12500, "Add-ons": 9100 },
  { month: "Mar", Subscriptions: 74000, "One-time": 18000, "Add-ons": 10400 },
  { month: "Apr", Subscriptions: 79000, "One-time": 15200, "Add-ons": 11800 },
  { month: "May", Subscriptions: 85000, "One-time": 21000, "Add-ons": 13200 },
  { month: "Jun", Subscriptions: 91000, "One-time": 19500, "Add-ons": 14600 },
  { month: "Jul", Subscriptions: 97000, "One-time": 23000, "Add-ons": 15900 },
  { month: "Aug", Subscriptions: 104000, "One-time": 17800, "Add-ons": 17200 },
  { month: "Sep", Subscriptions: 112000, "One-time": 26000, "Add-ons": 18800 },
  { month: "Oct", Subscriptions: 119000, "One-time": 22400, "Add-ons": 20100 },
  { month: "Nov", Subscriptions: 128000, "One-time": 29000, "Add-ons": 22400 },
  { month: "Dec", Subscriptions: 138000, "One-time": 31500, "Add-ons": 24800 },
];

const revenueStream90d = revenueStreamData.slice(9);
const revenueStream30d = revenueStreamData.slice(11);

const planTierData = [
  { name: "Enterprise", value: 512400, color: "#6366f1" },
  { name: "Pro", value: 384200, color: "#8b5cf6" },
  { name: "Starter", value: 187790, color: "#06b6d4" },
];

const transactions = [
  {
    id: "TXN-8821",
    customer: "Acme Corp",
    email: "billing@acme.com",
    plan: "Enterprise",
    amount: 4800,
    date: "2024-12-18",
    status: "paid",
  },
  {
    id: "TXN-8820",
    customer: "Bright Labs",
    email: "finance@brightlabs.io",
    plan: "Pro",
    amount: 299,
    date: "2024-12-18",
    status: "paid",
  },
  {
    id: "TXN-8819",
    customer: "Nexus Digital",
    email: "accounts@nexusdigital.com",
    plan: "Enterprise",
    amount: 4800,
    date: "2024-12-17",
    status: "paid",
  },
  {
    id: "TXN-8818",
    customer: "Skyline SaaS",
    email: "pay@skylinesaas.com",
    plan: "Pro",
    amount: 299,
    date: "2024-12-17",
    status: "pending",
  },
  {
    id: "TXN-8817",
    customer: "Orbit Systems",
    email: "billing@orbitsys.net",
    plan: "Starter",
    amount: 49,
    date: "2024-12-16",
    status: "paid",
  },
  {
    id: "TXN-8816",
    customer: "Vantage AI",
    email: "ops@vantageai.co",
    plan: "Enterprise",
    amount: 4800,
    date: "2024-12-16",
    status: "failed",
  },
  {
    id: "TXN-8815",
    customer: "Meridian Cloud",
    email: "finance@meridiancloud.io",
    plan: "Pro",
    amount: 299,
    date: "2024-12-15",
    status: "paid",
  },
  {
    id: "TXN-8814",
    customer: "Pulse Media",
    email: "billing@pulsemedia.com",
    plan: "Starter",
    amount: 49,
    date: "2024-12-15",
    status: "refunded",
  },
  {
    id: "TXN-8813",
    customer: "Zenith Analytics",
    email: "pay@zenithanalytics.com",
    plan: "Enterprise",
    amount: 4800,
    date: "2024-12-14",
    status: "paid",
  },
  {
    id: "TXN-8812",
    customer: "Cascade IO",
    email: "billing@cascadeio.dev",
    plan: "Pro",
    amount: 299,
    date: "2024-12-14",
    status: "pending",
  },
  {
    id: "TXN-8811",
    customer: "Apex Ventures",
    email: "accounts@apexventures.vc",
    plan: "Starter",
    amount: 49,
    date: "2024-12-13",
    status: "paid",
  },
  {
    id: "TXN-8810",
    customer: "Luminary Tech",
    email: "finance@luminarytech.com",
    plan: "Enterprise",
    amount: 4800,
    date: "2024-12-13",
    status: "paid",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const periodLabels: Record<ChartPeriod, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "1y": "Last 12 months",
};

function getStreamData(period: ChartPeriod) {
  if (period === "30d") return revenueStream30d;
  if (period === "90d") return revenueStream90d;
  return revenueStreamData;
}

function formatCurrency(val: number) {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
  return `$${val}`;
}

const statusConfig: Record<
  string,
  { label: string; icon: React.ElementType; classes: string }
> = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    classes: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    classes: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    classes: "text-red-400 bg-red-500/10 border-red-500/20",
  },
  refunded: {
    label: "Refunded",
    icon: RefreshCw,
    classes: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  },
};

const planBadgeConfig: Record<string, string> = {
  Enterprise: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  Pro: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  Starter: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
};

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

function StreamTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-xl min-w-[160px]">
      <p className="text-xs font-semibold text-slate-300 mb-2">{label}</p>
      {(payload ?? []).map((entry: any) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 text-xs mb-1">
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: entry.color }}
            />
            <span className="text-slate-400">{entry.name}</span>
          </span>
          <span className="font-semibold text-slate-200">
            {formatCurrency(entry.value ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-xl">
      <p className="text-xs font-semibold text-slate-300 mb-1">{entry?.name}</p>
      <p className="text-sm font-bold" style={{ color: entry?.payload?.color }}>
        {formatCurrency(entry?.value ?? 0)}
      </p>
      <p className="text-xs text-slate-500 mt-0.5">
        {((((entry?.value ?? 0) / planTierData.reduce((s, d) => s + d.value, 0)) * 100) ?? 0).toFixed(1)}% of total
      </p>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const [period, setPeriod] = useState<ChartPeriod>("1y");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const streamData = getStreamData(period);

  const filteredTransactions = (transactions ?? []).filter((tx) => {
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      (tx.customer ?? "").toLowerCase().includes(q) ||
      (tx.id ?? "").toLowerCase().includes(q) ||
      (tx.email ?? "").toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalPie = planTierData.reduce((s, d) => s + d.value, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Revenue
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Track income streams, plan performance, and transaction history.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/20 self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl border ${card.border} bg-gradient-to-br ${card.bg} backdrop-blur-sm p-5 cursor-default`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isPositive
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-red-400 bg-red-500/10"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {card.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">{card.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">vs. last period</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Stacked Area Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue Streams</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Subscriptions, one-time payments, and add-ons
                </p>
              </div>
              {/* Period selector */}
              <div className="relative">
                <button
                  onClick={() => setPeriodOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-white transition-colors duration-200"
                >
                  {periodLabels[period]}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {periodOpen && (
                  <div className="absolute right-0 mt-1.5 w-40 rounded-xl border border-slate-700/60 bg-slate-900 shadow-xl z-20 overflow-hidden">
                    {(Object.keys(periodLabels) as ChartPeriod[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPeriod(p);
                          setPeriodOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors duration-150 ${
                          period === p
                            ? "text-indigo-300 bg-indigo-500/10"
                            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                        }`}
                      >
                        {periodLabels[p]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={streamData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradSub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradOne" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradAdd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => formatCurrency(v)}
                />
                <Tooltip content={<StreamTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                  formatter={(value) => (
                    <span style={{ color: "#94a3b8" }}>{value}</span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="Subscriptions"
                  stackId="1"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#gradSub)"
                />
                <Area
                  type="monotone"
                  dataKey="One-time"
                  stackId="1"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#gradOne)"
                />
                <Area
                  type="monotone"
                  dataKey="Add-ons"
                  stackId="1"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#gradAdd)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5 flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">Plan Tier Split</h2>
              <p className="text-xs text-slate-400 mt-0.5">Revenue by subscription tier</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={planTierData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {planTierData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-2 space-y-2.5">
              {planTierData.map((tier) => {
                const pct = (((tier.value / totalPie) * 100) ?? 0).toFixed(1);
                return (
                  <div key={tier.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: tier.color }}
                      />
                      <span className="text-xs text-slate-400">{tier.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200">
                        {formatCurrency(tier.value)}
                      </span>
                      <span className="text-xs text-slate-500 w-10 text-right">
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
        >
          {/* Table header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">Transactions</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Recent billing activity across all plans
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer…"
                  className="pl-3 pr-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 w-44 transition-colors duration-200"
                />
              </div>
              {/* Status filter */}
              <div className="flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                {["all", "paid", "pending", "failed", "refunded"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-150 capitalize ${
                      statusFilter === s
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Plan
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {(filteredTransactions ?? []).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500 text-sm">
                      No transactions match your filters.
                    </td>
                  </tr>
                ) : (
                  (filteredTransactions ?? []).map((tx, idx) => {
                    const sc = statusConfig[tx.status] ?? statusConfig["pending"];
                    const StatusIcon = sc.icon;
                    const planClass =
                      planBadgeConfig[tx.plan] ??
                      "text-slate-300 bg-slate-500/10 border-slate-500/20";
                    return (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03, duration: 0.3 }}
                        className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors duration-150 group"
                      >
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-mono text-slate-400 group-hover:text-indigo-300 transition-colors">
                            {tx.id}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium text-slate-200">
                            {tx.customer}
                          </p>
                          <p className="text-xs text-slate-500">{tx.email}</p>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${planClass}`}
                          >
                            {tx.plan}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-xs text-slate-400">{tx.date}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-sm font-semibold text-slate-100">
                            ${(tx.amount ?? 0).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${sc.classes}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {sc.label}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="px-5 py-3 border-t border-slate-800/60 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150 font-medium">
              View all transactions →
            </button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}