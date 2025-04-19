import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('Psychiatrist');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const onSubmitHandler = async(event)=>{
    event.preventDefault()
    try{
      if(!docImg){
        return toast.error('Image not selected')
      }

      const formData = new FormData() 
      formData.append('image', docImg) 
      formData.append('name', name) 
      formData.append('email', email) 
      formData.append('password', password) 
      formData.append('experience', experience) 
      formData.append('fees', Number(fees)) 
      formData.append('about', about) 
      formData.append('speciality', speciality) 
      formData.append('degree', degree) 
      formData.append('address', JSON.stringify({line1: address1, line2: address2})) 


      formData.forEach((value, key)=>{ 
      console.log(`${key}: ${value}`);
 })

      const {data}=await axios.post(backendUrl + '/api/admin/addDoctor',formData, {headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false) 
        setName('') 
        setPassword('') 
        setEmail('') 
        setAddress1('') 
        setAddress2('') 
        setDegree('') 
        setAbout('') 
        setFees('')
      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)
      console.log(error)
    }
  }

  const {backendUrl,aToken}=useContext(AdminContext)

  return (
    <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-lg w-full mx-auto space-y-6 max-w-4xl">

      <p className="text-sm text-center mb-6 text-gray-800">Add Doctor</p>
      
      {/* Doctor Image Upload Section */}
      <div className="flex flex-col items-center">
        <label htmlFor="doc-img" className="cursor-pointer">
          <div 
            className={`w-32 h-32 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden ${docImg ? '' : 'bg-gray-100'}`}
          >
            {docImg ? (
              <img 
                src={URL.createObjectURL(docImg)} 
                alt="Doctor" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-gray-500">Upload image</span>
            )}
          </div>
        </label>
        <input 
          onChange={(e) => setDocImg(e.target.files[0])} 
          type="file" 
          id="doc-img" 
          hidden 
        />
        
      </div>

      {/* Doctor Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium">Doctor Name</label>
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type="text" 
            placeholder="Enter Doctor's Name" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Doctor Email</label>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            type="email" 
            placeholder="Enter Doctor's Email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Doctor Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            type="password" 
            placeholder="Enter Doctor's Password" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Experience</label>
          <select 
            onChange={(e) => setExperience(e.target.value)} 
            value={experience} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="4 Years">4 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Consultation Fees</label>
          <input 
            type="number" 
            value={fees} 
            onChange={(e) => setFees(e.target.value)} 
            placeholder="Enter Fees" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required 
          />
        </div>
      </div>

      {/* Speciality and Education Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium">Speciality</label>
          <select 
            onChange={(e) => setSpeciality(e.target.value)} 
            value={speciality} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Family Counselling">Family Counselling</option>
            <option value="Disorders">Disorders</option>
            <option value="Career Counselling">Career Counselling</option>
            <option value="Therapy">Therapy</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Education</label>
          <input 
            type="text" 
            value={degree} 
            onChange={(e) => setDegree(e.target.value)} 
            placeholder="Enter Degree" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required 
          />
        </div>
      </div>

      {/* Address Section */}
      <div>
        <label className="block text-gray-700 text-sm font-medium">Address</label>
        <input 
          type="text" 
          value={address1} 
          onChange={(e) => setAddress1(e.target.value)} 
          placeholder="Line 1" 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required 
        />
        <input 
          type="text" 
          value={address2} 
          onChange={(e) => setAddress2(e.target.value)} 
          placeholder="Line 2" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required 
        />
      </div>

      {/* About Section */}
      <div>
        <label className="block text-gray-700 text-sm font-medium">About Doctor</label>
        <textarea 
          value={about} 
          onChange={(e) => setAbout(e.target.value)} 
          placeholder="Write about the doctor" 
          rows={5} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required 
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm font-medium"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
