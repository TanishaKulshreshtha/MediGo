import React from 'react'
import appointment from '../assets/appointment.png'
import { useNavigate } from 'react-router-dom'
const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className='flex bg-cyan-50 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
      {/* Left Side*/}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-900'>
            <p>Book Appointment</p>
            <p className='mt-4'>with 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-blue-700 text-sm sm:text-base text-white px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>Create Account</button>
      </div>

      {/*Right side */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative '>
        <img className='w-[500px] absolute bottom-0 right-0 max-w-md' src={appointment} alt="" />
      </div>
    </div>
  )
}

export default Banner
