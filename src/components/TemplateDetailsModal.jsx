// TemplateDetailsModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import { Mail, X, FileText, Clock, Edit } from 'lucide-react';

export const TemplateDetailsModal = ({ selectedTemplate, setSelectedTemplate }) => {
    console.log(selectedTemplate)
  return (
    <AnimatePresence>
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 w-full max-w-3xl max-h-[80vh] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white/90 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-400" />
                  {selectedTemplate.templateName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>
            
            <div className="overflow-auto flex-1 p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-white/60">Created At</p>
                    <p className="text-white/90">
                      {moment(selectedTemplate.createdAt).format('MMM D, YYYY h:mm A')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Edit className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-white/60">Last Updated</p>
                    <p className="text-white/90">
                      {moment(selectedTemplate.updatedAt).format('MMM D, YYYY h:mm A')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white/90 mb-3">Email Subject</h4>
                <div 
                  className="prose prose-invert max-w-none bg-white/5 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.subject }}
                />
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white/90 mb-3">Email Body</h4>
                <div 
                  className="prose prose-invert max-w-none bg-white/5 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.body }}
                />
              </div>

              {selectedTemplate.attachments && (
                <div className="border-t border-white/10 pt-6">
                    <h4 className="text-lg font-semibold text-white/90 mb-3">Attachments</h4>
                    <a
                    href={selectedTemplate.attachments.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                    <FileText className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                    <div>
                        <p className="text-white/90 group-hover:text-blue-300 transition-colors">
                        {selectedTemplate.attachments.name}
                        </p>
                        <p className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                        {(selectedTemplate.attachments.size / 1024).toFixed(2)} KB
                        </p>
                    </div>
                    </a>
                </div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};