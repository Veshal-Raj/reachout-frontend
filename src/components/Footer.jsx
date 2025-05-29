import React, { useState } from 'react'
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'
import { addSubscriber } from '../api';
import { toast } from 'sonner';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e) => {
      e.preventDefault();
      let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regex.test(email)) {
        setIsLoading(true);
      } else {
        toast.error("Please enter a valid email address");
        return;
      }

      try {
        const response = await addSubscriber({ email });
        if (response?.success) {
          setEmail(''); // Clear the input
          toast.success(response?.message);
        }
      } catch (error) {
        toast.error("Failed to Subscribe, Please try again later.")
        console.error('Subscription error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 border-t border-white/10 mt-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      <div className="relative">
        {/* Main footer content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  ReachOut
                </h2>
                <p className="text-white/70 text-base leading-relaxed">
                  A powerful and intuitive email template builder designed to streamline outreach with customizable templates and seamless sending capabilities.
                </p>
              </div>
              <div className="flex gap-4">
                <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/veshal-raj/" platform="linkedin" />
                <SocialIcon icon={<Github size={20} />} href="https://github.com/Veshal-Raj" platform="github" />
                <SocialIcon icon={<Mail size={20} />} href="mailto:veshalraj1307@gmail.com" platform="email" />
              </div>
            </div>
            
            {/* Support & Contact */}
            <div>
              <h3 className="font-semibold text-white mb-8 text-xl">Get in Touch</h3>
              <ul className="space-y-4 mb-8">
                <FooterLink href="#" text="Contact Us" />
              </ul>
              
              {/* Contact Info */}
              <div className="space-y-4 text-base">
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Mail size={16} className="text-blue-400" />
                  </div>
                  <span>veshalraj1307@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <Phone size={16} className="text-green-400" />
                  </div>
                  <span>+91 6238629077</span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="font-semibold text-white mb-8 text-xl">Stay Updated</h3>
              <p className="text-white/70 mb-6 text-base">Get the latest updates and news delivered to your inbox.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <button disabled={isLoading}
                  onClick={handleSubscribe}
                 className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer">
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white/60 text-sm">
                © {new Date().getFullYear()} ReachOut. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-white/60">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, text }) => (
  <li>
    <a 
      href={href}
      className="text-white/60 hover:text-white transition-all duration-200 text-base hover:translate-x-2 transform inline-block font-medium"
    >
      {text}
    </a>
  </li>
);

const SocialIcon = ({ icon, href, platform }) => {
  const platformColors = {
    linkedin: 'hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-blue-500/25',
    github: 'hover:bg-gray-600/20 hover:border-gray-500/50 hover:text-gray-300 hover:shadow-gray-500/25',
    email: 'hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-purple-400 hover:shadow-purple-500/25'
  };

  return (
    <a 
      href={href}
      className={`h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 ${platformColors[platform]}`}
    >
      <span className="text-white/80">
        {icon}
      </span>
    </a>
  );
};

export default Footer