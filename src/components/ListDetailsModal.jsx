// ListDetailsModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import { Users, X } from 'lucide-react';

export const ListDetailsModal = ({ selectedList, setSelectedList }) => {
  return (
    <AnimatePresence>
      {selectedList && (
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
                <h3 className="text-xl font-bold text-white/90">{selectedList.name}</h3>
                <p className="text-white/60 mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {selectedList.recipients?.length || 0} contacts
                </p>
              </div>
              <button
                onClick={() => setSelectedList(null)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>
            
            <div className="overflow-auto flex-1 p-6">
              <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Created At</p>
                  <p className="text-white/90">
                    {moment(selectedList.createdAt).format('MMM D, YYYY h:mm A')}
                  </p>
                </div>
                <div>
                  <p className="text-white/60">Last Updated</p>
                  <p className="text-white/90">
                    {moment(selectedList.updatedAt).format('MMM D, YYYY h:mm A')}
                  </p>
                </div>
              </div>
              
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-sm text-white/80">Name</th>
                    <th className="px-4 py-2.5 text-left text-sm text-white/80">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {selectedList.recipients?.map((recipient, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white/90">{recipient.receiverName}</td>
                      <td className="px-4 py-3 text-blue-400">{recipient.receiverEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};