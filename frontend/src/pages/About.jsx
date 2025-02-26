import React from "react";
import aboutimg from "../assets/aboutimg.jpg";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          About <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Your trusted platform for seamless online medical consultations.
        </p>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={aboutimg}
          alt="About Us"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        />
        <div className="md:w-1/2">
          <p className="text-gray-700 leading-relaxed">
            <b className="text-lg text-gray-900">MediGO</b> is your trusted
            platform for seamless online medical consultations. We connect you
            with experienced doctors, therapists, and specialists, ensuring
            accessible and reliable healthcare from the comfort of your home.
            Whether you need urgent care, therapy, or expert medical advice,
            MediGO is here to support your well-being. Book an appointment today
            and take a step towards better health!
          </p>
        </div>
      </div>

      {/* Our Vision */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-semibold text-blue-600">Our Vision</h2>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
          To revolutionize healthcare accessibility by providing online
          consultations with trusted medical professionals anytime, anywhere.
          We aim to break barriers and ensure quality healthcare reaches
          everyone.
        </p>
      </div>

      {/* Our Mission */}
      <div className="text-center mt-10">
        <h2 className="text-3xl font-semibold text-blue-600">Our Mission</h2>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
          At MediGO, we are dedicated to providing secure, reliable, and
          convenient medical consultations. Our mission is to bridge the gap
          between doctors and patients, making healthcare more efficient and
          accessible for all.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Experienced Doctors",
            desc: "We connect you with top specialists and experts in various fields.",
          },
          {
            title: "24/7 Availability",
            desc: "Get medical assistance anytime, anywhere without delays.",
          },
          {
            title: "Affordable Care",
            desc: "Quality healthcare that is cost-effective and accessible.",
          },
          {
            title: "Secure Consultations",
            desc: "Your data and privacy are our top priorities.",
          },
          {
            title: "Easy Appointments",
            desc: "Book an appointment effortlessly with our user-friendly platform.",
          },
          {
            title: "Comprehensive Services",
            desc: "From general consultations to mental health therapy, we cover it all.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
