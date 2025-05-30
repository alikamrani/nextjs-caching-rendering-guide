// TIME-BASED REVALIDATION EXAMPLE
// Demonstrates different revalidation intervals

// Fallback data for build time
const fallbackData = {
  products: [{ id: 1, name: "Sample Product", price: 29.99 }],
  meta: {
    fetchedAt: new Date().toISOString(),
    totalRequests: 1,
  },
};

// 10 second revalidation
async function fetchQuickUpdate() {
  console.log("⚡ Fetching with 10-second revalidation...");

  // During build time, return fallback data
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_URL) {
    console.log("🏗️ Build time: Using fallback data for quick update");
    return {
      ...fallbackData,
      products: [{ id: 1, name: "Quick Tool", price: 39.99 }],
    };
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products?category=tools`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.log("⚠️ Quick fetch failed, using fallback:", error);
    return {
      ...fallbackData,
      products: [{ id: 1, name: "Quick Tool", price: 39.99 }],
    };
  }
}

// 30 second revalidation
async function fetchMediumUpdate() {
  console.log("🔄 Fetching with 30-second revalidation...");

  // During build time, return fallback data
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_URL) {
    console.log("🏗️ Build time: Using fallback data for medium update");
    return {
      ...fallbackData,
      products: [{ id: 1, name: "Medium Book", price: 19.99 }],
    };
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products?category=books`, {
      next: { revalidate: 30 },
    });

    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.log("⚠️ Medium fetch failed, using fallback:", error);
    return {
      ...fallbackData,
      products: [{ id: 1, name: "Medium Book", price: 19.99 }],
    };
  }
}

// 60 second revalidation
async function fetchSlowUpdate() {
  console.log("🐌 Fetching with 60-second revalidation...");

  // During build time, return fallback data
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_URL) {
    console.log("🏗️ Build time: Using fallback data for slow update");
    return fallbackData;
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.log("⚠️ Slow fetch failed, using fallback:", error);
    return fallbackData;
  }
}

