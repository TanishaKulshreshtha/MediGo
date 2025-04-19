import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="bg-blue-400 text-white w-64 min-h-screen p-4">
      {
        aToken && (
          <ul className="space-y-6">
            {/* <li>
              <NavLink 
                to={'/admin-dashboard'} 
                className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                <img src={assets.home_icon} alt="" className="w-6 h-6" />
                <p className="text-lg">Dashboard</p>
              </NavLink>
            </li> */}

            {/* <li>
              <NavLink 
                to={'/all-appointments'} 
                className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                <p className="text-lg">Appointments</p>
              </NavLink>
            </li> */}

            <li>
              <NavLink 
                to={'/add-doctor'} 
                className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                <img src={assets.add_icon} alt="" className="w-6 h-6" />
                <p className="text-lg">Add Doctor</p>
              </NavLink>
            </li>

            <li>
              <NavLink 
                to={'/doctors-list'} 
                className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                <img src={assets.people_icon} alt="" className="w-6 h-6" />
                <p className="text-lg">Doctors</p>
              </NavLink>
            </li>
          </ul>
        )
      }
    </div>
  );
}

export default Sidebar;
