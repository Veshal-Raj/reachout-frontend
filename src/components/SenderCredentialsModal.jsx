import { useState, useContext } from "react"
import { motion } from "framer-motion"
import { Mail, Key, Loader2 } from 'lucide-react';
import UserContext from "../utils/UserContext";
import { saveSenderCredentials } from "../api";

const SenderCredentialsModal = () => {
    const { setUserVerified } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                email,
                password
            }
            const response = await saveSenderCredentials(payload);
            console.log("response ---  ", response)
            if (response.success) {
                setUserVerified(true);
            } else {
                setError(response?.message || "Failed to verify credentials");
            }
        } catch (error) {
            setError('An error occurred. Please try again');
            console.error("Error in SenderCredentialsModal handleSubmit ", error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-md bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Verify Sender Credentials
        </h2>
        <p className="text-sm text-blue-100/80 mb-6">
          Please provide your email credentials to continue. Please give gmail
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-100/80">
                Sender Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-10 text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
                <Mail className="absolute right-3 top-3.5 text-white/30" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-blue-100/80">
                App Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-10 text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <Key className="absolute right-3 top-3.5 text-white/30" size={18} />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm p-3 bg-red-900/20 rounded-lg border border-red-800/30"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/30 text-blue-100 py-3.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying...
                </>
              ) : (
                'Save & Verify'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default SenderCredentialsModal