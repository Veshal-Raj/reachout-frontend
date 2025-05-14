import { motion } from "framer-motion";
import StatCard from "./StatCard";


const StatsSection = () => {
    return (
      <motion.section 
        className="relative container mx-auto px-6 py-20 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="10M+" label="Recruiter Emails Sent" />
            <StatCard value="85%" label="Template Reuse Rate" />
            <StatCard value="4.8x" label="More Follow-ups" />
            <StatCard value="92%" label="Delivery Success" />
          </div>
        </div>
      </motion.section>
    )
}

export default StatsSection;