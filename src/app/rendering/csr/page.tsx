"use client";
import { useEffect, useState } from "react";

// CSR (Client-Side Rendering) Example
// This page is rendered in the browser after the initial HTML is loaded
// Data is fetched on the client side for maximum interactivity

interface PostData {
  posts: Array<{
    id: number;
    title: string;
    content: string;
  }>;
  meta: {
    totalViews: number;
    lastFetched: string;
    renderingInfo: string;
  };
}

export default function CSRPage() {
  const [data, setData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchCount, setRefetchCount] = useState(0);
  const [renderTime] = useState(new Date().toISOString());

  console.log("💻 CSR: Component rendering in browser...");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log("💻 CSR: Fetching posts from browser...");

      const res = await fetch("/api/posts");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await res.json();
      setData(result);
      setRefetchCount((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading && !data) {
    return (
      <div className="p-8 bg-white text-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black">
            💻 Client-Side Rendering (CSR)
          </h1>
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <p className="text-black">Loading data in the browser...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-white text-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black">
            💻 Client-Side Rendering (CSR)
          </h1>
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <p className="text-black">Error: {error}</p>
            <button
              onClick={fetchPosts}
              className="mt-4 bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 text-black"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          💻 Client-Side Rendering (CSR)
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            How CSR Works
          </h2>
          <ul className="space-y-2 text-black">
            <li>
              ✅ <strong>Rendered:</strong> In the browser after initial HTML
              load
            </li>
            <li>
              ✅ <strong>Data:</strong> Fetched on-demand, always fresh
            </li>
            <li>
              ⚠️ <strong>Performance:</strong> Slower initial load, fast after
            </li>
            <li>
              ⚠️ <strong>SEO:</strong> Limited (JavaScript required)
            </li>
            <li>
              ✅ <strong>Interactivity:</strong> Maximum (full React features)
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-300 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2 text-black">
            🎛️ Interactive Controls
          </h3>
          <div className="flex gap-4">
            <button
              onClick={fetchPosts}
              disabled={loading}
              className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 disabled:opacity-50 text-black"
            >
              {loading ? "Fetching..." : "Refresh Data"}
            </button>
            <span className="text-sm text-black self-center">
              Fetched {refetchCount} time(s)
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">Page Render Time</h3>
            <code className="text-sm text-black">{renderTime}</code>
            <p className="text-xs text-black mt-1">
              This was set when the component first mounted in the browser.
            </p>
          </div>

          <div className="bg-white border border-gray-300 p-4 rounded">
            <h3 className="font-semibold mb-2 text-black">API Data Fetched</h3>
            <code className="text-sm text-black">{data?.meta.lastFetched}</code>
            <p className="text-xs text-black mt-1">
              This updates every time you click "Refresh Data".
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            API Response Data (Client-Side)
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-black">
                Total API Views: {data?.meta.totalViews}
              </h4>
              <p className="text-sm text-black">
                This increases each time you refresh the data (client-side
                fetch).
              </p>
            </div>

            <div>
              <h4 className="font-medium text-black mb-2">Blog Posts:</h4>
              <div className="space-y-2">
                {data?.posts.map((post) => (
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
              1. <strong>Click "Refresh Data"</strong> - See new timestamps and
              view counts
            </li>
            <li>
              2. <strong>Check browser network tab</strong> - See client-side
              requests
            </li>
            <li>
              3. <strong>Disable JavaScript</strong> - Page won't work properly
            </li>
            <li>
              4. <strong>Compare loading states</strong> - Notice the
              browser-side loading
            </li>
          </ol>

          <div className="mt-4 p-3 bg-white border border-gray-300 rounded">
            <p className="text-sm text-black">
              <strong>Perfect for:</strong> Interactive dashboards,
              user-specific content, real-time data, or any page that needs
              frequent updates and interactivity.
            </p>
          </div>

          <div className="mt-4 p-3 bg-white border border-gray-300 rounded">
            <p className="text-sm text-black">
              <strong>CSR Pattern:</strong> Render shell HTML first, then fetch
              and display data. Great for SPAs but requires JavaScript for full
              functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
