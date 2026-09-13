import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserDashboard from "./pages/User/UserDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import MyTasks from "./pages/User/MyTasks";

function App() {
  const storedUser = localStorage.getItem("tasklyUser");

  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<DashboardLayout user={user} />}>
          <Route path="overview" element={<UserDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