// No revalidation (static)
async function fetchStatic() {
  console.log("🗿 Fetching static data (no revalidation)...");

  // During build time, return fallback data
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_URL) {
    console.log("🏗️ Build time: Using fallback data for static");
    return {
      ...fallbackData,
      products: [{ id: 1, name: "Static Electronics", price: 99.99 }],
    };
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products?category=electronics`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.log("⚠️ Static fetch failed, using fallback:", error);
    return {
      ...fallbackData,
      products: [{ id: 1, name: "Static Electronics", price: 99.99 }],
    };
  }
}

export default async function RevalidationPage() {
  const renderTime = new Date().toISOString();

  // Fetch with different revalidation intervals
  const quickData = await fetchQuickUpdate();
  const mediumData = await fetchMediumUpdate();
  const slowData = await fetchSlowUpdate();
  const staticData = await fetchStatic();

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          ⏰ Time-based Revalidation
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Understanding Time-based Revalidation
          </h2>
          <p className="text-black mb-4">
            Time-based revalidation allows you to balance performance and data
            freshness. Data is cached and served quickly, but automatically
            refreshed in the background at specified intervals.
          </p>
          <div className="text-sm text-black">
            <strong>Page rendered at:</strong> <code>{renderTime}</code>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 text-black">
            How Revalidation Works
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-black">
                Stale-While-Revalidate Pattern:
              </h4>
              <ol className="text-sm space-y-1 text-black">
                <li>
                  1. <strong>First request:</strong> Fetch fresh data, cache it
                </li>
                <li>
                  2. <strong>Within interval:</strong> Serve cached data
                  instantly
                </li>
                <li>
                  3. <strong>After interval:</strong> Serve stale data,
                  revalidate in background
                </li>
                <li>
                  4. <strong>Next request:</strong> Serve fresh revalidated data
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black">Configuration:</h4>
              <code className="block bg-gray-100 p-3 text-sm text-black rounded">
                {`fetch('/api/data', {
  next: {
    revalidate: 30 // seconds
  }
})`}
              </code>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* 10 Second Revalidation */}
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              ⚡ 10s Revalidation
            </h3>
            <div className="space-y-2">
              <div className="text-xs">
                <strong className="text-black">Strategy:</strong>
                <code className="block bg-gray-100 p-1 mt-1 text-black">
                  revalidate: 10
                </code>
              </div>

              <div className="text-xs">
                <strong className="text-black">Fetched at:</strong>
                <div className="text-black">{quickData.meta.fetchedAt}</div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Request #:</strong>
                <div className="text-black">{quickData.meta.totalRequests}</div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Use case:</strong>
                <div className="text-black">
                  Live dashboards, real-time prices
                </div>
              </div>

              <div className="text-xs bg-gray-50 p-2 rounded text-black">
                <strong>Products:</strong> {quickData.products.length}
              </div>
            </div>
          </div>

          {/* 30 Second Revalidation */}
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🔄 30s Revalidation
            </h3>
            <div className="space-y-2">
              <div className="text-xs">
                <strong className="text-black">Strategy:</strong>
                <code className="block bg-gray-100 p-1 mt-1 text-black">
                  revalidate: 30
                </code>
              </div>

              <div className="text-xs">
                <strong className="text-black">Fetched at:</strong>
                <div className="text-black">{mediumData.meta.fetchedAt}</div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Request #:</strong>
                <div className="text-black">
                  {mediumData.meta.totalRequests}
                </div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Use case:</strong>
                <div className="text-black">News articles, product updates</div>
              </div>

              <div className="text-xs bg-gray-50 p-2 rounded text-black">
                <strong>Products:</strong> {mediumData.products.length}
              </div>
            </div>
          </div>

          {/* 60 Second Revalidation */}
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🐌 60s Revalidation
            </h3>
            <div className="space-y-2">
              <div className="text-xs">
                <strong className="text-black">Strategy:</strong>
                <code className="block bg-gray-100 p-1 mt-1 text-black">
                  revalidate: 60
                </code>
              </div>

              <div className="text-xs">
                <strong className="text-black">Fetched at:</strong>
                <div className="text-black">{slowData.meta.fetchedAt}</div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Request #:</strong>
                <div className="text-black">{slowData.meta.totalRequests}</div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Use case:</strong>
                <div className="text-black">Documentation, marketing pages</div>
              </div>

              <div className="text-xs bg-gray-50 p-2 rounded text-black">
                <strong>Products:</strong> {slowData.products.length}
              </div>
            </div>
          </div>

          {/* Static (No Revalidation) */}
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">🗿 Static</h3>
            <div className="space-y-2">
              <div className="text-xs">
                <strong className="text-black">Strategy:</strong>
                <code className="block bg-gray-100 p-1 mt-1 text-black">
                  force-cache
                </code>
              </div>

              <div className="text-xs">
                <strong className="text-black">Fetched at:</strong>
                <div className="text-black">{staticData.meta.fetchedAt}</div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Request #:</strong>
                <div className="text-black">
                  {staticData.meta.totalRequests}
                </div>
              </div>

              <div className="text-xs">
                <strong className="text-black">Use case:</strong>
                <div className="text-black">
                  Static content, terms of service
                </div>
              </div>

              <div className="text-xs bg-gray-50 p-2 rounded text-black">
                <strong>Products:</strong> {staticData.products.length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🧪 Testing Revalidation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-black">
                What to observe:
              </h4>
              <ol className="space-y-1 text-black text-sm">
                <li>
                  1. <strong>Initial load:</strong> All data fetched fresh
                </li>
                <li>
                  2. <strong>Immediate refresh:</strong> Same timestamps
                  (cached)
                </li>
                <li>
                  3. <strong>Wait 10+ seconds:</strong> Quick data may update
                </li>
                <li>
                  4. <strong>Wait 30+ seconds:</strong> Medium data may update
                </li>
                <li>
                  5. <strong>Wait 60+ seconds:</strong> Slow data may update
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black">
                Server console shows:
              </h4>
              <ul className="space-y-1 text-black text-sm">
                <li>• When actual API calls happen</li>
                <li>• Background revalidation in action</li>
                <li>• Different intervals in effect</li>
                <li>• Static data never refetches</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            📊 Revalidation Strategy Guide
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-black">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-2">Interval</th>
                  <th className="text-left p-2">Best For</th>
                  <th className="text-left p-2">Performance</th>
                  <th className="text-left p-2">Freshness</th>
                  <th className="text-left p-2">Server Load</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-medium">0-10s</td>
                  <td className="p-2">Real-time data, live scores</td>
                  <td className="p-2">🟡 Good</td>
                  <td className="p-2">🟢 Very fresh</td>
                  <td className="p-2">🔴 High</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-medium">30-60s</td>
                  <td className="p-2">News, product catalogs</td>
                  <td className="p-2">🟢 Great</td>
                  <td className="p-2">🟢 Fresh</td>
                  <td className="p-2">🟡 Medium</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-medium">5-60min</td>
                  <td className="p-2">Documentation, blogs</td>
                  <td className="p-2">🟢 Excellent</td>
                  <td className="p-2">🟡 Good</td>
                  <td className="p-2">🟢 Low</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Static</td>
                  <td className="p-2">Terms, about pages</td>
                  <td className="p-2">🟢 Fastest</td>
                  <td className="p-2">🔴 Build time</td>
                  <td className="p-2">🟢 Minimal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
