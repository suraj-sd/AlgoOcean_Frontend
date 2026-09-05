import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-black text-slate-900"
        >
          Shop<span className="text-indigo-600">Ocean</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-indigo-600"
          >
            Products
          </Link>

          {user && (
            <Link
              to="/orders"
              className="hover:text-indigo-600"
            >
              My Orders
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="flex items-center gap-1 font-semibold text-indigo-600"
            >
              <LayoutDashboard size={18} />
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">

          <Link
            to="/cart"
            className="relative"
          >
            <ShoppingCart size={22} />

            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                {items.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <User size={22} />
              </Link>

              <button
                onClick={logout}
                className="text-red-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;