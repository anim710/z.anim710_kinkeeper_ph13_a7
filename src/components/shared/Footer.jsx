import logo from '../../assets/images/logo-xl.png';
import instagram from '../../assets/images/instagram.png';
import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';

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
          Your personal tool to keep tight connections. Browse, text, and nurture
          the relationships that matter most.
        </p>

        {/* Social Links label */}
        <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-3">
          Social Links
        </p>

        {/* Social icons — using local images */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150">
            <img src={instagram} alt="Instagram" className="w-5 h-5 object-contain brightness-0 invert" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150">
            <img src={facebook} alt="Facebook" className="w-5 h-5 object-contain brightness-0 invert" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150">
            <img src={twitter} alt="Twitter" className="w-5 h-5 object-contain brightness-0 invert" />
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
  )
}

export default Footer