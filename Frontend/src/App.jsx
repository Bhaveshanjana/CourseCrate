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
import UpdateCourse from "./pages/Admin/UpdateCourse";
import CreateCourse from "./pages/Admin/CreateCourse";
import AuthAdmin from "./auth/AdminProtectWrapper";
import Courses from "./pages/Admin/Courses";

function App() {
  return (
    <>
      {/* User routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/courses" element={<Course />} />
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
          path="/Create-course"
          element={
            <AuthAdmin>
              <CreateCourse />
            </AuthAdmin>
          }
        />
        <Route
          path="/Update-course/:courseId"
          element={
            <AuthAdmin>
              <UpdateCourse />
            </AuthAdmin>
          }
        />
        <Route
          path="/Course"
          element={
            <AuthAdmin>
              <Courses />
            </AuthAdmin>
          }
        />
      </Routes>
      <ToastContainer 
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="custom-toast"
      />
    </>
  );
}

export default App;
