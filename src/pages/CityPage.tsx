import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CityPageData, BusinessListing } from '../types';
import BusinessList from '../components/BusinessList';
import { Filter, MapPin, Star, CircleDollarSign, Search } from 'lucide-react';

interface CityPageProps {
  cityData?: CityPageData;
}

const CityPage: React.FC<CityPageProps> = ({ cityData }) => {
  const { cityState } = useParams<{ cityState: string }>();
  
  // If we have pre-generated data, use it
  // Otherwise, parse from URL parameter
  const cityName = cityData?.cityName || cityState?.split('-').slice(0, -1).join(' ');
  const stateName = cityData?.stateName || cityState?.split('-').pop();
  const businesses = cityData?.businesses || [];

  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessListing[]>(businesses);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  const [serviceFilters, setServiceFilters] = useState<string[]>([]);

  // Extract all unique services from businesses
  const allServices = Array.from(
    new Set(
      businesses.flatMap(business => business.services)
    )
  ).sort();

  // Handle filter changes
  const handleFilterChange = () => {
    let results = [...businesses];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(business => 
        business.name.toLowerCase().includes(term) || 
        business.description.toLowerCase().includes(term) ||
        business.services.some(service => service.toLowerCase().includes(term))
      );
    }
    
    // Apply service filters
    if (serviceFilters.length > 0) {
      results = results.filter(business => 
        serviceFilters.some(filter => 
          business.services.some(service => 
            service.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }
    
    // Apply sorting
    if (sortOption === 'recommended') {
      // Sort by images first, then by rating
      results.sort((a, b) => {
        // First sort by whether they have images
        const aHasImages = a.images && a.images.length > 0;
        const bHasImages = b.images && b.images.length > 0;
        if (aHasImages && !bHasImages) return -1;
        if (!aHasImages && bHasImages) return 1;
        
        // Then sort by rating
        return b.rating - a.rating;
      });
    } else if (sortOption === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredBusinesses(results);
  };

  // Handle service filter toggle
  const toggleServiceFilter = (service: string) => {
    if (serviceFilters.includes(service)) {
      setServiceFilters(serviceFilters.filter(s => s !== service));
    } else {
      setServiceFilters([...serviceFilters, service]);
    }
  };

  // Apply filters when filter criteria change
  React.useEffect(() => {
    handleFilterChange();
  }, [searchTerm, sortOption, serviceFilters]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Electrolysis Hair Removal in {cityName}, {stateName}
      </h1>
      
      <p className="text-gray-600 mb-8">
        Find the best electrolysis hair removal providers in {cityName}, {stateName}. 
        We have {businesses.length} specialist{businesses.length !== 1 ? 's' : ''} in your area.
      </p>
      
      {/* Filters section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Filter size={20} className="mr-2" /> 
            Filter Providers
          </h2>
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="mt-2 md:mt-0 text-teal-600 hover:text-teal-800"
          >
            {filterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or service..."
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
              <option value="recommended">Recommended</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
        
        {filterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold mb-3">Filter by Services:</h3>
            <div className="flex flex-wrap gap-2">
              {allServices.slice(0, 10).map((service) => (
                <button
                  key={service}
                  className={`px-3 py-1 rounded-full text-sm ${
                    serviceFilters.includes(service)
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleServiceFilter(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <BusinessList 
        businesses={filteredBusinesses} 
        title={`Electrolysis Providers in ${cityName}`} 
      />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">About Electrolysis in {cityName}</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <p className="mb-4">
                Electrolysis is the gold standard for permanent hair removal in {cityName}, {stateName}. Unlike temporary methods like waxing or shaving, electrolysis offers a permanent solution by destroying the hair follicle completely.
              </p>
              <p className="mb-4">
                When choosing an electrologist in {cityName}, look for proper certification, experience, and positive reviews. Many providers listed in our directory offer free consultations to discuss your specific needs and develop a treatment plan.
              </p>
              <p>
                Electrolysis is effective for all hair colors and skin types, making it a versatile option for {cityName} residents seeking permanent hair removal solutions.
              </p>
            </div>
            <div className="md:w-1/3 flex flex-col gap-4">
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin size={20} className="text-teal-600 mr-2" />
                  <h3 className="font-bold">Location</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Most electrologists in {cityName} are located in professional office spaces or medical spas, providing a clean and comfortable environment for your treatments.
                </p>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Star size={20} className="text-teal-600 mr-2" />
                  <h3 className="font-bold">Quality</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  {cityName} is home to many highly-rated electrolysis specialists with years of experience and professional certification.
                </p>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <CircleDollarSign size={20} className="text-teal-600 mr-2" />
                  <h3 className="font-bold">Pricing</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Prices in {cityName} typically range from $60-$120 per hour, depending on the provider's experience and location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">How much does electrolysis cost in {cityName}?</h3>
            <p>
              Prices in {cityName} typically range from $60-$120 per hour, depending on the provider's experience and location. Many offer package deals for multiple sessions.
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">How many electrolysis sessions will I need?</h3>
            <p>
              The number of sessions varies based on the treatment area, hair density, and individual factors. Most clients require multiple sessions over several months for complete results.
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">Is electrolysis painful?</h3>
            <p>
              Most people experience mild discomfort during electrolysis, often described as a momentary pinch or heat sensation. Many providers in {cityName} offer numbing options to increase comfort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;