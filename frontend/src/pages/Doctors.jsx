import React, { useContext, useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const Doctors = () => {
  const navigate=useNavigate();
  const { speciality } = useParams();
  const { doctors} = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4  text-gray-600'>
          <p onClick={()=>speciality ==='Psychiatrist' ? navigate('/doctors'):navigate('/doctors/Psychiatrist')} className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer"> Psychiatrist</p>
          <p onClick={()=>speciality ==='Family Counselling' ? navigate('/doctors'):navigate('/doctors/Family Counselling')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer'>Family Counselling</p>
          <p onClick={()=>speciality ==='Disorders' ? navigate('/doctors'):navigate('/doctors/Disorders')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer'>Disorders</p>
          <p onClick={()=>speciality ==='Career Counselling' ? navigate('/doctors'):navigate('/doctors/Career Counselling')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer'>Career Counselling</p>
          <p onClick={()=>speciality ==='Therapy' ? navigate('/doctors'):navigate('/doctors/Therapy')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer'>Therapy</p>
        </div>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 pt-5 gap-y-6 px-3 sm:px-0'>
          {
            filterDoc.map(
              (item, index) => (
                <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 px-6' key={index}>
                  <img className='bg-blue-50 w-48 ' src={item.image} alt="" />
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                      <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm '>{item.speciality}</p>
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
