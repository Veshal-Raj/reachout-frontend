import { useEffect, useState } from "react";
import { Send, Mail, Users, CheckCircle, AlertCircle, Clock, Calendar } from "lucide-react";
import { getEmailTemplates, getLists, sendCampaign } from "../api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/folder/framer-motion";
import moment from "moment";

const CampaignSender = () => {
  const [selectedList, setSelectedList] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [availableLists, setAvailableLists] = useState([]);
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [scheduleType, setScheduleType] = useState("now"); // 'now' or 'future'
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  useEffect(() => {
    fetchList();
    fetchEmailTemplates();
  }, []);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await getLists();
      if (response?.success) {
        setAvailableLists(response?.listBuilders || []);
      } else {
        toast.error(response?.message || "Failed to fetch List");
      }
    } catch (error) {
      console.error("Error in fetchList in CampaignSender  ", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmailTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await getEmailTemplates();
      if (response?.success) {
        setAvailableTemplates(response?.emailTemplates || []);
      } else {
        toast.error(response?.message || "Failed to fetch email templates");
      }
    } catch (error) {
      console.error("Error in fetchEmailTemplates in CampaignSender  ", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCampaign = async () => {
    if (selectedList && selectedTemplate) {
      setIsSending(true);

      let scheduledAt = null;
      if (scheduleType === "future" && scheduledDate && scheduledTime) {
        scheduledAt = moment(`${scheduledDate} ${scheduledTime}`, "YYYY-MM-DD HH:mm").toISOString();
      }

      const payload = {
        listId: selectedList,
        templateId: selectedTemplate,
        scheduledAt
      };

      const campaignPromise = async () => {
        const response = await sendCampaign(payload);

        if (response?.success) {
          setIsSending(false);
          return { message: response?.message };
        } else {
          setIsSending(false);
          throw new Error(response?.message || "Failed to send campaign");
        }
      };

      toast.promise(campaignPromise(), {
        loading: scheduleType === "now" ? "Sending campaign..." : "Scheduling campaign...",
        success: (data) => `${data.message}`,
        error: scheduleType === "now" ? "Failed to send campaign" : "Failed to schedule campaign",
      });
    }
  };

  const selectedListName = availableLists.find(
    (list) => list._id === selectedList
  )?.name;
  
  const selectedTemplateName = availableTemplates.find(
    (template) => template._id === selectedTemplate
  )?.templateName;

  // Calculate minimum date (today) for date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-xl overflow-hidden"
      >
        {/* Glassmorphism background blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 opacity-20 blur-[128px] rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600 opacity-20 blur-[128px] rounded-full"></div>
        
        {/* Main content with glass effect */}
        <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 p-6 md:p-8 z-10">
          <div className="flex items-center justify-between mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Create New Campaign
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-white/10 text-blue-400 p-3 rounded-lg shadow-lg backdrop-blur-sm"
            >
              <Mail className="h-6 w-6" />
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="relative">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Select Email List
              </label>
              <div className="relative group">
                <select
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg py-3 px-4 pr-12 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    appearance-none transition-all duration-200 hover:bg-white/10"
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="" disabled className="bg-slate-800 text-white">
                    {isLoading ? "Loading lists..." : "Select an email list"}
                  </option>
                  {availableLists.map((list) => (
                    <option key={list._id} value={list._id} className="bg-slate-800 text-white">
                      {list.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Users size={18} />
                </div>
              </div>
              {selectedList && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-white/60"
                >
                  {availableLists.find((list) => list._id === selectedList)?.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Select Email Template
              </label>
              <div className="relative group">
                <select
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg py-3 px-4 pr-12 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    appearance-none transition-all duration-200 hover:bg-white/10"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="" disabled className="bg-slate-800 text-white">
                    {isLoading ? "Loading templates..." : "Select a template"}
                  </option>
                  {availableTemplates.map((template) => (
                    <option key={template._id} value={template._id} className="bg-slate-800 text-white">
                      {template.templateName}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Mail size={18} />
                </div>
              </div>
              {selectedTemplate && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-white/60"
                >
                  {availableTemplates.find((template) => template._id === selectedTemplate)?.templateName}
                </motion.p>
              )}
            </motion.div>

            {/* Toggle Switch for Schedule Type */}
            <motion.div variants={itemVariants} className="relative">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Send Options
              </label>
              <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-lg">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 rounded-md transition-all duration-200 text-sm ${
                    scheduleType === "now"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                  onClick={() => setScheduleType("now")}
                >
                  <Send size={16} />
                  Send Now
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 rounded-md transition-all duration-200 text-sm ${
                    scheduleType === "future"
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                  onClick={() => setScheduleType("future")}
                >
                  <Calendar size={16} />
                  Schedule Later
                </button>
              </div>
            </motion.div>

            {/* Date and Time Pickers */}
            <motion.div 
              initial={false}
              animate={{ height: scheduleType === "future" ? "auto" : 0, opacity: scheduleType === "future" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div className="relative">
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Select Date
                  </label>
                  <div className="relative group">
                    <input
                      type="date"
                      min={today}
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg py-3 px-4 pr-12 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        appearance-none transition-all duration-200 hover:bg-white/10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-400 group-hover:text-blue-300 transition-colors">
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Select Time
                  </label>
                  <div className="relative group">
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg py-3 px-4 pr-12 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        appearance-none transition-all duration-200 hover:bg-white/10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-400 group-hover:text-blue-300 transition-colors">
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {selectedList && selectedTemplate && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 mt-6"
              >
                <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                  <CheckCircle size={16} className="text-green-400" />
                  {scheduleType === "now" ? "Ready to send" : "Ready to schedule"}
                </div>
                <div className="text-sm text-white/80">
                  <div className="flex items-center gap-2 mb-2 group">
                    <Users size={14} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium text-white/70">List:</span> 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                      {selectedListName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group">
                    <Mail size={14} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium text-white/70">Template:</span> 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                      {selectedTemplateName}
                    </span>
                  </div>
                  {scheduleType === "future" && scheduledDate && scheduledTime && (
                    <div className="flex items-center gap-2 mt-2 group">
                      <Calendar size={14} className="text-white/60 group-hover:text-purple-400 transition-colors" />
                      <span className="font-medium text-white/70">Scheduled for:</span> 
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                !selectedList || !selectedTemplate || isSending || 
                (scheduleType === "future" && (!scheduledDate || !scheduledTime))
                  ? "bg-white/5 text-white/40 cursor-not-allowed"
                  : scheduleType === "now"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-600/20"
                    : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-600/20"
              }`}
              onClick={handleSendCampaign}
              disabled={
                !selectedList || 
                !selectedTemplate || 
                isLoading || 
                isSending ||
                (scheduleType === "future" && (!scheduledDate || !scheduledTime))
              }
            >
              {isSending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {scheduleType === "now" ? "Processing..." : "Scheduling..."}
                </>
              ) : (
                <>
                  {scheduleType === "now" ? (
                    <Send className="h-5 w-5" />
                  ) : (
                    <Calendar className="h-5 w-5" />
                  )}
                  {scheduleType === "now" ? "Send Campaign" : "Schedule Campaign"}
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignSender;