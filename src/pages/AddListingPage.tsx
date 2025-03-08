import React from 'react';
import { Check } from 'lucide-react';

const AddListingPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add Your Electrolysis Business</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <p className="text-lg mb-6">
              Join our directory of professional electrolysis providers and increase your online visibility. Adding your business to ElectrolysisHairRemovalNearMe.com helps potential clients in your area find your services.
            </p>
            
            <form className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                    <input
                      type="text"
                      id="businessName"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">Owner/Manager Name *</label>
                    <input
                      type="text"
                      id="ownerName"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                  <input
                    type="url"
                    id="website"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Address</h2>
                <div className="mb-4">
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    id="streetAddress"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      id="city"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select
                      id="state"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select a state</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      {/* More states would be listed here */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Business Details</h2>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Business Description *</label>
                  <textarea
                    id="description"
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">Describe your services, experience, and what makes your business unique (300-500 characters).</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="facialElectrolysis" className="mr-2" />
                      <label htmlFor="facialElectrolysis">Facial Electrolysis</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="bodyElectrolysis" className="mr-2" />
                      <label htmlFor="bodyElectrolysis">Body Electrolysis</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="transAffirmingCare" className="mr-2" />
                      <label htmlFor="transAffirmingCare">Trans-Affirming Care</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="consultations" className="mr-2" />
                      <label htmlFor="consultations">Free Consultations</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="blend" className="mr-2" />
                      <label htmlFor="blend">Blend Method</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="thermolysis" className="mr-2" />
                      <label htmlFor="thermolysis">Thermolysis</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="mondayHours" className="block text-sm text-gray-600 mb-1">Monday</label>
                        <input
                          type="text"
                          id="mondayHours"
                          placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="tuesdayHours" className="block text-sm text-gray-600 mb-1">Tuesday</label>
                        <input
                          type="text"
                          id="tuesdayHours"
                          placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    {/* Additional days would be added here */}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input type="checkbox" id="termsAgree" className="mr-2" required />
                <label htmlFor="termsAgree">I confirm that all information provided is accurate and I have the authority to list this business.</label>
              </div>
              
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium"
              >
                Submit Listing
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-teal-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Why Join Our Directory?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check size={20} className="text-teal-600 mr-2 mt-1 flex-shrink-0" />
                <span>Increase your online visibility and reach more potential clients</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-teal-600 mr-2 mt-1 flex-shrink-0" />
                <span>Connect with clients specifically searching for electrolysis services</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-teal-600 mr-2 mt-1 flex-shrink-0" />
                <span>Showcase your services, specialties, and business information</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-teal-600 mr-2 mt-1 flex-shrink-0" />
                <span>Stand out from competitors with a detailed business profile</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-teal-600 mr-2 mt-1 flex-shrink-0" />
                <span>Basic listings are completely free</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Listing Requirements</h2>
            <p className="mb-4">
              To maintain the quality of our directory, we require all businesses to meet the following criteria:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Must provide professional electrolysis hair removal services</li>
              <li>Must have proper licensing and certification as required by your state</li>
              <li>Must have a physical business location (not mobile-only services)</li>
              <li>Must provide accurate contact information</li>
            </ul>
            <p className="text-sm text-gray-600">
              All submissions are reviewed before being published. This process typically takes 1-2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;