import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles
} from "lucide-react";

const Home = () => {
  return (
    <div>

      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Sparkles size={16} />
              Premium shopping experience
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Everything you need.
              <span className="text-indigo-400">
                {" "}All in one place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Discover quality products, great prices and
              a simple shopping experience built for you.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-bold hover:bg-indigo-500"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/register"
                className="rounded-2xl border border-white/30 px-6 py-3 font-bold hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-[2rem] bg-white/10 p-8 backdrop-blur">
              <div className="grid grid-cols-2 gap-5">
                {[
                  ["10+", "Categories"],
                  ["100+", "Products"],
                  ["24/7", "Shopping"],
                  ["100%", "Secure"]
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="rounded-3xl bg-white/10 p-8"
                  >
                    <div className="text-4xl font-black">
                      {number}
                    </div>

                    <div className="mt-2 text-slate-300">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">

        <Feature
          icon={<Truck />}
          title="Fast Delivery"
          text="Reliable order processing from checkout to delivery."
        />

        <Feature
          icon={<ShieldCheck />}
          title="Secure Shopping"
          text="JWT authentication and protected customer accounts."
        />

        <Feature
          icon={<Headphones />}
          title="Customer First"
          text="A clean and simple experience designed around customers."
        />

      </section>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="rounded-3xl border bg-white p-7 shadow-sm">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
      {icon}
    </div>

    <h3 className="text-xl font-bold">
      {title}
    </h3>

    <p className="mt-2 text-slate-500">
      {text}
    </p>
  </div>
);

export default Home;