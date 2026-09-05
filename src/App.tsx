import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>
        <CartProvider>

          <Navbar />

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route element={<ProtectedRoute />}>

              <Route
                path="/orders"
                element={<MyOrders />}
              />

            </Route>

            <Route element={<AdminRoute />}>

              <Route
                path="/admin"
                element={<AdminLayout />}
              >
                <Route
                  index
                  element={<AdminDashboard />}
                />

                <Route
                  path="products"
                  element={<AdminProducts />}
                />

                <Route
                  path="categories"
                  element={<AdminCategories />}
                />

                <Route
                  path="orders"
                  element={<AdminOrders />}
                />

              </Route>

            </Route>

          </Routes>

        </CartProvider>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;