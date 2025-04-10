'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon,
  ChevronRight,
  Sun,
  Moon,
  LockKeyhole,
  Home,
  Bell,
  Settings,
  User,
  ArrowRight,
  Check,
  Sparkles,
  Share2,
  PanelTop,
  Calendar,
  Megaphone,
  Heart,
  PartyPopper
} from "lucide-react";

export default function PhotoFramesLanding() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
      localStorage.setItem('theme', "dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const styles = {
    dark: {
      background: "#0f172a",
      cardBg: "bg-gray-800/50",
      cardBorder: "border-gray-700/50",
      nav: "bg-gray-800/30",
      text: "text-white",
      textSecondary: "text-gray-300",
      accent: "text-emerald-400",
      button: "bg-emerald-600 hover:bg-emerald-700",
      secondaryButton: "bg-gray-700 hover:bg-gray-600 text-white border-gray-600",
      adminButton: "bg-gray-800 text-gray-300 hover:text-white border-gray-700",
      iconBg: "bg-emerald-900/30",
      iconColor: "text-emerald-400",
      navActive: "text-emerald-400",
      navInactive: "text-gray-400 hover:text-gray-300"
    },
    light: {
      background: "#ffffff",
      cardBg: "bg-white",
      cardBorder: "border-gray-200",
      nav: "bg-white",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      accent: "text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700",
      secondaryButton: "bg-white hover:bg-gray-50 text-emerald-600 border-emerald-600",
      adminButton: "bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-300",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      navActive: "text-emerald-600",
      navInactive: "text-gray-500 hover:text-gray-700"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const currentStyle = styles[theme];

  if (!mounted) {
    return (
      <div 
        className="min-h-screen"
        style={{ backgroundColor: styles.dark.background }}
      />
    );
  }

  return (
    <div 
      className="min-h-screen transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: currentStyle.background }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-600/10 to-indigo-600/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/10 to-blue-600/10 blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {Array.from({ length: 30 }).map((_, index) => (
            <motion.div
              key={index}
              className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-500/30' : 'bg-emerald-500/20'}`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: 20 + Math.random() * 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${currentStyle.nav} backdrop-blur-md border ${currentStyle.cardBorder} rounded-full z-50 px-4 py-2 flex items-center justify-between shadow-lg w-auto`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center mr-6">
            <div className="flex h-8 w-14 rounded-full bg-gray-700 p-1 dark:bg-gray-600 items-center relative">
              <span className="absolute left-1.5 text-xs text-gray-400">
                <Sun size={12} />
              </span>
              <span className="absolute right-1.5 text-xs text-gray-400">
                <Moon size={12} />
              </span>
              <motion.button 
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                className={`h-6 w-6 rounded-full`}
                initial={false}
                animate={{ 
                  x: theme === 'light' ? 24 : 0,
                  backgroundColor: theme === 'light' ? '#f3f4f6' : '#6366f1' 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </div>
          </div>

          <Link href="#" className={`flex items-center px-3 py-2 ${currentStyle.navActive} font-medium rounded-lg relative overflow-hidden group`}>
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-emerald-600/20 to-emerald-600/0 group-hover:w-full transition-all duration-500"></span>
            <Home className="h-5 w-5 mr-1.5 relative z-10" />
            <span className="relative z-10">Home</span>
          </Link>
          <Link href="#" className={`flex items-center px-3 py-2 ${currentStyle.navInactive} font-medium rounded-lg relative overflow-hidden group`}>
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-600/20 to-gray-600/0 group-hover:w-full transition-all duration-500"></span>
            <Bell className="h-5 w-5 mr-1.5 relative z-10" />
            <span className="relative z-10">Notifications</span>
          </Link>
          <Link href="#" className={`flex items-center px-3 py-2 ${currentStyle.navInactive} font-medium rounded-lg relative overflow-hidden group`}>
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-600/20 to-gray-600/0 group-hover:w-full transition-all duration-500"></span>
            <Settings className="h-5 w-5 mr-1.5 relative z-10" />
            <span className="relative z-10">Settings</span>
          </Link>
          <Link href="#" className={`flex items-center px-3 py-2 ${currentStyle.navInactive} font-medium rounded-lg relative overflow-hidden group`}>
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-600/20 to-gray-600/0 group-hover:w-full transition-all duration-500"></span>
            <User className="h-5 w-5 mr-1.5 relative z-10" />
            <span className="relative z-10">Profile</span>
          </Link>
        </div>

        <Link 
          href="/admin" 
          className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${currentStyle.adminButton} relative overflow-hidden group`}
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-600/20 to-indigo-600/0 group-hover:w-full transition-all duration-500"></span>
          <LockKeyhole size={16} className="relative z-10" />
          <span className="relative z-10">Admin</span>
        </Link>
      </motion.nav>

      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold ${currentStyle.text} mb-6`}
              variants={itemVariants}
            >
              Elevate Your Social Media with{" "}
              <motion.span 
                className={currentStyle.accent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Custom Photo Frames
              </motion.span>
            </motion.h1>
            <motion.p 
              className={`text-xl ${currentStyle.textSecondary} mb-8 max-w-3xl mx-auto`}
              variants={itemVariants}
            >
              Transform your photos with stunning frames to amplify your events, campaigns, or business. Upload, customize, and share in moments!
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/create" 
                  className={`px-6 py-3 text-white font-medium rounded-lg transition-all flex items-center gap-2 shadow-lg ${currentStyle.button} relative overflow-hidden group`}
                >
                  <span className="absolute inset-0 w-1/12 h-full bg-white opacity-20 transform -skew-x-45 group-hover:w-full transition-all duration-700"></span>
                  <ImageIcon size={18} className="relative z-10" />
                  <span className="relative z-10">Create Now</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/photoframe" 
                  className={`px-6 py-3 font-medium rounded-lg border-2 transition-all flex items-center gap-2 ${currentStyle.secondaryButton} relative overflow-hidden group`}
                >
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-500/20 to-gray-500/0 group-hover:w-full transition-all duration-500"></span>
                  <span className="relative z-10">Discover Frames</span>
                  <ChevronRight size={18} className="relative z-10" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className={`text-3xl font-bold ${currentStyle.text} mb-2 text-center`}
              variants={itemVariants}
            >
              Why Choose Our Photo Frames?
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div 
                className={`${currentStyle.cardBg} backdrop-blur-sm rounded-xl border ${currentStyle.cardBorder} p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Sparkles className={`h-6 w-6 ${currentStyle.iconColor}`} />
                </motion.div>
                <h3 className={`text-xl font-bold ${currentStyle.text} mb-3`}>Quick & Easy Customization</h3>
                <p className={`${currentStyle.textSecondary}`}>
                  Upload your photo, pick a frame, and personalize it—all in under a minute.
                </p>
              </motion.div>
              
              <motion.div 
                className={`${currentStyle.cardBg} backdrop-blur-sm rounded-xl border ${currentStyle.cardBorder} p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Share2 className={`h-6 w-6 ${currentStyle.iconColor}`} />
                </motion.div>
                <h3 className={`text-xl font-bold ${currentStyle.text} mb-3`}>Boost Engagement</h3>
                <p className={`${currentStyle.textSecondary}`}>
                  Stand out on social media with eye-catching frames for profiles and statuses.
                </p>
              </motion.div>
              
              <motion.div 
                className={`${currentStyle.cardBg} backdrop-blur-sm rounded-xl border ${currentStyle.cardBorder} p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <PanelTop className={`h-6 w-6 ${currentStyle.iconColor}`} />
                </motion.div>
                <h3 className={`text-xl font-bold ${currentStyle.text} mb-3`}>Perfect for Any Occasion</h3>
                <p className={`${currentStyle.textSecondary}`}>
                  From business promos to event hype, our frames fit every campaign.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className={`text-3xl font-bold ${currentStyle.text} mb-8 text-center`}
              variants={itemVariants}
            >
              How It Works
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center relative"
                variants={itemVariants}
              >
                <motion.div 
                  className="absolute top-0 right-0 -mr-4 mt-6 w-8 h-8 rounded-full flex items-center justify-center text-white bg-emerald-500 font-bold text-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  1
                </motion.div>
                {theme === 'dark' ? (
                  <motion.div 
                    className="h-px w-full absolute top-10 right-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                ) : (
                  <motion.div 
                    className="h-px w-full absolute top-10 right-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                )}
                <motion.div 
                  className={`relative z-20 w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Upload className={`h-10 w-10 ${currentStyle.iconColor}`} />
                </motion.div>
                <h3 className={`text-xl font-bold ${currentStyle.text} mb-2`}>Upload Your Photo</h3>
                <p className={`${currentStyle.textSecondary}`}>
                  Start with any image from your device or social media.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center relative"
                variants={itemVariants}
              >
                <motion.div 
                  className="absolute top-0 right-0 -mr-4 mt-6 w-8 h-8 rounded-full flex items-center justify-center text-white bg-emerald-500 font-bold text-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                >
                  2
                </motion.div>
                {theme === 'dark' ? (
                  <motion.div 
                    className="h-px w-full absolute top-10 right-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
                  ></motion.div>
                ) : (
                  <motion.div 
                    className="h-px w-full absolute top-10 right-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
                  ></motion.div>
                )}
                <motion.div 
                  className={`relative z-20 w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <ImageIcon className={`h-10 w-10 ${currentStyle.iconColor}`} />
                </motion.div>
                <h3 className={`text-xl font-bold ${currentStyle.text} mb-2`}>Choose a Frame</h3>
                <p className={`${currentStyle.textSecondary}`}>
                  Browse our library or design your own frame.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center relative"
                variants={itemVariants}
              >
                <motion.div 
                  className="absolute top-0 right-0 -mr-4 mt-6 w-8 h-8 rounded-full flex items-center justify-center text-white bg-emerald-500 font-bold text-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.7 }}
                >
                  3
                </motion.div>
                <motion.div 
                  className={`relative z-20 w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Share2 className={`h-10 w-10 ${currentStyle.iconColor}`} />
                </motion.div>
                <h3 className={`text-xl font-bold ${currentStyle.text} mb-2`}>Share It</h3>
                <p className={`${currentStyle.textSecondary}`}>
                  Download and post to your profiles or statuses instantly.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className={`${currentStyle.cardBg} backdrop-blur-sm rounded-2xl border ${currentStyle.cardBorder} p-8 md:p-12 shadow-xl max-w-4xl mx-auto overflow-hidden relative`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div>
                <motion.h2 
                  className={`text-3xl font-bold ${currentStyle.text} mb-4`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Ready to Boost Your Campaigns?
                </motion.h2>
                <motion.p 
                  className={`${currentStyle.textSecondary} mb-6 max-w-lg`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Whether it's a business launch, event promotion, or social cause, our frames help you shine online.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/start" 
                    className={`inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-all gap-2 shadow-md ${currentStyle.button} relative overflow-hidden group`}
                  >
                    <span className="absolute inset-0 w-1/12 h-full bg-white opacity-20 transform -skew-x-45 group-hover:w-full transition-all duration-700"></span>
                    <span className="relative z-10">Start Framing Now</span>
                    <ArrowRight size={18} className="relative z-10" />
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div 
                  className={`w-64 h-64 rounded-2xl overflow-hidden border-4 ${currentStyle.cardBorder} shadow-xl`}
                  animate={{ rotate: [0, 1, 0, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className={`h-16 w-16 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-medium">Your photo with our frames</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className={`text-3xl font-bold ${currentStyle.text} mb-12 text-center`}
              variants={itemVariants}
            >
              Perfect for Every Campaign
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className={`${currentStyle.cardBg} backdrop-blur-sm rounded-xl border ${currentStyle.cardBorder} p-6 hover:shadow-lg transition-all duration-300 flex`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`h-12 w-12 rounded-lg flex-shrink-0 flex items-center justify-center mr-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Megaphone className={`h-6 w-6 ${currentStyle.iconColor}`} />
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold ${currentStyle.text} mb-2`}>Business Promotions</h3>
                  <p className={`${currentStyle.textSecondary}`}>
                    Highlight sales or launches with branded frames.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className={`${currentStyle.cardBg} backdrop-blur-sm rounded-xl border ${currentStyle.cardBorder} p-6 hover:shadow-lg transition-all duration-300 flex`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`h-12 w-12 rounded-lg flex-shrink-0 flex items-center justify-center mr-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Calendar className={`h-6 w-6 ${currentStyle.iconColor}`} />
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold ${currentStyle.text} mb-2`}>Event Buzz</h3>
                  <p className={`${currentStyle.textSecondary}`}>
                    Get attendees sharing with event-themed overlays.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className={`${currentStyle.cardBg} backdrop-blur-sm rounded-xl border ${currentStyle.cardBorder} p-6 hover:shadow-lg transition-all duration-300 flex`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`h-12 w-12 rounded-lg flex-shrink-0 flex items-center justify-center mr-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Heart className={`h-6 w-6 ${currentStyle.iconColor}`} />
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold ${currentStyle.text} mb-2`}>Social Causes</h3>
                  <p className={`${currentStyle.textSecondary}`}>
                    Rally support with profile frames for your mission.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className={`${currentStyle.cardBg} backdrop-blur-sm rounded-xl border ${currentStyle.cardBorder} p-6 hover:shadow-lg transition-all duration-300 flex`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`h-12 w-12 rounded-lg flex-shrink-0 flex items-center justify-center mr-4 ${currentStyle.iconBg}`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <PartyPopper className={`h-6 w-6 ${currentStyle.iconColor}`} />
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold ${currentStyle.text} mb-2`}>Celebrations</h3>
                  <p className={`${currentStyle.textSecondary}`}>
                    Mark milestones with festive, shareable designs.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className={`py-8 border-t ${currentStyle.cardBorder}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-10 w-10 rounded bg-emerald-600 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-white" />
              </div>
              <span className={`ml-3 text-xl font-bold ${currentStyle.text}`}>Campaign Maker</span>
            </motion.div>
            <motion.div 
              className={`${currentStyle.textSecondary} text-sm`}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              © {new Date().getFullYear()} Campaign Maker. All rights reserved.
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}