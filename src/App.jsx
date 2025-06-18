import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const interval = setInterval(()=> {
      axios.get("https://reachout-backend.onrender.com/ping")
        .then(() => {
          console.log("Pinged backend to keep it awake.");
        })
        .catch(err => {
          console.error("Error pinging backend:", err);
        });
    }, 420000)
  
    return () => clearInterval(interval)
  }, [])
  
  return (
    <Provider store={store}>
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
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Router>
    </Provider>
  );
};

export default App;
