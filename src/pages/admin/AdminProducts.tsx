import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from "../../api/product.api";

import {
  getCategories
} from "../../api/category.api";

import type {
  Product,
  Category
} from "../../types";

const AdminProducts = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const loadProducts = async () => {
    const response = await getProducts({
      page: 1,
      limit: 100
    });

    setProducts(
      response.data?.products ??
      response.data?.items ??
      (Array.isArray(response.data) ? response.data : [])
    );
  };

  useEffect(() => {
    loadProducts();
    getCategories()
      .then(setCategories);
  }, []);

  const handleCreate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId)
    });

    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategoryId("");

    await loadProducts();
  };

  const handleDelete = async (
    id: number
  ) => {
    if (!confirm("Delete this product?")) {
      return;
    }

    await deleteProduct(id);

    await loadProducts();
  };

  return (
    <div>

      <h1 className="text-4xl font-black">
        Products
      </h1>

      <form
        onSubmit={handleCreate}
        className="mt-8 rounded-3xl border bg-white p-7"
      >

        <h2 className="text-xl font-bold">
          Add Product
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">

          <input
            placeholder="Product name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            required
            className="rounded-xl border px-4 py-3"
          />

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            required
            className="rounded-xl border px-4 py-3"
          >
            <option value="">
              Select category
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

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="rounded-xl border px-4 py-3 md:col-span-2"
          />

        </div>

        <button className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white">
          Add Product
        </button>

      </form>

      <div className="mt-8 overflow-hidden rounded-3xl border bg-white">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">
                  Product
                </th>
                <th className="p-4 text-left">
                  Price
                </th>
                <th className="p-4 text-left">
                  Stock
                </th>
                <th className="p-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t"
                >

                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="p-4">
                    $
                    {Number(
                      product.price
                    ).toFixed(2)}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          product.id
                        )
                      }
                      className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminProducts;