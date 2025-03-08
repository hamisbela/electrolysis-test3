import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Search, Filter } from 'lucide-react';
import { StatePageData, CityListing } from '../types';

interface StatePageProps {
  stateData?: StatePageData;
}

const StatePage: React.FC<StatePageProps> = ({ stateData }) => {
  const { state } = useParams<{ state: string }>();
  
  // If we have pre-generated data, use it
  // Otherwise, parse from URL parameter
  const stateName = stateData?.stateName || (state ? state.charAt(0).toUpperCase() + state.slice(1).replace(/-/g, ' ') : '');
  const cities = stateData?.cities || [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  const [filteredCities, setFilteredCities] = useState<CityListing[]>(cities);
  
  // Handle filter changes
  React.useEffect(() => {
    let results = [...cities];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(city => 
        city.name.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (sortOption === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'business') {
      results.sort((a, b) => b.businessCount - a.businessCount);
    }
    
    setFilteredCities(results);
  }, [searchTerm, sortOption, cities]);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Electrolysis Hair Removal in {stateName}
      </h1>
      
      <p className="mb-8 text-lg">
        Find electrolysis hair removal providers across {stateName}. Choose from {cities.length} cities with {stateData?.businessCount || 0} specialists.
      </p>
      
      {/* Filters section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter size={20} className="mr-2 text-teal-600" />
          <h2 className="text-xl font-bold">Filter Cities</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a city..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:w-48">
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recommended">Most Providers</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Cities with Electrolysis Providers in {stateName}</h2>
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCities.map((city) => (
              <div key={city.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
                <Link 
                  to={`/city/${city.slug}`}
                  className="flex items-center justify-between text-teal-700 hover:text-teal-900"
                >
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2 text-teal-500" />
                    <span className="font-medium">{city.name}, {city.stateCode}</span>
                  </div>
                  <div className="bg-teal-50 text-teal-700 rounded-full px-3 py-1 text-sm font-medium">
                    {city.businessCount} {city.businessCount === 1 ? 'provider' : 'providers'}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 bg-white p-4 rounded-lg shadow">No cities found matching your search in {stateName}.</p>
        )}
      </div>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">About Electrolysis in {stateName}</h2>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <p className="mb-4">
                Electrolysis has become increasingly popular in {stateName} as more people seek permanent solutions for unwanted hair. With numerous certified practitioners across the state, residents have access to quality electrolysis services.
              </p>
              <p className="mb-4">
                {stateName} requires proper licensing and certification for electrologists to ensure safe and effective treatments. Most providers in the state use modern equipment and follow the latest techniques to provide comfortable and effective electrolysis.
              </p>
              <p>
                When choosing a provider in {stateName}, look for proper credentials, experience, and positive client reviews. Many electrologists offer free initial consultations to assess your needs and develop a personalized treatment plan.
              </p>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1579591919791-0e3737ae3808?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt={`Electrolysis in ${stateName}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">How much does electrolysis cost in {stateName}?</h3>
            <p>
              Electrolysis costs in {stateName} typically range from $60 to $150 per hour, depending on the practitioner's experience and location. Many providers offer package deals for multiple sessions, which can reduce the overall cost.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">Is electrolysis regulated in {stateName}?</h3>
            <p>
              Yes, electrolysis is regulated in {stateName}. Practitioners must complete specific training and obtain proper licensing before offering services, ensuring that clients receive safe and effective treatments.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">How many sessions will I need?</h3>
            <p>
              The number of sessions varies depending on the area being treated, hair type, and individual factors. Most people require multiple sessions over several months for complete permanent hair removal, with treatments spaced 1-4 weeks apart.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">What's the difference between electrolysis and laser hair removal?</h3>
            <p>
              Electrolysis treats each hair follicle individually with electricity to permanently destroy it, while laser targets multiple hairs using light absorbed by the pigment. Electrolysis works on all hair colors and skin types, while laser is less effective on light hair and dark skin. Electrolysis provides permanent results, whereas laser offers significant reduction but may not be permanent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatePage;