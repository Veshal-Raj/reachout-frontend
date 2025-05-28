import React, { Suspense, lazy } from 'react';

const Header = lazy(() => import("../components/Header"));
const HeroSection = lazy(() => import("../components/helper/HeroSection"));
const FloatingPreview = lazy(() => import("../components/helper/FloatingPreview"));
const Features = lazy(() => import("../components/helper/Features"));
const StatsSection = lazy(() => import("../components/helper/StatsSection"));
const Testimonials = lazy(() => import("../components/helper/Testimonial"));
const CTAsection = lazy(() => import("../components/helper/CTAsection"));
const Footer = lazy(() => import("../components/Footer"));


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <HeroSection />
        <FloatingPreview />
        <Features />
        <StatsSection />
        <Testimonials />
        <CTAsection /> 
        <Footer />
      </Suspense>
    </div>
  );
};

export default LandingPage;