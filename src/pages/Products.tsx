import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import {
  getProducts
} from "../api/product.api";

import {
  getCategories
} from "../api/category.api";

import type {
  Product,
  Category
} from "../types";

import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [search, setSearch] = useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts({
        page: 1,
        limit: 100,
        search: search || undefined,
        categoryId: categoryId
          ? Number(categoryId)
          : undefined
      });

      setProducts(
        response.data?.products ??
        response.data?.items ??
        (Array.isArray(response.data) ? response.data : [])
      );
    } catch {
      setProducts([]);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [search, categoryId]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      <div className="mb-10">
        <p className="font-semibold text-indigo-600">
          OUR STORE
        </p>

        <h1 className="mt-2 text-4xl font-black md:text-5xl">
          Explore Products
        </h1>

        <p className="mt-3 text-slate-500">
          Find products you'll love.
        </p>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-[1fr_250px]">

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            className="w-full rounded-2xl border bg-white py-4 pl-12 pr-4 outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value)
          }
          className="rounded-2xl border bg-white px-4 outline-none focus:border-indigo-500"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

      </div>

      {loading ? (
        <div className="py-20 text-center">
          Loading products...
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">
            Products unavailable
          </h2>
          <p className="mt-2 text-slate-500">
            {error}
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">
            No products found
          </h2>
          <p className="mt-2 text-slate-500">
            Try another search.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Products;