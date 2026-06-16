"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Palette, Shield, CreditCard, Save, Camera, Mail, Phone, Globe, Building, Check, AlertCircle, Moon, Sun, Monitor, ChevronRight, Lock, Eye, EyeOff } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  bio: string;
  role: string;
}

interface NotificationPrefs {
  emailDigest: boolean;
  weeklyReport: boolean;
  revenueAlerts: boolean;
  userMilestones: boolean;
  systemUpdates: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  productNews: boolean;
}

type ThemeOption = "light" | "dark" | "system";
type AccentColor = "indigo" | "violet" | "cyan" | "emerald" | "rose";

interface AppearancePrefs {
  theme: ThemeOption;
  accentColor: AccentColor;
  compactMode: boolean;
  animationsEnabled: boolean;
  sidebarCollapsed: boolean;
}

// ─── Toggle Component ─────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <motion.button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        whileTap={{ scale: 0.93 }}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
          checked ? "bg-indigo-500" : "bg-slate-700"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </motion.button>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-slate-800/60 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-4.5 h-4.5 w-[18px] h-[18px] text-indigo-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-100">{title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </motion.div>
  );
}

// ─── Save Toast ───────────────────────────────────────────────────────────────

function SaveToast({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-xl shadow-emerald-500/30 pointer-events-none"
    >
      <Check className="w-4 h-4" />
      <span className="text-sm font-medium">Settings saved successfully</span>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  // Profile form state
  const [profile, setProfile] = useState<ProfileForm>({
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@acmecorp.io",
    phone: "+1 (555) 234-5678",
    company: "Acme Corp",
    website: "https://acmecorp.io",
    bio: "Head of Growth at Acme Corp. Passionate about data-driven decisions and building products people love.",
    role: "admin",
  });

  // Notification prefs state
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailDigest: true,
    weeklyReport: true,
    revenueAlerts: true,
    userMilestones: false,
    systemUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    productNews: true,
  });

  // Appearance state
  const [appearance, setAppearance] = useState<AppearancePrefs>({
    theme: "dark",
    accentColor: "indigo",
    compactMode: false,
    animationsEnabled: true,
    sidebarCollapsed: false,
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  // UI state
  const [saveToast, setSaveToast] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "appearance" | "security">("profile");

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2800);
  };

  const updateProfile = (field: keyof ProfileForm, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateNotification = (field: keyof NotificationPrefs, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const updateAppearance = <K extends keyof AppearancePrefs>(field: K, value: AppearancePrefs[K]) => {
    setAppearance((prev) => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
    { id: "security" as const, label: "Security", icon: Shield },
  ];

  const accentColors: { id: AccentColor; hex: string; label: string }[] = [
    { id: "indigo", hex: "#6366f1", label: "Indigo" },
    { id: "violet", hex: "#8b5cf6", label: "Violet" },
    { id: "cyan", hex: "#06b6d4", label: "Cyan" },
    { id: "emerald", hex: "#10b981", label: "Emerald" },
    { id: "rose", hex: "#f43f5e", label: "Rose" },
  ];

  const themeOptions: { id: ThemeOption; label: string; icon: React.ElementType }[] = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Page header */}
      <div className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Manage your account, preferences, and security.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-colors duration-200 self-start sm:self-auto"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-px scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                    isActive
                      ? "text-indigo-400 border-indigo-500"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* ── PROFILE TAB ── */}
          {activeTab === "profile" && (
            <>
              <SectionCard
                title="Personal Information"
                description="Update your name, contact details, and public profile."
                icon={User}
              >
                {/* Avatar */}
                <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-800/60">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/30">
                      {(profile.firstName?.[0] ?? "A")}{(profile.lastName?.[0] ?? "M")}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.93 }}
                      className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{profile.email}</p>
                    <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {profile.role === "admin" ? "Administrator" : "Member"}
                    </span>
                  </div>
                </div>

                {/* Form grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", field: "firstName" as const, icon: User, type: "text" },
                    { label: "Last Name", field: "lastName" as const, icon: User, type: "text" },
                    { label: "Email Address", field: "email" as const, icon: Mail, type: "email" },
                    { label: "Phone Number", field: "phone" as const, icon: Phone, type: "tel" },
                    { label: "Company", field: "company" as const, icon: Building, type: "text" },
                    { label: "Website", field: "website" as const, icon: Globe, type: "url" },
                  ].map(({ label, field, icon: FieldIcon, type }) => (
                    <div key={field}>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">
                        {label}
                      </label>
                      <div className="relative">
                        <FieldIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          type={type}
                          value={profile[field]}
                          onChange={(e) => updateProfile(field, e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Role select */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Role
                    </label>
                    <select
                      value={profile.role}
                      onChange={(e) => updateProfile("role", e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 appearance-none"
                    >
                      <option value="admin">Administrator</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                      <option value="billing">Billing Manager</option>
                    </select>
                  </div>

                  {/* Bio — full width */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => updateProfile("bio", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 resize-none"
                      placeholder="Tell your team a little about yourself…"
                    />
                    <p className="text-xs text-slate-600 mt-1">
                      {profile.bio.length}/200 characters
                    </p>
                  </div>
                </div>
              </SectionCard>

              {/* Danger zone */}
              <motion.div
                variants={fadeInUp}
                className="bg-red-950/20 border border-red-900/30 rounded-2xl px-6 py-5"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-300">Danger Zone</h3>
                    <p className="text-xs text-red-400/70 mt-1 leading-relaxed">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 px-4 py-2 rounded-xl border border-red-700/50 text-red-400 text-xs font-semibold hover:bg-red-900/30 transition-colors duration-200"
                  >
                    Delete Account
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {activeTab === "notifications" && (
            <>
              <SectionCard
                title="Email Notifications"
                description="Choose which emails you'd like to receive from Pulse Analytics."
                icon={Mail}
              >
                <div className="divide-y divide-slate-800/60">
                  <Toggle
                    checked={notifications.emailDigest}
                    onChange={(v) => updateNotification("emailDigest", v)}
                    label="Daily Email Digest"
                    description="A summary of your key metrics delivered every morning at 8 AM."
                  />
                  <Toggle
                    checked={notifications.weeklyReport}
                    onChange={(v) => updateNotification("weeklyReport", v)}
                    label="Weekly Performance Report"
                    description="Comprehensive weekly breakdown of revenue, users, and growth trends."
                  />
                  <Toggle
                    checked={notifications.revenueAlerts}
                    onChange={(v) => updateNotification("revenueAlerts", v)}
                    label="Revenue Alerts"
                    description="Get notified when revenue spikes or drops beyond your set threshold."
                  />
                  <Toggle
                    checked={notifications.userMilestones}
                    onChange={(v) => updateNotification("userMilestones", v)}
                    label="User Milestones"
                    description="Celebrate when you hit 100, 500, 1K, or 10K active users."
                  />
                </div>
              </SectionCard>

              <SectionCard
                title="System & Security"
                description="Critical alerts about your account and platform health."
                icon={Bell}
              >
                <div className="divide-y divide-slate-800/60">
                  <Toggle
                    checked={notifications.systemUpdates}
                    onChange={(v) => updateNotification("systemUpdates", v)}
                    label="System Updates"
                    description="Notifications about scheduled maintenance and new feature releases."
                  />
                  <Toggle
                    checked={notifications.securityAlerts}
                    onChange={(v) => updateNotification("securityAlerts", v)}
                    label="Security Alerts"
                    description="Immediate alerts for suspicious login attempts or unusual activity."
                  />
                </div>
              </SectionCard>

              <SectionCard
                title="Marketing & Product"
                description="Stay in the loop with product news and tips."
                icon={Globe}
              >
                <div className="divide-y divide-slate-800/60">
                  <Toggle
                    checked={notifications.marketingEmails}
                    onChange={(v) => updateNotification("marketingEmails", v)}
                    label="Marketing Emails"
                    description="Promotions, case studies, and special offers from the Pulse team."
                  />
                  <Toggle
                    checked={notifications.productNews}
                    onChange={(v) => updateNotification("productNews", v)}
                    label="Product News & Tips"
                    description="Learn about new features, integrations, and best practices."
                  />
                </div>
              </SectionCard>

              {/* Notification summary */}
              <motion.div
                variants={scaleIn}
                className="bg-slate-900/40 border border-slate-800/40 rounded-2xl px-6 py-4 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-sm text-slate-400">
                  You have{" "}
                  <span className="text-indigo-300 font-semibold">
                    {Object.values(notifications).filter(Boolean).length}
                  </span>{" "}
                  of {Object.keys(notifications).length} notification types enabled.
                </p>
              </motion.div>
            </>
          )}

          {/* ── APPEARANCE TAB ── */}
          {activeTab === "appearance" && (
            <>
              <SectionCard
                title="Theme"
                description="Choose how Pulse Analytics looks on your device."
                icon={Palette}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {themeOptions.map(({ id, label, icon: ThemeIcon }) => {
                    const isSelected = appearance.theme === id;
                    return (
                      <motion.button
                        key={id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateAppearance("theme", id)}
                        className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-slate-700/60 bg-slate-800/30 hover:border-slate-600"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? "bg-indigo-500/20 text-indigo-400"
                              : "bg-slate-700/60 text-slate-400"
                          }`}
                        >
                          <ThemeIcon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-indigo-300" : "text-slate-400"
                          }`}
                        >
                          {label}
                        </span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </SectionCard>

              <SectionCard
                title="Accent Color"
                description="Personalize the highlight color used throughout the interface."
                icon={Palette}
              >
                <div className="flex flex-wrap gap-3">
                  {accentColors.map(({ id, hex, label }) => {
                    const isSelected = appearance.accentColor === id;
                    return (
                      <motion.button
                        key={id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => updateAppearance("accentColor", id)}
                        title={label}
                        className={`relative w-10 h-10 rounded-xl border-2 transition-all duration-200 ${
                          isSelected ? "border-white/60 scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: hex }}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Selected:{" "}
                  <span className="text-slate-300 capitalize">{appearance.accentColor}</span>
                </p>
              </SectionCard>

              <SectionCard
                title="Interface Preferences"
                description="Fine-tune the layout and interaction style."
                icon={Monitor}
              >
                <div className="divide-y divide-slate-800/60">
                  <Toggle
                    checked={appearance.compactMode}
                    onChange={(v) => updateAppearance("compactMode", v)}
                    label="Compact Mode"
                    description="Reduce spacing and padding for a denser information layout."
                  />
                  <Toggle
                    checked={appearance.animationsEnabled}
                    onChange={(v) => updateAppearance("animationsEnabled", v)}
                    label="Enable Animations"
                    description="Smooth transitions and micro-interactions throughout the UI."
                  />
                  <Toggle
                    checked={appearance.sidebarCollapsed}
                    onChange={(v) => updateAppearance("sidebarCollapsed", v)}
                    label="Collapse Sidebar by Default"
                    description="Start with the sidebar in icon-only mode to maximize content area."
                  />
                </div>
              </SectionCard>
            </>
          )}

          {/* ── SECURITY TAB ── */}
          {activeTab === "security" && (
            <>
              <SectionCard
                title="Change Password"
                description="Use a strong, unique password to keep your account secure."
                icon={Lock}
              >
                <div className="space-y-4">
                  {(
                    [
                      { field: "current" as const, label: "Current Password" },
                      { field: "next" as const, label: "New Password" },
                      { field: "confirm" as const, label: "Confirm New Password" },
                    ] as const
                  ).map(({ field, label }) => (
                    <div key={field}>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">
                        {label}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          type={showPasswords[field] ? "text" : "password"}
                          value={passwordForm[field]}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }))
                          }
                          placeholder="••••••••"
                          className="w-full pl-9 pr-10 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {showPasswords[field] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Password strength indicator */}
                  {passwordForm.next.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-1.5"
                    >
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => {
                          const strength = Math.min(
                            4,
                            Math.floor(passwordForm.next.length / 3)
                          );
                          return (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                                level <= strength
                                  ? strength <= 1
                                    ? "bg-red-500"
                                    : strength <= 2
                                    ? "bg-amber-500"
                                    : strength <= 3
                                    ? "bg-yellow-400"
                                    : "bg-emerald-500"
                                  : "bg-slate-700"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <p className="text-xs text-slate-500">
                        Password strength:{" "}
                        <span
                          className={
                            passwordForm.next.length < 4
                              ? "text-red-400"
                              : passwordForm.next.length < 7
                              ? "text-amber-400"
                              : passwordForm.next.length < 10
                              ? "text-yellow-400"
                              : "text-emerald-400"
                          }
                        >
                          {passwordForm.next.length < 4
                            ? "Weak"
                            : passwordForm.next.length < 7
                            ? "Fair"
                            : passwordForm.next.length < 10
                            ? "Good"
                            : "Strong"}
                        </span>
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-colors duration-200"
                  >
                    Update Password
                  </motion.button>
                </div>
              </SectionCard>

              <SectionCard
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account."
                icon={Shield}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-200">Authenticator App</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Not Enabled
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Use an app like Google Authenticator or Authy to generate one-time codes.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-500/30 text-indigo-400 text-xs font-semibold hover:bg-indigo-500/10 transition-colors duration-200"
                  >
                    Enable
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-200">SMS Verification</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Receive a code via SMS to {profile.phone} when signing in.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700/60 text-slate-400 text-xs font-semibold hover:bg-slate-800/60 transition-colors duration-200"
                  >
                    Manage
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </SectionCard>

              <SectionCard
                title="Active Sessions"
                description="Devices currently signed in to your account."
                icon={Monitor}
              >
                <div className="space-y-3">
                  {[
                    {
                      device: "MacBook Pro 16″",
                      location: "San Francisco, CA",
                      lastSeen: "Active now",
                      current: true,
                      browser: "Chrome 124",
                    },
                    {
                      device: "iPhone 15 Pro",
                      location: "San Francisco, CA",
                      lastSeen: "2 hours ago",
                      current: false,
                      browser: "Safari Mobile",
                    },
                    {
                      device: "Windows PC",
                      location: "New York, NY",
                      lastSeen: "3 days ago",
                      current: false,
                      browser: "Firefox 125",
                    },
                  ].map((session, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-slate-700/60 flex items-center justify-center flex-shrink-0">
                          <Monitor className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-slate-200 truncate">
                              {session.device}
                            </p>
                            {session.current && (
                              <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400">
                                This device
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {session.browser} · {session.location} · {session.lastSeen}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-shrink-0 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                        >
                          Revoke
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title="Connected Apps"
                description="Third-party applications with access to your Pulse data."
                icon={CreditCard}
              >
                <div className="space-y-3">
                  {[
                    {
                      name: "Slack",
                      description: "Receive dashboard alerts in your Slack workspace.",
                      connected: true,
                      logo: "S",
                      color: "bg-purple-500",
                    },
                    {
                      name: "Zapier",
                      description: "Automate workflows triggered by Pulse Analytics events.",
                      connected: true,
                      logo: "Z",
                      color: "bg-orange-500",
                    },
                    {
                      name: "HubSpot",
                      description: "Sync user and revenue data with your CRM.",
                      connected: false,
                      logo: "H",
                      color: "bg-rose-500",
                    },
                  ].map((app, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg ${app.color} flex items-center justify-center flex-shrink-0 text-white text-sm font-bold`}
                        >
                          {app.logo}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200">{app.name}</p>
                          <p className="text-xs text-slate-500 truncate">{app.description}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                          app.connected
                            ? "bg-slate-700/60 text-slate-400 hover:bg-red-900/30 hover:text-red-400"
                            : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20"
                        }`}
                      >
                        {app.connected ? "Disconnect" : "Connect"}
                      </motion.button>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}
        </motion.div>
      </div>

      {/* Save toast */}
      <SaveToast visible={saveToast} />
    </div>
  );
}