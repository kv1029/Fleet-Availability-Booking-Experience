import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './dashBoard/Home';
import Auth from './dashBoard/Auth';
import RetailerDashboard from './dashBoard/RetailerDashboard';
import CustomerDashboard from './dashBoard/CustomerDashboard';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('carRentalUser');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route
          path="/retailer-dashboard"
          element={
            user?.role === 'retailer' ? (
              <RetailerDashboard user={user} />
            ) : (
              <Navigate to="/auth?role=retailer" />
            )
          }
        />
        <Route
          path="/customer-dashboard"
          element={
            user?.role === 'customer' ? (
              <CustomerDashboard user={user} />
            ) : (
              <Navigate to="/auth?role=customer" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}