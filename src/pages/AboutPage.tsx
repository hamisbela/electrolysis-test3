import React from 'react';
import { Zap, CheckCircle, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">About ElectrolysisHairRemovalNearMe.com</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <p className="text-lg mb-4">
          ElectrolysisHairRemovalNearMe.com is the leading online directory for finding professional electrolysis hair removal services throughout the United States. Our mission is to connect individuals seeking permanent hair removal solutions with qualified, experienced electrologists in their local area.
        </p>
        <p className="mb-4">
          Founded in 2023, our platform has grown to include thousands of verified electrolysis providers across all 50 states. We are committed to providing accurate, up-to-date information to help you make informed decisions about your hair removal journey.
        </p>
        <p>
          Whether you're looking for facial hair removal, body treatments, or specialized services, our comprehensive directory makes it easy to find the right provider for your needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-teal-50 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <Zap size={40} className="text-teal-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Our Mission</h2>
          <p>
            To simplify the process of finding qualified electrolysis providers and educate the public about permanent hair removal options.
          </p>
        </div>
        
        <div className="bg-teal-50 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={40} className="text-teal-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Our Values</h2>
          <p>
            Accuracy, accessibility, and inclusivity guide everything we do as we connect people with the hair removal services they need.
          </p>
        </div>
        
        <div className="bg-teal-50 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <Award size={40} className="text-teal-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Our Standards</h2>
          <p>
            We verify all listings to ensure they meet professional standards and maintain current licensing and certification.
          </p>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Choose Electrolysis?</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="mb-4">
            Electrolysis is the only method of permanent hair removal approved by the FDA. Unlike laser hair removal, which reduces hair growth, electrolysis actually destroys the hair follicle to prevent future growth entirely.
          </p>
          <p className="mb-4">
            This method is effective for all hair colors and skin types, making it a versatile option for anyone seeking permanent results. Electrolysis can be used on any body area, including the face, underarms, bikini line, legs, and more.
          </p>
          <p>
            While the process requires multiple sessions over time, the results are permanent, making it a cost-effective long-term solution for unwanted hair.
          </p>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="mb-6">
            ElectrolysisHairRemovalNearMe.com is operated by a dedicated team of professionals with backgrounds in healthcare, technology, and customer service. We work closely with electrologists and industry experts to ensure our platform provides the most valuable resources for our users.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-teal-600 mb-2">Founder & CEO</p>
              <p className="text-sm">
                A former licensed electrologist with over 15 years of experience in the industry, Jane founded ElectrolysisHairRemovalNearMe.com to help more people discover the benefits of permanent hair removal.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold">Mark Johnson</h3>
              <p className="text-teal-600 mb-2">Chief Technology Officer</p>
              <p className="text-sm">
                With a background in web development and digital marketing, Mark oversees the technical aspects of our platform to ensure a seamless user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;