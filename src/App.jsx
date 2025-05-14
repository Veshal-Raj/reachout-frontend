import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./utils/UserContext";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
            } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
            } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
            } />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
