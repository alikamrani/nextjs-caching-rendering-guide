// ON-DEMAND INVALIDATION EXAMPLE
// Demonstrates manual cache invalidation using Server Actions

import { revalidateTag, revalidatePath } from "next/cache";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Server Actions for cache invalidation
async function invalidateProductsTag() {
  "use server";
  console.log("🔄 Invalidating products-all tag...");
  revalidateTag("products-all");
}

async function invalidateBooksTag() {
  "use server";
  console.log("📚 Invalidating products-books tag...");
  revalidateTag("products-books");
}

async function invalidateToolsTag() {
  "use server";
  console.log("🔧 Invalidating products-tools tag...");
  revalidateTag("products-tools");
}

async function invalidateEntirePage() {
  "use server";
  console.log("🌐 Invalidating entire page cache...");
  revalidatePath("/caching/on-demand");
}

// Fetch functions with cache tags
async function fetchProductsWithTags(category?: string) {
  const url = category
    ? `${baseUrl}/api/products?category=${category}`
    : `${baseUrl}/api/products`;

  const tags = category
    ? [`products-${category}`, "products-all"]
    : ["products-all"];

  console.log(
    `🏷️ Fetching ${category || "all"} products with tags: ${tags.join(", ")}`
  );

  const res = await fetch(url, {
    next: {
      tags,
      revalidate: 3600, // Long cache, but can be invalidated on-demand
    },
  });

  return res.json();
}

