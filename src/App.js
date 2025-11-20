import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Portfolio from "./Pages/Portofolio";
import Projects from "./Pages/Projects";
import Certifications from "./Pages/Certifications";
import Layout from "./Components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><About /></Layout>} />
          <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/certifications" element={<Layout><Certifications /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
