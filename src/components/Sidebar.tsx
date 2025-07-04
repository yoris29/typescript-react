import { useEffect, useState } from "react";

interface Product {
  category: string;
}
interface FetchResponse {
  products: Product[];
}
const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data: FetchResponse = await res.json();
      const uniqueCategories = Array.from(
        new Set(
          data.products.map((product) => {
            return product.category;
          })
        )
      );
      setCategories(uniqueCategories);
      console.log(uniqueCategories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
      <section>
        <input
          type="text"
          placeholder="Search Product"
          className="border-2 rounded px-2 sm:mb-0"
        />
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="min"
            className="border-2 py-3 mr-2 px-5 mb-3 w-full"
          />
          <input
            type="text"
            placeholder="max"
            className="border-2 py-3 mr-2 px-5 mb-3 w-full"
          />
        </div>
        <section>
          {/* Categories */}
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
          </div>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16px] h-[16px]"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>
        <section>
          {/* Keywords section */}
          <div className="mb-5 mt-4">
            <h2 className="text-xl font-semibold mb-3">Keywords</h2>
            <div>
              {keywords.map((keyword, index) => (
                <button
                  key={index}
                  className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
                >
                  {keyword.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">
            Reset Filters
          </button>
        </section>
      </section>
    </div>
  );
};

export default Sidebar;
