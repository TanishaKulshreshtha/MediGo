import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'


const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.image}
              alt=""
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} className="w-4 h-4" />
                <p className="text-gray-700">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


  )
}


export default DoctorsList