export default async function OnDemandPage() {
  const renderTime = new Date().toISOString();

  // Fetch data with different cache tags
  const allProducts = await fetchProductsWithTags();
  const booksProducts = await fetchProductsWithTags("books");
  const toolsProducts = await fetchProductsWithTags("tools");

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          🎯 On-Demand Cache Invalidation
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Understanding On-Demand Invalidation
          </h2>
          <p className="text-black mb-4">
            On-demand invalidation allows you to manually clear specific cached
            data when you know it has changed. This is perfect for content
            management systems, admin panels, or any scenario where you need
            instant updates.
          </p>
          <div className="text-sm text-black">
            <strong>Page rendered at:</strong> <code>{renderTime}</code>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 text-black">
            Cache Invalidation Controls
          </h3>
          <p className="text-black mb-4">
            Click these buttons to invalidate specific cache tags or the entire
            page. Watch the timestamps and request numbers change after
            invalidation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <form action={invalidateBooksTag}>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                📚 Invalidate Books
              </button>
            </form>

            <form action={invalidateToolsTag}>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
              >
                🔧 Invalidate Tools
              </button>
            </form>

            <form action={invalidateProductsTag}>
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
              >
                🛍️ Invalidate All Products
              </button>
            </form>

            <form action={invalidateEntirePage}>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                🌐 Invalidate Page
              </button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* All Products */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🛍️ All Products
            </h3>
            <div className="space-y-3">
              <div>
                <strong className="text-black text-sm">Cache Tags:</strong>
                <div className="text-xs text-black">['products-all']</div>
              </div>

              <div>
                <strong className="text-black text-sm">Data fetched at:</strong>
                <div className="text-xs text-black">
                  {allProducts.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API call #:</strong>
                <div className="text-xs text-black">
                  {allProducts.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-black text-sm">Total Products:</strong>
                <div className="text-xs bg-gray-50 p-2 rounded text-black">
                  {allProducts.products.length} items
                </div>
              </div>

              <div className="text-xs text-black">
                <strong>Invalidated by:</strong> "Invalidate All Products" or
                "Invalidate Page"
              </div>
            </div>
          </div>

          {/* Books Products */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              📚 Books Only
            </h3>
            <div className="space-y-3">
              <div>
                <strong className="text-black text-sm">Cache Tags:</strong>
                <div className="text-xs text-black">
                  ['products-books', 'products-all']
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">Data fetched at:</strong>
                <div className="text-xs text-black">
                  {booksProducts.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API call #:</strong>
                <div className="text-xs text-black">
                  {booksProducts.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-black text-sm">Book Products:</strong>
                {booksProducts.products.map((product: any) => (
                  <div
                    key={product.id}
                    className="text-xs bg-gray-50 p-1 rounded text-black"
                  >
                    {product.name} - ${product.price}
                  </div>
                ))}
              </div>

              <div className="text-xs text-black">
                <strong>Invalidated by:</strong> "Invalidate Books", "Invalidate
                All Products", or "Invalidate Page"
              </div>
            </div>
          </div>

          {/* Tools Products */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🔧 Tools Only
            </h3>
            <div className="space-y-3">
              <div>
                <strong className="text-black text-sm">Cache Tags:</strong>
                <div className="text-xs text-black">
                  ['products-tools', 'products-all']
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">Data fetched at:</strong>
                <div className="text-xs text-black">
                  {toolsProducts.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API call #:</strong>
                <div className="text-xs text-black">
                  {toolsProducts.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-black text-sm">Tool Products:</strong>
                {toolsProducts.products.map((product: any) => (
                  <div
                    key={product.id}
                    className="text-xs bg-gray-50 p-1 rounded text-black"
                  >
                    {product.name} - ${product.price}
                  </div>
                ))}
              </div>

              <div className="text-xs text-black">
                <strong>Invalidated by:</strong> "Invalidate Tools", "Invalidate
                All Products", or "Invalidate Page"
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🧪 How to Test On-Demand Invalidation
          </h3>
          <ol className="space-y-2 text-black">
            <li>
              1. <strong>Initial load:</strong> Notice all data is fetched fresh
              (check timestamps)
            </li>
            <li>
              2. <strong>Refresh page:</strong> Data should be cached (same
              timestamps)
            </li>
            <li>
              3. <strong>Click "Invalidate Books":</strong> Only books data
              should refresh
            </li>
            <li>
              4. <strong>Click "Invalidate All Products":</strong> All product
              data refreshes
            </li>
            <li>
              5. <strong>Click "Invalidate Page":</strong> Everything refreshes
              (full page revalidation)
            </li>
          </ol>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            💡 Implementation Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-black">Server Actions:</h4>
              <code className="block bg-gray-100 p-3 text-sm text-black rounded">
                {`async function invalidateBooksTag() {
  'use server';
  revalidateTag('products-books');
}

async function invalidateEntirePage() {
  'use server';
  revalidatePath('/caching/on-demand');
}`}
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black">Cache Strategy:</h4>
              <code className="block bg-gray-100 p-3 text-sm text-black rounded">
                {`fetch('/api/products?category=books', {
  next: {
    tags: ['products-books', 'products-all'],
    revalidate: 3600 // Long cache
  }
})`}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🎯 Use Cases for On-Demand Invalidation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-black">Perfect For:</h4>
              <ul className="text-sm space-y-1 text-black">
                <li>
                  • <strong>CMS Updates:</strong> Invalidate when content is
                  published
                </li>
                <li>
                  • <strong>Product Management:</strong> Update product data
                  instantly
                </li>
                <li>
                  • <strong>User Actions:</strong> Clear cache after user
                  updates
                </li>
                <li>
                  • <strong>Admin Panels:</strong> Manual cache control for
                  admins
                </li>
                <li>
                  • <strong>Webhooks:</strong> Invalidate when external data
                  changes
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black">Best Practices:</h4>
              <ul className="text-sm space-y-1 text-black">
                <li>
                  • <strong>Granular tags:</strong> Use specific tags for
                  targeted invalidation
                </li>
                <li>
                  • <strong>Hierarchical tags:</strong> Include both specific
                  and general tags
                </li>
                <li>
                  • <strong>Error handling:</strong> Handle invalidation
                  failures gracefully
                </li>
                <li>
                  • <strong>Logging:</strong> Log invalidation events for
                  debugging
                </li>
                <li>
                  • <strong>Rate limiting:</strong> Prevent abuse of
                  invalidation endpoints
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
