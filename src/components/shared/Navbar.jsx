import React from 'react';

import { NavLink } from 'react-router';
import logo from '../../assets/images/logo.png';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Home', icon: 'fa-solid fa-house' },
    { to: '/timeline', label: 'Timeline', icon: 'fa-regular fa-clock' },
    { to: '/stats', label: 'Stats', icon: 'fa-solid fa-chart-line' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">

          {/* Logo image */}
          <NavLink to="/">
            <img
              src={logo}
              alt=""
              className="h-5 w-auto object-contain"
            />
          </NavLink>

          
          <div className="flex items-center gap-2">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-2 bg-[#1e4d3b] text-white text-sm font-medium px-4 py-2 rounded-lg'
                    : 'flex items-center gap-2 text-gray-500 text-sm font-medium px-3 py-2 hover:text-gray-800 transition-colors duration-150'
                }
              >
                <i className={`${icon} text-xs`}></i>
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}