import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "../../utils/folder/framer-motion"
import { features } from "../../utils/folder/general"
import { ChevronRight } from "lucide-react"

const Features = () => {
    // Customized features for job seekers sending cold emails to recruiters
    const jobSeekerFeatures = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>,
            color: "from-blue-500 to-blue-700",
            title: "Excel List Import",
            desc: "Easily upload your recruiter contact lists from Excel or CSV and convert them into targeted email campaigns."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>,
            color: "from-purple-500 to-purple-700",
            title: "Email Templates",
            desc: "Create personalized email templates that stand out to recruiters and improve your chances of getting interviews."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>,
            color: "from-green-500 to-green-700",
            title: "Smart Scheduling",
            desc: "Schedule your emails to send at optimal times when recruiters are most likely to read and respond to your messages."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>,
            color: "from-amber-500 to-amber-700",
            title: "Campaign Analytics",
            desc: "Track open rates, responses, and interview requests to optimize your job application outreach strategy."
        }
    ];

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
          {jobSeekerFeatures.map((feature, idx) => (
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