"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Info,
  Layers,
  Image as ImageIcon,
  Code,
  FileText,
  Hash,
  Calendar,
  TrendingUp,
  Link as LinkIcon,
  Globe,
  Activity,
  MapPin,
  Tag,
  BarChart3,
  Database,
  Clock,
  ArrowRightLeft,
  ChevronsRight
} from "lucide-react";

export default function SeoDashboardClient() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'perfect' | 'warnings' | 'bails'
  const [groupByHierarchy, setGroupByHierarchy] = useState(true);
  const [expandedPages, setExpandedPages] = useState({});
  const [reScraping, setReScraping] = useState({});
  const [auditProgress, setAuditProgress] = useState(0);
  const [inspections, setInspections] = useState({});

  // Trigger full crawl
  const runFullAudit = async () => {
    setLoading(true);
    setError(null);
    setAuditProgress(10);
    try {
      const interval = setInterval(() => {
        setAuditProgress(prev => (prev >= 90 ? 90 : prev + 15));
      }, 400);

      const res = await fetch("/api/seo-audit", { cache: "no-store" });
      clearInterval(interval);
      setAuditProgress(100);

      if (!res.ok) throw new Error("Failed to scan site pages.");
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

  // Run audit on mount
  useEffect(() => {
    runFullAudit();
  }, []);

  // Re-scrape a single page
  const reScrapePage = async (path) => {
    setReScraping(prev => ({ ...prev, [path]: true }));
    try {
      const res = await fetch(`/api/seo-audit?path=${encodeURIComponent(path)}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Single page audit failed.");
      const pageResult = await res.json();
      
      setData(prev => {
        if (!prev) return prev;
        const updatedPages = prev.pages.map(p => p.path === path ? pageResult : p);
        
        // Recompute overall summary and links graph
        updatedPages.forEach((r) => {
          r.links.incoming = updatedPages.filter((other) => other.path !== r.path && other.links.list.includes(r.path)).length;
        });

        const totalScore = updatedPages.reduce((acc, r) => acc + r.score, 0);
        const averageScore = parseFloat((totalScore / updatedPages.length).toFixed(1));
        const failedPagesCount = updatedPages.filter(r => r.score < 90).length;
        const clientBailoutsCount = updatedPages.filter(r => r.bailoutDetected).length;

        return {
          summary: {
            averageScore,
            totalPages: updatedPages.length,
            failedPages: failedPagesCount,
            clientBailouts: clientBailoutsCount
          },
          pages: updatedPages
        };
      });
    } catch (err) {
      alert(`Error re-scraping page: ${err.message}`);
    } finally {
      setReScraping(prev => ({ ...prev, [path]: false }));
    }
  };

  const runLiveInspection = async (path) => {
    setInspections(prev => ({
      ...prev,
      [path]: { ...prev[path], loading: true, error: null }
    }));
    try {
      const res = await fetch(`/api/inspect-url?path=${encodeURIComponent(path)}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to query live Google inspection API.");
      const result = await res.json();
      setInspections(prev => ({
        ...prev,
        [path]: { loading: false, data: result, error: null }
      }));
    } catch (err) {
      setInspections(prev => ({
        ...prev,
        [path]: { loading: false, data: null, error: err.message }
      }));
    }
  };

  const togglePageExpand = (path) => {
    setExpandedPages(prev => ({ ...prev, [path]: !prev[path] }));
  };
  const getPageGroup = (path) => {
    if (path.includes("/locations/") || path.endsWith("/locations")) return "Neighborhood Local SEO Pages";
    if (path.includes("/materials/")) return "Niche Tech Materials Pages";
    if (path.includes("/hospitality/")) return "B2B Hospitality Niches";
    if (path.startsWith("/ddecor/")) return "Dynamic Fabric Category Hubs";
    if (path.startsWith("/geeken/")) return "Geeken Office Furniture Pages";
    if (path.startsWith("/roserro/")) return "Roserro Luxury Linen Pages";
    if (path.startsWith("/laxree-amenities/")) return "LaxRee Hospitality Amenities Pages";
    if (path.startsWith("/laxree-roofing/")) return "LaxRee Premium Roofing Pages";
    if (path.startsWith("/blog/")) return "Company Blog Posts";
    return "Main Brand & Layout Pages";
  };

  const groupsOrder = [
    "Main Brand & Layout Pages",
    "Dynamic Fabric Category Hubs",
    "Geeken Office Furniture Pages",
    "Roserro Luxury Linen Pages",
    "LaxRee Hospitality Amenities Pages",
    "LaxRee Premium Roofing Pages",
    "Neighborhood Local SEO Pages",
    "Niche Tech Materials Pages",
    "B2B Hospitality Niches",
    "Company Blog Posts"
  ];
  if (error) {
    return (
      <div className="min-h-screen bg-[#080D09] text-white flex flex-col items-center justify-center p-6 font-sans">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold font-serif mb-2">Audit API Connection Error</h1>
        <p className="text-white/60 mb-6 text-center max-w-md">{error}</p>
        <button 
          onClick={runFullAudit}
          className="px-6 py-3 bg-[#C5A059] text-black font-bold uppercase tracking-wider rounded-lg hover:scale-105 transition-all"
        >
          Try Connecting Again
        </button>
      </div>
    );
  }

  // Filter and search logic
  const getFilteredPages = () => {
    return data?.pages.filter(page => {
      const matchesSearch = page.path.toLowerCase().includes(search.toLowerCase()) || 
                            page.keyword.toLowerCase().includes(search.toLowerCase());
      
      if (!matchesSearch) return false;
      
      if (filter === "perfect") return page.score === 100;
      if (filter === "warnings") return page.score < 100 && !page.bailoutDetected;
      if (filter === "bails") return page.bailoutDetected;
      return true;
    }) || [];
  };

  const filteredPages = getFilteredPages();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2A26] font-sans pb-24 pt-[112px] lg:pt-[124px]">
      
      {/* Header Bar */}
      <div className="bg-[#080D09] text-white border-b border-[#C5A059]/20 py-8 px-[5%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[100%] bg-[radial-gradient(circle,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <Image src="/logos/uniq-logo.png" alt="Uniq Decor" width={120} height={33} className="h-[33px] w-auto object-contain brightness-0 invert" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-serif font-black uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <span>Secret SEO Control Panel</span>
                <span className="text-[10px] bg-red-600 text-white font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">Confidential</span>
              </h1>
              <p className="text-white/40 text-xs mt-0.5 font-medium">Site-wide crawled index status, local backlinks tracker, GSC & GA4 panel</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* GSC Status */}
                {data?.summary?.gscSuccess ? (
                  <span className="text-[9px] bg-emerald-500/25 border border-emerald-500/40 text-[#4ade80] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-ping shrink-0" />
                    Search Console (GSC): Connected
                  </span>
                ) : (
                  <span className="text-[9px] bg-amber-500/25 border border-amber-500/40 text-amber-400 font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5" title={data?.summary?.apiError || "GSC Credentials not configured"}>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                    Search Console (GSC): Sandbox Mode
                  </span>
                )}

                {/* GA4 Status */}
                {data?.summary?.ga4Success ? (
                  <span className="text-[9px] bg-emerald-500/25 border border-emerald-500/40 text-[#4ade80] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-ping shrink-0" />
                    Google Analytics (GA4): Connected
                  </span>
                ) : (
                  <span 
                    className="text-[9px] bg-amber-500/25 border border-amber-500/40 text-amber-400 font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 cursor-help"
                    title={data?.summary?.apiError || "GA4 Property Access Permission Required"}
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                    Google Analytics (GA4): Pending Setup
                  </span>
                )}

                {/* Google Ads Status */}
                {data?.summary?.adsSuccess ? (
                  <span className="text-[9px] bg-emerald-500/25 border border-emerald-500/40 text-[#4ade80] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-ping shrink-0" />
                    Google Ads (Keyword Planner): Connected
                  </span>
                ) : (
                  <span 
                    className="text-[9px] bg-amber-500/25 border border-amber-500/40 text-amber-400 font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 cursor-help"
                    title={data?.summary?.apiError || "Google Ads Developer Token is in Test Mode / Pending Approval"}
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                    Google Ads (Keyword Planner): Test Mode
                  </span>
                )}

                {/* Live Active Users */}
                {data?.summary?.liveActiveUsers !== undefined && (
                  <span className="text-[9px] bg-emerald-500/25 border border-emerald-500/40 text-[#4ade80] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full shrink-0" />
                    Live: {data.summary.liveActiveUsers} active users
                  </span>
                )}
              </div>
              
              {/* Header Navigation Toggles */}
              <div className="flex gap-2 mt-4">
                <span className="text-[10px] bg-[#C5A059]/10 border border-[#C5A059]/40 text-[#C5A059] px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  SEO Panel (Active)
                </span>
                <Link 
                  href="/analytics-dashboard"
                  className="text-[10px] bg-white/5 border border-white/10 hover:border-[#C5A059]/40 text-white/70 hover:text-white px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  Switch to Analytics
                </Link>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            onClick={runFullAudit}
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#C5A059] hover:bg-[#B38D46] disabled:opacity-50 text-[#080D09] font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg active:scale-[0.97] transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Run Full Audit Scan
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">

        {/* Progress Bar */}
        {loading && (
          <div className="mb-8 bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm text-center">
            <p className="text-sm font-semibold text-[#8B4513] animate-pulse mb-3 font-serif">Crawling and indexing all {data?.pages?.length || 78} dynamic route configurations...</p>
            <div className="w-full bg-[#FAF9F6] border border-[#8B4513]/10 h-3.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#C5A059] to-[#8B4513] h-full transition-all duration-300 rounded-full" 
                style={{ width: `${auditProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-[#6B6560] mt-2 font-mono">{auditProgress}% Crawl Audit Completed</p>
          </div>
        )}

        {/* Stats Summary Panel */}
        {data && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl font-bold ${
                data.summary.averageScore >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {data.summary.averageScore}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B6560] tracking-wider block">Average SEO Score</span>
                <span className="text-sm font-serif font-bold mt-1 block">
                  {data.summary.averageScore >= 95 ? "🚀 Highly Optimized" : "⚠️ Needs Improvement"}
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center font-serif text-xl font-bold text-stone-700">
                {data.summary.totalPages}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B6560] tracking-wider block">Total Scanned Pages</span>
                <span className="text-sm font-bold text-[#2D2A26] mt-1 block font-serif">Full Sitemap Audited</span>
              </div>
            </div>

            <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl font-bold ${
                data.summary.failedPages === 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {data.summary.failedPages}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B6560] tracking-wider block">Low-Score Warnings</span>
                <span className="text-sm font-bold text-[#2D2A26] mt-1 block font-serif">Pages Score &lt; 90%</span>
              </div>
            </div>

            <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl font-bold ${
                data.summary.clientBailouts === 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {data.summary.clientBailouts}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B6560] tracking-wider block">CSR Bails (Next.js)</span>
                <span className="text-sm font-bold text-[#2D2A26] mt-1 block font-serif">
                  {data.summary.clientBailouts === 0 ? "🔥 Clean static HTML" : "❌ Loading Spinners Only"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filters, Grouping and Search Controls */}
        {data && !loading && (
          <div className="bg-white border border-[#8B4513]/10 p-6 rounded-2xl shadow-sm mb-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex flex-wrap gap-1">
                <button 
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                    filter === "all" ? 'bg-[#080D09] text-white' : 'bg-stone-50 border border-stone-200 hover:bg-stone-100 text-[#6B6560]'
                  }`}
                >
                  All ({data.pages.length})
                </button>
                <button 
                  onClick={() => setFilter("perfect")}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                    filter === "perfect" ? 'bg-emerald-800 text-white' : 'bg-stone-50 border border-stone-200 hover:bg-stone-100 text-[#6B6560]'
                  }`}
                >
                  Perfect ({data.pages.filter(p => p.score === 100).length})
                </button>
                <button 
                  onClick={() => setFilter("warnings")}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                    filter === "warnings" ? 'bg-amber-700 text-white' : 'bg-stone-50 border border-stone-200 hover:bg-stone-100 text-[#6B6560]'
                  }`}
                >
                  Warnings ({data.pages.filter(p => p.score < 100 && !p.bailoutDetected).length})
                </button>
              </div>

              <div className="h-5 w-px bg-stone-200 hidden sm:block" />

              <button
                onClick={() => setGroupByHierarchy(prev => !prev)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  groupByHierarchy 
                    ? 'bg-[#8B4513] text-white' 
                    : 'bg-stone-50 border border-stone-200 hover:bg-stone-100 text-[#6B6560]'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                Group by Hierarchy: {groupByHierarchy ? "ON" : "OFF"}
              </button>
            </div>

            <div className="relative w-full lg:w-[350px]">
              <input 
                type="text" 
                placeholder="Search route path or focus keyword..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#8B4513]/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#2D2A26] focus:outline-none focus:border-[#C5A059] transition-all font-medium"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#6B6560]" />
            </div>
          </div>
        )}

        {/* Audited Pages List */}
        {data && !loading && (
          <div className="flex flex-col gap-8">
            {filteredPages.length === 0 ? (
              <div className="bg-white border border-[#8B4513]/10 p-12 rounded-2xl shadow-sm text-center">
                <Search className="w-12 h-12 text-[#6B6560] mx-auto mb-4 opacity-40" />
                <h3 className="font-serif text-lg font-bold">No audited pages found</h3>
                <p className="text-xs text-[#6B6560] mt-1">Try adjusting your search query or filters.</p>
              </div>
            ) : (
              groupByHierarchy ? (
                // Grouped view
                groupsOrder.map(groupName => {
                  const groupPages = filteredPages.filter(p => getPageGroup(p.path) === groupName);
                  if (groupPages.length === 0) return null;

                  return (
                    <div key={groupName} className="flex flex-col gap-4">
                      <h2 className="font-serif text-lg font-black text-[#8B4513] border-b border-[#8B4513]/15 pb-2 flex items-center gap-2 mt-4">
                        <ChevronsRight className="w-5 h-5 text-[#C5A059]" />
                        <span>{groupName}</span>
                        <span className="text-xs font-mono font-bold bg-[#FAF9F6] px-2.5 py-0.5 border border-[#8B4513]/10 text-[#6B6560] rounded-full">{groupPages.length}</span>
                      </h2>

                      <div className="flex flex-col gap-4">
                        {groupPages.map(page => renderPageCard(page))}
                      </div>
                    </div>
                  );
                })
              ) : (
                // Ungrouped view
                filteredPages.map(page => renderPageCard(page))
              )
            )}
          </div>
        )}

      </div>
    </div>
  );

  // Helper to render a page card component
  function renderPageCard(page) {
    const isExpanded = !!expandedPages[page.path];
    const isReScraping = !!reScraping[page.path];
    const isLocationSEO = page.path.includes("/locations/");

    return (
      <div key={page.path} className="bg-white border border-[#8B4513]/10 rounded-2xl shadow-sm overflow-hidden hover:border-[#C5A059]/40 transition-all duration-300">
        
        {/* Page Summary Header */}
        <div 
          onClick={() => togglePageExpand(page.path)}
          className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 cursor-pointer hover:bg-stone-50/50 transition-colors select-none"
        >
          <div className="flex items-start gap-4 grow">
            {page.score === 100 ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
            ) : page.bailoutDetected ? (
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-1" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
            )}
            <div className="grow">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-[#2D2A26] bg-[#FAF9F6] border border-stone-200 px-2 py-0.5 rounded">{page.path}</span>
                {isLocationSEO && (
                  <span className="inline-flex items-center gap-1 text-[9px] bg-sky-50 text-sky-700 border border-sky-150 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    <MapPin className="w-2.5 h-2.5" /> Local SEO Target
                  </span>
                )}
                {page.bailoutDetected && (
                  <span className="text-[9px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest">CSR Hydration Bail</span>
                )}
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  page.indexability.status === "Indexable" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                    : "bg-red-50 text-red-700 border-red-100"
                }`}>
                  {page.indexability.status}
                </span>
                <span className="text-[9px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-mono">
                  {page.indexability.liveStatus}
                </span>
              </div>

              {/* Primary Target Keyword (Large size display requested) */}
              <div className="mt-2.5">
                <span className="text-[9px] uppercase font-bold text-[#6B6560] tracking-wider block">Target Focus Keyword</span>
                <span className="text-base font-serif font-black text-[#8B4513] tracking-wide mt-0.5 block flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>"{page.keyword || "None"}"</span>
                  <span className="text-[9px] font-mono font-bold bg-[#FAF9F6] border border-[#8B4513]/10 text-[#6B6560] px-2 py-0.5 rounded-full uppercase ml-1">
                    {page.keywordType}
                  </span>
                </span>
              </div>

              {/* Mini quick metrics strip collapsed view */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-[10px] text-[#6B6560] font-medium bg-[#FAF9F6] border border-[#8B4513]/5 p-2 px-3 rounded-lg w-fit">
                <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5 text-[#C5A059]" /> Traffic: <strong>{page.traffic.clicks} clks</strong> / <strong>{page.traffic.impressions} imp</strong> / <strong>{page.pageviews || 0} views</strong></span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Rank: <strong>#{page.ranking.position}</strong> (Vol: {page.ranking.volume})</span>
                <span className="flex items-center gap-1"><LinkIcon className="w-3.5 h-3.5 text-teal-600" /> Link Graph: <strong>{page.links.internal} int</strong> / <strong>{page.links.incoming} backlink</strong></span>
                <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5 text-purple-600" /> Schemas: <strong>{page.schemas.count} count</strong></span>
                <span className="flex items-center gap-1"><Hash className="w-3.5 h-3.5 text-amber-600" /> Density: <strong>{page.keywordDensity}%</strong> ({page.keywordCount} matches)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch lg:self-auto justify-between border-t border-stone-100 lg:border-none pt-3 lg:pt-0 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#6B6560] uppercase tracking-wider font-bold">SEO Score:</span>
              <span className={`font-mono text-sm font-black px-2.5 py-1 rounded-lg border ${
                page.score === 100 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                page.score >= 90 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-red-50 text-red-700 border-red-200'
              }`}>{page.score}%</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                disabled={isReScraping}
                onClick={(e) => {
                  e.stopPropagation();
                  reScrapePage(page.path);
                }}
                className="p-2 hover:bg-stone-100 disabled:opacity-50 text-[#6B6560] hover:text-black rounded-lg transition-colors cursor-pointer"
                title="Re-scrape this page only"
              >
                <RefreshCw className={`w-4.5 h-4.5 ${isReScraping ? 'animate-spin' : ''}`} />
              </button>
              <a 
                href={page.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="p-2 hover:bg-stone-100 text-[#6B6560] hover:text-black rounded-lg transition-colors"
                title="Open live link"
              >
                <ExternalLink className="w-4.5 h-4.5" />
              </a>
              {isExpanded ? <ChevronUp className="w-5 h-5 text-[#6B6560]" /> : <ChevronDown className="w-5 h-5 text-[#6B6560]" />}
            </div>
          </div>
        </div>

        {/* Page Expanded Details (Expanded Grid Structure) */}
        {isExpanded && (
          <div className="border-t border-[#8B4513]/10 bg-[#FAF9F6]/50 p-6 flex flex-col gap-6">
            
            {/* Expanded Multi-Column Data Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Box 1: GSC & GA4 Metrics */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm flex flex-col gap-3.5">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 flex items-center justify-between gap-1.5">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-[#C5A059]" /> Search & Traffic metrics
                  </span>
                  <div className="flex gap-1.5">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      page.traffic.source === "google" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      GSC: {page.traffic.source === "google" ? "Live" : "Simulated"}
                    </span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      data?.summary?.ga4Success 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      GA4: {data?.summary?.ga4Success ? "Live" : "Simulated"}
                    </span>
                  </div>
                </span>
                
                <div className="flex flex-col gap-2.5 text-xs text-[#6B6560]">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-stone-50/50 p-1.5 border border-stone-100 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block text-stone-500">Clicks</span>
                      <p className="text-sm font-black text-black mt-0.5">{page.traffic.clicks}</p>
                    </div>
                    <div className="bg-stone-50/50 p-1.5 border border-stone-100 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block text-stone-500">Impressions</span>
                      <p className="text-sm font-black text-black mt-0.5">{page.traffic.impressions}</p>
                    </div>
                    <div className="bg-stone-50/50 p-1.5 border border-stone-100 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block text-stone-500">CTR</span>
                      <p className="text-sm font-black text-black mt-0.5">{page.traffic.ctr}%</p>
                    </div>
                  </div>
                  
                  <hr className="border-stone-100" />
                  
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-emerald-50/20 p-1.5 border border-emerald-100/50 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block text-emerald-800">GA4 Views</span>
                      <p className="text-sm font-black text-emerald-950 mt-0.5">{page.pageviews || 0}</p>
                    </div>
                    <div className="bg-indigo-50/20 p-1.5 border border-indigo-100/50 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block text-indigo-800">Active Users</span>
                      <p className="text-sm font-black text-indigo-950 mt-0.5">{page.activeUsers || 0}</p>
                    </div>
                  </div>
                  
                  <hr className="border-stone-100" />
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Google Search Position:</span>
                    <span className="font-mono text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">Rank #{page.ranking.position}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Focus Keyword Vol:</span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-bold text-black">{page.ranking.volume} searches/mo</span>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        data?.summary?.adsSuccess 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {data?.summary?.adsSuccess ? "Live" : "Simulated"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2: Link Graph & Engagement Events */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm flex flex-col gap-3.5">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 flex items-center gap-1.5">
                  <LinkIcon className="w-4 h-4 text-teal-600" /> Links & User Engagement
                </span>
                <div className="flex flex-col gap-2.5 text-xs text-[#6B6560]">
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="bg-stone-50/50 p-2 border border-stone-100 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block">Internal</span>
                      <span className="text-xs font-black text-black block mt-0.5">{page.links.internal} links</span>
                    </div>
                    <div className="bg-stone-50/50 p-2 border border-stone-100 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block">External</span>
                      <span className="text-xs font-black text-black block mt-0.5">{page.links.external} links</span>
                    </div>
                    <div className="bg-teal-50/30 p-2 border border-teal-100 rounded-lg">
                      <span className="text-[9px] uppercase font-bold block text-teal-800">Incoming</span>
                      <span className="text-xs font-black text-teal-800 block mt-0.5">{page.links.incoming} pages</span>
                    </div>
                  </div>
                  <hr className="border-stone-100" />
                  <div className="flex items-center justify-between">
                    <span>WhatsApp Trigger:</span>
                    <span className={`font-bold ${page.userActivity?.whatsapp > 0 ? "text-emerald-600" : "text-stone-400"}`}>
                      {page.userActivity?.whatsapp || 0} chats
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Showroom CTA:</span>
                    <span className={`font-bold ${page.userActivity?.showroom > 0 ? "text-[#8B4513]" : "text-stone-400"}`}>
                      {page.userActivity?.showroom || 0} visits
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Max Scroll depth:</span>
                    <span className="font-mono text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      {page.userActivity?.maxScroll || 0}% read
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 3: Crawling status, indexation, & Dates */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm flex flex-col gap-3.5">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-600" /> Crawler & Index Status
                </span>
                <div className="flex flex-col gap-2.5 text-xs text-[#6B6560]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-emerald-600" /> Crawler Status:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-mono">Crawled successfully</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold">Last Audited / Crawled</span>
                    <span className="font-mono text-[10px] text-stone-600 mt-0.5">{page.crawledStatus.timestamp}</span>
                  </div>
                  <hr className="border-stone-100" />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Published Date:</span>
                    <span className="font-semibold text-black">{page.publishedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Last Page Update:</span>
                    <span className="font-semibold text-black">{page.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Box 4: HTML Tags & Schemas */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm flex flex-col gap-3.5">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-purple-600" /> Schema & Metadata Lengths
                </span>
                <div className="flex flex-col gap-2.5 text-xs text-[#6B6560]">
                  <div>
                    <span className="text-[9px] uppercase font-bold">Meta Title ({page.title.value.length} chars)</span>
                    <span className={`text-[10px] font-bold block ${page.title.status === 'Pass' ? 'text-emerald-700' : 'text-amber-700'}`}>{page.title.detail}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold">Meta Description ({page.description.value.length} chars)</span>
                    <span className={`text-[10px] font-bold block ${page.description.status === 'Pass' ? 'text-emerald-700' : 'text-amber-700'}`}>{page.description.detail}</span>
                  </div>
                  <hr className="border-stone-100" />
                  <div>
                    <span className="text-[9px] uppercase font-bold block">Schemas Detected ({page.schemas.count})</span>
                    {page.schemas.types && page.schemas.types.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {page.schemas.types.map((type, i) => (
                          <span key={i} className="text-[8px] bg-purple-50 text-purple-700 border border-purple-100 px-1.5 py-0.5 rounded font-bold font-mono">
                            {type}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-amber-700 block">No LD-JSON schemas detected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Live GSC Search Queries & Inspection API Diagnostics */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Option 2: Search Queries Table (span 2) */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm lg:col-span-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 block mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#C5A059]" /> Top Search Queries (GSC Live)
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">30-day stats</span>
                </span>
                
                {!page.queries || page.queries.length === 0 ? (
                  <p className="text-xs text-stone-500 italic p-4 text-center">No GSC search queries recorded for this URL in the last 30 days.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-stone-100 text-[#6B6560] font-bold">
                          <th className="pb-2">Search Query</th>
                          <th className="pb-2 text-center">Clicks</th>
                          <th className="pb-2 text-center">Impressions</th>
                          <th className="pb-2 text-center">CTR</th>
                          <th className="pb-2 text-right">Avg Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.queries.slice(0, 8).map((q, idx) => (
                          <tr key={idx} className="border-b border-stone-50 hover:bg-stone-50/50">
                            <td className="py-2.5 font-medium text-black">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-mono">{q.query}</span>
                                {q.cannibalized && (
                                  <span className="text-[9px] text-red-600 font-bold flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3 shrink-0" /> Competing on: {q.competingPages.join(", ")}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2.5 text-center font-bold text-black">{q.clicks}</td>
                            <td className="py-2.5 text-center text-stone-600">{q.impressions}</td>
                            <td className="py-2.5 text-center text-stone-600">{q.ctr}%</td>
                            <td className="py-2.5 text-right font-mono text-stone-700">#{q.position}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Option 3: URL Inspection & PageSpeed (span 2) */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm lg:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 block mb-4 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" /> Live Google Diagnostics & Speed
                  </span>
                  
                  {inspections[page.path]?.data ? (
                    <div className="flex flex-col gap-4 text-xs">
                      {/* Inspection Verdict Card */}
                      <div className="bg-stone-50 border border-stone-150 p-3 rounded-lg flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Google Index Verdict:</span>
                          <span className={`px-2 py-0.5 rounded font-bold font-mono text-[10px] uppercase ${
                            inspections[page.path].data.inspection.verdict === "PASS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}>
                            {inspections[page.path].data.inspection.verdict}
                          </span>
                        </div>
                        <div className="flex flex-col text-[#6B6560] gap-1">
                          <span><strong>Crawl Status:</strong> {inspections[page.path].data.inspection.coverage}</span>
                          {inspections[page.path].data.inspection.lastCrawl && (
                            <span><strong>Last Crawl Time:</strong> {new Date(inspections[page.path].data.inspection.lastCrawl).toLocaleString()}</span>
                          )}
                          <span><strong>Mobile Friendly:</strong> {inspections[page.path].data.inspection.mobileUsability === "PASS" ? "Yes ✅" : "No ❌"}</span>
                        </div>
                      </div>

                      {/* PageSpeed Performance Card */}
                      <div className="bg-stone-50 border border-stone-150 p-3 rounded-lg flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Lighthouse Core Web Vitals:</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${
                              inspections[page.path].data.pageSpeed.score >= 90 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                              inspections[page.path].data.pageSpeed.score >= 50 ? "bg-amber-50 text-amber-700 border border-amber-100" :
                              "bg-red-50 text-red-700 border border-red-100"
                            }`}>
                              Score: {inspections[page.path].data.pageSpeed.score}/100
                            </span>
                            {inspections[page.path].data.pageSpeed.simulated && (
                              <span className="text-[8px] bg-amber-500/10 text-amber-600 px-1 rounded uppercase font-bold">Simulated</span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center text-[11px] text-[#6B6560]">
                          <div className="bg-white p-1.5 border border-stone-100 rounded">
                            <span className="text-[9px] uppercase font-bold block text-stone-500">LCP</span>
                            <p className="font-bold text-black mt-0.5">{inspections[page.path].data.pageSpeed.lcp}</p>
                          </div>
                          <div className="bg-white p-1.5 border border-stone-100 rounded">
                            <span className="text-[9px] uppercase font-bold block text-stone-500">FCP</span>
                            <p className="font-bold text-black mt-0.5">{inspections[page.path].data.pageSpeed.fcp}</p>
                          </div>
                          <div className="bg-white p-1.5 border border-stone-100 rounded">
                            <span className="text-[9px] uppercase font-bold block text-stone-500">CLS</span>
                            <p className="font-bold text-black mt-0.5">{inspections[page.path].data.pageSpeed.cls}</p>
                          </div>
                          <div className="bg-white p-1.5 border border-stone-100 rounded">
                            <span className="text-[9px] uppercase font-bold block text-stone-500">Speed Index</span>
                            <p className="font-bold text-black mt-0.5">{inspections[page.path].data.pageSpeed.speedIndex}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-stone-50 border border-stone-100 rounded-lg flex flex-col items-center gap-3">
                      <Activity className="w-8 h-8 text-stone-400 animate-pulse" />
                      <p className="text-xs text-[#6B6560] max-w-[250px] mx-auto">Click below to fetch live Google Search Console Index Verification and Core Web Vitals speed tests.</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  {inspections[page.path]?.error && (
                    <p className="text-[10px] text-red-600 font-bold mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Error: {inspections[page.path].error}
                    </p>
                  )}
                  
                  <button
                    disabled={inspections[page.path]?.loading}
                    onClick={(e) => {
                      e.stopPropagation();
                      runLiveInspection(page.path);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C5A059] hover:bg-[#B38D46] disabled:opacity-50 text-[#080D09] font-bold text-xs uppercase tracking-widest rounded-lg shadow active:scale-[0.97] transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${inspections[page.path]?.loading ? "animate-spin" : ""}`} />
                    {inspections[page.path]?.loading ? "Analyzing Live Google APIs..." : "Run Live Google Diagnostics"}
                  </button>
                </div>
              </div>
            </div>

            {/* Structured Tags info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Headings Hierarchy Tree */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 block mb-4 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Heading tags hierarchy structure ({page.headingsHierarchy.items.length} tags)
                </span>
                {page.headingsHierarchy.items.length === 0 ? (
                  <p className="text-xs text-red-600 font-semibold">No heading elements found on this page.</p>
                ) : (
                  <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-2">
                    {page.headingsHierarchy.items.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold shrink-0 ${
                          h.level === 1 ? 'bg-purple-100 text-purple-700' :
                          h.level === 2 ? 'bg-blue-100 text-blue-700' :
                          'bg-stone-100 text-stone-700'
                        }`}>H{h.level}</span>
                        <span className="text-stone-700 line-clamp-1">{h.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                <span className={`text-[10px] font-semibold mt-3 block ${page.headingsHierarchy.status === 'Pass' ? 'text-emerald-700' : 'text-amber-700'}`}>{page.headingsHierarchy.detail}</span>
              </div>

              {/* Missing Image Alts List */}
              <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 block mb-4 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 animate-bounce" /> Missing Alt attributes image list ({page.images.missingAlt})
                </span>
                {page.images.missingAlt === 0 ? (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold p-4 bg-emerald-50/50 rounded-lg">
                    <CheckCircle className="w-4 h-4" /> All images on this page contain descriptive alternative attributes!
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-2">
                    {page.images.items.map((img, i) => (
                      <div key={i} className="text-xs border-b border-stone-50 pb-2 break-all">
                        <span className="text-[10px] text-red-600 font-bold block">Missing ALT Description</span>
                        <span className="font-mono text-[11px] text-stone-500 mt-1 block">{img.src}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Checklist Details */}
            <div className="bg-white border border-[#8B4513]/8 p-5 rounded-xl shadow-sm">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#8B4513] border-b border-[#8B4513]/10 pb-2 block mb-4 flex items-center gap-1.5">
                <Hash className="w-4 h-4" /> On-Page Keyword Checklist details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
                {page.checklist.map((item, i) => (
                  <div key={i} className={`p-3 border rounded-xl flex items-center gap-2.5 ${
                    item.pass ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700' : 'bg-red-50/50 border-red-100 text-red-700'
                  }`}>
                    {item.pass ? <CheckCircle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    );
  }
}
