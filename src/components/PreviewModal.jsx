import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';


const PreviewModal = ({ isPreviewModalOpen, parsedData, togglePreviewModal }) => {
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
              className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 w-full max-w-3xl max-h-[80vh] flex flex-col"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white/90">List Preview</h3>
                <p className="text-white/60 mt-1">{parsedData.length} contacts</p>
              </div>
              
              <div className="overflow-auto flex-1 p-6">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-sm text-white/80">Name</th>
                      <th className="px-4 py-2.5 text-left text-sm text-white/80">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {parsedData.map((row, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-4 py-3 text-white/90">{row.receiverName}</td>
                        <td className="px-4 py-3 text-blue-400">{row.receiverEmail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default PreviewModal