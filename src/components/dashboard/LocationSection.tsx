import React from 'react';
import { Location } from '../../types';
import BorderBox from '../shared/BorderBox';
import SecondaryBtn from '../shared/SecondaryBtn';

interface LocationSectionProps {
  location: Location | null;
  onAddLocation: () => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  location,
  onAddLocation,
}) => {
  return (
    <BorderBox>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Location</h3>
        <SecondaryBtn onClick={onAddLocation}>
          Change
        </SecondaryBtn>
      </div>

      {/* Location Display */}
      <div className="p-3 bg-gray-50 rounded-lg">
        {location ? (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium text-gray-900">{location.city}, {location.country}</span>
          </div>
        ) : (
          <div className="text-center py-4">
            <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500 text-sm">No location set</p>
            <p className="text-gray-400 text-xs mt-1">Add your location to help others find you</p>
          </div>
        )}
      </div>
    </BorderBox>
  );
};

export default LocationSection; 