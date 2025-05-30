// FETCH CACHE EXAMPLES
// Demonstrates different fetch caching strategies in Next.js

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Strategy 1: force-cache (default for SSG)
async function fetchCachedProducts() {
  console.log("🗄️ Fetching with force-cache...");
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "force-cache",
  });
  return res.json();
}

// Strategy 2: no-store (no caching)
async function fetchFreshProducts() {
  console.log("🚫 Fetching with no-store...");
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });
  return res.json();
}

// Strategy 3: revalidate (time-based)
async function fetchRevalidatedProducts() {
  console.log("⏰ Fetching with 15-second revalidation...");
  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 15 },
  });
  return res.json();
}

export default async function FetchCachePage() {
  const renderTime = new Date().toISOString();

  // Fetch with different cache strategies
  const cachedData = await fetchCachedProducts();
  const freshData = await fetchFreshProducts();
  const revalidatedData = await fetchRevalidatedProducts();

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          🗄️ Fetch Cache Strategies
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Understanding Fetch Cache
          </h2>
          <p className="text-black mb-4">
            Next.js automatically caches fetch() requests based on the cache
            options you provide. Different strategies offer different trade-offs
            between performance and data freshness.
          </p>
          <div className="text-sm text-black">
            <strong>Page rendered at:</strong> <code>{renderTime}</code>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Force Cache Example */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🗄️ force-cache
            </h3>
            <div className="space-y-3">
              <div className="text-sm">
                <strong className="text-black">Strategy:</strong>
                <code className="block bg-gray-100 p-2 mt-1 text-black">
                  {`{ cache: "force-cache" }`}
                </code>
              </div>

              <div>
                <strong className="text-black text-sm">Data fetched at:</strong>
                <div className="text-xs text-black">
                  {cachedData.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API calls:</strong>
                <div className="text-xs text-black">
                  #{cachedData.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-black text-sm">Products:</strong>
                {cachedData.products.slice(0, 2).map((product: any) => (
                  <div
                    key={product.id}
                    className="text-xs bg-gray-50 p-2 rounded text-black"
                  >
                    {product.name} - ${product.price}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-black">
              <strong>Behavior:</strong> Cached at build time, won't change
              until rebuild. Fastest performance but data may be stale.
            </div>
          </div>

          {/* No Store Example */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🚫 no-store
            </h3>
            <div className="space-y-3">
              <div className="text-sm">
                <strong className="text-black">Strategy:</strong>
                <code className="block bg-gray-100 p-2 mt-1 text-black">
                  {`{ cache: "no-store" }`}
                </code>
              </div>

              <div>
                <strong className="text-black text-sm">Data fetched at:</strong>
                <div className="text-xs text-black">
                  {freshData.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API calls:</strong>
                <div className="text-xs text-black">
                  #{freshData.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-black text-sm">Products:</strong>
                {freshData.products.slice(0, 2).map((product: any) => (
                  <div
                    key={product.id}
                    className="text-xs bg-gray-50 p-2 rounded text-black"
                  >
                    {product.name} - ${product.price}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-black">
              <strong>Behavior:</strong> Always fresh data, fetched on every
              request. Slower but guaranteed up-to-date information.
            </div>
          </div>

          {/* Revalidate Example */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              ⏰ revalidate: 15
            </h3>
            <div className="space-y-3">
              <div className="text-sm">
                <strong className="text-black">Strategy:</strong>
                <code className="block bg-gray-100 p-2 mt-1 text-black">
                  {`{ next: { revalidate: 15 } }`}
                </code>
              </div>

              <div>
                <strong className="text-black text-sm">Data fetched at:</strong>
                <div className="text-xs text-black">
                  {revalidatedData.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API calls:</strong>
                <div className="text-xs text-black">
                  #{revalidatedData.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-black text-sm">Products:</strong>
                {revalidatedData.products.slice(0, 2).map((product: any) => (
                  <div
                    key={product.id}
                    className="text-xs bg-gray-50 p-2 rounded text-black"
                  >
                    {product.name} - ${product.price}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-black">
              <strong>Behavior:</strong> Cached for 15 seconds, then revalidated
              in background. Fast performance with periodic freshness.
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🧪 Test These Examples
          </h3>
          <ol className="space-y-2 text-black">
            <li>
              1. <strong>First visit:</strong> All three may show different
              request numbers
            </li>
            <li>
              2. <strong>Refresh the page:</strong> Notice which timestamps
              change
            </li>
            <li>
              3. <strong>Wait 15+ seconds:</strong> Then refresh to see
              revalidation
            </li>
            <li>
              4. <strong>Check server console:</strong> See which strategies
              make API calls
            </li>
          </ol>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            📊 Cache Strategy Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-black">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-2">Strategy</th>
                  <th className="text-left p-2">Performance</th>
                  <th className="text-left p-2">Data Freshness</th>
                  <th className="text-left p-2">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-medium">force-cache</td>
                  <td className="p-2">🚀 Fastest</td>
                  <td className="p-2">⚠️ Build time only</td>
                  <td className="p-2">Static content, documentation</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-medium">no-store</td>
                  <td className="p-2">🐌 Slowest</td>
                  <td className="p-2">✅ Always fresh</td>
                  <td className="p-2">Real-time data, user-specific</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">revalidate</td>
                  <td className="p-2">⚡ Fast</td>
                  <td className="p-2">🔄 Periodic refresh</td>
                  <td className="p-2">Semi-dynamic content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
