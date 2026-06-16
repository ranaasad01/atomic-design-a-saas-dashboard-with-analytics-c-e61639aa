"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, ChevronDown, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";
import type { KpiCard, ChartPeriod } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards: (KpiCard & { icon: React.ElementType; color: string; bgColor: string })[] = [
  {
    label: "Total Revenue",
    value: "$284,520",
    change: 12.4,
    unit: "USD",
    icon: DollarSign,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    label: "Monthly Recurring Revenue",
    value: "$48,390",
    change: 8.1,
    unit: "MRR",
    icon: TrendingUp,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Active Users",
    value: "12,847",
    change: 5.3,
    unit: "users",
    icon: Users,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    change: -0.6,
    unit: "%",
    icon: Activity,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
];

const mrrData = [
  { month: "Jan", mrr: 31200, target: 30000 },
  { month: "Feb", mrr: 33800, target: 32000 },
  { month: "Mar", mrr: 35100, target: 34000 },
  { month: "Apr", mrr: 34600, target: 35000 },
  { month: "May", mrr: 37900, target: 36000 },
  { month: "Jun", mrr: 39400, target: 38000 },
  { month: "Jul", mrr: 41200, target: 40000 },
  { month: "Aug", mrr: 42800, target: 41500 },
  { month: "Sep", mrr: 44100, target: 43000 },
  { month: "Oct", mrr: 45600, target: 44500 },
  { month: "Nov", mrr: 47200, target: 46000 },
  { month: "Dec", mrr: 48390, target: 47500 },
];

const signupData = [
  { week: "W1 Jan", signups: 142, churned: 18 },
  { week: "W2 Jan", signups: 189, churned: 22 },
  { week: "W3 Jan", signups: 165, churned: 15 },
  { week: "W4 Jan", signups: 210, churned: 28 },
  { week: "W1 Feb", signups: 198, churned: 20 },
  { week: "W2 Feb", signups: 234, churned: 19 },
  { week: "W3 Feb", signups: 221, churned: 24 },
  { week: "W4 Feb", signups: 267, churned: 31 },
  { week: "W1 Mar", signups: 245, churned: 22 },
  { week: "W2 Mar", signups: 289, churned: 27 },
  { week: "W3 Mar", signups: 312, churned: 29 },
  { week: "W4 Mar", signups: 298, churned: 25 },
];

type TxStatus = "completed" | "pending" | "failed";

interface Transaction {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: number;
  status: TxStatus;
  date: string;
}

const transactions: Transaction[] = [
  { id: "TXN-8821", customer: "Acme Corp", email: "billing@acme.io", plan: "Enterprise", amount: 1299, status: "completed", date: "Dec 28, 2024" },
  { id: "TXN-8820", customer: "Stripe Inc", email: "finance@stripe.com", plan: "Pro", amount: 299, status: "completed", date: "Dec 28, 2024" },
  { id: "TXN-8819", customer: "Notion Labs", email: "accounts@notion.so", plan: "Pro", amount: 299, status: "pending", date: "Dec 27, 2024" },
  { id: "TXN-8818", customer: "Vercel HQ", email: "billing@vercel.com", plan: "Enterprise", amount: 1299, status: "completed", date: "Dec 27, 2024" },
  { id: "TXN-8817", customer: "Linear App", email: "pay@linear.app", plan: "Starter", amount: 49, status: "failed", date: "Dec 26, 2024" },
  { id: "TXN-8816", customer: "Figma Inc", email: "billing@figma.com", plan: "Pro", amount: 299, status: "completed", date: "Dec 26, 2024" },
  { id: "TXN-8815", customer: "Loom Video", email: "accounts@loom.com", plan: "Starter", amount: 49, status: "completed", date: "Dec 25, 2024" },
  { id: "TXN-8814", customer: "Miro Board", email: "finance@miro.com", plan: "Enterprise", amount: 1299, status: "pending", date: "Dec 25, 2024" },
];

const periodOptions: { label: string; value: ChartPeriod }[] = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "1 year", value: "1y" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TxStatus }) {
  const config: Record<TxStatus, { label: string; className: string; icon: React.ElementType }> = {
    completed: { label: "Completed", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
    pending: { label: "Pending", className: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
    failed: { label: "Failed", className: "bg-red-500/10 text-red-400 border-red-500/20", icon: AlertCircle },
  };
  const { label, className, icon: Icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900/95 border border-slate-700/60 rounded-xl p-3 shadow-xl backdrop-blur-sm">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {typeof entry.value === "number"
              ? entry.name.toLowerCase().includes("mrr") || entry.name.toLowerCase().includes("target")
                ? `$${(entry.value ?? 0).toLocaleString()}`
                : (entry.value ?? 0).toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [period, setPeriod] = useState<ChartPeriod>("1y");
  const [periodOpen, setPeriodOpen] = useState(false);

  const selectedPeriodLabel = periodOptions.find((p) => p.value === period)?.label ?? "1 year";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Welcome back — here&apos;s what&apos;s happening with your business today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Period selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPeriodOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-200"
              >
                {selectedPeriodLabel}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${periodOpen ? "rotate-180" : ""}`} />
              </motion.button>
              {periodOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-700/60 rounded-xl shadow-xl z-20 overflow-hidden"
                >
                  {periodOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setPeriod(opt.value); setPeriodOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                        period === opt.value
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800/70 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-200"
              aria-label="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isChurn = card.label === "Churn Rate";
            const goodChange = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-sm p-5 shadow-lg shadow-black/20 group cursor-default"
              >
                {/* Glow */}
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${card.bgColor}`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bgColor}`}>
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                        goodChange
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-red-400 bg-red-500/10"
                      }`}
                    >
                      {goodChange ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(card.change)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{card.label}</p>
                  <p className="mt-0.5 text-xs text-slate-600">vs. last month</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

          {/* MRR Line Chart — spans 3 cols */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-3 rounded-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">MRR Growth</h2>
                <p className="text-xs text-slate-500 mt-0.5">Monthly recurring revenue vs. target</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                  Actual
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full bg-violet-400 inline-block" style={{ borderStyle: "dashed" }} />
                  Target
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={mrrData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
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
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  width={48}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#8b5cf6"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="url(#targetGradient)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#mrrGradient)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1", stroke: "#1e1b4b", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Signups Bar Chart — spans 2 cols */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg shadow-black/20"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-white">Weekly Signups</h2>
              <p className="text-xs text-slate-500 mt-0.5">New users vs. churned per week</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={signupData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="signups" name="Signups" fill="#6366f1" radius={[3, 3, 0, 0]} maxBarSize={16} />
                <Bar dataKey="churned" name="Churned" fill="#ef4444" radius={[3, 3, 0, 0]} maxBarSize={16} fillOpacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-sm shadow-lg shadow-black/20 overflow-hidden"
        >
          {/* Table header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest billing activity across all plans</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-indigo-500/10"
            >
              View all →
            </motion.button>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/40">
                  {["Transaction", "Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {(transactions ?? []).map((tx) => (
                  <motion.tr
                    key={tx.id}
                    variants={fadeIn}
                    whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                    className="border-b border-slate-800/30 last:border-0 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-slate-500 bg-slate-800/60 px-2 py-1 rounded-md">
                        {tx.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{tx.customer}</p>
                        <p className="text-xs text-slate-500">{tx.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          tx.plan === "Enterprise"
                            ? "text-violet-300 bg-violet-500/10 border-violet-500/20"
                            : tx.plan === "Pro"
                            ? "text-indigo-300 bg-indigo-500/10 border-indigo-500/20"
                            : "text-slate-300 bg-slate-700/40 border-slate-600/30"
                        }`}
                      >
                        {tx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{tx.date}</span>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-800/40">
            {(transactions ?? []).map((tx) => (
              <div key={tx.id} className="px-4 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{tx.customer}</p>
                    <p className="text-xs text-slate-500">{tx.email}</p>
                  </div>
                  <StatusBadge status={tx.status} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono bg-slate-800/60 px-2 py-0.5 rounded">{tx.id}</span>
                  <span className="font-semibold text-white text-sm">${(tx.amount ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span
                    className={`font-medium px-2 py-0.5 rounded-full border ${
                      tx.plan === "Enterprise"
                        ? "text-violet-300 bg-violet-500/10 border-violet-500/20"
                        : tx.plan === "Pro"
                        ? "text-indigo-300 bg-indigo-500/10 border-indigo-500/20"
                        : "text-slate-300 bg-slate-700/40 border-slate-600/30"
                    }`}
                  >
                    {tx.plan}
                  </span>
                  <span>{tx.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer summary */}
          <div className="px-6 py-4 border-t border-slate-800/40 bg-slate-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-slate-500">
              Showing <span className="text-slate-300 font-medium">{transactions.length}</span> of{" "}
              <span className="text-slate-300 font-medium">248</span> transactions
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>
                Total collected:{" "}
                <span className="text-emerald-400 font-semibold">
                  ${transactions.filter((t) => t.status === "completed").reduce((s, t) => s + (t.amount ?? 0), 0).toLocaleString()}
                </span>
              </span>
              <span className="text-slate-700">|</span>
              <span>
                Pending:{" "}
                <span className="text-amber-400 font-semibold">
                  ${transactions.filter((t) => t.status === "pending").reduce((s, t) => s + (t.amount ?? 0), 0).toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}