// BASIC REQUEST MEMOIZATION EXAMPLE
// This demonstrates how Next.js automatically memoizes identical fetch requests within a single render

async function fetchData() {
  console.log("📡 fetchData() called");

  // For server-side rendering, we need absolute URLs
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/logs`, { cache: "no-store" });
  const data = await res.json();
  console.log("✅ fetchData() completed");
  return data;
}

export default async function BasicMemoization() {
  console.log("🔄 Component rendering started");

  // These 3 calls will only trigger 1 actual network request!
  const result1 = await fetchData();
  const result2 = await fetchData();
  const result3 = await fetchData();

  console.log("✨ Component rendering completed");

  return (
    <div className="p-8 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Basic Request Memoization
      </h1>

      <div className="bg-white border border-gray-300 p-4 rounded mb-4">
        <p className="text-sm text-black">
          <strong>What's happening:</strong> Even though we call fetchData() 3
          times, Next.js only makes 1 network request due to request
          memoization. Check your server console to see only 1 API log!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-black">First fetch result:</h3>
          <pre className="bg-white border border-gray-300 p-2 text-sm text-black">
            {JSON.stringify(result1, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold text-black">
            Second fetch result (memoized):
          </h3>
          <pre className="bg-white border border-gray-300 p-2 text-sm text-black">
            {JSON.stringify(result2, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold text-black">
            Third fetch result (memoized):
          </h3>
          <pre className="bg-white border border-gray-300 p-2 text-sm text-black">
            {JSON.stringify(result3, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-4 text-sm text-black">
        <p>
          Notice: All results are identical because they came from the same
          memoized request!
        </p>
      </div>
    </div>
  );
}
