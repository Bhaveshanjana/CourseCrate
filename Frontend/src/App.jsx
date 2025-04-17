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

function App() {
  return (
    <>
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
      <ToastContainer />
    </>
  );
}

export default App;
