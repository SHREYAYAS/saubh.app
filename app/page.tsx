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
            {['Features', 'Pricing', 'About'].map((item) => (
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
          <Link href="/get-started" aria-label="Get started with SaubhApp" className="">
            <button 
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition duration-300"
            >
              Get Started
            </button>
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
              {['Features', 'Pricing', 'About'].map((item) => (
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
              <Link href="/get-started">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition duration-300 mt-2 w-full">
                  Get Started
                </button>
              </Link>
            </nav>
          </div>
        )}
      </header>

  <main className="grow">
        {/* Hero Section with Animated Background */}
        <section className="relative py-20 md:py-32 overflow-hidden" id="hero">
          <div className="container mx-auto px-6 text-center relative">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
              Unlock Your <span className="text-indigo-600 dark:text-indigo-400">Productivity</span> Potential
            </h1>
            <p className="mt-6 text-xl text-gray-800 dark:text-gray-300 md:text-2xl max-w-3xl mx-auto">
              A seamless, offline-ready web application designed for speed, reliability, and delight on any device.
            </p>
            <p className="mt-2 text-lg text-indigo-600 dark:text-indigo-400 font-semibold">Loved by thousands of users worldwide</p>
            <div className="mt-10 flex justify-center space-x-4 flex-wrap gap-4">
              <Link href="/get-started" aria-label="Start free trial">
                <button 
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 px-10 py-4 text-xl font-bold text-white shadow-2xl hover:scale-105 hover:from-indigo-700 hover:to-pink-600 transition duration-300"
                >
                  Start Free Trial
                </button>
              </Link>
              <a href="#features" className="rounded-xl border-2 border-indigo-600 px-10 py-4 text-xl font-bold text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white dark:bg-transparent dark:text-indigo-300 dark:border-indigo-300 dark:hover:bg-indigo-600 transition duration-300">See Features</a>
            </div>
            {/* Testimonial section removed */}
          </div>
        </section>

        {/* Feature Section - Responsive Grid Layout */}
        <section className="py-16" id="features">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-12">Why Choose <span className="text-indigo-600 dark:text-indigo-400">SaubhApp</span>?</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature Card 1: PWA Benefit */}
              <div className="rounded-xl bg-white dark:bg-white/10 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-indigo-300/40 border-t-4 border-indigo-400 dark:border-indigo-400/60 flex flex-col items-center">
                <Image src="/icons/pwa.svg" alt="Offline Access" width={56} height={56} className="mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Offline Access</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">Works reliably even without an internet connection using advanced caching technology.</p>
              </div>
              {/* Feature Card 2: Responsiveness */}
              <div className="rounded-xl bg-white dark:bg-white/10 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-green-300/40 border-t-4 border-green-400 dark:border-green-400/60 flex flex-col items-center">
                <Image src="/icons/responsive.svg" alt="Responsive" width={56} height={56} className="mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pixel-Perfect Layout</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">Tailwind's utility-first approach ensures responsiveness on mobile and desktop.</p>
              </div>
              {/* Feature Card 3: Performance */}
              <div className="rounded-xl bg-white dark:bg-white/10 p-8 shadow-lg dark:shadow-none transition duration-300 hover:scale-105 hover:shadow-pink-300/40 border-t-4 border-pink-400 dark:border-pink-400/60 flex flex-col items-center">
                <Image src="/icons/performance.svg" alt="Lightning Fast" width={56} height={56} className="mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Lightning Fast</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">Built on Next.js for high performance and rapid loading times.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
  <section className="py-16" id="pricing">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">Simple Pricing</h2>
            <p className="text-center text-gray-800 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
              Choose the plan that works best for you. No hidden fees, cancel anytime.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              
              {/* Basic Plan */}
              <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-8 border-2 border-gray-200 dark:border-slate-700 transition duration-300 hover:border-indigo-600 dark:hover:border-indigo-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">$9</span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-2">✓</span> Offline Access
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-2">✓</span> Basic Features
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-2">✓</span> Email Support
                  </li>
                </ul>
                <button className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white hover:bg-gray-900 transition duration-300">
                  Choose Basic
                </button>
              </div>

              {/* Pro Plan */}
              <div className="rounded-xl bg-indigo-600 p-8 border-2 border-indigo-600 transform scale-105 shadow-2xl">
                <div className="text-center mb-2">
                  <span className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    POPULAR
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-white">$29</span>
                  <span className="text-indigo-200">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> Everything in Basic
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> Advanced Analytics
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> Priority Support
                  </li>
                  <li className="flex items-center text-white">
                    <span className="mr-2">✓</span> Custom Integrations
                  </li>
                </ul>
                <button className="w-full rounded-lg bg-white px-4 py-3 text-indigo-600 font-semibold hover:bg-gray-100 transition duration-300">
                  Choose Pro
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-8 border-2 border-gray-200 dark:border-slate-700 transition duration-300 hover:border-indigo-600 dark:hover:border-indigo-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">$99</span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-2">✓</span> Everything in Pro
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-2">✓</span> Unlimited Users
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-2">✓</span> 24/7 Phone Support
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-2">✓</span> Dedicated Manager
                  </li>
                </ul>
                <button className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white hover:bg-gray-900 transition duration-300">
                  Contact Sales
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* About Section */}
  <section className="py-16" id="about">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-8">About <span className="text-indigo-600 dark:text-indigo-400">SaubhApp</span></h2>
              <div className="bg-white dark:bg-white/5 rounded-xl p-8 shadow-lg dark:shadow-none">
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                  SaubhApp is a cutting-edge Progressive Web Application designed to deliver exceptional performance 
                  and user experience across all devices. Built with modern web technologies, we ensure your productivity 
                  tools are always accessible, whether you're online or offline.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                  Our mission is to empower individuals and teams with reliable, fast, and intuitive tools that adapt 
                  to their workflow. With Next.js at our core and Tailwind CSS for beautiful design, we're setting 
                  new standards for web applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <Image src="/icons/users.svg" alt="Active Users" width={40} height={40} className="mx-auto mb-2 dark:invert" />
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">10k+</div>
                    <div className="text-gray-600 dark:text-gray-300">Active Users</div>
                  </div>
                  <div className="text-center">
                    <Image src="/icons/uptime.svg" alt="Uptime" width={40} height={40} className="mx-auto mb-2 dark:invert" />
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">99.9%</div>
                    <div className="text-gray-600 dark:text-gray-300">Uptime</div>
                  </div>
                  <div className="text-center">
                    <Image src="/icons/support.svg" alt="Support" width={40} height={40} className="mx-auto mb-2 dark:invert" />
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">24/7</div>
                    <div className="text-gray-600 dark:text-gray-300">Support</div>
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
          <Link href="/get-started">
            <button className="rounded-xl bg-white text-indigo-600 font-bold px-8 py-4 text-xl shadow-lg hover:bg-indigo-100 transition duration-300">Get Started Now</button>
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
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SaubhApp. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;