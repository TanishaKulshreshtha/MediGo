import React from 'react';
import dropdown from '../assets/downarrow.png';
import group from '../assets/group.png';
import heropic from '../assets/heropic.png';

const Header = () => {
  return (
    <div className='relative flex flex-col md:flex-row flex-wrap px-6 md:px-10  overflow-hidden'>
      
      {/* Background Abstract Blobs */}
      <div className="absolute -top-20 left-[-10%] w-[250px] h-[250px] bg-blue-200 rounded-full opacity-70 blur-3xl md:w-[400px] md:h-[400px]"></div>
      <div className="absolute top-40 right-[-5%] w-[200px] h-[200px] bg-blue-400 rounded-full opacity-40 blur-3xl md:w-[350px] md:h-[350px]"></div>

      {/* Left side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] relative z-10'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900'>
          Your Safe Space<br /> 
          <span className="text-blue-600">You are not alone</span>
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-sm font-light text-gray-700'>
          <img src={group} className='w-28' alt="Trusted Users" />
          <p>Trusted by Millions of users</p>
        </div>
        <a href="#services" className='flex items-center gap-2 bg-blue-800 px-8 py-3 rounded-full text-white text-sm m-auto md:m-0 hover:scale-105 transition-transform duration-300 shadow-lg'>
          Book Appointment 
        </a>
      </div>

      {/* Right side */}
      <div className='md:w-1/2 relative z-10'>
        <img src={heropic} className='w-full md:absolute bottom-0 h-auto rounded-lg drop-shadow-lg' alt="Hero" />
      </div>
    </div>
  );
}

export default Header;
