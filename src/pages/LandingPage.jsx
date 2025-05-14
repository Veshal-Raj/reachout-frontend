import { useEffect } from 'react';
import { useAnimation} from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/helper/HeroSection';
import StatsSection from '../components/helper/StatsSection';
import FloatingPreview from '../components/helper/FloatingPreview';
import Features from '../components/helper/Features';
import Testimonials from '../components/helper/Testimonial';
import CTAsection from '../components/helper/CTAsection';


const LandingPage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Floating UI Preview */}
      <FloatingPreview />

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTAsection /> 

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;