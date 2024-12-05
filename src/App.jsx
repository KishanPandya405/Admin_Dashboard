import { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";  // No BrowserRouter here
import Login from './pages/Login';
import Header from './comonents/Header';
import Sidebar from './comonents/Sidebar';
import Home from './comonents/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import AddBill from './pages/AddBill';
import Billing from './pages/Billing';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication status to true
  };

  const [openSidebarToggle, setOpenSIdebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSIdebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      {isAuthenticated ? (
        <>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/add_bill' element={<AddBill />} />
            <Route path='/billing' element={<Billing />} />
            <Route path='/products' element={<Products />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/reports' element={<Reports />} />
          </Routes>
        </>
      ) : (
        <Routes>
          {/* Always redirect to login if not authenticated */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login"  element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
