// SSR (Server-Side Rendering) Example
// This page is rendered on the server for EVERY request
// Data is always fresh but performance is slower

async function fetchPosts() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  console.log("🚀 SSR: Fetching posts from server...");

  // cache: "no-store" ensures no caching, always fresh data
  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function SSRPage() {
  console.log("🚀 SSR: Page component rendering...");

  const data = await fetchPosts();
  const renderTime = new Date().toISOString();

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          🚀 Server-Side Rendering (SSR)
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            How SSR Works
          </h2>
          <ul className="space-y-2 text-black">
            <li>
              ✅ <strong>Rendered:</strong> On the server for every request
            </li>
            <li>
              ✅ <strong>Data:</strong> Always fresh and up-to-date
            </li>
            <li>
              ⚠️ <strong>Performance:</strong> Slower initial load (server
              processing)
            </li>
            <li>
              ✅ <strong>SEO:</strong> Excellent (fully rendered HTML)
            </li>
            <li>
              ⚠️ <strong>Scalability:</strong> Higher server load
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">Page Render Time</h3>
            <code className="text-sm text-black">{renderTime}</code>
            <p className="text-xs text-black mt-1">
              This changes on every page refresh because the page is rendered on
              each request.
            </p>
          </div>

          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">API Data Fetched</h3>
            <code className="text-sm text-black">{data.meta.lastFetched}</code>
            <p className="text-xs text-black mt-1">
              This also changes on every refresh because we fetch fresh data.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            API Response Data
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-black">
                Total API Views: {data.meta.totalViews}
              </h4>
              <p className="text-sm text-black">
                This number increases with every page visit!
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
              1. <strong>Refresh multiple times</strong> - Notice the timestamps
              change
            </li>
            <li>
              2. <strong>Check server console</strong> - See API calls on every
              refresh
            </li>
            <li>
              3. <strong>Watch the view counter</strong> - It increases each
              time
            </li>
            <li>
              4. <strong>Compare with other rendering methods</strong> - Notice
              the differences
            </li>
          </ol>

          <div className="mt-4 p-3 bg-white border border-gray-300 rounded">
            <p className="text-sm text-black">
              <strong>Perfect for:</strong> User dashboards, real-time data,
              personalized content, or any page where you need the latest data
              on every visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
