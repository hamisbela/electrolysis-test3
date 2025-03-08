import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Mail, Globe, Star, Shield, Zap, Check, X, Image } from 'lucide-react';
import { BusinessPageData } from '../types';
import BusinessList from '../components/BusinessList';

interface BusinessPageProps {
  businessData?: BusinessPageData;
}

const BusinessPage: React.FC<BusinessPageProps> = ({ businessData }) => {
  const { businessId } = useParams<{ businessId: string }>();
  const [imageError, setImageError] = useState(false);
  
  // If we have pre-generated data, use it
  // Otherwise, use a placeholder or fetch data
  const business = businessData?.business;
  const nearbyBusinesses = businessData?.nearbyBusinesses || [];
  
  // If we don't have business data, show a placeholder or error
  if (!business) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Business Information</h1>
        <p>Business details could not be found. Please check the URL or try another business.</p>
      </div>
    );
  }
  
  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Create star rating display
  const renderStars = () => {
    const rating = business.rating || 0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <Star key={i} size={20} className="text-yellow-500 fill-current" />
        );
      } else if (i - 0.5 <= rating) {
        // Half star (using full star for simplicity)
        stars.push(
          <Star key={i} size={20} className="text-yellow-500 fill-current" />
        );
      } else {
        // Empty star
        stars.push(
          <Star key={i} size={20} className="text-yellow-500" />
        );
      }
    }
    
    return stars;
  };
  
  // Parse opening hours if available
  const formatOpeningHours = () => {
    if (!business.hours) return <p>Hours not available</p>;
    
    // Simple format for now, this could be enhanced
    return (
      <div>
        {business.hours.split('","').map((hours, index) => (
          <p key={index}>{hours.replace(/"/g, '')}</p>
        ))}
      </div>
    );
  };

  // Function to return service icons
  const getServiceIcon = (service: string) => {
    const serviceLower = service.toLowerCase();
    if (serviceLower.includes('electrolysis') || serviceLower.includes('hair removal')) {
      return <Zap size={20} className="mr-3 text-teal-500" />;
    } else if (serviceLower.includes('permanent') || serviceLower.includes('professional')) {
      return <Shield size={20} className="mr-3 text-teal-500" />;
    } else if (serviceLower.includes('consultation')) {
      return <Clock size={20} className="mr-3 text-teal-500" />;
    } else {
      return <Check size={20} className="mr-3 text-teal-500" />;
    }
  };

  // Default image for business
  const defaultImage = "https://images.unsplash.com/photo-1595621864553-33978db5276b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  
  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-72 bg-gray-100">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-teal-50">
              <Image size={60} className="text-teal-500" />
              <span className="sr-only">{business.name}</span>
            </div>
          ) : (
            <img 
              src={defaultImage} 
              alt={business.name} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{business.name}</h1>
            
            {business.rating > 0 && (
              <div className="flex items-center text-yellow-500 mb-2">
                {renderStars()}
                <span className="ml-2 text-white">
                  {business.rating.toFixed(1)} ({business.reviews} reviews)
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{business.city}, {business.state}</span>
              </div>
              {business.amenities.includes('Wheelchair accessible') && (
                <div className="px-2 py-1 bg-teal-600 rounded-full text-xs font-medium">
                  Wheelchair Accessible
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-gray-500 mt-1 flex-shrink-0" />
                <p>{business.address}, {business.city}, {business.state} {business.zipCode}</p>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-gray-500" />
                <p>{business.phone}</p>
              </div>
              {business.email && (
                <div className="flex items-center">
                  <Mail size={20} className="mr-3 text-gray-500" />
                  <p>{business.email}</p>
                </div>
              )}
              {business.website && (
                <div className="flex items-center">
                  <Globe size={20} className="mr-3 text-gray-500" />
                  <a href={business.website} className="text-teal-600 hover:underline" target="_blank" rel="nofollow">
                    {business.website}
                  </a>
                </div>
              )}
              {business.hours && (
                <div className="flex items-start">
                  <Clock size={20} className="mr-3 text-gray-500 mt-1 flex-shrink-0" />
                  {formatOpeningHours()}
                </div>
              )}
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-3">About {business.name}</h2>
              <p className="mb-4">
                {business.description || `${business.name} provides professional electrolysis hair removal services. Contact them directly for more information about their services and pricing.`}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Services Offered</h2>
            <ul className="space-y-4">
              {business.services.map((service, index) => (
                <li key={index} className="flex items-start">
                  {getServiceIcon(service)}
                  <div>
                    <h3 className="font-medium text-lg">{service}</h3>
                    <p className="text-gray-600">Professional service provided by trained specialists.</p>
                  </div>
                </li>
              ))}
              {business.services.length === 0 && (
                <li className="flex items-start">
                  <Shield size={20} className="mr-3 text-teal-500" />
                  <div>
                    <h3 className="font-medium text-lg">Electrolysis</h3>
                    <p className="text-gray-600">Permanent hair removal using professional electrolysis techniques.</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Business Details</h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">Established</td>
                  <td className="py-3 font-medium">2010</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">Service Area</td>
                  <td className="py-3 font-medium">{business.city} area</td>
                </tr>
                {Object.entries(business.details).map(([key, value], index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 text-gray-600">{key}</td>
                    <td className="py-3 font-medium">{value}</td>
                  </tr>
                ))}
                {business.amenities.includes('Wheelchair accessible') && (
                  <tr className="border-b">
                    <td className="py-3 text-gray-600">Accessibility</td>
                    <td className="py-3 font-medium flex items-center">
                      <Check size={16} className="text-green-500 mr-1" /> Wheelchair accessible
                    </td>
                  </tr>
                )}
                {business.details['By Appointment Only'] && (
                  <tr className="border-b">
                    <td className="py-3 text-gray-600">Appointments</td>
                    <td className="py-3 font-medium flex items-center">
                      {business.details['By Appointment Only'] === 'Yes' 
                        ? <Check size={16} className="text-green-500 mr-1" /> 
                        : <X size={16} className="text-red-500 mr-1" />}
                      By appointment only
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            {business.latitude && business.longitude ? (
              <div className="bg-gray-200 w-full h-48 rounded-lg mb-4 flex items-center justify-center">
                <img 
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${business.latitude},${business.longitude}&zoom=15&size=400x200&markers=color:red%7C${business.latitude},${business.longitude}&key=YOUR_API_KEY`} 
                  alt="Map location"
                  className="w-full h-full object-cover rounded-lg"
                  onError={() => {
                    /* Handle map image error silently */
                  }}
                />
              </div>
            ) : (
              <div className="bg-gray-200 w-full h-48 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500">Map not available</p>
              </div>
            )}
            <p className="text-sm text-gray-600">
              Located in {business.city}, {business.state}. 
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address + ', ' + business.city + ', ' + business.state)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-teal-600 hover:underline"
              >
                Get directions
              </a>
            </p>
          </div>
          
          {business.paymentMethods && business.paymentMethods.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
              <div className="flex flex-wrap gap-2">
                {business.paymentMethods.map((method, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {business.amenities && business.amenities.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <ul className="space-y-2">
                {business.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <Check size={16} className="text-teal-500 mr-2" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {nearbyBusinesses.length > 0 && (
        <div className="mt-12">
          <BusinessList 
            businesses={nearbyBusinesses} 
            title={`More Electrolysis Providers Near ${business.city}`}
            displayStyle="grid"
            limit={3}
          />
        </div>
      )}
    </div>
  );
};

export default BusinessPage;