let postViews = 0;

const posts = [
  {
    id: 1,
    title: "Understanding Next.js Rendering",
    content: "A deep dive into SSR, SSG, ISR, and CSR...",
  },
  {
    id: 2,
    title: "React Server Components",
    content: "How to use RSC effectively...",
  },
  {
    id: 3,
    title: "Performance Optimization",
    content: "Best practices for fast web apps...",
  },
];

export async function GET() {
  postViews++;
  const timestamp = new Date().toISOString();

  console.log(`📝 Posts API called - View #${postViews} at ${timestamp}`);

  return Response.json({
    posts,
    meta: {
      totalViews: postViews,
      lastFetched: timestamp,
      renderingInfo: "This data shows when the API was actually called",
    },
  });
}
