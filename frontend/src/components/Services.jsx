import React from 'react'
import { serviceData } from '../assets/sevices'
import { Link } from 'react-router-dom'

const Services = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="services">
      <h1 className='text-3xl font-medium'>Our Services</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply Browse through our extensive list of trusted doctors. Schedule your appointment hastle free</p>
      <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-scroll'>
        {serviceData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                <img className='w-26 sm:w-40 mb-2 rounded-[50%]' src={item.image} alt="" />
                <p>{item.speciality}</p>  
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Services
