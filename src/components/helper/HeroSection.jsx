// import { motion, useScroll, useTransform } from 'framer-motion'
// import { ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';


// const Play = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
//   </svg>
// );

// const HeroSection = () => {
//     const navigate = useNavigate();
//   const { scrollYProgress } = useScroll();

//     const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
//     const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
//     return (
//         <motion.section
//         className="relative container mx-auto px-6 text-center py-24 md:py-32 z-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div style={{ y: heroTextY, opacity: heroOpacity }}>
//           <motion.span 
//             className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 mb-6"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <span className="flex items-center">
//               <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
//               New Feature: Excel-to-Email Workflow Automation
//             </span>
//           </motion.span>
//           <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//           Smart Recruiter Outreach,
//           <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Perfected</span>
//         </motion.h1>
//           <motion.p className="text-xl md:text-2xl mb-10 text-blue-100/80 max-w-3xl mx-auto font-light"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             Transform Excel lists into impactful conversations with AI-powered email sequencing and precision scheduling
//           </motion.p>
          
//           <motion.div 
//             className="flex flex-col sm:flex-row justify-center items-center gap-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7, duration: 0.8 }}
//           >
//             <button 
//               onClick={() => navigate("/home")}
//               className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
//             >
//               Get Started For Free
//               <motion.div
//                 initial={{ x: 0 }}
//                 whileHover={{ x: 5 }}
//                 transition={{ type: "spring", stiffness: 400 }}
//               >
//                 <ArrowRight className="h-5 w-5" />
//               </motion.div>
//               <span className="absolute -top-10 left-0 right-0 opacity-0 group-hover:opacity-100 text-xs text-blue-300 transition-opacity">No credit card required</span>
//             </button>
            
//             <a className="flex items-center gap-2 text-white/80 hover:text-white py-2 px-4 rounded-full transition border border-white/10 hover:border-white/30 backdrop-blur-sm bg-white/5">
//               <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
//                 <Play className="h-3 w-3 text-white fill-white" />
//               </span>
//               Watch Demo
//             </a>
//           </motion.div>
          
//           <motion.div 
//             className="mt-10 flex items-center justify-center gap-2 text-sm text-white/60"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 1 }}
//           >
//             <div className="flex -space-x-2">
//               <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-medium">T</div>
//               <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-medium">G</div>
//               <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-medium">A</div>
//               <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-xs font-medium">R</div>
//             </div>
//             <span>Trusted by 500+ companies worldwide</span>
//           </motion.div>
//         </motion.div>
//       </motion.section>
//     )
// }

// export default HeroSection;

// ==========================================
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Play = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
  </svg>
);

const HeroSection = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();

    const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    return (
        <motion.section
        className="relative container mx-auto px-6 text-center py-24 md:py-32 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div style={{ y: heroTextY, opacity: heroOpacity }}>
          <motion.span 
            className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              New Feature: Smart Email Scheduling
            </span>
          </motion.span>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
          Job Seeker Outreach,
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Simplified</span>
        </motion.h1>
          <motion.p className="text-xl md:text-2xl mb-10 text-blue-100/80 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Turn your recruiter contact lists into personalized email campaigns that get responses and land interviews
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <button 
              onClick={() => navigate("/home")}
              className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Start Your Job Search
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
              <span className="absolute -top-10 left-0 right-0 opacity-0 group-hover:opacity-100 text-xs text-blue-300 transition-opacity">No credit card required</span>
            </button>
            
            <a className="flex items-center gap-2 text-white/80 hover:text-white py-2 px-4 rounded-full transition border border-white/10 hover:border-white/30 backdrop-blur-sm bg-white/5">
              <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="h-3 w-3 text-white fill-white" />
              </span>
              Watch Demo
            </a>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex items-center justify-center gap-2 text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-medium">J</div>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-medium">S</div>
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-medium">D</div>
              <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-xs font-medium">K</div>
            </div>
            <span>Helping 500+ job seekers land interviews daily</span>
          </motion.div>
        </motion.div>
      </motion.section>
    )
}

export default HeroSection;