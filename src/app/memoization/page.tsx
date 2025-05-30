import Link from "next/link";

export default function MemoizationHome() {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Request Memoization in Next.js
      </h1>

      <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          What is Request Memoization?
        </h2>
        <p className="text-black mb-4">
          Request memoization is Next.js automatically caching identical{" "}
          <code className="bg-gray-100 px-1 rounded text-black">fetch()</code>{" "}
          calls
          <strong> within a single server-side render</strong>. If you make the
          same fetch request multiple times during one render, Next.js only
          executes it once and reuses the result.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-black">✅ When it works:</h3>
            <ul className="text-sm space-y-1 text-black">
              <li>• Same URL and fetch options</li>
              <li>• Within the same render</li>
              <li>• Server-side rendering only</li>
              <li>• Automatic (no configuration)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-black">❌ When it doesn't:</h3>
            <ul className="text-sm space-y-1 text-black">
              <li>• Different URLs or options</li>
              <li>• Across different requests/users</li>
              <li>• Client-side rendering</li>
              <li>• Different components in different renders</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-2 text-black">
          🔍 How to Observe Memoization:
        </h3>
        <ol className="text-sm space-y-1 text-black">
          <li>1. Open your terminal/console where Next.js is running</li>
          <li>2. Visit the examples below</li>
          <li>
            3. Watch the server console logs to see when actual API requests are
            made
          </li>
          <li>
            4. Compare the number of log entries vs. the number of fetch calls
            in the code
          </li>
        </ol>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-black">
        Interactive Examples
      </h2>

      <div className="grid gap-4">
        <Link
          href="/memoization/basic"
          className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
        >
          <h3 className="font-semibold text-black">1. Basic Memoization</h3>
          <p className="text-sm text-black">
            Multiple fetch calls in a single component
          </p>
        </Link>

        <Link
          href="/memoization/components"
          className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
        >
          <h3 className="font-semibold text-black">
            2. Cross-Component Memoization
          </h3>
          <p className="text-sm text-black">
            Same fetch across different components
          </p>
        </Link>

        <Link
          href="/memoization/different-options"
          className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
        >
          <h3 className="font-semibold text-black">3. Breaking Memoization</h3>
          <p className="text-sm text-black">
            How different options create separate requests
          </p>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Key Takeaways:</h3>
        <ul className="text-sm space-y-1">
          <li>
            • Request memoization prevents duplicate network requests during a
            single render
          </li>
          <li>• It's automatic and requires no configuration</li>
          <li>• Only works when URL and fetch options are identical</li>
          <li>• Helps improve performance and reduce server load</li>
          <li>• Only applies to server-side rendering, not client-side</li>
        </ul>
      </div>
    </div>
  );
}
