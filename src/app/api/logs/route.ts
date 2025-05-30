let requestCount = 0;

export async function GET() {
  requestCount++;
  const timestamp = new Date().toISOString();

  console.log(`🚀 API Request #${requestCount} at ${timestamp}`);

  return Response.json({
    requestNumber: requestCount,
    timestamp,
    message: "This shows when actual network requests are made",
  });
}
