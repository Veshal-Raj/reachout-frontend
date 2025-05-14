import { Book, Calendar, MessageCircle, Search } from "lucide-react"
import moment from "moment"
import { motion } from "framer-motion"
import { useEffect } from "react";
import { getEmailTemplates } from "../api";
import { toast } from "sonner";

const EmailTemplates = ({ searchTerm, setSearchTerm, templates, setTemplates}) => {

    const filteredTemplates = templates.filter(template => 
        template?.templateName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchTemplates = async () => {
          const response = await getEmailTemplates();
          if (response?.success) {
            setTemplates(response?.emailTemplates || []);
          } else {
            toast.error(response?.message || "Failed to fetch the email templates");
          }
        };
    
        fetchTemplates();
      }, []);

  return (
   <div className="lg:col-span-4">
          <motion.div 
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl border border-white/10 p-6 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm">
                  <Book className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  Saved Templates
                </h2>
              </div>
              
              <div className="relative w-full sm:w-64">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 placeholder-white/30 text-white backdrop-blur-sm"
                />
              </div>
            </div>

            {templates.length > 0 ? (
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template?._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white/90">
                            {template?.templateName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-white/60 text-sm">
                            <Calendar className="h-3 w-3" />
                            {moment(template?.createdAt).format('MMM D, YYYY')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Book className="h-6 w-6 text-white/40" />
                </div>
                <h3 className="text-lg font-medium text-white/90 mb-2">No templates created</h3>
                <p className="text-white/60 max-w-md">
                  Start by creating your first outreach template
                </p>
              </div>
            )}
          </motion.div>
        </div>
  )
}

export default EmailTemplates