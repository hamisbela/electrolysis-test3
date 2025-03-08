import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Electrolysis Blog</h1>
      <p className="text-lg mb-8">
        Stay up-to-date with the latest information about electrolysis hair removal, industry news, and helpful tips.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">
              <a href="#" className="hover:text-teal-600 transition-colors">The Complete Guide to Permanent Hair Removal</a>
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar size={16} className="mr-2" />
              <span className="mr-4">April 15, 2025</span>
              <User size={16} className="mr-2" />
              <span>Jane Smith</span>
            </div>
            <p className="mb-4">
              Learn about the different methods of permanent hair removal, with a focus on why electrolysis remains the gold standard for those seeking lasting results.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800 inline-flex items-center font-medium">
              Read More <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">
              <a href="#" className="hover:text-teal-600 transition-colors">Electrolysis vs. Laser Hair Removal: Which is Right for You?</a>
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar size={16} className="mr-2" />
              <span className="mr-4">April 2, 2025</span>
              <User size={16} className="mr-2" />
              <span>Mark Johnson</span>
            </div>
            <p className="mb-4">
              We compare the two most popular methods of professional hair removal to help you decide which option best suits your needs and goals.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800 inline-flex items-center font-medium">
              Read More <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">
              <a href="#" className="hover:text-teal-600 transition-colors">5 Things to Know Before Your First Electrolysis Session</a>
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar size={16} className="mr-2" />
              <span className="mr-4">March 20, 2025</span>
              <User size={16} className="mr-2" />
              <span>Sarah Williams</span>
            </div>
            <p className="mb-4">
              Preparing for your first electrolysis treatment? Here's what you need to know to ensure a comfortable and effective experience.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800 inline-flex items-center font-medium">
              Read More <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">
              <a href="#" className="hover:text-teal-600 transition-colors">The Science Behind Electrolysis: How It Works</a>
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar size={16} className="mr-2" />
              <span className="mr-4">March 8, 2025</span>
              <User size={16} className="mr-2" />
              <span>Dr. Robert Chen</span>
            </div>
            <p className="mb-4">
              Understand the scientific principles behind electrolysis hair removal and why it's the only FDA-approved method for permanent hair removal.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800 inline-flex items-center font-medium">
              Read More <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">
              <a href="#" className="hover:text-teal-600 transition-colors">Aftercare Tips for Electrolysis Treatment</a>
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar size={16} className="mr-2" />
              <span className="mr-4">February 22, 2025</span>
              <User size={16} className="mr-2" />
              <span>Amanda Lopez</span>
            </div>
            <p className="mb-4">
              Learn how to properly care for your skin after electrolysis treatments to minimize irritation and achieve the best results.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800 inline-flex items-center font-medium">
              Read More <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3">
              <a href="#" className="hover:text-teal-600 transition-colors">Finding the Right Electrologist: What to Look For</a>
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar size={16} className="mr-2" />
              <span className="mr-4">February 10, 2025</span>
              <User size={16} className="mr-2" />
              <span>Michael Thompson</span>
            </div>
            <p className="mb-4">
              Tips for choosing a qualified electrologist, including credentials to look for and questions to ask during your consultation.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800 inline-flex items-center font-medium">
              Read More <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-medium">
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default BlogPage;