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
            <StatCard value="72%" label="Response Rate Increase" />
            <StatCard value="3.5x" label="More Interviews" />
            <StatCard value="8 Days" label="Average Job Search Time" />
            <StatCard value="95%" label="Email Delivery Success" />
          </div>
        </div>
      </motion.section>
    )
}

export default StatsSection;