import React from 'react';
import { Link } from 'react-router-dom';
import { CityListing } from '../types';
import { MapPin } from 'lucide-react';

interface CityListProps {
  cities: CityListing[];
  title?: string;
  limit?: number;
}

const CityList: React.FC<CityListProps> = ({ cities, title = 'Popular Cities', limit = 12 }) => {
  // Sort cities by businessCount (most providers first)
  const sortedCities = [...cities].sort((a, b) => b.businessCount - a.businessCount);
  
  // Apply limit if specified
  const displayCities = limit ? sortedCities.slice(0, limit) : sortedCities;

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayCities.map((city) => (
          <div key={city.id} className="p-4 border rounded-lg hover:bg-teal-50 hover:border-teal-200">
            <Link 
              to={`/city/${city.slug}`}
              className="flex items-center text-teal-700 hover:text-teal-900"
            >
              <MapPin size={18} className="mr-2" />
              {city.name}, {city.stateCode}
              {city.businessCount > 0 && (
                <span className="ml-auto text-xs text-gray-500">({city.businessCount})</span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityList;