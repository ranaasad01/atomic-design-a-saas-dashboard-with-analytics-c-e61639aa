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
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart, ArrowUpRight, ArrowDownRight, MoreHorizontal, Eye, Star, Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$128,450",
    rawValue: 128450,
    change: 12.4,
    icon: DollarSign,
    color: "indigo",
    gradient: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
  },
  {
    id: "users",
    label: "Active Users",
    value: "24,812",
    rawValue: 24812,
    change: 8.1,
    icon: Users,
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
  },
  {
    id: "orders",
    label: "New Orders",
    value: "3,294",
    rawValue: 3294,
    change: -2.3,
    icon: ShoppingCart,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/20",
  },
  {
    id: "sessions",
    label: "Avg. Session",
    value: "4m 32s",
    rawValue: 272,
    change: 5.7,
    icon: Activity,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
];

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 51000, expenses: 31000, profit: 20000 },
  { month: "Mar", revenue: 47000, expenses: 29000, profit: 18000 },
  { month: "Apr", revenue: 63000, expenses: 34000, profit: 29000 },
  { month: "May", revenue: 58000, expenses: 32000, profit: 26000 },
  { month: "Jun", revenue: 72000, expenses: 38000, profit: 34000 },
  { month: "Jul", revenue: 68000, expenses: 36000, profit: 32000 },
  { month: "Aug", revenue: 85000, expenses: 41000, profit: 44000 },
  { month: "Sep", revenue: 91000, expenses: 44000, profit: 47000 },
  { month: "Oct", revenue: 78000, expenses: 39000, profit: 39000 },
  { month: "Nov", revenue: 104000, expenses: 48000, profit: 56000 },
  { month: "Dec", revenue: 128000, expenses: 52000, profit: 76000 },
];

const userGrowthData = [
  { week: "W1", new: 320, returning: 1240 },
  { week: "W2", new: 410, returning: 1380 },
  { week: "W3", new: 390, returning: 1290 },
  { week: "W4", new: 520, returning: 1510 },
  { week: "W5", new: 480, returning: 1620 },
  { week: "W6", new: 610, returning: 1740 },
  { week: "W7", new: 570, returning: 1830 },
  { week: "W8", new: 720, returning: 1960 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: BRAND_COLORS.primary },
  { name: "Direct", value: 24, color: BRAND_COLORS.secondary },
  { name: "Social Media", value: 18, color: "#06b6d4" },
  { name: "Referral", value: 12, color: BRAND_COLORS.success },
  { name: "Email", value: 8, color: BRAND_COLORS.warning },
];

const recentTransactions = [
  {
    id: "TXN-8821",
    customer: "Sophia Hartwell",
    email: "sophia@hartwell.io",
    plan: "Pro Annual",
    amount: 1188,
    status: "completed",
    date: "Dec 28, 2024",
  },
  {
    id: "TXN-8820",
    customer: "Marcus Chen",
    email: "m.chen@devstudio.co",
    plan: "Starter Monthly",
    amount: 49,
    status: "completed",
    date: "Dec 28, 2024",
  },
  {
    id: "TXN-8819",
    customer: "Priya Nair",
    email: "priya@nairtech.com",
    plan: "Enterprise",
    amount: 4800,
    status: "pending",
    date: "Dec 27, 2024",
  },
  {
    id: "TXN-8818",
    customer: "James Okafor",
    email: "james@okafor.dev",
    plan: "Pro Monthly",
    amount: 99,
    status: "completed",
    date: "Dec 27, 2024",
  },
  {
    id: "TXN-8817",
    customer: "Elena Vasquez",
    email: "elena@vasquez.studio",
    plan: "Pro Annual",
    amount: 1188,
    status: "failed",
    date: "Dec 26, 2024",
  },
  {
    id: "TXN-8816",
    customer: "Liam Fitzgerald",
    email: "liam@fitzco.io",
    plan: "Starter Monthly",
    amount: 49,
    status: "completed",
    date: "Dec 26, 2024",
  },
];

const topPages = [
  { path: "/dashboard", views: 18420, bounce: "24%", duration: "3m 12s" },
  { path: "/analytics", views: 12840, bounce: "31%", duration: "4m 48s" },
  { path: "/revenue", views: 9310, bounce: "28%", duration: "5m 02s" },
  { path: "/users", views: 7650, bounce: "36%", duration: "2m 55s" },
  { path: "/settings", views: 4120, bounce: "42%", duration: "1m 38s" },
];

