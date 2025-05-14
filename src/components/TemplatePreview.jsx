import { motion, AnimatePresence } from "framer-motion"
import { Paperclip, X } from "lucide-react"

const TemplatePreview = ({ isPreviewModalOpen, togglePreviewModal, templateName, subject, emailBody, attachments}) => {
  return (
    <AnimatePresence>
        {isPreviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 w-full max-w-3xl max-h-[80vh] flex flex-col shadow-xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white/90">Template Preview</h3>
                <button 
                  onClick={togglePreviewModal}
                  className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center"
                >
                  <X className="h-5 w-5 text-white/60" />
                </button>
              </div>
              
              <div className="overflow-auto flex-1 p-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white/60">Template Name</h4>
                  <p className="text-lg font-medium text-white/90">{templateName}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white/60">Subject</h4>
                  <p className="text-lg font-medium text-white/90">{subject}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white/60">Content</h4>
                  <div className="prose max-w-none dark:prose-invert text-white/90">
                    <div dangerouslySetInnerHTML={{ __html: emailBody }} />
                  </div>
                </div>

                {attachments && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white/60">Attachments</h4>
                    <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                      <Paperclip className="h-4 w-4 text-blue-400" />
                      <a 
                        href={attachments.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 truncate"
                      >
                        {attachments.name}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-white/10 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={togglePreviewModal}
                  className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/90"
                >
                  Close Preview
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}

export default TemplatePreview