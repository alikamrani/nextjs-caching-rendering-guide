// SSG (Static Site Generation) Example
// This page is rendered at BUILD TIME and cached until the next build
// Data is from build time but performance is fastest

async function fetchPosts() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  console.log("⚡ SSG: Fetching posts at build time...");

  // cache: "force-cache" is the default for SSG
  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function SSGPage() {
  console.log("⚡ SSG: Page component rendering at build time...");

  const data = await fetchPosts();
  const renderTime = new Date().toISOString();

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          ⚡ Static Site Generation (SSG)
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            How SSG Works
          </h2>
          <ul className="space-y-2 text-black">
            <li>
              ✅ <strong>Rendered:</strong> At build time, served as static HTML
            </li>
            <li>
              ⚠️ <strong>Data:</strong> From build time (not real-time)
            </li>
            <li>
              ✅ <strong>Performance:</strong> Fastest possible (served from
              CDN)
            </li>
            <li>
              ✅ <strong>SEO:</strong> Excellent (pre-rendered HTML)
            </li>
            <li>
              ✅ <strong>Scalability:</strong> Perfect (no server processing)
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">Page Render Time</h3>
            <code className="text-sm text-black">{renderTime}</code>
            <p className="text-xs text-black mt-1">
              This was set at build time and won't change until you rebuild the
              app.
            </p>
          </div>

          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">API Data Fetched</h3>
            <code className="text-sm text-black">{data.meta.lastFetched}</code>
            <p className="text-xs text-black mt-1">
              This data was fetched at build time and is now cached.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            API Response Data (Build Time)
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-black">
                Total API Views: {data.meta.totalViews}
              </h4>
              <p className="text-sm text-black">
                This number was set at build time and won't change until
                rebuild.
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
              DON'T change
            </li>
            <li>
              2. <strong>Check server console</strong> - No API calls during
              refresh
            </li>
            <li>
              3. <strong>Watch the view counter</strong> - It stays the same
            </li>
            <li>
              4. <strong>Run `npm run build`</strong> - Then timestamps will
              update
            </li>
          </ol>

          <div className="mt-4 p-3 bg-white border border-gray-300 rounded">
            <p className="text-sm text-black">
              <strong>Perfect for:</strong> Marketing pages, documentation,
              blogs, landing pages, or any content that doesn't change
              frequently.
            </p>
          </div>

          <div className="mt-4 p-3 bg-white border border-gray-300 rounded">
            <p className="text-sm text-black">
              <strong>Note:</strong> In development mode, SSG behaves more like
              SSR for easier debugging. Run `npm run build && npm run start` to
              see true SSG behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
