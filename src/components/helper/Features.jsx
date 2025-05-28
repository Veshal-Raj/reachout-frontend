import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "../../utils/folder/framer-motion"
import { features } from "../../utils/folder/general"
import { ChevronRight } from "lucide-react"

const Features = () => {
    return (
        <section className="relative container mx-auto px-6 py-24 z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-blue-400 mb-2 block">POWERFUL FEATURES</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Tools for job search success</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Our platform gives you everything you need to reach recruiters effectively and land more interviews.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <div className={`inline-flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 p-3 shadow-lg`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.desc}</p>
              
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="text-blue-400">Learn more</span>
                <ChevronRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    )
}

export default Features;