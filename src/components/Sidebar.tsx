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
      <section></section>
    </div>
  );
};

export default Sidebar;
