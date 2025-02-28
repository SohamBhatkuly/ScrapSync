import { Routes, Route, Navigate } from 'react-router-dom';
import BuyerHome from './BuyerHome';

export default function BuyerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BuyerHome />} />
            {/* <Route path="/BuyerDetail" element={ <BuyerDetail />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
