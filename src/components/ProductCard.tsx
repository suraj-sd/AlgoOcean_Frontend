import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "../types";
import { useCart } from "../context/CartContext";

const ProductCard = ({
  product
}: {
  product: Product;
}) => {
  const { addToCart } = useCart();

  return (
    <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <div className="flex h-52 items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100">
        <div className="text-6xl font-black text-indigo-200">
          {product.name.charAt(0)}
        </div>
      </div>

      <div className="p-5">

        {product.category && (
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {product.category.name}
          </p>
        )}

        <Link
          to={`/products/${product.id}`}
          className="mt-2 block text-lg font-bold hover:text-indigo-600"
        >
          {product.name}
        </Link>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-black">
            ${Number(product.price).toFixed(2)}
          </span>

          <button
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white disabled:bg-slate-300"
          >
            <ShoppingCart size={18} />
            {product.stock > 0 ? "Add" : "Out"}
          </button>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-3 flex items-center gap-1 text-sm font-semibold text-indigo-600"
        >
          View details
          <ArrowRight size={15} />
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;