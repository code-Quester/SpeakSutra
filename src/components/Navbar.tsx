import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.substring(2); // Remove the '/#' prefix
      scrollToSection(sectionId);
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Why Public Speaking', href: '/#why-public-speaking' },
    { name: 'Conquer Fear', href: '/#conquer-fear' },
    { name: 'What You\'ll Learn', href: '/#what-you-learn' },
    { name: 'Enroll Now', href: '/pricing', isButton: true },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Mic className={`w-8 h-8 ${isScrolled || location.pathname !== '/' ? 'text-accent-600' : 'text-white'}`} />
          <span className={`text-xl font-display font-bold ${
            isScrolled || location.pathname !== '/' ? 'text-neutral-900' : 'text-white'
          }`}>
            SpeakSutra
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, idx) => 
            link.isButton ? (
              <Link 
                key={idx}
                to={link.href} 
                className="btn btn-primary"
              >
                {link.name}
              </Link>
            ) : (
              <Link 
                key={idx}
                to={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium hover:text-accent-500 transition-colors ${
                  isScrolled || location.pathname !== '/' ? 'text-neutral-700' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile nav toggle */}
        <button 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={`w-6 h-6 ${isScrolled || location.pathname !== '/' ? 'text-neutral-900' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled || location.pathname !== '/' ? 'text-neutral-900' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 space-y-3">
          {navLinks.map((link, idx) => 
            link.isButton ? (
              <Link 
                key={idx}
                to={link.href} 
                className="btn btn-primary w-full justify-center"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ) : (
              <Link 
                key={idx}
                to={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-2 px-4 text-neutral-800 hover:bg-neutral-100 rounded"
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;