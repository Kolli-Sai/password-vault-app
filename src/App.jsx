import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/home-page/inedx";
import SignUpPage from "./pages/sign-up-page";
import SignInPage from "./pages/sign-in-page";
import DashboardPage from "./pages/dashboard";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";
import { useAuth } from "./zustand/useAuth";
import DashboardDetailPage from "./pages/dashboard-detail";

const App = () => {
  console.log(`app called`);
  const { setUser, user } = useAuth((state) => state);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);
  return (
    <div className=" container">
      <Navbar />
      <Routes>
        {user ? (
          <Route path="/" element={<DashboardPage />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )}

        {user ? (
          <Route path="/signup" element={<DashboardPage />} />
        ) : (
          <Route path="/signup" element={<SignUpPage />} />
        )}

        {user ? (
          <Route path="/signin" element={<DashboardPage />} />
        ) : (
          <Route path="/signin" element={<SignInPage />} />
        )}

        {user ? (
          <Route path="/dashboard" element={<DashboardPage />} />
        ) : (
          <Route path="/dashboard" element={<SignInPage />} />
        )}
        {user ? (
          <Route path="/dashboard/:id" element={<DashboardDetailPage />} />
        ) : (
          <Route path="/dashboard/:id" element={<SignInPage />} />
        )}
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