const activityFeed = [
  {
    id: 1,
    type: "signup",
    message: "New user Sophia Hartwell signed up",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    type: "payment",
    message: "Enterprise payment of $4,800 pending review",
    time: "14 min ago",
    status: "warning",
  },
  {
    id: 3,
    type: "alert",
    message: "API response time exceeded 800ms threshold",
    time: "32 min ago",
    status: "danger",
  },
  {
    id: 4,
    type: "milestone",
    message: "Monthly revenue goal of $120K achieved",
    time: "1 hr ago",
    status: "success",
  },
  {
    id: 5,
    type: "signup",
    message: "New user Liam Fitzgerald signed up",
    time: "2 hr ago",
    status: "success",
  },
  {
    id: 6,
    type: "payment",
    message: "Failed payment from Elena Vasquez — card declined",
    time: "3 hr ago",
    status: "danger",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

type Period = "7d" | "30d" | "90d" | "1y";

const periodLabels: Record<Period, string> = {
  "7d": "7 Days",
  "30d": "30 Days",
  "90d": "90 Days",
  "1y": "1 Year",
};

function PeriodSelector({
  value,
  onChange,
}: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  const periods: Period[] = ["7d", "30d", "90d", "1y"];
  return (
    <div className="flex items-center gap-1 bg-slate-800/60 rounded-lg p-1">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
            value === p
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {periodLabels[p]}
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    failed: "bg-red-500/15 text-red-400 border-red-500/25",
  };
  const cls = map[status] ?? "bg-slate-500/15 text-slate-400 border-slate-500/25";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ActivityIcon({ status }: { status: string }) {
  if (status === "success")
    return <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  if (status === "warning")
    return <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />;
  if (status === "danger")
    return <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
  return <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            ${(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const [revPeriod, setRevPeriod] = useState<Period>("1y");
  const [userPeriod, setUserPeriod] = useState<Period>("30d");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
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
              Welcome back, Alex. Here's what's happening with your product today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/20">
              Export Report
            </button>
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
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl bg-slate-900/80 border ${card.border} p-5 shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {card.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white tracking-tight">
                      {card.value}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      {isPositive ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                      )}
                      <span
                        className={`text-xs font-semibold ${
                          isPositive ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {card.change}%
                      </span>
                      <span className="text-xs text-slate-500">vs last month</span>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${card.text}`} />
                  </div>
                </div>
                {/* Decorative gradient blob */}
                <div
                  className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-xl`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Chart + Traffic Sources ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue Overview</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Revenue, expenses & profit over time
                </p>
              </div>
              <PeriodSelector value={revPeriod} onChange={setRevPeriod} />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#gradRevenue)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1" }}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#gradProfit)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#10b981" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Sources Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-lg"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-white">Traffic Sources</h2>
              <p className="text-xs text-slate-400 mt-0.5">Breakdown by acquisition channel</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                  formatter={(value: number) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {trafficSources.map((src) => (
                <div key={src.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: src.color }}
                    />
                    <span className="text-xs text-slate-400">{src.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{src.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── User Growth Bar Chart + Activity Feed ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* User Growth */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">User Growth</h2>
                <p className="text-xs text-slate-400 mt-0.5">New vs returning users by week</p>
              </div>
              <PeriodSelector value={userPeriod} onChange={setUserPeriod} />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={userGrowthData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
                />
                <Bar dataKey="new" name="New Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="returning"
                  name="Returning"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">Activity Feed</h2>
                <p className="text-xs text-slate-400 mt-0.5">Recent system events</p>
              </div>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                View all
              </button>
            </div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {activityFeed.map((item) => (
                <motion.li
                  key={item.id}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <ActivityIcon status={item.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-snug">{item.message}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-slate-900/80 border border-slate-800/60 shadow-lg overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-xs text-slate-400 mt-0.5">Latest subscription payments</p>
            </div>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Plan
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {recentTransactions.map((tx) => (
                  <motion.tr
                    key={tx.id}
                    variants={fadeIn}
                    whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                    className="border-b border-slate-800/40 last:border-0 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-indigo-400">{tx.id}</span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{tx.customer}</p>
                        <p className="text-xs text-slate-500">{tx.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-slate-300">{tx.plan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs text-slate-500">{tx.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-500 hover:text-slate-300 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Top Pages ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">Top Pages</h2>
              <p className="text-xs text-slate-400 mt-0.5">Most visited routes this month</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Eye className="w-3.5 h-3.5" />
              <span>Page views</span>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {topPages.map((page, i) => {
              const maxViews = topPages[0]?.views ?? 1;
              const pct = Math.round(((page.views ?? 0) / maxViews) * 100);
              return (
                <motion.div
                  key={page.path}
                  variants={fadeInUp}
                  className="flex items-center gap-4"
                >
                  <span className="text-xs text-slate-600 w-4 text-right flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-mono text-slate-300 truncate">
                        {page.path}
                      </span>
                      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                        <span className="text-xs text-slate-400 hidden sm:block">
                          Bounce: {page.bounce}
                        </span>
                        <span className="text-xs text-slate-400 hidden md:block">
                          Avg: {page.duration}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">
                          {(page.views ?? 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.08 }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Quick Stats Footer Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Uptime", value: "99.98%", icon: Activity, color: "text-emerald-400" },
            { label: "Avg. Load Time", value: "312ms", icon: Clock, color: "text-cyan-400" },
            { label: "Satisfaction", value: "4.8 / 5", icon: Star, color: "text-amber-400" },
            { label: "Open Tickets", value: "7", icon: AlertCircle, color: "text-red-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -2 }}
                className="rounded-xl bg-slate-900/60 border border-slate-800/50 p-4 flex items-center gap-3"
              >
                <Icon className={`w-5 h-5 ${stat.color} flex-shrink-0`} />
                <div>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="text-sm font-bold text-white mt-0.5">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </main>
  );
}