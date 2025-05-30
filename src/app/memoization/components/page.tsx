// REQUEST MEMOIZATION ACROSS COMPONENTS
// This shows how memoization works even when different components make the same fetch request

async function fetchLogs() {
  console.log("🔍 fetchLogs() called");

  // For server-side rendering, we need absolute URLs
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/logs`, { cache: "no-store" });
  return res.json();
}

// Component 1
async function UserInfo() {
  const data = await fetchLogs();
  return (
    <div className="border border-gray-300 p-4 rounded bg-white">
      <h3 className="font-semibold text-black">UserInfo Component</h3>
      <p className="text-sm text-black">
        This component fetched: Request #{data.requestNumber}
      </p>
      <p className="text-xs text-black">{data.timestamp}</p>
    </div>
  );
}

// Component 2
async function Dashboard() {
  const data = await fetchLogs();
  return (
    <div className="border border-gray-300 p-4 rounded bg-white">
      <h3 className="font-semibold text-black">Dashboard Component</h3>
      <p className="text-sm text-black">
        This component fetched: Request #{data.requestNumber}
      </p>
      <p className="text-xs text-black">{data.timestamp}</p>
    </div>
  );
}

// Component 3
async function Sidebar() {
  const data = await fetchLogs();
  return (
    <div className="border border-gray-300 p-4 rounded bg-white">
      <h3 className="font-semibold text-black">Sidebar Component</h3>
      <p className="text-sm text-black">
        This component fetched: Request #{data.requestNumber}
      </p>
      <p className="text-xs text-black">{data.timestamp}</p>
    </div>
  );
}

export default async function ComponentMemoization() {
  return (
    <div className="p-8 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Request Memoization Across Components
      </h1>

      <div className="bg-white border border-gray-300 p-4 rounded mb-6">
        <p className="text-sm text-black">
          <strong>What's happening:</strong> Three different components each
          call fetchLogs(), but Next.js only makes 1 network request for all of
          them during this render. Check your server console - you should only
          see 1 API log entry!
        </p>
      </div>

      <div className="grid gap-4">
        <UserInfo />
        <Dashboard />
        <Sidebar />
      </div>

      <div className="mt-6 p-4 bg-white border border-gray-300 rounded">
        <p className="text-sm text-black">
          <strong>Key Point:</strong> Notice all components show the same
          request number and timestamp. This proves they all received the same
          memoized response, not separate network requests.
        </p>
      </div>
    </div>
  );
}
