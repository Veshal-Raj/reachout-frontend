import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { getGoogleAuthUrl } from '../api';

const SignUpModal = ({ setIsModalOpen}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            setError(null);

            const redirectUrl =  await getGoogleAuthUrl();
            console.log('redirect url --- ', redirectUrl)
            window.location.href = redirectUrl;

        } catch (error) {
            setError(error.message || "Something went wrong during google login");
            setLoading(false);
        }
    }
  return (
    <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="h-5 w-5 cursor-pointer" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-blue-400">Reach</span>
                  <span className="text-3xl font-bold text-purple-400">Out</span>
                  <Send className="h-6 w-6 mx-2 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome!</h2>
                <p className="text-white/60">Join thousands of users already using ReachOut</p>
              </div>

              {/* Google Sign Up Button */}
              <motion.button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-medium transition-all duration-200 backdrop-blur-sm group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <span>Continue with Google</span>
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* Terms */}
              <p className="text-xs text-white/40 text-center mt-6 leading-relaxed">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </a>
              </p>
            </motion.div>
          </motion.div>
  )
}

export default SignUpModal