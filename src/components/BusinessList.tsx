import React from 'react';
import { BusinessListing } from '../types';
import BusinessCard from './BusinessCard';

interface BusinessListProps {
  businesses: BusinessListing[];
  title?: string;
  limit?: number;
  displayStyle?: 'list' | 'grid';
}

const BusinessList: React.FC<BusinessListProps> = ({ 
  businesses, 
  title = 'Electrolysis Providers', 
  limit,
  displayStyle = 'list'
}) => {
  // Sort businesses by rating (highest first)
  const sortedBusinesses = [...businesses].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  
  // Apply limit if specified
  const displayBusinesses = limit ? sortedBusinesses.slice(0, limit) : sortedBusinesses;

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {displayBusinesses.length === 0 ? (
        <p className="text-gray-600">No electrolysis providers found in this area.</p>
      ) : (
        displayStyle === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} displayStyle="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {displayBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} displayStyle="list" />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default BusinessList;