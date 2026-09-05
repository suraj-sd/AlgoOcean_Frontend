import { useEffect, useState } from "react";

import {
  createCategory,
  deleteCategory,
  getCategories
} from "../../api/category.api";

import type { Category } from "../../types";

const AdminCategories = () => {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] =
    useState("");

  const loadCategories = async () => {
    setCategories(
      await getCategories()
    );
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    await createCategory(name);

    setName("");

    await loadCategories();
  };

  const handleDelete = async (
    id: number
  ) => {
    if (!confirm("Delete category?")) {
      return;
    }

    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
        "Unable to delete category"
      );
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-black">
        Categories
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex gap-3 rounded-3xl border bg-white p-6"
      >

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Category name"
          className="flex-1 rounded-xl border px-4 py-3"
        />

        <button className="rounded-xl bg-indigo-600 px-6 font-bold text-white">
          Add
        </button>

      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-2xl border bg-white p-5"
          >

            <span className="font-bold">
              {category.name}
            </span>

            <button
              onClick={() =>
                handleDelete(category.id)
              }
              className="text-sm font-bold text-red-500"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminCategories;