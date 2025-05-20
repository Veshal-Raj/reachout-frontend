import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ListUploader from '../components/ListUploader';
import TemplateBuilder from "../components/TemplateBuilder";
import { Upload, Mail, Send, ChevronRight, LayoutDashboard } from 'lucide-react';
import CampaignSender from '../components/CampaignSender';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContext from '../utils/UserContext';
import SenderCredentialsModal from '../components/SenderCredentialsModal';

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { userVerified } = useContext(UserContext);
  
  const tabs = [
    { id: 0, label: "Email Lists", icon: <Upload />, color: "blue" },
    { id: 1, label: "Templates", icon: <Mail />, color: "purple" },
    { id: 2, label: "Campaigns", icon: <Send />, color: "green" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <Header />

      <AnimatePresence>
        {!userVerified && <SenderCredentialsModal />}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 relative z-10">
        {/* Breadcrumb */}
        <motion.div 
          className="flex items-center gap-2 text-sm text-blue-100/80 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LayoutDashboard size={18} className="text-purple-400" />
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="font-medium text-blue-300">{tabs[activeTab].label}</span>
        </motion.div>

        {/* Page Title */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            ReachOut Hub
          </h1>
          <p className="mt-2 text-blue-100/60 max-w-2xl">
            Streamline your recruitment outreach with AI-powered list management and campaign automation
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all backdrop-blur-sm border cursor-pointer ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r from-${tab.color}-600/30 to-${tab.color}-500/20 text-${tab.color}-300 border-${tab.color}-500/50 shadow-lg`
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                }`}
              >
                <div className={`p-2 rounded-lg backdrop-blur-sm ${
                  activeTab === tab.id 
                    ? `bg-${tab.color}-500/20` 
                    : "bg-white/5"
                }`}>
                  {React.cloneElement(tab.icon, { 
                    size: 18, 
                    className: activeTab === tab.id ? `text-${tab.color}-300` : "text-white/60" 
                  })}
                </div>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="glass-panel"
            >
              <div className={`border-l-4 ${
                activeTab === 0 ? "border-blue-500" :
                activeTab === 1 ? "border-purple-500" :
                "border-green-500"
              }`}>
                <div className="p-6 backdrop-blur-lg bg-slate-800/30 rounded-r-xl">
                  {activeTab === 0 ? (
                    <ListUploader />
                  ) : activeTab === 1 ? (
                    <TemplateBuilder />
                  ) : (
                    <CampaignSender />
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;