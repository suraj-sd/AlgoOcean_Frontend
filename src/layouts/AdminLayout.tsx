import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag
} from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto flex max-w-7xl">

        <aside className="hidden min-h-screen w-64 border-r bg-white p-5 md:block">

          <h2 className="mb-8 text-2xl font-black">
            Admin<span className="text-indigo-600">Panel</span>
          </h2>

          <div className="space-y-2">

            <AdminLink
              to="/admin"
              icon={<LayoutDashboard size={18} />}
              text="Dashboard"
            />

            <AdminLink
              to="/admin/products"
              icon={<Package size={18} />}
              text="Products"
            />

            <AdminLink
              to="/admin/categories"
              icon={<Layers size={18} />}
              text="Categories"
            />

            <AdminLink
              to="/admin/orders"
              icon={<ShoppingBag size={18} />}
              text="Orders"
            />

          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

const AdminLink = ({
  to,
  icon,
  text
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
}) => (
  <NavLink
    to={to}
    end={to === "/admin"}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-4 py-3 font-medium ${
        isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`
    }
  >
    {icon}
    {text}
  </NavLink>
);

export default AdminLayout;