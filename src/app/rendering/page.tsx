import Link from "next/link";

export default function RenderingHome() {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Next.js Rendering Methods Explained
      </h1>

      <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Understanding the 4 Rendering Methods
        </h2>
        <p className="text-black mb-4">
          Next.js offers multiple ways to render your pages, each optimized for
          different use cases. Understanding when and how to use each method is
          crucial for building performant applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🚀 SSR (Server-Side Rendering)
          </h3>
          <ul className="text-sm space-y-2 text-black mb-4">
            <li>
              • <strong>When:</strong> Real-time data, user-specific content
            </li>
            <li>
              • <strong>How:</strong> Rendered on server for each request
            </li>
            <li>
              • <strong>Performance:</strong> Always fresh, slower initial load
            </li>
            <li>
              • <strong>Caching:</strong> No caching by default
            </li>
          </ul>
          <Link
            href="/rendering/ssr"
            className="inline-block bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-black"
          >
            View SSR Example
          </Link>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            ⚡ SSG (Static Site Generation)
          </h3>
          <ul className="text-sm space-y-2 text-black mb-4">
            <li>
              • <strong>When:</strong> Content doesn't change often
            </li>
            <li>
              • <strong>How:</strong> Pre-rendered at build time
            </li>
            <li>
              • <strong>Performance:</strong> Fastest possible
            </li>
            <li>
              • <strong>Caching:</strong> Cached until rebuild
            </li>
          </ul>
          <Link
            href="/rendering/ssg"
            className="inline-block bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-black"
          >
            View SSG Example
          </Link>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🔄 ISR (Incremental Static Regeneration)
          </h3>
          <ul className="text-sm space-y-2 text-black mb-4">
            <li>
              • <strong>When:</strong> Content changes periodically
            </li>
            <li>
              • <strong>How:</strong> Static + background regeneration
            </li>
            <li>
              • <strong>Performance:</strong> Fast + fresh data
            </li>
            <li>
              • <strong>Caching:</strong> Revalidated at intervals
            </li>
          </ul>
          <Link
            href="/rendering/isr"
            className="inline-block bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-black"
          >
            View ISR Example
          </Link>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            💻 CSR (Client-Side Rendering)
          </h3>
          <ul className="text-sm space-y-2 text-black mb-4">
            <li>
              • <strong>When:</strong> Highly interactive, user-specific
            </li>
            <li>
              • <strong>How:</strong> Rendered in the browser
            </li>
            <li>
              • <strong>Performance:</strong> Fast navigation after load
            </li>
            <li>
              • <strong>Caching:</strong> You control it
            </li>
          </ul>
          <Link
            href="/rendering/csr"
            className="inline-block bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-black"
          >
            View CSR Example
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-3 text-black">
          🧪 How to Test Each Method
        </h3>
        <ol className="text-sm space-y-2 text-black">
          <li>
            1. <strong>Watch your server console</strong> - See when API calls
            are made
          </li>
          <li>
            2. <strong>Check the timestamps</strong> - Notice when data updates
          </li>
          <li>
            3. <strong>Refresh pages multiple times</strong> - Observe caching
            behavior
          </li>
          <li>
            4. <strong>Build the app</strong> - See SSG vs runtime rendering
          </li>
          <li>
            5. <strong>Use browser dev tools</strong> - Check network requests
          </li>
        </ol>
      </div>

      <div className="bg-white border border-gray-300 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-black">
          📊 Comparison Table
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-black">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">Method</th>
                <th className="text-left p-2">When Rendered</th>
                <th className="text-left p-2">Data Freshness</th>
                <th className="text-left p-2">Performance</th>
                <th className="text-left p-2">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-medium">SSR</td>
                <td className="p-2">Every request</td>
                <td className="p-2">Always fresh</td>
                <td className="p-2">Slower</td>
                <td className="p-2">Real-time data</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-medium">SSG</td>
                <td className="p-2">Build time</td>
                <td className="p-2">Build-time data</td>
                <td className="p-2">Fastest</td>
                <td className="p-2">Static content</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-medium">ISR</td>
                <td className="p-2">Build + intervals</td>
                <td className="p-2">Periodic updates</td>
                <td className="p-2">Fast</td>
                <td className="p-2">Semi-dynamic content</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">CSR</td>
                <td className="p-2">In browser</td>
                <td className="p-2">On demand</td>
                <td className="p-2">Fast after load</td>
                <td className="p-2">Interactive apps</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
