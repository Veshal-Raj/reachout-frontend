import { motion } from "framer-motion"
import { Search, Users } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react";
import { getLists } from "../api";
import { toast } from "sonner";

const ListTable = ({ lists, setLists }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLists = lists.filter(list => 
    list?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchLists = async () => {
      const response = await getLists();
      if (response?.success) {
        setLists(response?.listBuilders || []);
      } else {
        toast.error(response?.message || "Failed to fetch the lists");
      }
    };

    fetchLists();
  }, []);

  return (
    <div className="lg:col-span-7 xl:col-span-8">
          <motion.div 
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl border border-white/10 p-6 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  Your Email Lists
                </h2>
              </div>
              
              <div className="relative w-full sm:w-64">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search lists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 placeholder-white/30 text-white backdrop-blur-sm"
                />
              </div>
            </div>
            
            {lists.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-sm font-medium text-white/80">List Name</th>
                      <th className="px-6 py-3.5 text-left text-sm font-medium text-white/80">Contacts</th>
                      <th className="px-6 py-3.5 text-left text-sm font-medium text-white/80">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredLists.map((list) => (
                      <motion.tr 
                        key={list?._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-white/90">{list?.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-blue-400">
                            <Users className="h-4 w-4" />
                            {list?.recipients?.length || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/60">
                          {moment(list?.createdAt).format('MMM D, YYYY')}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white/40" />
                </div>
                <h3 className="text-lg font-medium text-white/90 mb-2">No email lists found</h3>
                <p className="text-white/60 max-w-md">
                  Upload an Excel file to create your first contact list
                </p>
              </div>
            )}
          </motion.div>
        </div>
  )
}

export default ListTable