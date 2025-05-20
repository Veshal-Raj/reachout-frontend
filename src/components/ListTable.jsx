import { motion } from "framer-motion"
import { Search, Users } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react";
import { getLists } from "../api";
import { toast } from "sonner";
import useDebounce from "../hooks/useDebounce";
import { ListDetailsModal } from "./ListDetailsModal";

const ListTable = ({ lists, setLists }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedList, setSelectedList] = useState(null);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 10;

    const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    const fetchLists = async () => {
      const response = await getLists(page, limit, debouncedSearch);
      if (response?.success) {
        setLists(response?.listsData?.items || []);
        setTotalItems(response?.listsData?.totalItems || 0);
      } else {
        toast.error(response?.message || "Failed to fetch the lists");
      }
    };

    fetchLists();
  }, [page, debouncedSearch]);

  
  return (
    <div className="lg:col-span-7 xl:col-span-8">
          {selectedList && (
            <ListDetailsModal 
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          )}

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
            
            {totalItems > 0 ? (
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
                    {lists.map((list) => (
                      <motion.tr 
                        key={list?._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => setSelectedList(list)}
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
              
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-white/70">
                    Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(page * limit, totalItems)}</span> of{' '}
                    <span className="font-medium">{totalItems}</span> lists
                  </p>
                </div>
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
              </div>
            </div>

          </motion.div>
        </div>
  )
}

export default ListTable