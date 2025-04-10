'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Grid, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  Bell, 
  LogOut,
  ChevronDown,
  BarChart2,
  Home,
  Layers,
  HelpCircle,
  FileText,
  User,
  Plus,
} from 'lucide-react';

// Navigation items with expanded structure
const navigationItems = [
  { 
    name: 'Dashboard', 
    href: '/admin/photoframing', 
    icon: <BarChart2 className="w-5 h-5" />,
    description: 'Overview and statistics'
  },
  { 
    name: 'All Frames', 
    href: '/admin/photoframing/all', 
    icon: <ImageIcon className="w-5 h-5" />,
    description: 'Manage photo frames'
  },
  { 
    name: 'Create New', 
    href: '/admin/photoframing/create', 
    icon: <Plus className="w-5 h-5" />,
    description: 'System configuration'
  }
];

// Secondary navigation items
const secondaryNavigation = [
  { 
    name: 'Help & Support', 
    href: '/admin/support', 
    icon: <HelpCircle className="w-5 h-5" /> 
  },
  { 
    name: 'Documentation', 
    href: '/admin/docs', 
    icon: <FileText className="w-5 h-5" /> 
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Sample user data - in a real app, this would come from your auth system
  const user = {
    name: 'Admin User',
    email: 'admin@suhbaunion.org',
    avatar: null,
    role: 'Administrator'
  };

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsAuthChecking(false);
      return;
    }

    const checkAuth = async () => {
      // Check for auth cookie
      const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('admin-auth='));
      if (!authCookie) {
        router.push('/admin/login?from=' + encodeURIComponent(pathname));
      } else {
        setIsAuthenticated(true);
      }
      setIsAuthChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    // Remove auth cookie
    document.cookie = 'admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    router.push('/admin/login');
  };

  // Don't render the layout for the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-400 text-sm">Loading admin panel...</p>
      </div>
    );
  }

  // Require authentication to view the admin panel
  if (!isAuthenticated) {
    return null; // This will never render because the useEffect will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-semibold text-white">SUHBA Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Mobile navigation */}
        <div className="flex flex-col h-full py-4 overflow-y-auto">
          <div className="px-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                  pathname.includes(item.href)
                    ? 'bg-gradient-to-r from-indigo-800 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="flex flex-col">
                  {item.name}
                  <span className="text-xs text-gray-400 font-normal mt-0.5">{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
          
          <div className="mt-auto px-3">
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-4 py-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-700 flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                  Sign out
                </button>
              </div>
            </div>
            
            <div className="pt-2 pb-2">
              <div className="px-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm text-gray-400 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-150"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex-1 flex flex-col bg-gray-900 shadow-xl overflow-y-auto">
          <div className="flex items-center h-16 px-4 border-b border-gray-700 bg-gray-900">
            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-semibold text-white">SUHBA Admin</span>
          </div>
          
          {/* Desktop primary navigation */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="px-3 mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main
              </h3>
              <div className="mt-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      pathname.includes(item.href)
                        ? 'bg-gradient-to-r from-indigo-800 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className={`mr-3 flex-shrink-0 ${pathname.includes(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className={`text-xs mt-0.5 ${pathname.includes(item.href) ? 'text-indigo-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
                        {item.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Desktop secondary navigation */}
            <div className="mt-auto px-3">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Support
              </h3>
              <div className="mt-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-150"
                  >
                    <span className="mr-3 flex-shrink-0 text-gray-400 group-hover:text-white">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Desktop user profile */}
            <div className="px-3 mt-6">
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-2 py-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-700 flex items-center justify-center text-white">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.role}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors duration-150"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="md:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 backdrop-blur-sm bg-gray-900/80 border-b border-gray-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Breadcrumb - can be dynamic based on pathname */}
                <div className="hidden md:flex items-center ml-4">
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                      <li>
                        <div>
                          <Link href="/admin/photoframing" className="text-gray-400 hover:text-gray-300">
                            <Home className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </li>
                      {pathname.split('/').filter(Boolean).map((segment, index, array) => {
                        const url = `/${array.slice(0, index + 1).join('/')}`;
                        const isLast = index === array.length - 1;
                        
                        return (
                          <li key={segment}>
                            <div className="flex items-center">
                              <svg className="flex-shrink-0 h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                              </svg>
                              <Link
                                href={url}
                                className={`ml-2 text-sm font-medium ${isLast ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
                                aria-current={isLast ? 'page' : undefined}
                              >
                                {segment.charAt(0).toUpperCase() + segment.slice(1)}
                              </Link>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                </div>
              </div>
              
              {/* Right side buttons */}
              <div className="flex items-center space-x-2">
                {/* Notifications dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                  
                  {notificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <h3 className="text-sm font-medium text-white">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <div className="px-4 py-3 border-b border-gray-700 hover:bg-gray-700">
                          <p className="text-xs text-gray-400">Just now</p>
                          <p className="text-sm text-white">New frame template was added</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-700">
                          <p className="text-xs text-gray-400">Yesterday</p>
                          <p className="text-sm text-white">Usage statistics updated</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-700">
                        <Link href="/admin/notifications" className="text-xs text-indigo-400 hover:text-indigo-300">
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                    </div>
                  </button>
                  
                  {/* Dropdown menu */}
                  {userMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-400" />
                          Your Profile
                        </div>
                      </Link>
                      <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        <div className="flex items-center">
                          <Settings className="mr-2 h-4 w-4 text-gray-400" />
                          Settings
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        <div className="flex items-center">
                          <LogOut className="mr-2 h-4 w-4 text-gray-400" />
                          Sign out
                        </div>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Logout button (only visible on medium screens and above) */}
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-200 bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors duration-150"
                >
                  <LogOut className="mr-1.5 h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}