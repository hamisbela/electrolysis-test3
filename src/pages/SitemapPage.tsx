import React from 'react';
import { Link } from 'react-router-dom';
import { BusinessListing, CityPageData, StatePageData } from '../types';
import { MapPin, Store, Globe } from 'lucide-react';

interface SitemapPageProps {
  businesses: BusinessListing[];
  cities: CityPageData[];
  states: StatePageData[];
}

const SitemapPage: React.FC<SitemapPageProps> = ({ 
  businesses = [], 
  cities = [], 
  states = [] 
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">HTML Sitemap</h1>
      <p className="mb-8">
        This sitemap provides links to all pages on ElectrolysisHairRemovalNearMe.com to help you find exactly what you're looking for.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Store size={20} className="mr-2 text-teal-600" />
            <h2 className="text-2xl font-bold">Main Pages</h2>
          </div>
          <ul className="space-y-2 ml-7">
            <li>
              <Link to="/" className="text-teal-600 hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-teal-600 hover:underline">About Us</Link>
            </li>
            <li>
              <Link to="/blog" className="text-teal-600 hover:underline">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="text-teal-600 hover:underline">Contact Us</Link>
            </li>
            <li>
              <Link to="/add-listing" className="text-teal-600 hover:underline">Add Your Business</Link>
            </li>
            <li>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">XML Sitemap</a>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Globe size={20} className="mr-2 text-teal-600" />
            <h2 className="text-2xl font-bold">States</h2>
          </div>
          <ul className="space-y-2 ml-7">
            {states.map(state => (
              <li key={state.slug}>
                <Link to={`/state/${state.slug}`} className="text-teal-600 hover:underline">
                  Electrolysis in {state.stateName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <MapPin size={20} className="mr-2 text-teal-600" />
          <h2 className="text-2xl font-bold">Cities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
          {cities.map(city => (
            <div key={city.slug}>
              <Link to={`/city/${city.slug}`} className="text-teal-600 hover:underline">
                Electrolysis in {city.cityName}, {city.stateName.substring(0, 2)}
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <Store size={20} className="mr-2 text-teal-600" />
          <h2 className="text-2xl font-bold">Business Listings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
          {businesses.map(business => (
            <div key={business.slug}>
              <Link to={`/business/${business.slug}`} className="text-teal-600 hover:underline">
                {business.name} - {business.city}, {business.state}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;