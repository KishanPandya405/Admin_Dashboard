import React from 'react';
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from 'react-icons/bs';
import { MdAddToQueue } from "react-icons/md";
import { Link } from 'react-router-dom';

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  // Function to handle sidebar close on link click
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) { // Close sidebar only for small screens
      OpenSidebar();
    }
  };

  return (
    <aside id="sidebar" className={`sidebar ${openSidebarToggle ? 'sidebar-responsive' : ''}`}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" aria-label="Shop Icon" /> Shop
        </div>
        <span
          className="icon close_icon"
          onClick={OpenSidebar}
          role="button"
          aria-label="Close Sidebar"
        >
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <SidebarItem to="/" label="Dashboard" Icon={BsGrid1X2Fill} onClick={handleLinkClick} />
        <SidebarItem to="/add_bill" label="Add Bill" Icon={MdAddToQueue} onClick={handleLinkClick} />
        <SidebarItem to="/products" label="Products" Icon={BsFillArchiveFill} onClick={handleLinkClick} />
        <SidebarItem to="/categories" label="Categories" Icon={BsFillGrid3X3GapFill} onClick={handleLinkClick} />
        <SidebarItem to="/customers" label="Customers" Icon={BsPeopleFill} onClick={handleLinkClick} />
        <SidebarItem to="/inventory" label="Inventory" Icon={BsListCheck} onClick={handleLinkClick} />
        <SidebarItem to="/reports" label="Reports" Icon={BsMenuButtonWideFill} onClick={handleLinkClick} />
        <SidebarItem to="/settings" label="Settings" Icon={BsFillGearFill} onClick={handleLinkClick} />
      </ul>
    </aside>
  );
};

// Reusable Sidebar Item Component
const SidebarItem = ({ to, label, Icon, onClick }) => (
  <li className="sidebar-list-item">
    <Link to={to} className="sidebar-link" onClick={onClick}>
      <Icon className="icon" aria-label={label} />
      {label}
    </Link>
  </li>
);

export default Sidebar;
