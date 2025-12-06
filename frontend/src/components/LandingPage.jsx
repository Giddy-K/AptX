import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/APTX_logo.png";
import heroImage from "../assets/teacher-student-down-syndrome.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="AptX Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/login"
                className="text-gray-600 hover:text-[#003B73] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 hover:text-[#003B73] transition-colors"
              >
                Signup
              </Link>
              <a
                href="#progress"
                className="text-gray-600 hover:text-[#003B73] transition-colors"
              >
                Progress Tracking
              </a>
              <a
                href="#lessons"
                className="text-gray-600 hover:text-[#003B73] transition-colors"
              >
                Student Lessons
              </a>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-[#0284C7] text-white rounded-lg hover:bg-[#0369A1] transition-colors font-medium"
              >
                Start Learning Now
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                <span className="text-yellow-500 text-xl">⚡</span>
                <span className="text-sm font-medium text-gray-700">
                  AI-Powered Accessible Learning
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Transform</span>
                <br />
                <span className="text-gray-900">Curriculum Into</span>
                <br />
                <span className="text-[#0284C7]">Inclusive Learning</span>
                <br />
                <span className="text-gray-900">Experiences</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 max-w-xl">
                AptX uses AI to simplify teacher curriculum into visual,
                audio-rich, and adaptive lessons designed specifically for
                students with Down syndrome—guided by guardians, powered by
                Google Cloud.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0284C7] text-white rounded-lg hover:bg-[#0369A1] transition-colors font-medium shadow-lg shadow-blue-500/25"
                >
                  Get Started Free
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0284C7] border-2 border-[#0284C7] rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  See Demo
                </button>
              </div>

              {/* Footer Note */}
              <p className="text-sm text-gray-500 flex items-center gap-2 pt-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                No credit card required • Built on Google Cloud • WCAG Compliant
              </p>
            </div>

            {/* Right Content - Image with Floating Badges */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Teacher helping student with Down syndrome"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Badge - Audio Learning */}
              <div className="absolute top-8 -right-4 bg-white rounded-xl shadow-xl p-3 border-2 border-yellow-400 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      Audio Learning
                    </div>
                    <div className="text-xs text-gray-500">Text-to-Speech</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - AI Simplification */}
              <div className="absolute bottom-8 -left-4 bg-white rounded-xl shadow-xl p-3 border-2 border-green-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      AI Simplification
                    </div>
                    <div className="text-xs text-gray-500">
                      Powered by Gemini
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How AptX Makes Learning Accessible */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How AptX Makes Learning{" "}
              <span className="text-[#0284C7]">Accessible</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From teacher upload to student success—our AI-powered platform
              transforms complex curriculum into engaging, multi-sensory lessons
            </p>
          </div>

          {/* Top Row - 4 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Teacher Uploads */}
            <div className="bg-blue-50 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-bl-full opacity-50"></div>
              <div className="w-12 h-12 bg-[#0284C7] rounded-xl flex items-center justify-center relative z-10">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Teacher Uploads
              </h3>
              <p className="text-gray-600">
                Teachers upload curriculum in PDF, DOCX, or images—our system
                extracts content using Document AI
              </p>
            </div>

            {/* AI Simplification */}
            <div className="bg-green-50 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-200 rounded-bl-full opacity-50"></div>
              <div className="w-12 h-12 bg-[#16A34A] rounded-xl flex items-center justify-center relative z-10">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                AI Simplification
              </h3>
              <p className="text-gray-600">
                Gemini AI breaks down complex text into simple, digestible
                chunks perfect for cognitive accessibility
              </p>
            </div>

            {/* Visual Generation */}
            <div className="bg-yellow-50 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200 rounded-bl-full opacity-50"></div>
              <div className="w-12 h-12 bg-[#EAB308] rounded-xl flex items-center justify-center relative z-10">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Visual Generation
              </h3>
              <p className="text-gray-600">
                Imagen 2 creates child-friendly visuals and storyboards that
                support every learning concept
              </p>
            </div>

            {/* Student Learning */}
            <div className="bg-orange-50 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-200 rounded-bl-full opacity-50"></div>
              <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center relative z-10">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Student Learning
              </h3>
              <p className="text-gray-600">
                Students engage with audio narration, large buttons, and
                adaptive exams—all guardian-assisted
              </p>
            </div>
          </div>

          {/* Bottom Row - 3 Large Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* WCAG Compliant */}
            <div className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-2xl p-8 text-white space-y-4 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">WCAG Compliant</h3>
              <p className="text-blue-100">
                Built with accessibility at the core—high contrast, large touch
                targets, and screen reader support
              </p>
            </div>

            {/* Progress Tracking */}
            <div className="bg-gradient-to-br from-[#16A34A] to-[#15803D] rounded-2xl p-8 text-white space-y-4 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Progress Tracking</h3>
              <p className="text-green-100">
                Guardians and teachers monitor time spent, difficulty levels,
                and emotional engagement in real-time
              </p>
            </div>

            {/* Google Cloud Powered */}
            <div className="bg-gradient-to-br from-[#EAB308] to-[#CA8A04] rounded-2xl p-8 text-white space-y-4 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Google Cloud Powered</h3>
              <p className="text-yellow-100">
                Enterprise-grade infrastructure with Vertex AI, Document AI, and
                Cloud Storage for reliable performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Every Role Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for <span className="text-[#0284C7]">Every Role</span> in
              the Learning Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AptX empowers teachers, guardians, and students with tailored
              experiences designed for their unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* For Teachers */}
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-[#0284C7] rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  For Teachers
                </h3>
                <p className="text-gray-600">
                  Transform lessons effortlessly into accessible formats
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Upload PDFs, DOCX, or images instantly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Review AI-simplified content before publishing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Track student progress across all lessons
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Customize adaptive assessments
                  </span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full text-center px-6 py-3 bg-blue-50 text-[#0284C7] rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                Teacher Dashboard →
              </Link>
            </div>

            {/* For Guardians */}
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-[#EAB308] rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  For Guardians
                </h3>
                <p className="text-gray-600">
                  Guide and monitor learning journeys with real-time insights
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Real-time progress tracking dashboard
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Monitor time spent and engagement levels
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Receive suggestions for review topics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Assist students through learning sessions
                  </span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full text-center px-6 py-3 bg-yellow-50 text-[#EAB308] rounded-lg hover:bg-yellow-100 transition-colors font-medium"
              >
                Guardian Dashboard →
              </Link>
            </div>

            {/* For Students */}
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-[#16A34A] rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  For Students
                </h3>
                <p className="text-gray-600">
                  Enjoy child-optimized, fun, and accessible learning
                  experiences
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Large buttons and simple, clear interface
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Audio narration for every lesson
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Visual storyboards with high contrast
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Adaptive exams that match learning pace
                  </span>
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full text-center px-6 py-3 bg-green-50 text-[#16A34A] rounded-lg hover:bg-green-100 transition-colors font-medium"
              >
                Student Lessons →
              </Link>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#0284C7] to-[#0891B2] rounded-3xl p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Learning?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join teachers, guardians, and students creating inclusive
              educational experiences with AI
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-[#0284C7] rounded-lg hover:bg-blue-50 transition-colors font-bold text-lg shadow-lg"
              >
                Create Free Account
              </Link>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-bold text-lg">
                Upload Curriculum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise-Grade AI Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#0284C7]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
              <span className="text-sm font-semibold text-[#0284C7]">
                Powered by Google Cloud
              </span>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade AI{" "}
              <span className="text-[#0284C7]">Technology Stack</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built on Google Cloud's most advanced AI and infrastructure
              services to ensure reliability, security, and cutting-edge
              performance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80"
                alt="AI Technology"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80"
                alt="Cloud Computing"
                className="rounded-2xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
                alt="Data Analytics"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
                alt="Learning Together"
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>

            {/* Right - Technology List */}
            <div className="space-y-4">
              {/* Vertex AI + Gemini */}
              <div className="bg-blue-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#0284C7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.5 4.5 9.5 10 10.5 5.5-1 10-5 10-10.5V7l-10-5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Vertex AI + Gemini
                  </h4>
                  <p className="text-gray-600">
                    Advanced language models for curriculum simplification and
                    content generation
                  </p>
                </div>
              </div>

              {/* Document AI */}
              <div className="bg-teal-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Document AI
                  </h4>
                  <p className="text-gray-600">
                    OCR and document parsing for PDFs, images, and DOCX files
                  </p>
                </div>
              </div>

              {/* Imagen 2 */}
              <div className="bg-yellow-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#EAB308] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Imagen 2
                  </h4>
                  <p className="text-gray-600">
                    AI-powered visual generation for child-friendly learning
                    illustrations
                  </p>
                </div>
              </div>

              {/* Cloud Text-to-Speech */}
              <div className="bg-green-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#16A34A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Cloud Text-to-Speech
                  </h4>
                  <p className="text-gray-600">
                    Natural-sounding audio narration in multiple voices and
                    languages
                  </p>
                </div>
              </div>

              {/* Firestore + Cloud Storage */}
              <div className="bg-orange-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#F97316] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Firestore + Cloud Storage
                  </h4>
                  <p className="text-gray-600">
                    Scalable database and storage for lessons, progress, and
                    media files
                  </p>
                </div>
              </div>

              {/* Cloud Run */}
              <div className="bg-indigo-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Cloud Run
                  </h4>
                  <p className="text-gray-600">
                    Containerized microservices for scalable backend processing
                  </p>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="bg-green-100 rounded-xl p-6 border-2 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#16A34A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Enterprise Security & Compliance
                    </h4>
                    <p className="text-gray-700 font-medium">
                      WCAG 2.1 AA compliant • Data encryption • COPPA compliant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0284C7] via-[#0891B2] to-[#16A34A]"></div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <span className="text-sm font-semibold text-white">
              Start Your Journey Today
            </span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6">
            Transform Education with AI-Powered Accessibility
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join educators and families creating inclusive learning experiences.
            Upload your first curriculum in minutes—no technical expertise
            required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0284C7] rounded-xl hover:bg-blue-50 transition-all font-bold text-lg shadow-2xl hover:scale-105 transform"
            >
              Get Started Free
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors font-bold text-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Curriculum
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Quick Setup</h4>
              <p className="text-blue-100">Start in under 5 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Secure & Private
              </h4>
              <p className="text-blue-100">Enterprise-grade encryption</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Purpose-Built
              </h4>
              <p className="text-blue-100">For inclusive education</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="AptX Logo"
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-gray-400 text-sm">
                Transforming education with AI-powered accessible learning for
                students with Down syndrome. Built on Google Cloud.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <a
                    href="#lessons"
                    className="hover:text-white transition-colors"
                  >
                    Student Lessons
                  </a>
                </li>
                <li>
                  <a
                    href="#progress"
                    className="hover:text-white transition-colors"
                  >
                    Progress Tracking
                  </a>
                </li>
              </ul>
            </div>

            {/* Dashboards */}
            <div>
              <h4 className="text-white font-bold mb-4">Dashboards</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/teacher/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Teacher Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Upload Curriculum
                  </Link>
                </li>
                <li>
                  <a
                    href="#review"
                    className="hover:text-white transition-colors"
                  >
                    Curriculum Review
                  </a>
                </li>
                <li>
                  <Link
                    to="/guardian/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Guardian Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#exams"
                    className="hover:text-white transition-colors"
                  >
                    Student Exams
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#docs"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2025 AptX. All rights reserved. Built with{" "}
                <span className="text-red-500">❤️</span> for inclusive
                education.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#0284C7]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                  <span className="text-gray-400">Powered by Google Cloud</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span className="text-gray-400">WCAG 2.1 AA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
