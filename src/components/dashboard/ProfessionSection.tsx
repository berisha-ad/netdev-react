import React from 'react';
import { Profession } from '../../types';
import BorderBox from '../shared/BorderBox';
import SecondaryBtn from '../shared/SecondaryBtn';

interface ProfessionSectionProps {
  profession: Profession | null;
  onAddProfession: () => void;
}

const ProfessionSection: React.FC<ProfessionSectionProps> = ({
  profession,
  onAddProfession,
}) => {
  return (
    <BorderBox>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Profession</h3>
        <SecondaryBtn onClick={onAddProfession}>
          Change
        </SecondaryBtn>
      </div>

      {/* Profession Display */}
      <div className="p-3 bg-gray-50 rounded-lg">
        {profession ? (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            <span className="font-medium text-gray-900">{profession.profession}</span>
          </div>
        ) : (
          <div className="text-center py-4">
            <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            <p className="text-gray-500 text-sm">No profession set</p>
            <p className="text-gray-400 text-xs mt-1">Add your profession to help others find you</p>
          </div>
        )}
      </div>
    </BorderBox>
  );
};

export default ProfessionSection; 