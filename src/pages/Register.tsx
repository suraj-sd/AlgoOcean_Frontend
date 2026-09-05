import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await register(
        name,
        email,
        password
      );

      navigate("/");
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-6 py-12">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-black">
          Create account
        </h1>

        <p className="mt-2 text-slate-500">
          Start shopping today
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-7 space-y-5">

          <input
            placeholder="Full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            minLength={8}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-indigo-600"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Register;