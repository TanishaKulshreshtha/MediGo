import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import { AdminContext } from '../context/AdminContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)

  const logout = () => {
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-4 text-xs'>

        <img className='w-32 sm:w-48' src={logo} alt="Logo" />


        <p className='px-3 py-1 rounded-full border-2 border-gray-500 text-gray-600 font-semibold'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>



      </div>
      <button
        onClick={logout}
        className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto'>
        Logout
      </button>
    </div>

  )
}

export default Navbar
