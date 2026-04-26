import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Spacecrafts from '../pages/Spacecrafts/Spacecrafts';
import Spacecraft from '../pages/Spacecraft/Spacecraft';
import Construction from '../pages/Construction/Construction';
import Planets from '../pages/Planets/Planets';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/spacecrafts" element={<Spacecrafts />} />
      <Route path="/spacecrafts/build" element={<Construction />} />
      <Route path="/spacecrafts/:id" element={<Spacecraft />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
