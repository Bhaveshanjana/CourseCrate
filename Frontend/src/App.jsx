import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Course from "./pages/User/Courses";
import BuyCourse from "./pages/User/BuyCourse";
import Purchased from "./pages/User/Purchased";
import { ToastContainer } from "react-toastify";
import UpdateUser from "./pages/User/UpdateUser";
import AuthUser from "./auth/UserProtectWrapper";
import AdminHome from "./pages/Admin/AdminHome";
import AdminLogin from "./pages/Admin/Login";
import AdminSignup from "./pages/Admin/Signup";
import UpdateAdmin from "./pages/Admin/UpdateAdmin";
import AllCourse from "./pages/Admin/AllCourse";
import CreateCourse from "./pages/Admin/CreateCourse";
import AuthAdmin from "./auth/AdminProtectWrapper";

function App() {
  return (
    <>
      {/* User routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/courses"
          element={
            <AuthUser>
              <Course />
            </AuthUser>
          }
        />
        <Route
          path="/buy/:courseId"
          element={
            <AuthUser>
              <BuyCourse />
            </AuthUser>
          }
        />
        <Route
          path="/Purchased"
          element={
            <AuthUser>
              <Purchased />
            </AuthUser>
          }
        />
        <Route
          path="/update-user"
          element={
            <AuthUser>
              <UpdateUser />
            </AuthUser>
          }
        />
      </Routes>

      {/* Admin routes */}
      <Routes>
        <Route
          path="/Admin-home"
          element={
            <AuthAdmin>
              <AdminHome />
            </AuthAdmin>
          }
        />
        <Route path="/Admin-Login" element={<AdminLogin />} />
        <Route path="/Admin-Signup" element={<AdminSignup />} />
        <Route
          path="/Update-Admin"
          element={
            <AuthAdmin>
              <UpdateAdmin />
            </AuthAdmin>
          }
        />
        <Route
          path="/Get-course"
          element={
            <AuthAdmin>
              <AllCourse />
            </AuthAdmin>
          }
        />
        <Route
          path="/Create-course"
          element={
            <AuthAdmin>
              <CreateCourse />
            </AuthAdmin>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
