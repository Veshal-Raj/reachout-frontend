import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../utils/folder/framer-motion";
import { jobSeekerTestimonials } from "../../utils/folder/general"
import { Star } from "lucide-react";

const Testimonials = () => {
    // Updated testimonials for job seekers
    return (
        <section className="relative container mx-auto px-6 py-24 z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-blue-400 mb-2 block">SUCCESS STORIES</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">From job seekers like you</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Real people who used our platform to create effective outreach campaigns and land their dream jobs.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {jobSeekerTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-white/60">{testimonial.role}, {testimonial.company}</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-white/80 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    )
}

export default Testimonials;