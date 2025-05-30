// MEMOIZATION WITH DIFFERENT FETCH OPTIONS
// This shows how changing fetch options creates separate requests (breaks memoization)

export default async function DifferentOptions() {
  console.log("🚀 Starting component with different fetch options");

  // For server-side rendering, we need absolute URLs
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  // These will be memoized together (same URL + options)
  const request1a = await fetch(`${baseUrl}/api/logs`, { cache: "no-store" });
  const request1b = await fetch(`${baseUrl}/api/logs`, { cache: "no-store" });
  const data1a = await request1a.json();
  const data1b = await request1b.json();

  // These will NOT be memoized with the above (different cache option)
  const request2a = await fetch(`${baseUrl}/api/logs`, {
    cache: "force-cache",
  });
  const request2b = await fetch(`${baseUrl}/api/logs`, {
    cache: "force-cache",
  });
  const data2a = await request2a.json();
  const data2b = await request2b.json();

  // This will NOT be memoized (different URL)
  const request3 = await fetch(`${baseUrl}/api/logs?param=different`, {
    cache: "no-store",
  });
  const data3 = await request3.json();

  console.log("✅ All requests completed");

  return (
    <div className="p-8 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Memoization with Different Options
      </h1>

      <div className="bg-white border border-gray-300 p-4 rounded mb-6">
        <p className="text-sm text-black">
          <strong>What's happening:</strong> Memoization only works when URL AND
          fetch options are identical. Check your server console - you should
          see 3 separate API requests this time!
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-l-4 border-black pl-4">
          <h3 className="font-semibold text-black">
            Group 1: cache: "no-store" (MEMOIZED)
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm font-medium text-black">Request 1A:</p>
              <pre className="bg-white border border-gray-300 p-2 text-xs text-black">
                {JSON.stringify(data1a, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium text-black">
                Request 1B (should be identical):
              </p>
              <pre className="bg-white border border-gray-300 p-2 text-xs text-black">
                {JSON.stringify(data1b, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="font-semibold text-black">
            Group 2: cache: "force-cache" (MEMOIZED)
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm font-medium text-black">Request 2A:</p>
              <pre className="bg-white border border-gray-300 p-2 text-xs text-black">
                {JSON.stringify(data2a, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium text-black">
                Request 2B (should be identical):
              </p>
              <pre className="bg-white border border-gray-300 p-2 text-xs text-black">
                {JSON.stringify(data2b, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="font-semibold text-black">
            Group 3: Different URL (NOT MEMOIZED)
          </h3>
          <div className="mt-2">
            <p className="text-sm font-medium text-black">
              Request 3 (different URL):
            </p>
            <pre className="bg-white border border-gray-300 p-2 text-xs text-black">
              {JSON.stringify(data3, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white border border-gray-300 rounded">
        <h4 className="font-semibold mb-2 text-black">Key Insights:</h4>
        <ul className="text-sm space-y-1 text-black">
          <li>• Requests 1A and 1B have the same request number (memoized)</li>
          <li>• Requests 2A and 2B have the same request number (memoized)</li>
          <li>• Request 3 has a different request number (not memoized)</li>
          <li>• Total network requests: 3 (not 5!)</li>
        </ul>
      </div>
    </div>
  );
}
