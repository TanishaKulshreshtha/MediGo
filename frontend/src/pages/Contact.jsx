import React from "react";
import contact from "../assets/contact.jpg";

const Contact = () => {
  return (
    <div className="relative flex items-center justify-center px-6 md:px-16 lg:px-24 py-12">
      {/* Background Image */}
      <div className="w-full max-w-4xl relative">
        <img
          src={contact}
          alt="Contact Us"
          className="w-full rounded-xl shadow-lg object-cover h-96"
        />

        {/* Contact Cards Positioned on Top */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-6/12 md:w-2/4 bg-white bg-opacity-60 backdrop-blur-lg m-8 p-6 rounded-xl shadow-xl">
            {[
              {
                title: "Call Us",
                info: "+91 98765 43210",
                icon: "📞",
              },
              {
                title: "Email Us",
                info: "support@medigo.com",
                icon: "📩",
              },
              {
                title: "Visit Us",
                info: "123 Health Street, New Delhi, India",
                icon: "📍",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all bg-white bg-opacity-90"
              >
                <div className="text-2xl bg-blue-100 p-3 rounded-full">{item.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mt-3">{item.title}</h3>
                <p className="text-gray-600 mt-1 text-center text-[10px]">{item.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
