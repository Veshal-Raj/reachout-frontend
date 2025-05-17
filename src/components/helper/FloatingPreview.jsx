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
            
            {/* Updated UI preview to show Excel import and email creation interface */}
            <div className="grid grid-cols-12 h-[calc(100%-48px)] mt-12">
              <div className="col-span-3 border-r border-white/10 p-4">
                <div className="h-8 w-4/5 rounded-md bg-white/10 mb-4 flex items-center px-3">
                  <span className="text-xs text-white/70">My Campaigns</span>
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-full rounded-md bg-blue-500/20 border border-blue-500/30 px-2 flex items-center">
                    <span className="text-xs text-white/90">Tech Recruiter Outreach</span>
                  </div>
                  <div className="h-6 w-full rounded-md bg-white/5 px-2 flex items-center">
                    <span className="text-xs text-white/70">Startup Job Hunt</span>
                  </div>
                  <div className="h-6 w-full rounded-md bg-white/5 px-2 flex items-center">
                    <span className="text-xs text-white/70">LinkedIn Connections</span>
                  </div>
                  <div className="h-6 w-full rounded-md bg-white/5 px-2 flex items-center">
                    <span className="text-xs text-white/70">+ Create New Campaign</span>
                  </div>
                </div>
              </div>
              <div className="col-span-9 p-4">
                <div className="h-8 w-2/5 rounded-md bg-white/10 mb-6 flex items-center px-3">
                  <span className="text-xs text-white/90">Import Recruiter Contacts</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 rounded-md bg-white/5 p-3 border border-dashed border-white/20 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/40 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs text-white/60">Upload Excel File</span>
                  </div>
                  <div className="h-20 rounded-md bg-white/5 p-3 border border-white/10">
                    <div className="h-3 w-3/5 rounded-sm bg-white/10 mb-2"></div>
                    <div className="h-3 w-4/5 rounded-sm bg-white/10"></div>
                    <div className="mt-2 h-5 w-16 rounded-sm bg-blue-500/30 flex items-center justify-center">
                      <span className="text-xs text-white/70">Template</span>
                    </div>
                  </div>
                  <div className="h-20 rounded-md bg-white/5 p-3 border border-white/10">
                    <div className="h-3 w-3/5 rounded-sm bg-white/10 mb-2"></div>
                    <div className="h-3 w-4/5 rounded-sm bg-white/10"></div>
                    <div className="mt-2 h-5 w-16 rounded-sm bg-green-500/30 flex items-center justify-center">
                      <span className="text-xs text-white/70">Schedule</span>
                    </div>
                  </div>
                  <div className="h-20 rounded-md bg-white/5 p-3 border border-white/10">
                    <div className="h-3 w-3/5 rounded-sm bg-white/10 mb-2"></div>
                    <div className="h-3 w-4/5 rounded-sm bg-white/10"></div>
                    <div className="mt-2 h-5 w-16 rounded-sm bg-purple-500/30 flex items-center justify-center">
                      <span className="text-xs text-white/70">Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
}

export default FloatingPreview