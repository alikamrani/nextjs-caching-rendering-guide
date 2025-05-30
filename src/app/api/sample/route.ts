export async function GET() {
  return Response.json({
    now: new Date().toISOString(),
    message: "This is a sample API route for caching demos.",
  });
}
