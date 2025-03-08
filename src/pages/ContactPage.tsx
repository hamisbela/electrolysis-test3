import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-6">
            Have questions about our directory? Need to update your listing? Or maybe you just want to share your electrolysis success story? We'd love to hear from you! Fill out the form, and our team will get back to you as soon as possible.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail size={20} className="text-teal-600 mr-3 mt-1" />
              <div>
                <h3 className="font-bold">Email Us</h3>
                <p>info@electrolysishairremovalnearme.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MessageSquare size={20} className="text-teal-600 mr-3 mt-1" />
              <div>
                <h3 className="font-bold">Customer Support</h3>
                <p>support@electrolysishairremovalnearme.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={20} className="text-teal-600 mr-3 mt-1" />
              <div>
                <h3 className="font-bold">Business Address</h3>
                <p>123 Directory Lane, Suite 101<br />San Francisco, CA 94110</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="font-bold text-lg mb-2">How can I add my electrolysis business to your directory?</h3>
            <p>
              You can add your business by visiting our "Add a Listing" page and filling out the form with your business details. Once submitted, our team will review your information before publishing your listing.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="font-bold text-lg mb-2">How do I update my business information?</h3>
            <p>
              If you need to update your existing listing, please contact us with your business name and the changes you'd like to make. We'll update your information as soon as possible.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="font-bold text-lg mb-2">Is there a fee to be listed in your directory?</h3>
            <p>
              Basic listings are free. We also offer premium listing options with additional features and better visibility. Contact us for more information about our premium listings.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="font-bold text-lg mb-2">How can I report incorrect information?</h3>
            <p>
              If you find any incorrect information about a listing, please use our contact form to let us know. Include the business name and the information that needs correction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;