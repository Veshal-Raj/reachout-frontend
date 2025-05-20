import { Book, Calendar, MessageCircle, Search } from "lucide-react"
import moment from "moment"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { getEmailTemplates } from "../api";
import { toast } from "sonner";

const EmailTemplates = ({ debouncedSearch, searchTerm, setSearchTerm, templates, setTemplates}) => {
  console.log("debounce search ----  ", debouncedSearch)
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchTemplates = async () => {
          const response = await getEmailTemplates(page, limit, debouncedSearch);
          if (response?.success) {
            setTemplates(response?.templatesData?.items || []);
            setTotalItems(response?.templatesData?.totalItems || 0)
          } else {
            toast.error(response?.message || "Failed to fetch the email templates");
          }
        };
    
        fetchTemplates();
      }, [page, debouncedSearch]);

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
                {templates.map((template) => (
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

            {/* pagination logic  */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(prev => prev - 1)}
                  className="relative inline-flex items-center px-4 py-2 border border-white/10 rounded-lg text-sm font-medium bg-white/5 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(prev => prev + 1)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-white/10 rounded-lg text-sm font-medium bg-white/5 text-white"
                >
                  Next
                </button>
              </div>
              
              <div className="hidden sm:flex sm:flex-col items-center gap-3 mt-6">
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(prev => prev - 1)}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <div className="flex items-center space-x-1 mx-2">
                      {Array.from({ length: Math.ceil(totalItems / limit) }, (_, i) => {
                        // Show limited page numbers with ellipsis
                        if (
                          i === 0 ||
                          i === Math.ceil(totalItems / limit) - 1 ||
                          (i >= page - 2 && i <= page + 1)
                        ) {
                          return (
                            <button
                              key={i}
                              onClick={() => setPage(i + 1)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === i + 1
                                  ? 'border-blue-500/50 bg-blue-500/20 text-blue-400'
                                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                              }`}
                            >
                              {i + 1}
                            </button>
                          );
                        }
                        
                        // Show ellipsis
                        if (i === 1 || i === Math.ceil(totalItems/ limit) - 2) {
                          return (
                            <span key={i} className="relative inline-flex items-center px-4 py-2 border border-white/10 bg-white/5 text-sm font-medium text-white/50">
                              ...
                            </span>
                          );
                        }
                        
                        return null;
                      })}
                    </div>
                    
                    <button
                      disabled={page === Math.ceil(totalItems / limit)}
                      onClick={() => setPage(prev => prev + 1)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
                <div>
                  <p className="text-sm text-white/70">
                    Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(page * limit, templates.length)}</span> of{' '}
                    <span className="font-medium">{totalItems}</span> templates
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
  )
}

export default EmailTemplates