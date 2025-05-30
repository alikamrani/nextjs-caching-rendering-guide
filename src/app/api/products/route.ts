let productRequests = 0;

const products = [
  { id: 1, name: "Next.js Handbook", price: 29.99, category: "books" },
  { id: 2, name: "React Components Kit", price: 49.99, category: "tools" },
  { id: 3, name: "TypeScript Guide", price: 19.99, category: "books" },
  {
    id: 4,
    name: "Tailwind CSS Templates",
    price: 39.99,
    category: "templates",
  },
];

export async function GET(request: Request) {
  productRequests++;
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const delay = url.searchParams.get("delay");

  // Simulate API delay if requested
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, parseInt(delay)));
  }

  console.log(
    `🛍️ Products API called - Request #${productRequests} at ${new Date().toISOString()}`
  );

  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter((p) => p.category === category);
  }

  return Response.json({
    products: filteredProducts,
    meta: {
      totalRequests: productRequests,
      fetchedAt: new Date().toISOString(),
      category: category || "all",
      cacheInfo: "This response shows actual API call timing",
    },
  });
}
