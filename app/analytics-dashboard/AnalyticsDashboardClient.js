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
  ChevronRight,
  TrendingDown,
  Gauge
} from "lucide-react";

export default function AnalyticsDashboardClient() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("pageviews"); // 'pageviews' | 'activeUsers' | 'whatsapp' | 'showroom' | 'maxScroll'
  const [auditProgress, setAuditProgress] = useState(0);

  // Fetch Analytics
  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    setAuditProgress(15);
    try {
      const interval = setInterval(() => {
        setAuditProgress(prev => (prev >= 90 ? 90 : prev + 15));
      }, 350);

      const res = await fetch("/api/seo-audit", { cache: "no-store" });
      clearInterval(interval);
      setAuditProgress(100);

      if (!res.ok) throw new Error("Failed to load analytics endpoints.");
      const result = await res.json();
      setData(result);
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
    fetchAnalyticsData();
  }, []);

  // Compute stats aggregates
  const totalPageviews = data?.pages.reduce((acc, p) => acc + (p.pageviews || 0), 0) || 0;
  const totalActiveUsers = data?.pages.reduce((acc, p) => acc + (p.activeUsers || 0), 0) || 0;
  const totalWhatsAppClicks = data?.pages.reduce((acc, p) => acc + (p.userActivity?.whatsapp || 0), 0) || 0;
  const totalShowroomClicks = data?.pages.reduce((acc, p) => acc + (p.userActivity?.showroom || 0), 0) || 0;

  const whatsappConvRate = totalPageviews > 0 ? ((totalWhatsAppClicks / totalPageviews) * 100).toFixed(2) : "0.00";
  const showroomConvRate = totalPageviews > 0 ? ((totalShowroomClicks / totalPageviews) * 100).toFixed(2) : "0.00";

  // Filter and Sort pages
  const getProcessedPages = () => {
    if (!data?.pages) return [];
    
    return data.pages
      .filter(p => p.path.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "pageviews") return (b.pageviews || 0) - (a.pageviews || 0);
        if (sortBy === "activeUsers") return (b.activeUsers || 0) - (a.activeUsers || 0);
        if (sortBy === "whatsapp") return (b.userActivity?.whatsapp || 0) - (a.userActivity?.whatsapp || 0);
        if (sortBy === "showroom") return (b.userActivity?.showroom || 0) - (a.userActivity?.showroom || 0);
        if (sortBy === "maxScroll") return (b.userActivity?.maxScroll || 0) - (a.userActivity?.maxScroll || 0);
        return 0;
      });
  };

  const processedPages = getProcessedPages();

  if (error) {
    return (
      <div className="min-h-screen bg-[#080D09] text-white flex flex-col items-center justify-center p-6 font-sans">
        <Activity className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold font-serif mb-2">Analytics API Connection Error</h1>
        <p className="text-white/60 mb-6 text-center max-w-md">{error}</p>
        <button 
          onClick={fetchAnalyticsData}
          className="px-6 py-3 bg-[#C5A059] text-black font-bold uppercase tracking-wider rounded-lg hover:scale-105 transition-all cursor-pointer"
        >
          Try Connecting Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2A26] font-sans pb-24 pt-[124px]">
      
      {/* Header Bar */}
      <div className="bg-[#0D150F] border-b border-[#C5A059]/20 py-8 px-[5%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[100%] bg-[radial-gradient(circle,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <Image src="/logos/uniq-logo.png" alt="Uniq Decor" width={120} height={33} className="h-[33px] w-auto object-contain brightness-0 invert" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-lg md:text-xl font-serif font-black uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                  <span>Site-Wide Activity Analytics</span>
                </h1>
                <span className="text-[9px] bg-red-600/20 border border-red-600/40 text-red-400 font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Confidential</span>
              </div>
              
              <p className="text-white/40 text-xs mt-1 font-medium">Real-time user behavior, click events, conversion rates & GA4 performance</p>
              
              {/* Header Navigation Toggles */}
              <div className="flex gap-2 mt-4">
                <Link 
                  href="/seo-dashboard"
                  className="text-[10px] bg-white/5 border border-white/10 hover:border-[#C5A059]/40 text-white/70 hover:text-white px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  Switch to SEO Audits
                </Link>
                <span className="text-[10px] bg-[#C5A059]/10 border border-[#C5A059]/40 text-[#C5A059] px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  Analytics Panel (Active)
                </span>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            onClick={fetchAnalyticsData}
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#C5A059] hover:bg-[#B38D46] disabled:opacity-50 text-[#080D09] font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg active:scale-[0.97] transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Analytics
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">

        {/* Loading Progress */}
        {loading && (
          <div className="mb-8 bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm text-center">
            <p className="text-sm font-semibold text-[#8B4513] animate-pulse mb-3 font-serif">Compiling latest active sessions and events database logs...</p>
            <div className="w-full bg-[#FAF9F6] border border-[#8B4513]/10 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#C5A059] to-[#8B4513] h-full transition-all duration-300 rounded-full" 
                style={{ width: `${auditProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-stone-500 mt-2 font-mono">{auditProgress}% Analytics Compiled</p>
          </div>
        )}

        {data && !loading && (
          <>
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Card 1: Active Users */}
              <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(74,222,128,0.06)_0%,transparent_70%)] pointer-events-none" />
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-[#15803d] rounded-full flex items-center justify-center animate-pulse">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">Live Active Users</span>
                  <span className="text-2xl font-black text-emerald-700 mt-0.5 block font-mono">{data.summary.liveActiveUsers || 0}</span>
                  <span className="text-[9px] text-stone-400 block mt-0.5">sessions in last 5m</span>
                </div>
              </div>

              {/* Card 2: Total Pageviews */}
              <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5 relative overflow-hidden">
                <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">Site Views (30 Days)</span>
                  <span className="text-2xl font-black text-stone-800 mt-0.5 block font-mono">{totalPageviews}</span>
                  <span className="text-[9px] text-indigo-700 block mt-0.5 font-bold">{totalActiveUsers} unique users</span>
                </div>
              </div>

              {/* Card 3: WhatsApp Inquiries */}
              <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5 relative overflow-hidden">
                <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/20 text-[#25D366] rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">WhatsApp Click Leads</span>
                  <span className="text-2xl font-black text-[#25D366] mt-0.5 block font-mono">{totalWhatsAppClicks}</span>
                  <span className="text-[9px] text-stone-400 block mt-0.5">direct chat triggers</span>
                </div>
              </div>

              {/* Card 4: Booking Forms */}
              <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5 relative overflow-hidden">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 text-[#C5A059] rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">Showroom Bookings</span>
                  <span className="text-2xl font-black text-[#8B4513] mt-0.5 block font-mono">{totalShowroomClicks}</span>
                  <span className="text-[9px] text-stone-400 block mt-0.5">visit scheduler clicks</span>
                </div>
              </div>
            </div>

            {/* Conversion Funnel Widget */}
            <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-sm">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-3 block mb-6 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#8B4513]" /> Goal Conversion Funnel Performance
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#2D2A26]">
                {/* Funnel 1: WhatsApp */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full shrink-0" />
                      WhatsApp Inquiry Conversion Rate
                    </span>
                    <span className="font-mono text-sm font-black text-[#25D366]">{whatsappConvRate}%</span>
                  </div>
                  <div className="w-full bg-[#FAF9F6] h-3 rounded-full overflow-hidden border border-[#8B4513]/10">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-[#25D366] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, parseFloat(whatsappConvRate) * 10)}%` }} // Scaled display factor
                    />
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {totalPageviews > 0 
                      ? "Total chats relative to 30-day page traffic views" 
                      : "Pending GA4 visitor views to calculate rate"}
                  </span>
                </div>

                {/* Funnel 2: Showroom Visits */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#C5A059] rounded-full shrink-0" />
                      Showroom Visit Scheduler Conversion
                    </span>
                    <span className="font-mono text-sm font-black text-[#8B4513]">{showroomConvRate}%</span>
                  </div>
                  <div className="w-full bg-[#FAF9F6] h-3 rounded-full overflow-hidden border border-[#8B4513]/10">
                    <div 
                      className="bg-gradient-to-r from-[#8B4513] to-[#C5A059] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, parseFloat(showroomConvRate) * 10)}%` }} // Scaled display factor
                    />
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {totalPageviews > 0 
                      ? "Total visit reservations relative to 30-day page traffic views" 
                      : "Pending GA4 visitor views to calculate rate"}
                  </span>
                </div>
              </div>
            </div>

            {/* Split Page: Pages Leaderboard (Left/Right Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Pages Activity Leaderboard (2 Cols) */}
              <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 lg:col-span-2 shadow-sm text-[#2D2A26]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#8B4513]/10 pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] block font-serif">Page-Level Engagement Leaderboard</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Inspect engagement indexes sorted by active filters</p>
                  </div>

                  <div className="relative w-full sm:w-[220px]">
                    <input 
                      type="text" 
                      placeholder="Search routes..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-850 placeholder-stone-400 focus:outline-none focus:border-[#C5A059] transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
                  </div>
                </div>

                {/* Sorter Headers */}
                <div className="flex flex-wrap gap-2 mb-4 text-[9px] font-bold uppercase tracking-wider text-[#2D2A26]">
                  <span className="text-stone-500 flex items-center mr-1">Sort by:</span>
                  <button 
                    onClick={() => setSortBy("pageviews")}
                    className={`px-3 py-1 rounded border transition-all ${
                      sortBy === "pageviews" ? "bg-[#C5A059] text-[#080D09] border-[#C5A059]/20" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-black"
                    }`}
                  >
                    Pageviews
                  </button>
                  <button 
                    onClick={() => setSortBy("activeUsers")}
                    className={`px-3 py-1 rounded border transition-all ${
                      sortBy === "activeUsers" ? "bg-[#C5A059] text-[#080D09] border-[#C5A059]/20" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-black"
                    }`}
                  >
                    Active Users
                  </button>
                  <button 
                    onClick={() => setSortBy("whatsapp")}
                    className={`px-3 py-1 rounded border transition-all ${
                      sortBy === "whatsapp" ? "bg-[#25D366]/20 text-emerald-800 border-[#25D366]/30 font-bold" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-black"
                    }`}
                  >
                    WhatsApp Chats
                  </button>
                  <button 
                    onClick={() => setSortBy("showroom")}
                    className={`px-3 py-1 rounded border transition-all ${
                      sortBy === "showroom" ? "bg-[#C5A059]/20 text-[#8B4513] border-[#C5A059]/30 font-bold" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-black"
                    }`}
                  >
                    Visits
                  </button>
                  <button 
                    onClick={() => setSortBy("maxScroll")}
                    className={`px-3 py-1 rounded border transition-all ${
                      sortBy === "maxScroll" ? "bg-indigo-50 text-indigo-700 border-indigo-100 font-bold" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-black"
                    }`}
                  >
                    Scroll Depth
                  </button>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-stone-150 text-stone-500 font-bold uppercase tracking-wider text-[9px] pb-2">
                        <th className="pb-3">Page Route</th>
                        <th className="pb-3 text-center">GA4 Views</th>
                        <th className="pb-3 text-center">GA4 Users</th>
                        <th className="pb-3 text-center text-[#25D366]">Chats</th>
                        <th className="pb-3 text-center text-[#8B4513]">Visits</th>
                        <th className="pb-3 text-right text-indigo-700">Max Scroll</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedPages.map((page, idx) => (
                        <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50">
                          <td className="py-3 font-mono text-[11px] text-stone-700">
                            <span className="truncate max-w-[200px] block" title={page.path}>{page.path}</span>
                          </td>
                          <td className="py-3 text-center font-bold text-stone-800 font-mono">{page.pageviews || 0}</td>
                          <td className="py-3 text-center text-stone-600 font-mono">{page.activeUsers || 0}</td>
                          <td className={`py-3 text-center font-bold font-mono ${page.userActivity?.whatsapp > 0 ? "text-[#25D366]" : "text-stone-300"}`}>
                            {page.userActivity?.whatsapp || 0}
                          </td>
                          <td className={`py-3 text-center font-bold font-mono ${page.userActivity?.showroom > 0 ? "text-[#8B4513]" : "text-stone-300"}`}>
                            {page.userActivity?.showroom || 0}
                          </td>
                          <td className="py-3 text-right font-bold text-indigo-700 font-mono">
                            {page.userActivity?.maxScroll || 0}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Live Logs Feed (1 Col) */}
              <div className="bg-white border border-[#8B4513]/10 rounded-2xl p-6 shadow-sm">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-4 block mb-6 flex items-center gap-1.5 font-serif">
                  <Clock className="w-4 h-4 text-[#8B4513]" /> Live Event Stream (Last 24h)
                </span>

                {!data?.summary?.recentEvents || data.summary.recentEvents.length === 0 ? (
                  <div className="text-center py-12 text-stone-400 italic text-xs">
                    No clicks, scrolls, or pageviews recorded on the site in the last 24 hours.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-stone-200/50">
                    {data.summary.recentEvents.map((evt, idx) => {
                      const timeString = new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      
                      return (
                        <div key={idx} className="bg-[#FAF9F6] border border-[#8B4513]/10 p-3.5 rounded-xl flex items-start gap-3 text-xs leading-normal shadow-sm">
                          <span className="font-mono text-[10px] text-stone-400 shrink-0 mt-0.5">{timeString}</span>
                          
                          <div className="grow">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-stone-800 font-mono">{evt.sessionId.substring(0, 12)}</span>
                              
                              {evt.event === "pageview" && (
                                <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Pageview</span>
                              )}
                              {evt.event === "scroll" && (
                                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Scroll {evt.target}</span>
                              )}
                              {evt.event === "click" && (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Click {evt.target}</span>
                              )}
                            </div>
                            
                            <p className="font-mono text-[10px] text-stone-600 mt-1.5 truncate" title={evt.path}>Path: {evt.path}</p>
                            {evt.label && (
                              <p className="text-[10px] text-stone-500 mt-0.5">Label: "{evt.label}"</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
            </div>
          </>
        )}

      </div>
    </div>
  );
}
