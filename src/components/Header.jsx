import { AVATAR_URL, EMAIL, USERNAME } from '../utils/folder/general'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../api'
import { toast, Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import SignUpModal from './SignUpModal'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/slices/userSlice'

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      dispatch(setLoading(true));
      dispatch(setUser({ id: null, email: null, name: null }));
      toast.success("Logged out successfully");
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again.");
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <>
      <motion.header className="fixed w-full top-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Reach
              </span>
              <span className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
                Out
              </span>
              <Send className="h-5 w-5 mx-2 text-purple-400 hover:text-purple-300 transition-colors" />
            </motion.a>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {!user?.id ? (
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-medium shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm border border-white/10 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              ) : (
                <div className="dropdown dropdown-end">
                  <motion.div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar p-0.5 border border-white/10 bg-white/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-9 rounded-full">
                      <img alt="User avatar" src={AVATAR_URL} className="border border-white/10" />
                    </div>
                  </motion.div>
                  
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-slate-800/95 backdrop-blur-sm rounded-xl w-52 border border-white/10"
                  >
                    <li>
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{USERNAME}</p>
                        <p className="text-xs text-white/60 mt-1 truncate">{EMAIL}</p>
                      </div>
                    </li>
                    <li>
                      <a className="text-white/90 hover:bg-white/5 rounded-lg px-3 py-2 text-sm">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a className="text-white/90 hover:bg-white/5 rounded-lg px-3 py-2 text-sm">
                        Settings
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="text-white/90 hover:bg-white/5 rounded-lg px-3 py-2 text-sm w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <SignUpModal setIsModalOpen={setIsModalOpen} />
        )}
      </AnimatePresence>

      <Toaster position="top-right" richColors />
    </>
  )
}

export default Header