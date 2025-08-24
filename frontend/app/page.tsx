"use client";


import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 flex flex-col items-center justify-center font-sans p-0 relative overflow-hidden">
      {/* Animated Background Shapes */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 opacity-40 rounded-full blur-3xl z-0" />
  <div className="absolute -bottom-40 right-0 w-[32rem] h-[32rem] bg-blue-200 opacity-30 rounded-full blur-3xl z-0" />
  <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-200 opacity-20 rounded-full blur-2xl z-0" style={{transform: 'translate(-50%, -50%)'}} />
      {/* Soft Modern Navbar */}
      <header className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur shadow-sm rounded-b-3xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-stretch justify-between px-4 sm:px-8 py-3 sm:py-4 relative">
          {/* Dropdown button for mobile */}
          <div className="sm:hidden w-full flex justify-end">
            <button
              className="p-2 rounded-xl bg-gradient-to-r from-blue-400 to-pink-300 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-md transition-all duration-200"
              aria-label="Open menu"
              onClick={() => setMenuOpen((open) => !open)} >
           
              <span className="text-lg">☰</span>
            </button>
          </div>
          {/* Dropdown menu for mobile */}
          {menuOpen && (
      <div className="sm:hidden absolute right-4 top-14 bg-white/95 rounded-2xl shadow-xl flex flex-col w-52 z-30 border border-blue-100">
        <Link href="/login" className="text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-xl transition font-semibold" onClick={() => setMenuOpen(false)}>Register</Link>
  {/* <Link href="/resume" className="text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-xl transition font-semibold" onClick={() => setMenuOpen(false)}>Resume Builder</Link> */}
  <Link href="/resume-demo" className="text-purple-700 hover:bg-purple-50 px-4 py-3 rounded-xl transition font-semibold" onClick={() => setMenuOpen(false)}>Try Demo</Link>
      </div>
          )}
          {/* Nav links for desktop */}
          <nav className="hidden sm:flex flex-row gap-6 md:gap-8 text-base font-semibold items-center sm:justify-start">
              <Link href="/login" className="text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl transition">Register</Link>
              <Link href="/subscription" className="text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl transition">Login</Link>
              {/* <Link href="/resume" className="text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl transition">Resume Builder</Link> */}
              <Link href="/resume-demo" className="text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-xl transition">Try Demo</Link>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
  <section className="flex flex-col items-center text-center mt-10 mb-8 z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* AI-themed Icon */}
          <div className="flex-shrink-0">
            <Image src="/globe.svg" alt="AI Icon" width={80} height={80} className="drop-shadow-xl" />
          </div>
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight">
              Resume & Cover Letter Builder
            </h1>
            <p className="text-lg md:text-2xl text-blue-700 mb-10 max-w-2xl font-medium">
              Instantly generate tailored, professional resumes and cover letters using advanced AI.<br className="hidden md:inline" /> Download in PDF or DOCX. Pay once to unlock 3 downloads—no subscription!
            </p>
      <div className="flex gap-6 justify-center">
  <Link href="/login" className="px-8 py-3 bg-gradient-to-r from-blue-400 to-pink-300 text-white rounded-2xl font-bold shadow-lg hover:scale-110 hover:shadow-2xl hover:brightness-110 transition-all duration-200">Get Started</Link>
  {/* <Link href="/resume" className="px-8 py-3 bg-white border-2 border-blue-300 text-blue-700 rounded-2xl font-bold shadow hover:bg-blue-50 hover:scale-110 hover:shadow-xl transition-all duration-200">Resume Builder</Link> */}
        <Link href="/resume-demo" className="px-8 py-3 bg-purple-700 text-white rounded-2xl font-bold shadow-lg hover:bg-purple-800 hover:scale-110 hover:shadow-2xl transition-all duration-200">Try Demo</Link>
      </div>
          </div>
        </div>
      </section>
      {/* Testimonial / Trust Badge Section */}
      <section className="w-full flex flex-col items-center mb-10 z-10">
  <div className="bg-white/80 rounded-3xl shadow-lg px-8 py-6 max-w-2xl flex flex-col md:flex-row items-center gap-6 border border-blue-100">
          <Image src="/file.svg" alt="Trust Badge" width={56} height={56} className="drop-shadow-md" />
          <div className="text-left">
            <p className="text-lg font-semibold text-blue-900 mb-1">Trusted by 1,000+ job seekers</p>
            <p className="text-blue-700">“This builder made my job search so much easier. The AI suggestions are spot on and the downloads look amazing!”</p>
            <span className="block text-sm text-blue-400 mt-2">— Happy Customer</span>
          </div>
        </div>
      </section>

      {/* Customer Feedback Section */}
      <section className="w-full flex flex-col items-center mb-16 z-10">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-300">
            <div className="flex items-center mb-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
                <path d="M20 22c3.314 0 6 2.239 6 5v1H14v-1c0-2.761 2.686-5 6-5z" fill="#9CA3AF" />
                <circle cx="20" cy="16" r="4" fill="#9CA3AF" />
              </svg>
            </div>
            <p className="text-gray-700 text-base mb-2">“I landed my dream job thanks to this resume builder. The AI-generated content was better than anything I could write myself!”</p>
            <span className="text-blue-700 font-semibold flex items-center gap-1">— Sarah M.
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1" width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a2 2 0 110 4 2 2 0 010-4zm0 10.2a6.2 6.2 0 01-5-2.5c.03-1.67 3.33-2.6 5-2.6s4.97.93 5 2.6a6.2 6.2 0 01-5 2.5z"/></svg>
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-pink-300">
            <div className="flex items-center mb-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
                <path d="M20 22c3.314 0 6 2.239 6 5v1H14v-1c0-2.761 2.686-5 6-5z" fill="#9CA3AF" />
                <circle cx="20" cy="16" r="4" fill="#9CA3AF" />
              </svg>
            </div>
            <p className="text-gray-700 text-base mb-2">“Super easy to use and the cover letter suggestions were spot on. Highly recommend for anyone job hunting!”</p>
            <span className="text-pink-700 font-semibold flex items-center gap-1">— Alex R.
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1" width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a2 2 0 110 4 2 2 0 010-4zm0 10.2a6.2 6.2 0 01-5-2.5c.03-1.67 3.33-2.6 5-2.6s4.97.93 5 2.6a6.2 6.2 0 01-5 2.5z"/></svg>
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-green-300">
            <div className="flex items-center mb-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
                <path d="M20 22c3.314 0 6 2.239 6 5v1H14v-1c0-2.761 2.686-5 6-5z" fill="#9CA3AF" />
                <circle cx="20" cy="16" r="4" fill="#9CA3AF" />
              </svg>
            </div>
            <p className="text-gray-700 text-base mb-2">“I love that I only had to pay once for multiple downloads. The resume looked professional and got me noticed!”</p>
            <span className="text-green-700 font-semibold flex items-center gap-1">— Priya S.
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1" width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a2 2 0 110 4 2 2 0 010-4zm0 10.2a6.2 6.2 0 01-5-2.5c.03-1.67 3.33-2.6 5-2.6s4.97.93 5 2.6a6.2 6.2 0 01-5 2.5z"/></svg>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
