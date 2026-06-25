"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Activity, 
  RefreshCw, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  Search, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp, 
  ArrowRightLeft,
  TrendingDown,
  Gauge,
  Monitor,
  Globe,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Send
} from "lucide-react";

export default function AnalyticsDashboardClient() {
  const [seoData, setSeoData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("pageviews");
  const [activeTab, setActiveTab] = useState("overview");
  const [auditProgress, setAuditProgress] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setAuditProgress(10);
    try {
      const interval = setInterval(() => {
        setAuditProgress(prev => (prev >= 90 ? 90 : prev + 15));
      }, 300);

      // Run both fetches but don't let events failure block the whole dashboard
      const [seoRes, eventsRes] = await Promise.all([
        fetch("/api/seo-audit", { cache: "no-store" }),
        fetch("/api/events", { cache: "no-store" }).catch(() => null)
      ]);

      clearInterval(interval);
      setAuditProgress(100);

      if (!seoRes.ok) throw new Error("Failed to load SEO audit data.");

      const seoResult = await seoRes.json();
      setSeoData(seoResult);

      // Events data is optional - use empty defaults if unavailable
      if (eventsRes && eventsRes.ok) {
        try {
          const eventsResult = await eventsRes.json();
          setEventsData(eventsResult);
        } catch (e) {
          setEventsData(null); // graceful fallback
        }
      } else {
        setEventsData(null); // no events tracking yet (Vercel filesystem limitation)
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setAuditProgress(0);
      }, 500);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  // Compute aggregate stats
  const totalPageviews = seoData?.pages.reduce((acc, p) => acc + (p.pageviews || 0), 0) || 0;
  const totalActiveUsers = seoData?.pages.reduce((acc, p) => acc + (p.activeUsers || 0), 0) || 0;
  const totalWhatsAppClicks = eventsData?.totalWhatsAppClicks || seoData?.pages.reduce((acc, p) => acc + (p.userActivity?.whatsapp || 0), 0) || 0;
  const totalShowroomClicks = eventsData?.totalShowroomClicks || seoData?.pages.reduce((acc, p) => acc + (p.userActivity?.showroom || 0), 0) || 0;
  const totalFormSubmissions = eventsData?.totalFormSubmissions || 0;
  const totalErrors = eventsData?.totalErrors || 0;
  const avgSessionDuration = eventsData?.avgSessionDuration || 0;
  const avgTimeOnPage = eventsData?.avgTimeOnPage || 0;

  const whatsappConvRate = totalPageviews > 0 ? ((totalWhatsAppClicks / totalPageviews) * 100).toFixed(2) : "0.00";
  const showroomConvRate = totalPageviews > 0 ? ((totalShowroomClicks / totalPageviews) * 100).toFixed(2) : "0.00";
  const formConvRate = totalPageviews > 0 ? ((totalFormSubmissions / totalPageviews) * 100).toFixed(2) : "0.00";

  // Process pages leaderboard
  const getProcessedPages = () => {
    if (!seoData?.pages) return [];
    return seoData.pages
      .filter(p => p.path.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "pageviews") return (b.pageviews || 0) - (a.pageviews || 0);
        if (sortBy === "activeUsers") return (b.activeUsers || 0) - (a.activeUsers || 0);
        if (sortBy === "whatsapp") return (b.userActivity?.whatsapp || 0) - (a.userActivity?.whatsapp || 0);
        if (sortBy === "showroom") return (b.userActivity?.showroom || 0) - (a.userActivity?.showroom || 0);
        if (sortBy === "maxScroll") return (b.userActivity?.maxScroll || 0) - (a.userActivity?.maxScroll || 0);
        if (sortBy === "timeOnPage") {
          const aTime = eventsData?.pages?.[a.path]?.totalTime && eventsData?.pages?.[a.path]?.entries
            ? Math.round(eventsData.pages[a.path].totalTime / eventsData.pages[a.path].entries) : 0;
          const bTime = eventsData?.pages?.[b.path]?.totalTime && eventsData?.pages?.[b.path]?.entries
            ? Math.round(eventsData.pages[b.path].totalTime / eventsData.pages[b.path].entries) : 0;
          return bTime - aTime;
        }
        return 0;
      });
  };

  // Compute daily trend chart data
  const dailyTrend = eventsData?.daily ? Object.entries(eventsData.daily)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, d]) => ({
      date,
      pageviews: d.pageviews || 0,
      sessions: d.sessions || 0,
      clicks: d.clicks || 0,
      wa: d.wa || 0,
      forms: d.forms || 0
    })) : [];

  const maxDailyViews = Math.max(...dailyTrend.map(d => d.pageviews), 1);

  // Top referrers
  const topReferrers = eventsData?.referrers ? Object.entries(eventsData.referrers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8) : [];

  const maxRefCount = Math.max(...topReferrers.map(([, c]) => c), 1);

  // Device breakdown
  const deviceBreakdown = eventsData?.devices ? Object.entries(eventsData.devices)
    .sort(([, a], [, b]) => b - a) : [];
  const maxDeviceCount = Math.max(...deviceBreakdown.map(([, c]) => c), 1);

  const processedPages = getProcessedPages();

  if (error) {
    return (
      <div className="min-h-screen bg-[#080D09] text-white flex flex-col items-center justify-center p-6 font-sans">
        <Activity className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold font-serif mb-2">Analytics Connection Error</h1>
        <p className="text-white/60 mb-6 text-center max-w-md">{error}</p>
        <button onClick={fetchData} className="px-6 py-3 bg-[#C5A059] text-black font-bold uppercase tracking-wider rounded-lg hover:scale-105 transition-all cursor-pointer">
          Retry
        </button>
      </div>
    );
  }

  const formatDuration = (seconds) => {
    if (!seconds || seconds < 0) return "0m 0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2A26] font-sans pb-24 pt-[124px]">
      
      {/* Header */}
      <div className="bg-[#0D150F] border-b border-[#C5A059]/20 py-8 px-[5%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[100%] bg-[radial-gradient(circle,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <Image src="/logos/uniq-logo.png" alt="Uniq Decor" width={120} height={33} className="h-[33px] w-auto object-contain brightness-0 invert" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-lg md:text-xl font-serif font-black uppercase tracking-wider text-[#C5A059]">
                  Analytics Performance Panel
                </h1>
                <span className="text-[9px] bg-red-600/20 border border-red-600/40 text-red-400 font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Confidential</span>
              </div>
              <p className="text-white/40 text-xs mt-1 font-medium">Real-time user behavior, sessions, referrers, conversions & page analytics</p>
              <div className="flex gap-2 mt-4">
                <Link href="/seo-dashboard" className="text-[10px] bg-white/5 border border-white/10 hover:border-[#C5A059]/40 text-white/70 hover:text-white px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center gap-1.5">
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  Switch to SEO Audits
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {seoData && !loading && (
              <button
                onClick={() => {
                  const headers = "Page,Pageviews,Active Users,WhatsApp Clicks,Showroom Clicks,Max Scroll%,Form Submissions,Avg Time On Page (s),SEO Score";
                  const rows = processedPages.map(p => {
                    const avgTime = eventsData?.pages?.[p.path]?.totalTime && eventsData?.pages?.[p.path]?.entries
                      ? Math.round(eventsData.pages[p.path].totalTime / eventsData.pages[p.path].entries) : 0;
                    return `"${p.path}",${p.pageviews||0},${p.activeUsers||0},${p.userActivity?.whatsapp||0},${p.userActivity?.showroom||0},${p.userActivity?.maxScroll||0}%,${eventsData?.pages?.[p.path]?.forms||0},${avgTime},${p.score}`;
                  });
                  const csv = [headers, ...rows].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `analytics-${new Date().toISOString().split("T")[0]}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#C5A059] hover:text-[#080D09] hover:bg-[#C5A059] font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                CSV
              </button>
            )}
            <button onClick={fetchData} disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#B38D46] disabled:opacity-50 text-[#080D09] font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg active:scale-[0.97] transition-all cursor-pointer">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">

        {loading && (
          <div className="mb-8 bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm text-center">
            <p className="text-sm font-semibold text-[#8B4513] animate-pulse mb-3 font-serif">Compiling analytics data...</p>
            <div className="w-full bg-[#FAF9F6] border border-[#8B4513]/10 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#C5A059] to-[#8B4513] h-full transition-all duration-300 rounded-full" style={{ width: `${auditProgress}%` }} />
            </div>
            <p className="text-[10px] text-stone-500 mt-2 font-mono">{auditProgress}%</p>
          </div>
        )}

        {seoData && !loading && (
          <>
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["overview", "pages", "sessions", "errors"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab ? 'bg-[#080D09] text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}>
                  {tab === "overview" ? "Overview" : tab === "pages" ? "Page Analytics" : tab === "sessions" ? "Sessions & Sources" : "Errors"}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <>
                {/* Top Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  <div className="bg-white border border-[#8B4513]/10 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span className="text-[9px] uppercase font-bold text-stone-500 tracking-wider">Live Users</span>
                    </div>
                    <span className="text-xl font-black text-emerald-700 font-mono">{eventsData?.liveActiveUsers || seoData?.summary?.liveActiveUsers || 0}</span>
                    <span className="text-[8px] text-stone-400 block">in last 5 min</span>
                  </div>

                  <div className="bg-white border border-[#8B4513]/10 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-indigo-600" />
                      <span className="text-[9px] uppercase font-bold text-stone-500 tracking-wider">Views (30d)</span>
                    </div>
                    <span className="text-xl font-black text-stone-800 font-mono">{totalPageviews}</span>
                  </div>

                  <div className="bg-white border border-[#8B4513]/10 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span className="text-[9px] uppercase font-bold text-stone-500 tracking-wider">WhatsApp</span>
                    </div>
                    <span className="text-xl font-black text-emerald-600 font-mono">{totalWhatsAppClicks}</span>
                  </div>

                  <div className="bg-white border border-[#8B4513]/10 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span className="text-[9px] uppercase font-bold text-stone-500 tracking-wider">Bookings</span>
                    </div>
                    <span className="text-xl font-black text-[#8B4513] font-mono">{totalShowroomClicks}</span>
                  </div>

                  <div className="bg-white border border-[#8B4513]/10 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Send className="w-4 h-4 text-blue-600" />
                      <span className="text-[9px] uppercase font-bold text-stone-500 tracking-wider">Forms</span>
                    </div>
                    <span className="text-xl font-black text-blue-700 font-mono">{totalFormSubmissions}</span>
                  </div>

                  <div className="bg-white border border-[#8B4513]/10 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-[9px] uppercase font-bold text-stone-500 tracking-wider">Avg Session</span>
                    </div>
                    <span className="text-sm font-black text-purple-700 font-mono">{formatDuration(avgSessionDuration)}</span>
                  </div>
                </div>

                {/* Daily Trend Chart */}
                {dailyTrend.length > 1 && (
                  <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 mb-8 shadow-sm">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-6 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" /> Daily Pageviews Trend (Last 14 Days)
                    </span>
                    <div className="flex items-end gap-1.5 h-32">
                      {dailyTrend.map((d, i) => {
                        const barH = Math.max(6, (d.pageviews / maxDailyViews) * 100);
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                            <div className="w-full bg-indigo-100 rounded-t relative" style={{ height: `${barH}%` }}>
                              <div className="w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors absolute bottom-0" style={{ height: '100%' }} />
                            </div>
                            <span className="text-[7px] text-stone-400 font-mono">{d.date.slice(5)}</span>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              {d.date}: {d.pageviews} views, {d.wa} WA clicks
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Conversion Funnel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-4 flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-[#8B4513]" /> Conversion Funnel
                    </span>
                    <div className="flex flex-col gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold">Views → WhatsApp</span>
                          <span className="font-mono font-black text-emerald-600">{whatsappConvRate}%</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all" style={{ width: `${Math.min(100, parseFloat(whatsappConvRate) * 8)}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold">Views → Showroom Booking</span>
                          <span className="font-mono font-black text-[#8B4513]">{showroomConvRate}%</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-[#8B4513] to-[#C5A059] h-full rounded-full transition-all" style={{ width: `${Math.min(100, parseFloat(showroomConvRate) * 8)}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold">Views → Form Submit</span>
                          <span className="font-mono font-black text-blue-600">{formConvRate}%</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all" style={{ width: `${Math.min(100, parseFloat(formConvRate) * 8)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session Stats */}
                  <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" /> Session & Engagement Stats
                    </span>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-xl">
                        <span className="text-[9px] uppercase font-bold text-purple-700 block">Avg Session</span>
                        <span className="text-sm font-black text-purple-900 font-mono">{formatDuration(avgSessionDuration)}</span>
                      </div>
                      <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl">
                        <span className="text-[9px] uppercase font-bold text-indigo-700 block">Avg Time/Page</span>
                        <span className="text-sm font-black text-indigo-900 font-mono">{formatDuration(avgTimeOnPage)}</span>
                      </div>
                      <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
                        <span className="text-[9px] uppercase font-bold text-emerald-700 block">Total Pageviews</span>
                        <span className="text-sm font-black text-emerald-900 font-mono">{eventsData?.totalPageviews || totalPageviews}</span>
                      </div>
                      <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-xl">
                        <span className="text-[9px] uppercase font-bold text-amber-700 block">Errors Tracked</span>
                        <span className="text-sm font-black text-amber-900 font-mono">{totalErrors}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "pages" && (
              <>
                {/* Page Leaderboard */}
                <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm mb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#8B4513]/10 pb-4 mb-6">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] block">Page-Level Engagement</span>
                      <p className="text-[10px] text-stone-500 mt-0.5">Sorted by selected metric</p>
                    </div>
                    <div className="relative w-full sm:w-[220px]">
                      <input type="text" placeholder="Search routes..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#C5A059]" />
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
                    </div>
                  </div>

                  {/* Sorters */}
                  <div className="flex flex-wrap gap-2 mb-4 text-[9px] font-bold uppercase tracking-wider">
                    <span className="text-stone-500 mr-1">Sort:</span>
                    {[
                      { key: "pageviews", label: "Pageviews" },
                      { key: "activeUsers", label: "Users" },
                      { key: "whatsapp", label: "WA Chats" },
                      { key: "showroom", label: "Bookings" },
                      { key: "maxScroll", label: "Scroll Depth" },
                      { key: "timeOnPage", label: "Time/Page" }
                    ].map(s => (
                      <button key={s.key} onClick={() => setSortBy(s.key)} className={`px-2.5 py-1 rounded border transition-all ${
                        sortBy === s.key ? 'bg-[#C5A059] text-[#080D09] border-[#C5A059]/30' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}>{s.label}</button>
                    ))}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-stone-150 text-stone-500 font-bold uppercase tracking-wider text-[9px]">
                          <th className="pb-3">Page</th>
                          <th className="pb-3 text-center">Views</th>
                          <th className="pb-3 text-center">Users</th>
                          <th className="pb-3 text-center text-emerald-600">WA</th>
                          <th className="pb-3 text-center text-amber-700">Visit</th>
                          <th className="pb-3 text-center text-indigo-700">Scroll</th>
                          <th className="pb-3 text-center text-blue-700">Forms</th>
                          <th className="pb-3 text-right text-purple-700">Time/Page</th>
                          <th className="pb-3 text-center">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {processedPages.map((p, idx) => {
                          const avgTime = eventsData?.pages?.[p.path]?.totalTime && eventsData?.pages?.[p.path]?.entries
                            ? Math.round(eventsData.pages[p.path].totalTime / eventsData.pages[p.path].entries) : 0;
                          return (
                            <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50">
                              <td className="py-2.5 font-mono text-[11px] text-stone-700 truncate max-w-[180px]" title={p.path}>{p.path}</td>
                              <td className="py-2.5 text-center font-bold font-mono">{p.pageviews || 0}</td>
                              <td className="py-2.5 text-center text-stone-600 font-mono">{p.activeUsers || 0}</td>
                              <td className={`py-2.5 text-center font-bold font-mono ${(p.userActivity?.whatsapp || 0) > 0 ? "text-emerald-600" : "text-stone-300"}`}>{p.userActivity?.whatsapp || 0}</td>
                              <td className={`py-2.5 text-center font-bold font-mono ${(p.userActivity?.showroom || 0) > 0 ? "text-amber-700" : "text-stone-300"}`}>{p.userActivity?.showroom || 0}</td>
                              <td className="py-2.5 text-center font-bold text-indigo-700 font-mono">{p.userActivity?.maxScroll || 0}%</td>
                              <td className="py-2.5 text-center font-bold text-blue-700 font-mono">{eventsData?.pages?.[p.path]?.forms || 0}</td>
                              <td className="py-2.5 text-right font-mono text-purple-700">{formatDuration(avgTime)}</td>
                              <td className={`py-2.5 text-center font-bold font-mono ${p.score === 100 ? 'text-emerald-600' : p.score >= 90 ? 'text-amber-600' : 'text-red-600'}`}>{p.score}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "sessions" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Referrers */}
                <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" /> Top Referrers (7 Days)
                  </span>
                  {topReferrers.length === 0 ? (
                    <div className="text-center py-8 text-xs text-stone-400 italic">No referrer data yet</div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {topReferrers.map(([domain, count], i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-stone-600 w-28 truncate" title={domain}>{domain === "direct" ? "Direct / None" : domain}</span>
                          <div className="flex-1 bg-stone-100 h-3 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full" style={{ width: `${(count / maxRefCount) * 100}%` }} />
                          </div>
                          <span className="text-[10px] font-bold font-mono text-stone-700 w-12 text-right">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Devices */}
                <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-4 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-purple-600" /> Device Platform Breakdown
                  </span>
                  {deviceBreakdown.length === 0 ? (
                    <div className="text-center py-8 text-xs text-stone-400 italic">No device data yet</div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {deviceBreakdown.map(([platform, count], i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-stone-600 w-32 truncate">{platform}</span>
                          <div className="flex-1 bg-stone-100 h-3 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full" style={{ width: `${(count / maxDeviceCount) * 100}%` }} />
                          </div>
                          <span className="text-[10px] font-bold font-mono text-stone-700 w-12 text-right">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Event Stream */}
                <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm lg:col-span-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" /> Live Event Stream (Last 7 Days)
                  </span>
                  {!eventsData?.recentEvents || eventsData.recentEvents.length === 0 ? (
                    <div className="text-center py-8 text-xs text-stone-400 italic">No events recorded</div>
                  ) : (
                    <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
                      {eventsData.recentEvents.map((evt, idx) => {
                        const timeString = new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        return (
                          <div key={idx} className="bg-[#FAF9F6] border border-stone-100 p-2.5 rounded-lg flex items-start gap-2.5 text-xs">
                            <span className="font-mono text-[9px] text-stone-400 shrink-0 mt-0.5">{timeString}</span>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {evt.event === "pageview" && <span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">View</span>}
                              {evt.event === "click" && <span className="bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Click {evt.target}</span>}
                              {evt.event === "scroll" && <span className="bg-indigo-50 text-indigo-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Scroll {evt.target}</span>}
                              {evt.event === "form_submit" && <span className="bg-blue-50 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Form</span>}
                              {evt.event === "session_end" && <span className="bg-purple-50 text-purple-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">End</span>}
                              {evt.event === "error" && <span className="bg-red-50 text-red-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Error</span>}
                              {evt.event === "heartbeat" && <span className="bg-stone-50 text-stone-500 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Ping</span>}
                              <span className="font-mono text-[9px] text-stone-500">{evt.path}</span>
                              {evt.label && <span className="text-stone-500">— {evt.label}</span>}
                              {evt.duration && <span className="text-purple-600 font-mono text-[9px]">({formatDuration(evt.duration)})</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "errors" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 404 Tracking */}
                <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" /> 404 Page Hits
                  </span>
                  {!eventsData?.notFoundPaths || Object.keys(eventsData.notFoundPaths).length === 0 ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold p-4 bg-emerald-50 rounded-lg">
                      <CheckCircle className="w-4 h-4" /> No 404 hits recorded
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {Object.entries(eventsData.notFoundPaths).map(([path, count], i) => (
                        <div key={i} className="flex items-center justify-between bg-red-50 border border-red-100 p-2 rounded-lg">
                          <span className="font-mono text-xs text-red-700">{path}</span>
                          <span className="font-bold text-red-700 font-mono">{count}x</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* JS Errors */}
                <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" /> JavaScript Errors
                  </span>
                  {!eventsData?.errorEvents || eventsData.errorEvents.length === 0 ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold p-4 bg-emerald-50 rounded-lg">
                      <CheckCircle className="w-4 h-4" /> No JS errors recorded
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                      {eventsData.errorEvents.map((err, i) => (
                        <div key={i} className="bg-red-50 border border-red-100 p-2.5 rounded-lg">
                          <div className="flex items-center gap-2 text-xs">
                            <AlertTriangle className="w-3 h-3 text-red-600 shrink-0" />
                            <span className="font-mono text-[10px] text-red-700 line-clamp-2">{err.message}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-[9px] text-stone-500 font-mono">
                            <span>{err.path}</span>
                            <span>{new Date(err.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
