import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'


const MyAppointments = () => {

  const {backendUrl,token, getDoctorsData}=useContext(AppContext)

  const [appointments,setAppointments]=useState([])

  const navigate=useNavigate()

  const getUserAppointments=async()=>{
    try {

      const {data}=await axios.get(backendUrl +'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const cancelAppointment=async(appointmentId)=>{
    try {
  
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const initPay=(order)=>{
    const options={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id:order.id,
      receipt: order.receipt,
      handler: async(response)=>{
        console.log(response)
        try {
          
          const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}});
          if(data.success){
            getUserAppointments()
            navigate('/my-appointments')
          }

        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open();
  }

  const appointmentRazorpay=async(appointmentId)=>{
      try {

        const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})

        if(data.success){
          initPay(data.order);
        }
        
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
      getDoctorsData();
    }
  },[token])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((item) => (
            <div key={item._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <img src={item.docData.image} alt="Doctor" className="w-16 h-16 rounded-full object-cover mr-4" />

              <div className="flex-1">
                <p className="text-lg font-bold text-gray-800">{item.docData.speciality}</p>
                <p className="text-gray-600">{item.docData.address.line1}, {item.docData.address.line2}</p>
                <p className="text-gray-600">Date: {item.slotDate} | Time: {item.slotTime}</p>
              </div>
              {
                !item.cancelled &&  item.payment &&
                <button
                onClick={() => cancelAppointment(item._id)}
                className="px-4 py-2 rounded-lg transition duration-300"
              >
                Paid
              </button>
              }
              {
                !item.cancelled && 
                <button
                onClick={() => cancelAppointment(item._id)}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
              }
              {
                !item.cancelled && !item.payment &&
                <button
                onClick={() => appointmentRazorpay(item._id)}
                className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Pay Online
              </button>
              }
              {
                item.cancelled && 
                <button
                className="w px-4 py-2 rounded-lg transition duration-300"
              >
                Cancelled
                <br /> Successfully
              </button>
              }
              
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
