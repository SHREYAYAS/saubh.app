// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false); // for exit animations
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [showScroll, setShowScroll] = useState(false);
  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Mount/unmount mobile menu with exit animation
  useEffect(() => {
    if (mobileMenuOpen) {
      setMenuMounted(true);
      return;
    }
    const t = setTimeout(() => setMenuMounted(false), 250);
    return () => clearTimeout(t);
  }, [mobileMenuOpen]);
  
  return (
    // Main Container
  <div className="min-h-screen flex flex-col">
      
      {/* Header/Navigation */}
  <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-md dark:shadow-black/20 text-inherit">
        <div className="container mx-auto flex items-center justify-between p-4">
          
          {/* Logo and App Name */}
          <div className="flex items-center space-x-2">
            {/* The logo is referenced from the /public/icons folder */}
            <Image 
              src="/icons/logo.jpg" 
              alt="Company Logo" 
              width={32}
              height={32}
              className="h-8 w-8 object-contain" 
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">SaubhApp</span>
          </div>
          
          {/* Desktop Navigation Links (Hidden on small screens) */}
          <nav className="hidden space-x-6 md:flex">
            {['CRM', 'Tools', 'Service', 'Mart', 'Login', 'Pricing', 'About'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-300 transition duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
          <Link
            href="/get-started"
            aria-label="Get started with SaubhApp"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition duration-300 inline-flex items-center justify-center"
          >
            Get Started
          </Link>
          </div>
          
          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden"
            ref={menuButtonRef}
            onClick={() => {
              setMobileMenuOpen((open) => {
                const next = !open;
                if (open && !next) {
                  // Return focus to the toggle button when closing to avoid aria-hidden focus issues
                  setTimeout(() => menuButtonRef.current?.focus(), 0);
                }
                return next;
              });
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {/* Hamburger Icon */}
            <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>

        {/* Mobile Menu with presence-based animation and accessibility */}
        {menuMounted && (
          <div
            className={
              `md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 overflow-hidden transition-all duration-300 transform ` +
              (mobileMenuOpen ? 'max-h-96 translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0 pointer-events-none')
            }
            aria-hidden={!mobileMenuOpen}
          >
            <nav className="flex flex-col space-y-2 p-4">
              {['CRM', 'Tools', 'Service', 'Mart', 'Login', 'Pricing', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-300 transition duration-300 font-medium py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item}
                </a>
              ))}
              <div className="py-2">
                <ThemeSwitcher />
              </div>
              <Link
                href="/get-started"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition duration-300 mt-2 w-full inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </header>

  <main className="grow">
        {/* Hero Section with Animated Background */}
  <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-br from-indigo-50 to-pink-50 dark:from-slate-900 dark:to-slate-800" id="hero">
          <div className="container mx-auto px-6 text-center relative">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl">
              No Business Without a Brand. <span className="text-indigo-600 dark:text-indigo-400">No Brand Without Trust</span>
            </h1>
            <p className="mt-6 text-xl text-gray-700 dark:text-gray-200 md:text-2xl max-w-3xl mx-auto font-medium">
              Saubh helps businesses transform authentic User Generated Content (UGC) and people-to-people Digital Media Amplification (DMA) into 4X-12X higher organic reach at 60% lower cost.
            </p>
            <p className="mt-2 text-lg text-indigo-600 dark:text-indigo-300 font-bold">Loved by thousands of users worldwide</p>
            <div className="mt-10 flex justify-center space-x-4 flex-wrap gap-4">
              <Link
                href="/get-started"
                aria-label="Start free trial"
                className="rounded-xl bg-linear-to-r from-indigo-600 to-pink-500 px-10 py-4 text-xl font-bold text-white shadow-2xl hover:scale-105 hover:from-indigo-700 hover:to-pink-600 transition duration-300 inline-flex items-center justify-center"
              >
                Start Free Trial
              </Link>
              <a href="#features" className="rounded-xl border-2 border-indigo-600 px-10 py-4 text-xl font-bold text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:text-indigo-300 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 transition duration-300 shadow-lg">See Features</a>
            </div>
            {/* Testimonial section removed */}
          </div>
        </section>

        {/* Feature Section - Responsive Grid Layout */}
        <section className="py-16 bg-white dark:bg-slate-900" id="features">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-12">The Shift Is <span className="text-indigo-600 dark:text-indigo-400">Happening</span></h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature Card 1: Authentic Voices/Trust */}
              <div className="rounded-xl bg-white dark:bg-slate-800 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-indigo-300/40 dark:hover:shadow-indigo-500/20 border-t-4 border-indigo-400 dark:border-indigo-500 flex flex-col items-center">
                <Image src="/icons/pwa.svg" alt="But they trust" width={56} height={56} className="mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">But they trust</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-200 text-center">"The individual who genuinely loves your product", "The people who solved a problem with your service", or "The local influencer whose taste they respect".</p>
              </div>
              {/* Feature Card 2: Content Creation/Efficiency */}
              <div className="rounded-xl bg-white dark:bg-slate-800 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-green-300/40 dark:hover:shadow-green-500/20 border-t-4 border-green-400 dark:border-green-500 flex flex-col items-center">
                <Image src="/icons/responsive.svg" alt="Scalable Content" width={56} height={56} className="mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Scalable Content</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-200 text-center">"Scalable content creation without hiring agencies" and "Authentic voices without begging for reviews".</p>
              </div>
              {/* Feature Card 3: Measurable ROI */}
              <div className="rounded-xl bg-white dark:bg-slate-800 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-pink-300/40 dark:hover:shadow-pink-500/20 border-t-4 border-pink-400 dark:border-pink-500 flex flex-col items-center">
                <Image src="/icons/performance.svg" alt="Measurable Results" width={56} height={56} className="mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Measurable Results</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-200 text-center">"Measurable results without black-box analytics" and "ROI that actually makes sense".</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section - Real Results from Real Businesses */}
        <section className="py-16 bg-gray-50 dark:bg-slate-800" id="case-studies">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
              Real Results from <span className="text-indigo-600 dark:text-indigo-400">Real Businesses</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
              See how businesses like yours are transforming their marketing with Saubh
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              
              {/* Case Study Card 1: D2C Skincare Brand */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-indigo-300/40 dark:hover:shadow-indigo-500/20 border-l-4 border-indigo-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">D2C Skincare Brand</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Result:</span> 340% increase in organic traffic, 12.4 lakhs in attributed sales.
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">ROI:</span> 9.5x
                  </p>
                </div>
              </div>

              {/* Case Study Card 2: Local Restaurant Chain */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-green-300/40 dark:hover:shadow-green-500/20 border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Local Restaurant Chain</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-green-600 dark:text-green-400">Result:</span> 28% increase in weekend footfall, 4.2 to 4.7 rating improvement.
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-green-600 dark:text-green-400">ROI:</span> 11.2x
                  </p>
                </div>
              </div>

              {/* Case Study Card 3: Tech Startup */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-pink-300/40 dark:hover:shadow-pink-500/20 border-l-4 border-pink-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Tech Startup</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-pink-600 dark:text-pink-400">Result:</span> 56% reduction in CAC, 2.3x increase in demo requests.
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-pink-600 dark:text-pink-400">ROI:</span> 14.8x
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing Section */}
  <section className="py-16 bg-gray-50 dark:bg-slate-800" id="pricing">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-4">Simple Pricing</h2>
            <p className="text-center text-gray-700 dark:text-gray-200 mb-12 max-w-2xl mx-auto text-lg">
              Choose the plan that works best for you. No hidden fees, cancel anytime.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              
              {/* Starter Plan */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 border-2 border-gray-200 dark:border-slate-600 transition duration-300 hover:border-indigo-600 dark:hover:border-indigo-400">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Starter Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">₹4,999</span>
                  <span className="text-gray-600 dark:text-gray-200">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>10 creator collaborations</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>15 pieces of UGC</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>Basic DSMA</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200 font-semibold">
                    <span className="mr-2 mt-1">🎯</span> 
                    <span>Perfect for: Local businesses</span>
                  </li>
                </ul>
                <button className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white hover:bg-gray-900 transition duration-300">
                  Choose Starter
                </button>
              </div>

              {/* Growth Plan */}
              <div className="rounded-xl bg-indigo-600 p-8 border-2 border-indigo-600 transform scale-105 shadow-2xl">
                <div className="text-center mb-2">
                  <span className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    POPULAR
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Growth Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-white">₹12,999</span>
                  <span className="text-indigo-200">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>30 creator collaborations</span>
                  </li>
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>50 pieces of UGC</span>
                  </li>
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start text-white font-semibold">
                    <span className="mr-2 mt-1">🎯</span> 
                    <span>Perfect for: Scaling brands, e-commerce</span>
                  </li>
                </ul>
                <button className="w-full rounded-lg bg-white px-4 py-3 text-indigo-600 font-semibold hover:bg-gray-100 transition duration-300">
                  Choose Growth
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 border-2 border-gray-200 dark:border-slate-600 transition duration-300 hover:border-indigo-600 dark:hover:border-indigo-400">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Enterprise Plan</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Custom Pricing</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>Unlimited creators</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>White-label options</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1">✓</span> 
                    <span>Custom AI models</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200 font-semibold">
                    <span className="mr-2 mt-1">🎯</span> 
                    <span>Perfect for: Established brands, agencies</span>
                  </li>
                </ul>
                <button className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white hover:bg-gray-900 transition duration-300">
                  Contact Sales
                </button>
              </div>

            </div>

            {/* ROI Guarantee Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 p-8 md:p-12 text-center shadow-2xl">
                <h3 className="text-3xl font-extrabold text-white mb-4">ROI Guarantee</h3>
                <p className="text-xl text-white/90 leading-relaxed">
                  Most clients see <span className="font-bold text-yellow-300">300-500% ROI</span> within 90 days or we work with you until you do.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* About Section */}
  <section className="py-16 bg-white dark:bg-slate-900" id="about">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8">About <span className="text-indigo-600 dark:text-indigo-400">SaubhApp</span></h2>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg dark:shadow-none">
                <p className="text-lg text-gray-700 dark:text-gray-100 mb-6">
                  SaubhApp is a cutting-edge Progressive Web Application designed to deliver exceptional performance 
                  and user experience across all devices. Built with modern web technologies, we ensure your productivity 
                  tools are always accessible, whether you're online or offline.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-100 mb-6">
                  Our mission is to empower individuals and teams with reliable, fast, and intuitive tools that adapt 
                  to their workflow. With Next.js at our core and Tailwind CSS for beautiful design, we're setting 
                  new standards for web applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <Image src="/icons/users.svg" alt="Active Users" width={40} height={40} className="mx-auto mb-2 dark:invert" />
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-2">10k+</div>
                    <div className="text-gray-600 dark:text-gray-200">Active Users</div>
                  </div>
                  <div className="text-center">
                    <Image src="/icons/uptime.svg" alt="Uptime" width={40} height={40} className="mx-auto mb-2 dark:invert" />
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-2">99.9%</div>
                    <div className="text-gray-600 dark:text-gray-200">Uptime</div>
                  </div>
                  <div className="text-center">
                    <Image src="/icons/support.svg" alt="Support" width={40} height={40} className="mx-auto mb-2 dark:invert" />
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-2">24/7</div>
                    <div className="text-gray-600 dark:text-gray-200">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      {/* Call to Action Section */}
  <section className="py-12 bg-linear-to-r from-indigo-600 to-pink-500 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to boost your productivity?</h2>
          <p className="mb-8 text-lg md:text-xl">Join thousands of happy users and experience the future of web apps today.</p>
          <Link
            href="/get-started"
            className="rounded-xl bg-white text-indigo-600 font-bold px-8 py-4 text-xl shadow-lg hover:bg-indigo-100 transition duration-300 inline-flex items-center justify-center"
          >
            Get Started Now
          </Link>
        </div>
      </section>
      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-6">
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#about" className="text-gray-300 hover:text-white transition duration-300">About</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition duration-300">Pricing</a>
            <a href="#careers" className="text-gray-300 hover:text-white transition duration-300">Careers</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
            <a href="#privacy" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a>
            <a href="#blog" className="text-gray-300 hover:text-white transition duration-300">Blog</a>
          </div>
          
          {/* Footer CTA */}
          <div className="text-center mb-8">
            <p className="text-gray-300 text-lg mb-4">
              <span className="font-semibold text-white">Businesses:</span> 
              <a href="#launch" className="text-indigo-400 hover:text-indigo-300 transition duration-300 ml-2">[Launch Campaign]</a>
              <span className="mx-2">|</span>
              <a href="#strategy" className="text-indigo-400 hover:text-indigo-300 transition duration-300">[Book Strategy Call]</a>
            </p>
            <p className="text-gray-300 text-lg">
              <span className="font-semibold text-white">Creators:</span> 
              <a href="#earning" className="text-indigo-400 hover:text-indigo-300 transition duration-300 ml-2">[Start Earning]</a>
            </p>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Saubh Tech Private Limited.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;