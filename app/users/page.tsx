"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronRight, Users, UserCheck, UserX, ArrowUp, ArrowDown, ArrowUpDown, Mail, Calendar, Star } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BRAND_COLORS } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
  status: "Active" | "Inactive" | "Churned";
  joinDate: string;
  avatarInitials: string;
  avatarColor: string;
  lastSeen: string;
}

const MOCK_USERS: User[] = [
  { id: "u1", name: "Sophia Hartwell", email: "sophia.hartwell@acme.io", plan: "Enterprise", status: "Active", joinDate: "2023-01-14", avatarInitials: "SH", avatarColor: "#6366f1", lastSeen: "2 min ago" },
  { id: "u2", name: "Marcus Chen", email: "m.chen@brightloop.com", plan: "Pro", status: "Active", joinDate: "2023-03-08", avatarInitials: "MC", avatarColor: "#8b5cf6", lastSeen: "1 hr ago" },
  { id: "u3", name: "Priya Nair", email: "priya@nairventures.co", plan: "Pro", status: "Active", joinDate: "2023-04-22", avatarInitials: "PN", avatarColor: "#06b6d4", lastSeen: "3 hrs ago" },
  { id: "u4", name: "James Okafor", email: "james.okafor@techbridge.ng", plan: "Free", status: "Inactive", joinDate: "2023-06-01", avatarInitials: "JO", avatarColor: "#10b981", lastSeen: "5 days ago" },
  { id: "u5", name: "Elena Vasquez", email: "elena.v@solstice.mx", plan: "Enterprise", status: "Active", joinDate: "2022-11-30", avatarInitials: "EV", avatarColor: "#f59e0b", lastSeen: "Just now" },
  { id: "u6", name: "Tom Ridgeway", email: "tom@ridgeway.dev", plan: "Free", status: "Churned", joinDate: "2023-02-17", avatarInitials: "TR", avatarColor: "#ef4444", lastSeen: "32 days ago" },
  { id: "u7", name: "Aisha Kamara", email: "aisha.k@luminary.ai", plan: "Pro", status: "Active", joinDate: "2023-07-09", avatarInitials: "AK", avatarColor: "#6366f1", lastSeen: "20 min ago" },
  { id: "u8", name: "Luca Ferretti", email: "luca.ferretti@designhub.it", plan: "Pro", status: "Active", joinDate: "2023-05-15", avatarInitials: "LF", avatarColor: "#8b5cf6", lastSeen: "4 hrs ago" },
  { id: "u9", name: "Yuki Tanaka", email: "yuki@tanaka-labs.jp", plan: "Enterprise", status: "Active", joinDate: "2022-09-03", avatarInitials: "YT", avatarColor: "#06b6d4", lastSeen: "1 day ago" },
  { id: "u10", name: "Chloe Dupont", email: "chloe.dupont@agenceparis.fr", plan: "Free", status: "Churned", joinDate: "2023-08-20", avatarInitials: "CD", avatarColor: "#ef4444", lastSeen: "60 days ago" },
  { id: "u11", name: "Ravi Sharma", email: "ravi.sharma@cloudnine.in", plan: "Pro", status: "Active", joinDate: "2023-09-11", avatarInitials: "RS", avatarColor: "#10b981", lastSeen: "10 min ago" },
  { id: "u12", name: "Natalie Brooks", email: "natalie@brooksco.us", plan: "Enterprise", status: "Inactive", joinDate: "2023-01-28", avatarInitials: "NB", avatarColor: "#f59e0b", lastSeen: "12 days ago" },
  { id: "u13", name: "Diego Morales", email: "diego.m@pixelcraft.cl", plan: "Free", status: "Active", joinDate: "2023-10-05", avatarInitials: "DM", avatarColor: "#6366f1", lastSeen: "6 hrs ago" },
  { id: "u14", name: "Fatima Al-Rashid", email: "fatima@alrashid.ae", plan: "Pro", status: "Active", joinDate: "2023-11-18", avatarInitials: "FA", avatarColor: "#8b5cf6", lastSeen: "30 min ago" },
  { id: "u15", name: "Oliver Whitfield", email: "o.whitfield@meridian.co.uk", plan: "Enterprise", status: "Active", joinDate: "2022-07-14", avatarInitials: "OW", avatarColor: "#06b6d4", lastSeen: "2 hrs ago" },
];

