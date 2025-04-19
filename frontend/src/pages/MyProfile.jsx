import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import upload from '../assets/image.png'
import { toast } from "react-toastify";
import axios from 'axios'

const MyProfile = () => {
  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage]=useState(false);

  const updateUserProfileData = async(req,res)=>{

    try{

      const formData = new FormData() 
      formData.append('name', userData.name) 
      formData.append('phone', userData.phone) 
      formData.append('address', JSON.stringify (userData.address)) 
      formData.append('gender', userData.gender) 
      formData.append('dob', userData.dob) 
      image && formData.append('image', image) 
      const {data} = await axios.put(backendUrl +'/api/user/update-profile',formData,{headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }

  }

  return userData && (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Profile Picture */}
       
        <div className="flex flex-col items-center">
        {
          isEdit?
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-20" src={image? URL.createObjectURL(image):userData.image} alt="" />
              <img className="w-10 absolute bottom-12 right-12" src={image? "":upload} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
          </label>
        :
        <img src={userData.image} alt="Profile" className="w-28 h-28 rounded-full border-4 border-gray-300" />
      }
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-2 text-xl font-semibold text-gray-800 text-center border-b-2 border-gray-400 focus:outline-none"
            />
          ) : (
            <p className="mt-2 text-xl font-semibold text-gray-800">{userData.name}</p>
          )}
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
          <div className="mt-2 text-gray-600">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                className="border-b-2 border-gray-400 focus:outline-none"
              />
            ) : (
              userData.phone
            )}
            </p>
            <p><strong>Address:</strong></p>
            {isEdit ? (
              <div className="mt-1">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="w-full border-b-2 border-gray-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="w-full border-b-2 border-gray-400 mt-2 focus:outline-none"
                />
              </div>
            ) : (
              <p className="mt-1">{userData.address.line1}, {userData.address.line2}</p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Basic Information</h2>
          <div className="mt-2 text-gray-600">
            <p><strong>Gender:</strong> {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                className="border-b-2 border-gray-400 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              userData.gender
            )}
            </p>
            <p><strong>Birthday:</strong> {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                className="border-b-2 border-gray-400 focus:outline-none"
              />
            ) : (
              userData.dob
            )}
            </p>
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6 flex justify-center">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
