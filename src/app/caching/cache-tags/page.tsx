// CACHE TAGS EXAMPLE
// Demonstrates how to use cache tags for targeted invalidation

// Fallback data for build time
const fallbackData = {
  products: [{ id: 1, name: "Sample Product", price: 29.99 }],
  meta: {
    fetchedAt: new Date().toISOString(),
    totalRequests: 1,
  },
};

// Fetch products with cache tags
async function fetchProductsByCategory(category: string) {
  console.log(`🏷️ Fetching ${category} products with cache tags...`);

  // During build time, return fallback data
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_URL) {
    console.log(`🏗️ Build time: Using fallback data for ${category} products`);
    return {
      ...fallbackData,
      products:
        category === "books"
          ? [{ id: 1, name: "Sample Book", price: 19.99 }]
          : category === "tools"
          ? [{ id: 2, name: "Sample Tool", price: 39.99 }]
          : fallbackData.products,
    };
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
      next: {
        tags: [`products-${category}`, "products-all"],
        revalidate: 3600, // 1 hour, but can be invalidated by tags
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.log(`⚠️ Fetch failed, using fallback data:`, error);
    return {
      ...fallbackData,
      products:
        category === "books"
          ? [{ id: 1, name: "Sample Book", price: 19.99 }]
          : category === "tools"
          ? [{ id: 2, name: "Sample Tool", price: 39.99 }]
          : fallbackData.products,
    };
  }
}

// Fetch all products with cache tags
async function fetchAllProducts() {
  console.log("🏷️ Fetching all products with cache tags...");

  // During build time, return fallback data
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_URL) {
    console.log(`🏗️ Build time: Using fallback data for all products`);
    return fallbackData;
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      next: {
        tags: ["products-all"],
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.log(`⚠️ Fetch failed, using fallback data:`, error);
    return fallbackData;
  }
}

export default async function CacheTagsPage() {
  const renderTime = new Date().toISOString();

  // Fetch different categories with different cache tags
  const booksData = await fetchProductsByCategory("books");
  const toolsData = await fetchProductsByCategory("tools");
  const allProductsData = await fetchAllProducts();

  return (
    <div className="p-8 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">
          🏷️ Cache Tags Example
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Understanding Cache Tags
          </h2>
          <p className="text-black mb-4">
            Cache tags allow you to invalidate specific cached data on-demand
            without waiting for time-based revalidation. This is perfect for
            content management systems where you want instant updates when
            content changes.
          </p>
          <div className="text-sm text-black">
            <strong>Page rendered at:</strong> <code>{renderTime}</code>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 text-black">
            How Cache Tags Work
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-black">Cache Strategy:</h4>
              <code className="block bg-gray-100 p-3 text-sm text-black rounded">
                {`fetch('/api/products?category=books', {
  next: {
    tags: ['products-books', 'products-all'],
    revalidate: 3600 // 1 hour fallback
  }
})`}
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black">Invalidation:</h4>
              <code className="block bg-gray-100 p-3 text-sm text-black rounded">
                {`// In API route or Server Action
import { revalidateTag } from 'next/cache';

revalidateTag('products-books');
// Only invalidates books cache`}
              </code>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Books Products */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              📚 Books (Tagged: products-books)
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
                  {booksData.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API call #:</strong>
                <div className="text-xs text-black">
                  {booksData.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-black text-sm">Book Products:</strong>
                {booksData.products.map((product: any) => (
                  <div
                    key={product.id}
                    className="text-xs bg-gray-50 p-2 rounded text-black"
                  >
                    {product.name} - ${product.price}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools Products */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🔧 Tools (Tagged: products-tools)
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
                  {toolsData.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API call #:</strong>
                <div className="text-xs text-black">
                  {toolsData.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-black text-sm">Tool Products:</strong>
                {toolsData.products.map((product: any) => (
                  <div
                    key={product.id}
                    className="text-xs bg-gray-50 p-2 rounded text-black"
                  >
                    {product.name} - ${product.price}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All Products */}
          <div className="bg-white border border-gray-300 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-black">
              🛍️ All Products (Tagged: products-all)
            </h3>
            <div className="space-y-3">
              <div>
                <strong className="text-black text-sm">Cache Tags:</strong>
                <div className="text-xs text-black">['products-all']</div>
              </div>

              <div>
                <strong className="text-black text-sm">Data fetched at:</strong>
                <div className="text-xs text-black">
                  {allProductsData.meta.fetchedAt}
                </div>
              </div>

              <div>
                <strong className="text-black text-sm">API call #:</strong>
                <div className="text-xs text-black">
                  {allProductsData.meta.totalRequests}
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-black text-sm">Total Products:</strong>
                <div className="text-xs text-black">
                  {allProductsData.products.length} items
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-black">
            🧪 How to Test Cache Tags
          </h3>
          <ol className="space-y-2 text-black">
            <li>
              1. <strong>First visit:</strong> Notice all data is fetched fresh
            </li>
            <li>
              2. <strong>Refresh the page:</strong> Data should be cached (same
              timestamps)
            </li>
            <li>
              3. <strong>Use revalidateTag():</strong> In a Server Action or API
              route to invalidate specific tags
            </li>
            <li>
              4. <strong>Selective invalidation:</strong> Only tagged data
              updates, rest stays cached
            </li>
          </ol>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-black">
            💡 Cache Tags Use Cases
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-black">Perfect For:</h4>
              <ul className="text-sm space-y-1 text-black">
                <li>
                  • <strong>CMS:</strong> Invalidate when content is updated
                </li>
                <li>
                  • <strong>E-commerce:</strong> Update product data instantly
                </li>
                <li>
                  • <strong>User profiles:</strong> Refresh user-specific data
                </li>
                <li>
                  • <strong>Categories:</strong> Update specific product
                  categories
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black">Implementation:</h4>
              <ul className="text-sm space-y-1 text-black">
                <li>
                  • <strong>Tag naming:</strong> Use descriptive, hierarchical
                  names
                </li>
                <li>
                  • <strong>Granularity:</strong> Balance between specific and
                  broad tags
                </li>
                <li>
                  • <strong>Fallback:</strong> Always include time-based
                  revalidation
                </li>
                <li>
                  • <strong>Testing:</strong> Use Server Actions to trigger
                  invalidation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
