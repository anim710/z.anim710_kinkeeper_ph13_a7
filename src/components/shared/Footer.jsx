import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import logo from '../../assets/images/logo-xl.png';

const Footer = () => {
  return (
    <footer className="bg-[#1e4d3b] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">

        {/* Logo */}
          <div className="flex items-center justify-center mb-3">
          <img src={logo} alt="KeenKeeper" className="h-6 w-auto brightness-0 invert" />
        </div>

        {/* Tagline */}
        <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
          Your personal tool to keep tight connections. Browse, text, and nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-3">Social Links</p>
        <div className="flex items-center justify-center gap-3 mb-10">
          <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white/60 hover:text-white transition-colors duration-150">
            <FaFacebookF size={13} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white/60 hover:text-white transition-colors duration-150">
            <FaLinkedinIn size={13} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white/60 hover:text-white transition-colors duration-150">
            <FaTwitter size={13} />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-xs">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors duration-150">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-150">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-150">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;