const SIGNUP_DATA = [
  { month: "Jul", signups: 38 },
  { month: "Aug", signups: 52 },
  { month: "Sep", signups: 47 },
  { month: "Oct", signups: 61 },
  { month: "Nov", signups: 74 },
  { month: "Dec", signups: 58 },
  { month: "Jan", signups: 83 },
  { month: "Feb", signups: 91 },
  { month: "Mar", signups: 105 },
  { month: "Apr", signups: 98 },
  { month: "May", signups: 122 },
  { month: "Jun", signups: 137 },
];

type SortField = "name" | "plan" | "status" | "joinDate";
type SortDir = "asc" | "desc";

const PLAN_ORDER = { Free: 0, Pro: 1, Enterprise: 2 };
const STATUS_ORDER = { Active: 0, Inactive: 1, Churned: 2 };

const planBadge: Record<User["plan"], string> = {
  Free: "bg-slate-700/60 text-slate-300 border border-slate-600/40",
  Pro: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
  Enterprise: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
};

const statusBadge: Record<User["status"], string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  Inactive: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  Churned: "bg-red-500/15 text-red-400 border border-red-500/30",
};

const statusDot: Record<User["status"], string> = {
  Active: "bg-emerald-400",
  Inactive: "bg-amber-400",
  Churned: "bg-red-400",
};

function formatDate(iso: string): string {
  const parts = iso.split("-");
  if (parts.length < 3) return iso;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[parseInt(parts[1] ?? "1", 10) - 1] ?? "";
  return `${month} ${parseInt(parts[2] ?? "1", 10)}, ${parts[0]}`;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub: string;
  accent: string;
}

