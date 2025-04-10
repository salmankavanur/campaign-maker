"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  PlusCircle, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  Upload, 
  Layers,
  Medal,
  TrendingUp,
  ChevronRight,
  BarChart3,
  Calendar,
  RefreshCw,
  Sparkles,
  Eye
} from "lucide-react";

// Define the stats interface with top frames
interface Stats {
  totalFrames: number;
  activeFrames: number;
  userFrames: number; // Total usage count
  topFrames?: {
    _id: string;
    name: string;
    usageCount: number;
    thumbnailUrl?: string;
  }[];
}

export default function PhotoFramingAdminPage() {
  const [stats, setStats] = useState<Stats>({
    totalFrames: 0,
    activeFrames: 0,
    userFrames: 0,
    topFrames: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // Use the new stats endpoint
      const response = await fetch('/api/frames/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalFrames: data.data.totalFrames,
          activeFrames: data.data.activeFrames,
          userFrames: data.data.totalUsage,
          topFrames: data.data.topFrames
        });
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      fetchStats();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleRefresh = () => {
    fetchStats();
  };

  return (
    <div className="space-y-6">
      {/* Page header with refresh button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <div className="mr-3 h-8 w-8 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <ImageIcon className="h-4 w-4 text-white" />
            </div>
            Photo Framing Tool
          </h1>
          <p className="text-gray-400 mt-1 flex items-center">
            {lastUpdated && (
              <span className="text-xs flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button 
              onClick={handleRefresh} 
              className="ml-3 text-xs flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh Data
            </button>
          </p>
        </div>
        
        <Link 
          href="/admin/photoframing/create" 
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center shadow-lg"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Create New Frame
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/20 transition-all duration-300 overflow-hidden group">
          <div className="p-5 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-3xl opacity-40 -mr-10 -mt-10 group-hover:opacity-60 transition-opacity"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Frames</p>
                <h3 className="text-3xl font-bold text-white mt-2 flex items-baseline">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                  ) : (
                    <>
                      {stats.totalFrames}
                      <span className="text-emerald-400 text-sm ml-2 font-normal">frames</span>
                    </>
                  )}
                </h3>
              </div>
              <div className="bg-emerald-900/30 p-3 rounded-lg">
                <Layers className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <div className="mt-5">
              <Link 
                href="/admin/photoframing/all"
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center"
              >
                View all frames
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-700"></div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/20 transition-all duration-300 overflow-hidden group">
          <div className="p-5 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl opacity-40 -mr-10 -mt-10 group-hover:opacity-60 transition-opacity"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Frames</p>
                <h3 className="text-3xl font-bold text-white mt-2 flex items-baseline">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                  ) : (
                    <>
                      {stats.activeFrames}
                      <span className="text-blue-400 text-sm ml-2 font-normal">published</span>
                    </>
                  )}
                </h3>
              </div>
              <div className="bg-blue-900/30 p-3 rounded-lg">
                <ImageIcon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-5">
              <span className="text-xs text-gray-400 flex items-center">
                {isLoading ? '...' : 
                <div className="flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-blue-400" />
                  {Math.round((stats.activeFrames / stats.totalFrames) * 100)}% of frames active
                </div>}
              </span>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-700"></div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/20 transition-all duration-300 overflow-hidden group">
          <div className="p-5 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl opacity-40 -mr-10 -mt-10 group-hover:opacity-60 transition-opacity"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">User Posters</p>
                <h3 className="text-3xl font-bold text-white mt-2 flex items-baseline">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                  ) : (
                    <>
                      {stats.userFrames}
                      <span className="text-purple-400 text-sm ml-2 font-normal">created</span>
                    </>
                  )}
                </h3>
              </div>
              <div className="bg-purple-900/30 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-5">
              <span className="text-xs text-gray-400 flex items-center">
                {isLoading ? '...' : 
                <div className="flex items-center">
                  <BarChart3 className="h-3 w-3 mr-1 text-purple-400" />
                  Average {Math.round(stats.userFrames / (stats.activeFrames || 1))} uses per frame
                </div>}
              </span>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-purple-700"></div>
        </div>
      </div>

      {/* Most Popular Frames Section */}
      {stats.topFrames && stats.topFrames.length > 0 && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center">
              <Medal className="h-5 w-5 text-amber-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Most Popular Frames</h3>
            </div>
            <Link
              href="/admin/photoframing/all?sort=popularity"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
            >
              See all stats
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">Rank</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">Frame Name</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-400">Preview</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-400">Usage Count</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="py-4 px-4">
                        <div className="h-6 w-6 bg-gray-700/50 rounded-full animate-pulse"></div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-5 w-32 bg-gray-700/50 rounded animate-pulse"></div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="h-10 w-16 bg-gray-700/50 rounded-md animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="h-5 w-16 bg-gray-700/50 rounded animate-pulse ml-auto"></div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="h-5 w-24 bg-gray-700/50 rounded animate-pulse ml-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  stats.topFrames.map((frame, index) => (
                    <tr key={frame._id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold 
                            ${index === 0 ? 'bg-amber-900/40 text-amber-300 border border-amber-500/30' : 
                            index === 1 ? 'bg-gray-800/60 text-gray-300 border border-gray-600/30' :
                            index === 2 ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30' :
                            'bg-gray-800/50 text-gray-400 border border-gray-700/30'}`}>
                            {index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-white">{frame.name}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="w-16 h-10 mx-auto bg-gray-700/50 rounded-md overflow-hidden flex items-center justify-center border border-gray-600/50">
                          {frame.thumbnailUrl ? (
                            <img src={frame.thumbnailUrl} alt={frame.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300 border border-purple-500/20">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {frame.usageCount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link 
                            href={`/admin/photoframing/edit?id=${frame._id}`}
                            className="p-1.5 rounded-md text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 transition-colors"
                            title="Edit frame"
                          >
                            <Settings className="h-4 w-4" />
                          </Link>
                          <Link 
                            href={`/photoframe?frame=${frame._id}`}
                            target="_blank"
                            className="p-1.5 rounded-md text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/30 transition-colors"
                            title="Preview frame"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 px-6 py-4 border-b border-gray-700/50">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link 
              href="/admin/photoframing/create" 
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-700/30 bg-gradient-to-br from-emerald-900/10 to-blue-900/10 hover:from-emerald-900/20 hover:to-blue-900/20 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="bg-emerald-900/30 p-3 rounded-full mb-3 group-hover:bg-emerald-900/50 transition-colors">
                <PlusCircle className="h-6 w-6 text-emerald-400" />
              </div>
              <h4 className="text-sm font-medium text-white">Create New Frame</h4>
              <p className="text-xs text-gray-400 mt-1 text-center">
                Add a new frame template
              </p>
            </Link>
            
            <Link 
              href="/admin/photoframing/all" 
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-700/30 bg-gradient-to-br from-blue-900/10 to-indigo-900/10 hover:from-blue-900/20 hover:to-indigo-900/20 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="bg-blue-900/30 p-3 rounded-full mb-3 group-hover:bg-blue-900/50 transition-colors">
                <Layers className="h-6 w-6 text-blue-400" />
              </div>
              <h4 className="text-sm font-medium text-white">View All Frames</h4>
              <p className="text-xs text-gray-400 mt-1 text-center">
                Manage existing frames
              </p>
            </Link>
            
            <Link 
              href="/admin/photoframing/edit" 
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-700/30 bg-gradient-to-br from-amber-900/10 to-orange-900/10 hover:from-amber-900/20 hover:to-orange-900/20 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="bg-amber-900/30 p-3 rounded-full mb-3 group-hover:bg-amber-900/50 transition-colors">
                <Settings className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="text-sm font-medium text-white">Edit Templates</h4>
              <p className="text-xs text-gray-400 mt-1 text-center">
                Modify existing frames
              </p>
            </Link>
            
            <Link 
              href="/photoframing"
              target="_blank"
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-700/30 bg-gradient-to-br from-purple-900/10 to-pink-900/10 hover:from-purple-900/20 hover:to-pink-900/20 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="bg-purple-900/30 p-3 rounded-full mb-3 group-hover:bg-purple-900/50 transition-colors">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h4 className="text-sm font-medium text-white">User Interface</h4>
              <p className="text-xs text-gray-400 mt-1 text-center">
                View the user experience
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* User Interface Preview */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 px-6 py-4 border-b border-gray-700/50">
          <h3 className="text-lg font-semibold text-white">User Interface Preview</h3>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-6 flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700/50 shadow-inner">
                <Upload className="h-12 w-12 text-gray-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-xs text-white px-2 py-1 rounded border border-gray-700/50">
                  Photo Framing Preview
                </span>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-4">
              <h4 className="text-lg font-medium text-white flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
                User Photo Framing Tool
              </h4>
              <p className="text-gray-300">
                The photo framing tool allows users to upload their own photos and place them into the frames you create. 
                Users can crop their images, position them within your pre-defined areas, and add their names.
              </p>
              <p className="text-gray-400 text-sm">
                All frames you mark as "active" will be available for users to select on the public interface.
              </p>
              <div className="flex gap-3 pt-2">
                <Link
                  href="/photoframing"
                  target="_blank"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium text-white transition-colors duration-300 flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View User Interface
                </Link>
                <Link
                  href="/admin/photoframing/settings"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-white transition-colors duration-300 flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Interface Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}