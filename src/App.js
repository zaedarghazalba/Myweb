import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Portfolio from "./Pages/Portofolio";
import Projects from "./Pages/Projects";
import Certifications from "./Pages/Certifications";
import Layout from "./Components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Pages/Dashboard/Login";
import DashboardRoutes from "./Pages/Dashboard/DashboardRoutes";
import { Toaster } from 'react-hot-toast';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: '12px',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                maxWidth: '500px',
              },
              success: {
                style: {
                  background: '#10b981',
                  color: '#ffffff',
                },
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                  color: '#ffffff',
                },
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#ef4444',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Layout><About /></Layout>} />
            <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/certifications" element={<Layout><Certifications /></Layout>} />
            <Route path="/dashboard/login" element={<Login />} />
            <Route path="/dashboard/*" element={<PrivateRoute><DashboardRoutes /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
