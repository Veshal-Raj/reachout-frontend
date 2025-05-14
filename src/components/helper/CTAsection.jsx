import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const CTAsection = () => {
    const navigate = useNavigate();
    return (
        <motion.section 
        className="relative container mx-auto px-6 py-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
          
          <div className="relative px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Turn Spreadsheets Into Conversations</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Start converting your recruiter lists into meaningful outreach with our free plan
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate("/home")}
                className="relative overflow-hidden group bg-white text-slate-900 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-white/25 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-white via-blue-100 to-white translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
              
              <span className="text-white/80">or</span>
              
              <a className="flex items-center gap-2 text-white hover:text-white/80 underline">
                Schedule a Demo
              </a>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    )
}

export default CTAsection;