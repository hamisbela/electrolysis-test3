import React, { useState } from 'react';
import { Search, MapPin, Zap, Shield, Star, Clock } from 'lucide-react';
import { BusinessListing, CityPageData, StatePageData } from '../types';
import CityList from '../components/CityList';
import StateList from '../components/StateList';
import BusinessList from '../components/BusinessList';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  businessListings?: BusinessListing[];
  cityPages?: CityPageData[];
  statePages?: StatePageData[];
}

const HomePage: React.FC<HomePageProps> = ({ 
  businessListings = [], 
  cityPages = [], 
  statePages = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>('');
  const navigate = useNavigate();
  
  // Prepare data for city and state lists
  const cityListings = cityPages.map(city => ({
    id: Math.random(), // Temporary ID for rendering
    name: city.cityName,
    slug: city.slug,
    state: city.stateName,
    stateCode: city.stateName.substring(0, 2).toUpperCase(),
    businessCount: city.businesses.length
  }));

  const stateListings = statePages.map(state => ({
    id: Math.random(), // Temporary ID for rendering
    name: state.stateName,
    slug: state.slug,
    businessCount: state.businessCount,
    cities: []
  }));
  
  // Get featured business listings (top 3 by rating)
  const featuredBusinesses = [...businessListings]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Handle search submission
  const handleSearch = () => {
    setSearchError('');
    
    if (!searchTerm.trim()) {
      setSearchError('Please enter a city or state name');
      return;
    }
    
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // Search for exact city match first
    const exactCityMatch = cityPages.find(city => 
      city.cityName.toLowerCase() === normalizedSearch
    );
    
    if (exactCityMatch) {
      navigate(`/city/${exactCityMatch.slug}`);
      return;
    }
    
    // Search for exact state match
    const exactStateMatch = statePages.find(state => 
      state.stateName.toLowerCase() === normalizedSearch
    );
    
    if (exactStateMatch) {
      navigate(`/state/${exactStateMatch.slug}`);
      return;
    }
    
    // Search for partial city match
    const partialCityMatches = cityPages.filter(city => 
      city.cityName.toLowerCase().includes(normalizedSearch)
    );
    
    if (partialCityMatches.length === 1) {
      navigate(`/city/${partialCityMatches[0].slug}`);
      return;
    }
    
    // Search for partial state match
    const partialStateMatches = statePages.filter(state => 
      state.stateName.toLowerCase().includes(normalizedSearch)
    );
    
    if (partialStateMatches.length === 1) {
      navigate(`/state/${partialStateMatches[0].slug}`);
      return;
    }
    
    // Search for city + state format (e.g., "Montgomery, AL")
    const cityStateRegex = /^(.+),\s*(.+)$/;
    const cityStateMatch = normalizedSearch.match(cityStateRegex);
    
    if (cityStateMatch) {
      const cityPart = cityStateMatch[1].trim();
      const statePart = cityStateMatch[2].trim();
      
      // Try to find a city in a specific state
      const cityInStateMatch = cityPages.find(city => 
        city.cityName.toLowerCase() === cityPart && 
        (city.stateName.toLowerCase() === statePart || 
         city.stateName.substring(0, 2).toLowerCase() === statePart)
      );
      
      if (cityInStateMatch) {
        navigate(`/city/${cityInStateMatch.slug}`);
        return;
      }
    }
    
    // If we have multiple partial matches, redirect to the one with most businesses
    if (partialCityMatches.length > 1) {
      const bestMatch = partialCityMatches.sort((a, b) => 
        b.businesses.length - a.businesses.length
      )[0];
      
      navigate(`/city/${bestMatch.slug}`);
      return;
    }
    
    if (partialStateMatches.length > 1) {
      const bestMatch = partialStateMatches.sort((a, b) => 
        b.businessCount - a.businessCount
      )[0];
      
      navigate(`/state/${bestMatch.slug}`);
      return;
    }
    
    // No matches found
    setSearchError('No matching cities or states found. Please try a different search term.');
  };
  
  // Handle search on Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Hero section with electrolysis image */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-800 opacity-80"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Permanent Hair Removal Specialists Near You
            </h1>
            <p className="text-xl text-white mb-8">
              Find top-rated electrolysis professionals in your area for FDA-approved permanent hair removal.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your city or state"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button 
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg flex items-center justify-center shadow-lg transition-all hover:shadow-xl"
                onClick={handleSearch}
              >
                <Search className="mr-2" />
                Search
              </button>
            </div>
            
            {searchError && (
              <div className="mt-3 text-white bg-red-500 bg-opacity-80 p-3 rounded-lg">
                {searchError}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Electrolysis Hair Removal Treatment" 
              className="w-full h-[400px] object-cover rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
            />
          </div>
        </div>
      </div>
      
      {/* Featured providers section */}
      {featuredBusinesses.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Featured Providers</h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <BusinessList 
            businesses={featuredBusinesses} 
            title="" 
            displayStyle="grid"
          />
        </section>
      )}

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Top Cities</h2>
          <button 
            onClick={() => setShowAllCities(!showAllCities)}
            className="text-teal-600 hover:text-teal-800 font-medium"
          >
            {showAllCities ? 'Show Less' : 'View All'}
          </button>
        </div>
        <CityList 
          cities={cityListings} 
          title="" 
          limit={showAllCities ? undefined : 12}
        />
      </section>

      <section className="mb-16">
        <StateList 
          states={stateListings} 
          title="Browse by State" 
          limit={16}
        />
      </section>

      {/* Benefits section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose Electrolysis?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <Zap size={28} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Permanent Results</h3>
            <p className="text-gray-600">
              Unlike laser treatments, electrolysis permanently removes hair by destroying the follicle, preventing future growth.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <Shield size={28} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">FDA-Approved</h3>
            <p className="text-gray-600">
              Electrolysis is the only hair removal method approved by the FDA for permanent hair removal.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <Star size={28} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">All Hair Types</h3>
            <p className="text-gray-600">
              Works on all hair types and colors, including blonde, gray, and red hair that laser cannot effectively target.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <Clock size={28} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Long-term Value</h3>
            <p className="text-gray-600">
              While requiring multiple sessions, electrolysis provides permanent results, making it a cost-effective solution over time.
            </p>
          </div>
        </div>
      </section>

      {/* About electrolysis section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Electrolysis Hair Removal</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/5">
              <p className="mb-4 text-lg">
                Electrolysis is the only FDA-approved method for permanent hair removal. Unlike other hair removal methods that provide temporary results, electrolysis uses shortwave radio frequencies to destroy the hair growth center, preventing future hair growth.
              </p>
              <p className="mb-4">
                This method works by inserting a fine probe into the hair follicle and delivering a small amount of electrical current to destroy the hair root. Because each hair is treated individually, electrolysis can be time-consuming but provides truly permanent results.
              </p>
              <p>
                Finding a qualified electrologist in your area is essential for safe and effective treatment. Our directory helps you locate certified professionals near you who specialize in permanent hair removal through electrolysis.
              </p>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1624981015241-3659be9b9ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Electrolysis Treatment" 
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;