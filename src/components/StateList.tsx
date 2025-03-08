import React from 'react';
import { Link } from 'react-router-dom';
import { StateListing } from '../types';

interface StateListProps {
  states: StateListing[];
  title?: string;
  limit?: number;
}

const StateList: React.FC<StateListProps> = ({ states, title = 'Browse by State', limit = 16 }) => {
  // Sort states by businessCount (most providers first)
  const sortedStates = [...states].sort((a, b) => b.businessCount - a.businessCount);
  
  // Apply limit if specified
  const displayStates = limit ? sortedStates.slice(0, limit) : sortedStates;

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayStates.map((state) => (
          <div key={state.id} className="p-4 border rounded-lg hover:bg-teal-50 hover:border-teal-200">
            <Link 
              to={`/state/${state.slug}`}
              className="flex items-center text-teal-700 hover:text-teal-900"
            >
              {state.name}
              {state.businessCount > 0 && (
                <span className="ml-auto text-xs text-gray-500">({state.businessCount})</span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateList;