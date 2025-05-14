import React from 'react'

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a className="hover:text-white transition-colors">Features</a></li>
                <li><a className="hover:text-white transition-colors">Pricing</a></li>
                <li><a className="hover:text-white transition-colors">Integrations</a></li>
                <li><a className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a className="hover:text-white transition-colors">Documentation</a></li>
                <li><a className="hover:text-white transition-colors">Guides</a></li>
                <li><a className="hover:text-white transition-colors">API Reference</a></li>
                <li><a className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a className="hover:text-white transition-colors">About Us</a></li>
                <li><a className="hover:text-white transition-colors">Careers</a></li>
                <li><a className="hover:text-white transition-colors">Blog</a></li>
                <li><a className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a className="hover:text-white transition-colors">Security</a></li>
                <li><a className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} ReachOut. All rights reserved.
            </div>
            <div className="flex gap-4">
              <SocialIcon icon="twitter" />
              <SocialIcon icon="linkedin" />
              <SocialIcon icon="github" />
            </div>
          </div>
        </div>
      </footer>
  )
}

const SocialIcon = ({ icon }) => (
  <a className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
    <span className="text-white/80">{icon.charAt(0).toUpperCase()}</span>
  </a>
);

export default Footer