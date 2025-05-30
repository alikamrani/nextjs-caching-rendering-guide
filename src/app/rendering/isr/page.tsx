// ISR (Incremental Static Regeneration) Example
// This page is generated at build time but revalidated every 30 seconds
// Best of both worlds: fast performance + fresh data

async function fetchPosts() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  console.log("🔄 ISR: Fetching posts (will revalidate every 30 seconds)...");

  // ISR: revalidate every 30 seconds
  const res = await fetch(`${baseUrl}/api/posts`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function ISRPage() {
  console.log("🔄 ISR: Page component rendering...");

  const data = await fetchPosts();
  const renderTime = new Date().toISOString();

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          🔄 Incremental Static Regeneration (ISR)
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            How ISR Works
          </h2>
          <ul className="space-y-2 text-black">
            <li>
              ✅ <strong>Rendered:</strong> At build time + background
              regeneration
            </li>
            <li>
              ✅ <strong>Data:</strong> Fresh data every 30 seconds
              (configurable)
            </li>
            <li>
              ✅ <strong>Performance:</strong> Fast (cached) + eventually fresh
            </li>
            <li>
              ✅ <strong>SEO:</strong> Excellent (pre-rendered HTML)
            </li>
            <li>
              ✅ <strong>Scalability:</strong> Great (minimal server load)
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-300 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2 text-black">
            ⏱️ Revalidation Schedule
          </h3>
          <p className="text-black">
            This page revalidates every <strong>30 seconds</strong>. The first
            visitor after 30 seconds gets the cached version, but triggers a
            background regeneration. The next visitor gets the fresh version.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">Page Render Time</h3>
            <code className="text-sm text-black">{renderTime}</code>
            <p className="text-xs text-black mt-1">
              This updates every 30 seconds when the page is revalidated in the
              background.
            </p>
          </div>

          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">API Data Fetched</h3>
            <code className="text-sm text-black">{data.meta.lastFetched}</code>
            <p className="text-xs text-black mt-1">
              This data gets refreshed every 30 seconds via background
              revalidation.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            API Response Data (ISR)
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-black">
                Total API Views: {data.meta.totalViews}
              </h4>
              <p className="text-sm text-black">
                This number updates every 30 seconds when the page revalidates.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-black mb-2">Blog Posts:</h4>
              <div className="space-y-2">
                {data.posts.map((post: any) => (
                  <div
                    key={post.id}
                    className="border border-gray-300 p-3 rounded"
                  >
                    <h5 className="font-medium text-black">{post.title}</h5>
                    <p className="text-sm text-black">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🧪 Test This Page
          </h3>
          <ol className="space-y-2 text-black">
            <li>
              1. <strong>Note the timestamp</strong> - Remember the current time
            </li>
            <li>
              2. <strong>Wait 30+ seconds</strong> - Then refresh the page
            </li>
            <li>
              3. <strong>Check if data changed</strong> - You might see updated
              timestamps
            </li>
            <li>
              4. <strong>Compare with SSG/SSR</strong> - Notice the hybrid
              behavior
            </li>
          </ol>

          <div className="mt-4 p-3 bg-white border border-gray-300 rounded">
            <p className="text-sm text-black">
              <strong>Perfect for:</strong> News sites, e-commerce product
              pages, blog posts, or any content that changes periodically but
              not constantly.
            </p>
          </div>

          <div className="mt-4 p-3 bg-white border border-gray-300 rounded">
            <p className="text-sm text-black">
              <strong>ISR Strategy:</strong> Serve fast cached content while
              quietly updating in the background. Users get performance +
              freshness without waiting for regeneration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
