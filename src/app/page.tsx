import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Next.js Caching & Rendering
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete guide from 0 to 100 with real examples. Learn everything
            about caching strategies, rendering methods, and performance
            optimization in Next.js 13+
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Next.js 13+
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              App Router
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Real Examples
            </span>
          </div>
        </div>

        {/* Main Topics Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Rendering Methods */}
          <Link
            href="/rendering"
            className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
          >
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                  🎨
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Rendering Methods
                </h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Master all Next.js rendering strategies: SSR, SSG, ISR, CSR, and
                Edge Runtime. See real examples with observable differences and
                performance comparisons.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Server-Side Rendering (SSR)
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Static Site Generation (SSG)
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Incremental Static Regeneration (ISR)
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Client-Side Rendering (CSR)
                </div>
              </div>
              <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                Explore Rendering Methods
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Data Caching */}
          <Link
            href="/caching"
            className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-green-300"
          >
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                  🗄️
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Data Caching
                </h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Deep dive into Next.js caching layers: Fetch Cache, Request
                Memoization, Cache Tags, and On-demand Invalidation with
                interactive examples.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Fetch Cache Strategies
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Time-based Revalidation
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Cache Tags & On-demand Invalidation
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Request Memoization
                </div>
              </div>
              <div className="mt-6 flex items-center text-green-600 font-medium group-hover:text-green-700">
                Explore Data Caching
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Request Memoization */}
        <div className="mb-16">
          <Link
            href="/memoization"
            className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-purple-300"
          >
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                  🧠
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Request Memoization
                </h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Understand how Next.js automatically deduplicates identical
                requests during a single render. See real examples of
                cross-component memoization and when it breaks.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Basic Memoization
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Cross-component Sharing
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Different Options Impact
                </div>
              </div>
              <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                Explore Request Memoization
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Access Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Access to Specific Topics
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fetch Cache */}
            <Link
              href="/caching/fetch-cache"
              className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-blue-300"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-xl">🗄️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Fetch Cache
                </h4>
                <p className="text-sm text-gray-600">
                  force-cache, no-store, revalidate
                </p>
              </div>
            </Link>

            {/* Cache Tags */}
            <Link
              href="/caching/cache-tags"
              className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-green-300"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">🏷️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cache Tags</h4>
                <p className="text-sm text-gray-600">Targeted invalidation</p>
              </div>
            </Link>

            {/* Time Revalidation */}
            <Link
              href="/caching/revalidation"
              className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-purple-300"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-xl">⏰</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Time Revalidation
                </h4>
                <p className="text-sm text-gray-600">
                  Automatic refresh intervals
                </p>
              </div>
            </Link>

            {/* On-demand */}
            <Link
              href="/caching/on-demand"
              className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-orange-300"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 text-xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">On-demand</h4>
                <p className="text-sm text-gray-600">Manual invalidation</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What You'll Learn
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Performance Optimization
              </h4>
              <p className="text-sm text-gray-600">
                Learn how to make your Next.js apps lightning fast with proper
                caching strategies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Real Examples
              </h4>
              <p className="text-sm text-gray-600">
                Working code examples with observable behavior and server
                console logging
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Interactive Testing
              </h4>
              <p className="text-sm text-gray-600">
                Test different scenarios and see immediate results with
                timestamps and counters
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Built with Next.js 13+ App Router • Real working examples • Senior
            developer explanations
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>✅ Server-Side Rendering</span>
            <span>✅ Static Generation</span>
            <span>✅ Data Caching</span>
            <span>✅ Request Memoization</span>
          </div>
        </div>
      </div>
    </div>
  );
}
