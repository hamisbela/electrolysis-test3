import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BusinessListing } from '../types';
import { MapPin, Phone, Star, Clock, Globe, Shield, Zap, Image } from 'lucide-react';

interface BusinessCardProps {
  business: BusinessListing;
  displayStyle?: 'list' | 'grid';
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, displayStyle = 'list' }) => {
  const [imageError, setImageError] = useState(false);

  // Create star rating display
  const renderStars = () => {
    const rating = business.rating || 0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <Star key={i} size={16} className="text-yellow-500 fill-current" />
        );
      } else if (i - 0.5 <= rating) {
        // Half star (we'll use a full star for simplicity)
        stars.push(
          <Star key={i} size={16} className="text-yellow-500 fill-current" />
        );
      } else {
        // Empty star
        stars.push(
          <Star key={i} size={16} className="text-yellow-500" />
        );
      }
    }
    
    return stars;
  };

  // Function to return service icons
  const getServiceIcon = (service: string) => {
    const serviceLower = service.toLowerCase();
    if (serviceLower.includes('electrolysis') || serviceLower.includes('hair removal')) {
      return <Zap size={16} className="mr-1 text-teal-500" />;
    } else if (serviceLower.includes('permanent') || serviceLower.includes('professional')) {
      return <Shield size={16} className="mr-1 text-teal-500" />;
    } else if (serviceLower.includes('consultation')) {
      return <Clock size={16} className="mr-1 text-teal-500" />;
    } else {
      return <Globe size={16} className="mr-1 text-teal-500" />;
    }
  };

  // Default image fallback
  const handleImageError = () => {
    setImageError(true);
  };

  // Get the first image or use default
  const businessImage = business.images && business.images.length > 0 
    ? business.images[0]
    : "https://images.unsplash.com/photo-1595621864553-33978db5276b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

  if (displayStyle === 'grid') {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div className="h-52 bg-gray-200 relative">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-teal-50">
              <Image size={40} className="text-teal-500" />
              <span className="sr-only">{business.name}</span>
            </div>
          ) : (
            <img 
              src={businessImage} 
              alt={business.name} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{business.name}</h2>
          
          {business.rating > 0 && (
            <div className="flex items-center text-yellow-500 mb-3">
              {renderStars()}
              <span className="ml-2 text-gray-700">
                {business.rating.toFixed(1)} ({business.reviews} reviews)
              </span>
            </div>
          )}
          
          <div className="flex items-start mb-2">
            <MapPin size={18} className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
            <p className="text-gray-600 text-sm">{business.address}, {business.city}, {business.state} {business.zipCode}</p>
          </div>
          
          <div className="flex items-center mb-4">
            <Phone size={18} className="mr-2 text-gray-500" />
            <p className="text-gray-600 text-sm">{business.phone}</p>
          </div>
          
          <div className="border-t pt-4">
            <Link 
              to={`/business/${business.slug}`} 
              className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center"
            >
              View Details <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 h-48 bg-gray-200 rounded-lg relative">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-teal-50 rounded-lg">
                <Image size={40} className="text-teal-500" />
                <span className="sr-only">{business.name}</span>
              </div>
            ) : (
              <img 
                src={businessImage} 
                alt={business.name} 
                className="w-full h-full object-cover rounded-lg"
                onError={handleImageError}
              />
            )}
          </div>
          
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-2">{business.name}</h2>
            
            {business.rating > 0 && (
              <div className="flex items-center text-yellow-500 mb-3">
                {renderStars()}
                <span className="ml-2 text-gray-700">
                  {business.rating.toFixed(1)} ({business.reviews} reviews)
                </span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600">{business.address}, {business.city}, {business.state} {business.zipCode}</p>
              </div>
              
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-500" />
                <p className="text-gray-600">{business.phone}</p>
              </div>
            </div>
            
            <p className="mb-4 text-gray-600">
              {business.description || (
                `Professional electrolysis hair removal services offered by ${business.name}. 
                ${business.services.length > 0 ? `Specializing in ${business.services.join(', ')}.` : ''}`
              )}
            </p>
            
            {business.services.length > 0 && (
              <div className="mb-4">
                <h3 className="text-gray-700 font-semibold mb-2">Services:</h3>
                <div className="flex flex-wrap gap-2">
                  {business.services.slice(0, 4).map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm flex items-center">
                      {getServiceIcon(service)}
                      {service}
                    </span>
                  ))}
                  {business.services.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      +{business.services.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <Link 
              to={`/business/${business.slug}`} 
              className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center"
            >
              View Details <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;