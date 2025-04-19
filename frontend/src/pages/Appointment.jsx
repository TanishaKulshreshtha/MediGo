import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";


const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, token } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate=useNavigate();

  const bookApointment=async()=>{
    if(!token){
      toast.warn('Login to book appointment');
      return navigate('/login')
    }
    try {
      const date=docSlots[slotIndex][0].datetime

      let day=date.getDate()
      let month=date.getMonth()+1;
      let year=date.getFullYear();

      const slotDate=day+"/"+month+"/"+year

      const{data}= await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')

      }else{
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const fetchDocInfo = async () => {
      const doctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(doctor);
    };
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const getAvailableSlots = () => {
    setDocSlots([]);
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      let day=currentDate.getDate()
      let month=currentDate.getMonth()+1;
      let year=currentDate.getFullYear();

      const slotDate=day+"/"+month+"/"+year
      const slotTime=formattedTime

      const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

      if(isSlotAvailable){
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
      }

        
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }
    setDocSlots(slots);
  };

  if (!docInfo) return <p className="text-center text-gray-500">Loading doctor details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Doctor Info Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Doctor Image */}
        <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg border-4 border-blue-500">
          <img src={docInfo?.image} alt={docInfo?.name} className="w-full h-full object-cover" />
        </div>

        {/* Doctor Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">{docInfo?.name}</h2>
          <p className="text-gray-600">{docInfo?.degree} | {docInfo?.speciality}</p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-500">Experience:</span>
            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md shadow-md">
              {docInfo?.experience} 
            </button>
          </div>

          {/* About Doctor */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
            <p className="text-lg font-medium text-gray-700">About</p>
            <p className="text-gray-600 mt-1">{docInfo?.about}</p>
          </div>

          {/* Appointment Fee */}
          <p className="mt-4 text-lg font-semibold">
            Appointment Fee: 
            <span className="text-blue-600 ml-2">
              {currencySymbol}{docInfo?.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Select a Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 mt-3">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md ${
                  slotIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                <p className="text-sm">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-lg font-bold">{item[0] && item[0].datetime.getDate()}</p>
              </button>
            ))}
        </div>

        {/* Available Time Slots */}
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Available Time Slots</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-md ${
                  item.time === slotTime
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {item.time}
              </button>
            ))}
        </div>

        {/* Book Appointment Button */}
        <button onClick= {bookApointment} className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-200">
          Book an Appointment
        </button>
      </div>
      {/* Related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
