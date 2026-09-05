import { Link } from "react-router-dom";
import {
  Package,
  Layers,
  ShoppingBag
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div>

      <div className="mb-10">
        <p className="font-semibold text-indigo-600">
          ADMIN PANEL
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Dashboard
        </h1>

        <p className="mt-3 text-slate-500">
          Manage your e-commerce platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <AdminCard
          icon={<Package />}
          title="Products"
          description="Create, update and delete products."
          link="/admin/products"
        />

        <AdminCard
          icon={<Layers />}
          title="Categories"
          description="Manage product categories."
          link="/admin/categories"
        />

        <AdminCard
          icon={<ShoppingBag />}
          title="Orders"
          description="View and update customer orders."
          link="/admin/orders"
        />

      </div>
    </div>
  );
};

const AdminCard = ({
  icon,
  title,
  description,
  link
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) => (
  <Link
    to={link}
    className="group rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
      {icon}
    </div>

    <h2 className="text-xl font-bold">
      {title}
    </h2>

    <p className="mt-2 text-slate-500">
      {description}
    </p>
  </Link>
);

export default AdminDashboard;