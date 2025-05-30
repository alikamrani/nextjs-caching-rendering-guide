import Link from "next/link";

export default function CachingHome() {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Data Caching in Next.js
      </h1>

      <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Understanding Next.js Caching Layers
        </h2>
        <p className="text-black mb-4">
          Next.js has multiple caching layers working together to optimize
          performance. Understanding how they work helps you build faster, more
          efficient applications.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 text-black">
              🗄️ Data Caching Layers:
            </h3>
            <ul className="text-sm space-y-1 text-black">
              <li>
                • <strong>Fetch Cache:</strong> Caches fetch() requests
              </li>
              <li>
                • <strong>Request Memoization:</strong> Deduplicates per render
              </li>
              <li>
                • <strong>Full Route Cache:</strong> Caches rendered routes
              </li>
              <li>
                • <strong>Router Cache:</strong> Client-side navigation cache
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-black">
              ⚙️ Cache Control Options:
            </h3>
            <ul className="text-sm space-y-1 text-black">
              <li>
                • <code>force-cache</code>: Always use cache
              </li>
              <li>
                • <code>no-store</code>: Never cache
              </li>
              <li>
                • <code>revalidate</code>: Time-based refresh
              </li>
              <li>
                • <code>tags</code>: On-demand invalidation
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/caching/fetch-cache"
          className="block p-6 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
        >
          <h3 className="text-lg font-semibold mb-3 text-black">
            🗄️ Fetch Cache
          </h3>
          <p className="text-sm text-black mb-4">
            Learn how Next.js caches fetch() requests with different strategies:
            force-cache, no-store, and time-based revalidation.
          </p>
          <span className="text-sm font-medium text-black">
            Explore Fetch Cache →
          </span>
        </Link>

        <Link
          href="/caching/cache-tags"
          className="block p-6 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
        >
          <h3 className="text-lg font-semibold mb-3 text-black">
            🏷️ Cache Tags
          </h3>
          <p className="text-sm text-black mb-4">
            Use tags to invalidate specific cached data on-demand. Perfect for
            content management and dynamic updates.
          </p>
          <span className="text-sm font-medium text-black">
            Explore Cache Tags →
          </span>
        </Link>

        <Link
          href="/caching/revalidation"
          className="block p-6 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
        >
          <h3 className="text-lg font-semibold mb-3 text-black">
            ⏰ Time-based Revalidation
          </h3>
          <p className="text-sm text-black mb-4">
            Automatically refresh cached data at specified intervals. Balance
            performance with data freshness.
          </p>
          <span className="text-sm font-medium text-black">
            Explore Revalidation →
          </span>
        </Link>

        <Link
          href="/caching/on-demand"
          className="block p-6 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
        >
          <h3 className="text-lg font-semibold mb-3 text-black">
            🔄 On-demand Invalidation
          </h3>
          <p className="text-sm text-black mb-4">
            Manually trigger cache invalidation with revalidateTag() and
            revalidatePath() for instant updates.
          </p>
          <span className="text-sm font-medium text-black">
            Explore On-demand →
          </span>
        </Link>
      </div>

      <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-3 text-black">
          📊 Cache Strategy Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-black">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">Strategy</th>
                <th className="text-left p-2">When to Use</th>
                <th className="text-left p-2">Performance</th>
                <th className="text-left p-2">Data Freshness</th>
                <th className="text-left p-2">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-medium">force-cache</td>
                <td className="p-2">Static data</td>
                <td className="p-2">Fastest</td>
                <td className="p-2">Build time</td>
                <td className="p-2">Documentation, marketing</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-medium">no-store</td>
                <td className="p-2">Real-time data</td>
                <td className="p-2">Slower</td>
                <td className="p-2">Always fresh</td>
                <td className="p-2">User dashboards, live data</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-medium">revalidate: N</td>
                <td className="p-2">Semi-dynamic</td>
                <td className="p-2">Fast</td>
                <td className="p-2">N seconds</td>
                <td className="p-2">News, product catalogs</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">tags + revalidate</td>
                <td className="p-2">Content management</td>
                <td className="p-2">Fast</td>
                <td className="p-2">On-demand</td>
                <td className="p-2">CMS, e-commerce</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-black">
          🧪 Testing Tips
        </h3>
        <ul className="text-sm space-y-2 text-black">
          <li>
            1. <strong>Watch server console</strong> - See when actual API calls
            happen
          </li>
          <li>
            2. <strong>Check timestamps</strong> - Observe when data was last
            fetched
          </li>
          <li>
            3. <strong>Use Network tab</strong> - Monitor client-side vs
            server-side requests
          </li>
          <li>
            4. <strong>Test different scenarios</strong> - Refresh, navigate,
            wait for revalidation
          </li>
          <li>
            5. <strong>Build and test</strong> - Some caching only works in
            production
          </li>
        </ul>
      </div>
    </div>
  );
}
