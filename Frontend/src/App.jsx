import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Course from "./pages/Courses";
import BuyCourse from "./pages/BuyCourse";
import Purchased from "./pages/Purchased";
import { ToastContainer } from "react-toastify";
import UpdateUser from "./pages/UpdateUser";
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
        <Route path="/buy/:courseId" element={<BuyCourse />} />
        <Route path="/Purchased" element={<Purchased />} />
        <Route path="/update-user" element={<UpdateUser />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
