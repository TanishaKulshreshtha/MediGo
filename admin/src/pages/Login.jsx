import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {setAToken,backendUrl}=useContext(AdminContext)
  
  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try{
      
      if(state==='Admin'){
        const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('aToken',data.token)
          setAToken(data.token)
          toast.success("Login successful!");
        }else{
          toast.error(data.message)
        }
      }else{
        
      }

    }catch(error){

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <p className="text-xl font-semibold text-center mb-6">
          <span className="text-blue-500">{state}</span> Login
        </p>
        <div className="mb-4">
          <p className="text-gray-700">Email</p>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <p className="text-gray-700">Password</p>
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
        <p className="mt-4 text-center">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState('Doctor')}
              >
                click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState('Admin')}
              >
                click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
