import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* --- left Section */}
        <div>
            <img className="w-10 mb-5" src={logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>"MediGO is your trusted platform for seamless online medical consultations. We connect you with experienced doctors, therapists, and specialists, ensuring accessible and reliable healthcare from the comfort of your home. Whether you need urgent care, therapy, or expert medical advice, MediGO is here to support your well-being. Book an appointment today and take a step towards better health!"</p>
        </div>
                {/* --- middle Section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            
                {/* --- Right Section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-xxxxxxxxx</li>
                    <li>tanishakul78@gmail.com</li>
                </ul>
            </div>
        </div> 
        {/* --- copyright Section */}
        <div>
            <hr></hr>
            <p className='py-5 text-sm text-center'>Copyright 2025@MediGO -All Rights Reserved</p>
        </div>
    </div >
  )
}

export default Footer
