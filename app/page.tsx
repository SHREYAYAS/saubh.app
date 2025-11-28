// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ParticleBackground (client-side only)
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
  ssr: false,
  loading: () => null,
});

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
            {['CRM', 'Tools', 'Service', 'Mart'].map((item) => (
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
            <Link
              href="/login"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-300 transition duration-300 font-medium"
            >
              Login
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
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
              {['CRM', 'Tools', 'Service', 'Mart'].map((item) => (
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
              <Link
                href="/login"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-300 transition duration-300 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
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
  <section className="relative py-16 md:py-28 overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" id="hero">
          {/* 3D Particle Background */}
          <ParticleBackground />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative max-w-7xl">
            {/* Main Headline */}
            <div className="text-center mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-4">
                <span className="text-5xl md:text-6xl animate-bounce">🎯</span>
                <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-gray-100 to-white bg-clip-text text-transparent sm:text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-2xl">
                  No Business Without a Brand.
                </h1>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 leading-tight animate-pulse drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                No Brand Without Trust
              </h2>
              <p className="text-xl md:text-2xl bg-linear-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent font-bold max-w-3xl mx-auto drop-shadow-lg">
                Saubh converts social proof into organic leads.
              </p>
            </div>

            {/* Extended Description */}
            <div className="max-w-6xl mx-auto mb-12 text-left">
              {/* Stats Box */}
              <div className="bg-linear-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-3xl p-6 md:p-10 mb-8 border border-slate-600/50 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
                <p className="text-base md:text-lg text-gray-100 leading-relaxed">
                  Your brand is more than a logo — in this digital economy, consumers trust their peers <span className="text-indigo-400 font-bold text-xl">93% more</span> than traditional advertising. Saubh helps businesses transform authentic <span className="text-pink-400 font-bold">User Generated Content (UGC)</span> and people-to-people <span className="text-pink-400 font-bold">Digital Media Amplification (DMA)</span> into <span className="text-indigo-400 font-bold text-xl">4X-12X higher organic reach</span> at <span className="text-green-400 font-bold text-xl">60% lower cost</span>.
                </p>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">
                Stop Paying for Ads People Ignore
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6">
                {/* The Shift Is Happening */}
                <div className="bg-linear-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-600/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105">
                  <h3 className="text-xl md:text-2xl font-bold text-indigo-400 mb-4 flex items-center">
                    <span className="mr-3 text-2xl">⚡</span> The Shift Is Happening
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                    Traditional advertising is dying. People use ad blockers. They skip commercials. They don't trust brands who shout at them.
                  </p>
                  
                  <p className="text-white font-bold mb-3 text-base md:text-lg">But they trust</p>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-300 text-sm md:text-base group">
                      <span className="text-green-400 mr-3 text-xl shrink-0 group-hover:scale-125 transition-transform">✓</span>
                      <span>The individual who genuinely loves your product</span>
                    </li>
                    <li className="flex items-start text-gray-300 text-sm md:text-base group">
                      <span className="text-green-400 mr-3 text-xl shrink-0 group-hover:scale-125 transition-transform">✓</span>
                      <span>The people who solved a problem with your service</span>
                    </li>
                    <li className="flex items-start text-gray-300 text-sm md:text-base group">
                      <span className="text-green-400 mr-3 text-xl shrink-0 group-hover:scale-125 transition-transform">✓</span>
                      <span>The local influencer whose taste they respect</span>
                    </li>
                  </ul>
                </div>

                {/* Saubh gives you */}
                <div className="bg-linear-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-600/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 hover:scale-105">
                  <h3 className="text-xl md:text-2xl font-bold text-pink-400 mb-4 flex items-center">
                    <span className="mr-3 text-2xl">🚀</span> Saubh gives you
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start text-gray-300 text-sm md:text-base group">
                      <span className="text-indigo-400 mr-3 text-xl shrink-0 group-hover:scale-125 transition-transform">✓</span>
                      <span><span className="font-bold text-white">Scalable content creation</span> without hiring agencies</span>
                    </li>
                    <li className="flex items-start text-gray-300 text-sm md:text-base group">
                      <span className="text-indigo-400 mr-3 text-xl shrink-0 group-hover:scale-125 transition-transform">✓</span>
                      <span><span className="font-bold text-white">Authentic voices</span> without begging for reviews</span>
                    </li>
                    <li className="flex items-start text-gray-300 text-sm md:text-base group">
                      <span className="text-indigo-400 mr-3 text-xl shrink-0 group-hover:scale-125 transition-transform">✓</span>
                      <span><span className="font-bold text-white">Measurable results</span> without black-box analytics</span>
                    </li>
                    <li className="flex items-start text-gray-300 text-sm md:text-base group">
                      <span className="text-indigo-400 mr-3 text-xl shrink-0 group-hover:scale-125 transition-transform">✓</span>
                      <span><span className="font-bold text-white">ROI that actually makes sense</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <Link
                href="/get-started"
                aria-label="Start free trial"
                className="rounded-xl bg-linear-to-r from-indigo-600 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-2xl hover:scale-105 hover:from-indigo-700 hover:to-pink-600 transition duration-300 inline-flex items-center justify-center"
              >
                Start Free Trial
              </Link>
              <a href="#features" className="rounded-xl border-2 border-indigo-400 px-8 py-3 text-lg font-bold text-indigo-400 bg-slate-800/50 backdrop-blur-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition duration-300 shadow-lg">See Features</a>
            </div>
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">D2C Skincare Brand <span className="text-sm font-normal text-gray-600 dark:text-gray-400">(Mumbai)</span></h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-4">- Growth plan</p>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200 text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">Generated:</span> 87 authentic reviews + 45 video testimonials
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Result:</span> 340% increase in organic traffic, ₹12.4 lakhs in attributed sales
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">ROI:</span> 9.5x
                  </p>
                </div>
              </div>

              {/* Case Study Card 2: Local Restaurant Chain */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-green-300/40 dark:hover:shadow-green-500/20 border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Local Restaurant Chain <span className="text-sm font-normal text-gray-600 dark:text-gray-400">(Delhi NCR)</span></h3>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-4">- Starter plan</p>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200 text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">Generated:</span> 32 food review videos + 150+ social media posts
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-green-600 dark:text-green-400">Result:</span> 28% increase in weekend footfall, 4.2★ to 4.7★ rating improvement
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-green-600 dark:text-green-400">ROI:</span> 11.2x
                  </p>
                </div>
              </div>

              {/* Case Study Card 3: Tech Startup */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-pink-300/40 dark:hover:shadow-pink-500/20 border-l-4 border-pink-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tech Startup <span className="text-sm font-normal text-gray-600 dark:text-gray-400">(Bangalore)</span></h3>
                <p className="text-sm text-pink-600 dark:text-pink-400 font-semibold mb-4">- Enterprise plan</p>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200 text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">Generated:</span> 200+ tutorial videos + 500+ micro-reviews
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold text-pink-600 dark:text-pink-400">Result:</span> 56% reduction in CAC, 2.3x increase in demo requests
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
            <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
              💰 <span className="text-indigo-600 dark:text-indigo-300">Value for Your Money</span>
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-200 mb-12 max-w-2xl mx-auto text-lg">
              Choose the plan that works best for you. No hidden fees, cancel anytime.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              
              {/* Starter Plan */}
              <div className="rounded-xl bg-white dark:bg-slate-900 p-8 border-2 border-gray-200 dark:border-slate-600 transition duration-300 hover:border-indigo-600 dark:hover:border-indigo-400">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Starter Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">₹4,999</span>
                  <span className="text-gray-600 dark:text-gray-200">/month</span>
                </div>
                <ul className="space-y-3 mb-6 text-sm">
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>10 creator collaborations</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>15 pieces of UGC content</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>Basic DSMA across 3 platforms</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>Analytics dashboard</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200 font-semibold border-t pt-3 mt-3">
                    <span className="mr-2 mt-1">🎯</span> 
                    <span>Perfect for: Local businesses, startups, D2C brands testing UGC</span>
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
                <ul className="space-y-3 mb-6 text-sm">
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1 text-green-300">✓</span> 
                    <span>30 creator collaborations</span>
                  </li>
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1 text-green-300">✓</span> 
                    <span>50 pieces of UGC content</span>
                  </li>
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1 text-green-300">✓</span> 
                    <span>Advanced DSMA across all major platforms</span>
                  </li>
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1 text-green-300">✓</span> 
                    <span>A/B testing & optimization</span>
                  </li>
                  <li className="flex items-start text-white">
                    <span className="mr-2 mt-1 text-green-300">✓</span> 
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start text-white font-semibold border-t border-indigo-400 pt-3 mt-3">
                    <span className="mr-2 mt-1">🎯</span> 
                    <span>Perfect for: Scaling brands, e-commerce, service businesses</span>
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
                <ul className="space-y-3 mb-6 text-sm">
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>Unlimited creators</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>White-label options</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>API integration</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>Custom AI models for your brand</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200">
                    <span className="mr-2 mt-1 text-green-500">✓</span> 
                    <span>Web3 loyalty programs</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-200 font-semibold border-t pt-3 mt-3">
                    <span className="mr-2 mt-1">🎯</span> 
                    <span>Perfect for: Established brands, agencies, multi-location businesses</span>
                  </li>
                </ul>
                <button className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white hover:bg-gray-900 transition duration-300">
                  Contact Sales
                </button>
              </div>

            </div>

            {/* ROI Guarantee Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 p-8 md:p-10 text-center shadow-2xl border-2 border-yellow-400">
                <h3 className="text-3xl font-extrabold text-white mb-4 flex items-center justify-center">
                  <span className="mr-3 text-4xl">👍</span> ROI Guarantee
                </h3>
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  Most clients see <span className="font-bold text-yellow-300">300-500% ROI</span> within 90 days or we work with you until you do – can be tracked transparently in Saubh's dashboard.
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
          {/* Call-to-Action Footer */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              <span className="mr-2">📢</span> Call-to-Action Footer
            </h3>
            
            {/* Businesses CTA */}
            <div className="mb-4">
              <p className="text-gray-300 text-base md:text-lg mb-2">
                <span className="font-semibold text-white">Businesses:</span>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#launch" className="text-indigo-400 hover:text-indigo-300 transition duration-300 font-medium">[Launch Campaign]</a>
                <span className="text-gray-500">|</span>
                <a href="#strategy" className="text-indigo-400 hover:text-indigo-300 transition duration-300 font-medium">[Book Strategy Call]</a>
                <span className="text-gray-500">|</span>
                <a href="#case-studies" className="text-indigo-400 hover:text-indigo-300 transition duration-300 font-medium">[View Case Studies]</a>
              </div>
            </div>
            
            {/* Creators CTA */}
            <div className="mb-4">
              <p className="text-gray-300 text-base md:text-lg mb-2">
                <span className="font-semibold text-white">Creators:</span>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#earning" className="text-pink-400 hover:text-pink-300 transition duration-300 font-medium">[Start Earning]</a>
                <span className="text-gray-500">|</span>
                <a href="#campaigns" className="text-pink-400 hover:text-pink-300 transition duration-300 font-medium">[See Active Campaigns]</a>
                <span className="text-gray-500">|</span>
                <a href="#success" className="text-pink-400 hover:text-pink-300 transition duration-300 font-medium">[Creator Success Stories]</a>
              </div>
            </div>
          </div>

          {/* Learn More Links */}
          <div className="mb-8">
            <p className="text-center text-gray-400 mb-3 font-semibold">Learn More:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#about" className="text-gray-300 hover:text-white transition duration-300">About</a>
              <span className="text-gray-600">|</span>
              <a href="#pricing" className="text-gray-300 hover:text-white transition duration-300">Pricing</a>
              <span className="text-gray-600">|</span>
              <a href="#careers" className="text-gray-300 hover:text-white transition duration-300">Careers</a>
              <span className="text-gray-600">|</span>
              <a href="#contact" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
              <span className="text-gray-600">|</span>
              <a href="#privacy" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#blog" className="text-gray-300 hover:text-white transition duration-300">Blog</a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mb-8">
            <p className="text-center text-gray-400 mb-3 font-semibold">Follow Us:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300">LinkedIn</a>
              <span className="text-gray-600">|</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 transition duration-300">Facebook</a>
              <span className="text-gray-600">|</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-500 transition duration-300">Instagram</a>
              <span className="text-gray-600">|</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-sky-400 transition duration-300">Twitter</a>
              <span className="text-gray-600">|</span>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition duration-300">YouTube</a>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm italic">Made in India, Owned by People</p>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
            <p>Copyright © 2025 Saubh Tech Private Limited.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;