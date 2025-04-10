import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Portfolio from "./Pages/Portofolio";
import Certifications from "./Pages/Certifications";
import Layout from "./Components/Layout";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><About /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/certifications" element={<Layout><Certifications /></Layout>} />
        </Routes>
    </Router>
  );
}

export default App;
