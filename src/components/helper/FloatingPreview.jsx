import { motion } from "framer-motion"

const FloatingPreview = () => {
  return (
        <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 mb-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl"></div>
          <div className="relative mx-auto h-96 rounded-2xl bg-slate-800/50 border border-white/10 backdrop-blur-lg shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-12 bg-slate-900/50 backdrop-blur-md border-b border-white/10 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="h-6 w-64 mx-auto rounded-full bg-slate-700/50 border border-white/10"></div>
            </div>
            <div className="grid grid-cols-12 h-[calc(100%-48px)] mt-12">
              <div className="col-span-3 border-r border-white/10 p-4">
                <div className="h-8 w-4/5 rounded-md bg-white/10 mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-6 w-full rounded-md bg-white/5"></div>
                  ))}
                </div>
              </div>
              <div className="col-span-9 p-4">
                <div className="h-8 w-2/5 rounded-md bg-white/10 mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 rounded-md bg-white/5 p-3">
                      <div className="h-3 w-3/5 rounded-sm bg-white/10 mb-2"></div>
                      <div className="h-3 w-4/5 rounded-sm bg-white/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
}

export default FloatingPreview