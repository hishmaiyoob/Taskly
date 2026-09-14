import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserDashboard from "./pages/User/UserDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import MyTasks from "./pages/User/MyTasks";
import { Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminOverview from "./pages/Admin/AdminOverview";
import AdminTasks from "./pages/Admin/AdminTasks";
import AdminUsers from "./pages/Admin/AdminUsers";

function App() {
  const storedUser = localStorage.getItem("tasklyUser");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("tasklyUser");
  }

  const isAdmin = user?.role === "admin";

  const isLoggedIn = Boolean(localStorage.getItem("tasklyToken"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* user */}
        <Route
          path="/app"
          element={
            isLoggedIn && !isAdmin ? (
              <DashboardLayout user={user} />
            ) : (
              <Navigate to={isAdmin ? "/admin/overview" : "/login"} replace />
            )
          }
        >
          <Route index element={<Navigate to="/app/overview" replace />} />
          <Route path="overview" element={<UserDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
        </Route>

        {/* admin */}
        <Route
          path="/admin"
          element={
            isLoggedIn && isAdmin ? (
              <AdminLayout user={user} />
            ) : (
              <Navigate to={isLoggedIn ? "/app/overview" : "/login "} replace />
            )
          }
        >
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
