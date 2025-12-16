import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../Components/Dashboard/DashboardLayout';
import Dashboard from './Dashboard';
import PortfolioManagement from './PortfolioManagement';
import CertificationManagement from './CertificationManagement';
import ProjectManagement from './ProjectManagement';

export default function DashboardRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<PortfolioManagement />} />
        <Route path="/certifications" element={<CertificationManagement />} />
        <Route path="/projects" element={<ProjectManagement />} />
      </Routes>
    </DashboardLayout>
  );
}