function StatCard({ icon, label, value, sub, accent }: StatCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3, scale: 1.015 }}
      className="relative overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 shadow-lg shadow-black/20 backdrop-blur-sm"
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 20%, ${accent}, transparent 70%)` }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white tabular-nums">{(value ?? 0).toLocaleString()}</p>
          <p className="mt-1 text-xs text-slate-400">{sub}</p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: `${accent}22`, border: `1px solid ${accent}33` }}
        >
          <span style={{ color: accent }}>{icon}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-400 mb-0.5">{label}</p>
      <p className="text-indigo-300 font-bold">{(payload[0]?.value ?? 0).toLocaleString()} signups</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<"All" | User["plan"]>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | User["status"]>("All");
  const [sortField, setSortField] = useState<SortField>("joinDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.status === "Active").length;
  const churnedUsers = MOCK_USERS.filter((u) => u.status === "Churned").length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let rows = [...MOCK_USERS];
    const q = search.toLowerCase().trim();
    if (q) {
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (planFilter !== "All") rows = rows.filter((u) => u.plan === planFilter);
    if (statusFilter !== "All") rows = rows.filter((u) => u.status === statusFilter);

    rows.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "plan") cmp = PLAN_ORDER[a.plan] - PLAN_ORDER[b.plan];
      else if (sortField === "status") cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      else if (sortField === "joinDate") cmp = a.joinDate.localeCompare(b.joinDate);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, planFilter, statusFilter, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />;
    return sortDir === "asc"
      ? <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
      : <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/6 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* ── Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
              User Management
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Users
            </h1>
            <p className="mt-1.5 text-slate-400 text-sm">
              Manage accounts, track plans, and monitor engagement across your user base.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-colors duration-200"
          >
            <Users className="w-4 h-4" />
            Invite User
          </motion.button>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Total Users"
            value={totalUsers}
            sub="All registered accounts"
            accent={BRAND_COLORS.primary}
          />
          <StatCard
            icon={<UserCheck className="w-5 h-5" />}
            label="Active Users"
            value={activeUsers}
            sub={`${Math.round((activeUsers / totalUsers) * 100)}% of total`}
            accent={BRAND_COLORS.success}
          />
          <StatCard
            icon={<UserX className="w-5 h-5" />}
            label="Churned Users"
            value={churnedUsers}
            sub="Cancelled subscriptions"
            accent={BRAND_COLORS.danger}
          />
        </motion.div>

        {/* ── Signup Sparkline Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 shadow-lg shadow-black/20 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">New Signups</h2>
              <p className="text-xs text-slate-500 mt-0.5">Monthly new user registrations — last 12 months</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
              <ArrowUp className="w-3.5 h-3.5" />
              +12.3% vs last period
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIGNUP_DATA} barSize={18} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
                <Bar dataKey="signups" radius={[6, 6, 0, 0]}>
                  {SIGNUP_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === SIGNUP_DATA.length - 1
                          ? BRAND_COLORS.primary
                          : `${BRAND_COLORS.primary}55`
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Filters & Search ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col sm:flex-row gap-3"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
            />
          </div>

          {/* Plan filter */}
          <div className="relative">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as typeof planFilter)}
              className="appearance-none pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 cursor-pointer"
            >
              <option value="All">All Plans</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="appearance-none pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Churned">Churned</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </motion.div>

        {/* ── Users Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800/60 shadow-lg shadow-black/20 backdrop-blur-sm overflow-hidden"
        >
          {/* Table header */}
          <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              All Users
              <span className="ml-2 text-xs font-normal text-slate-500">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </h2>
            <Star className="w-4 h-4 text-slate-600" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/50">
                  {/* User */}
                  <th className="text-left px-6 py-3">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      User <SortIcon field="name" />
                    </button>
                  </th>
                  {/* Plan */}
                  <th className="text-left px-4 py-3 hidden sm:table-cell">
                    <button
                      onClick={() => handleSort("plan")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Plan <SortIcon field="plan" />
                    </button>
                  </th>
                  {/* Status */}
                  <th className="text-left px-4 py-3">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Status <SortIcon field="status" />
                    </button>
                  </th>
                  {/* Join Date */}
                  <th className="text-left px-4 py-3 hidden md:table-cell">
                    <button
                      onClick={() => handleSort("joinDate")}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Joined <SortIcon field="joinDate" />
                    </button>
                  </th>
                  {/* Last Seen */}
                  <th className="text-left px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Last Seen
                    </span>
                  </th>
                  {/* Actions */}
                  <th className="px-6 py-3" />
                </tr>
              </thead>

              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-500 text-sm">
                      No users match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <motion.tr
                      key={user.id}
                      variants={fadeInUp}
                      whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                      className="border-b border-slate-800/40 last:border-0 transition-colors duration-150 cursor-pointer"
                    >
                      {/* User cell */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md"
                            style={{ background: `linear-gradient(135deg, ${user.avatarColor}cc, ${user.avatarColor}88)`, border: `1px solid ${user.avatarColor}44` }}
                          >
                            {user.avatarInitials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-100 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${planBadge[user.plan]}`}>
                          {user.plan}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusBadge[user.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[user.status]}`} />
                          {user.status}
                        </span>
                      </td>

                      {/* Join Date */}
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-slate-600" />
                          {formatDate(user.joinDate)}
                        </span>
                      </td>

                      {/* Last Seen */}
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-slate-400 text-xs">{user.lastSeen}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <motion.button
                          whileHover={{ scale: 1.1, x: 2 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-slate-600 hover:text-indigo-400 transition-colors duration-150"
                          aria-label={`View ${user.name}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="px-6 py-3.5 border-t border-slate-800/50 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing <span className="text-slate-300 font-medium">{filtered.length}</span> of{" "}
              <span className="text-slate-300 font-medium">{totalUsers}</span> users
            </p>
            <div className="flex items-center gap-1">
              {["1", "2", "3"].map((p) => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors duration-150 ${
                    p === "1"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {p}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}