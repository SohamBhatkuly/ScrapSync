import { Routes, Route, Navigate } from 'react-router-dom';
import DealerHome from './DealerHome';

export default function DealerRoutes() {
  return (
    <Routes>
      <Route path="/DealerHome" element={<DealerHome />} />
      <Route path="*" element={<Navigate to="/DealerHome" />} />
    </Routes>
  );
}
