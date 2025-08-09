import React, { useState } from 'react';
import { Location } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Select from '../shared/Select';
import PrimaryBtn from '../shared/PrimaryBtn';
import SecondaryBtn from '../shared/SecondaryBtn';
import LoadingSpinner from '../shared/LoadingSpinner';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (city: string, country: string, isNewLocation: boolean) => Promise<void>;
  existingLocations: Location[];
  isLoading: boolean;
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingLocations,
  isLoading,
}) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isNewLocation, setIsNewLocation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && country.trim()) {
      await onAdd(city.trim(), country.trim(), isNewLocation);
      setCity('');
      setCountry('');
      setIsNewLocation(false);
    }
  };

  const handleClose = () => {
    setCity('');
    setCountry('');
    setIsNewLocation(false);
    onClose();
  };

  const handleLocationSelect = (locationString: string) => {
    const [selectedCity, selectedCountry] = locationString.split(', ');
    setCity(selectedCity);
    setCountry(selectedCountry);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Location"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Location Type
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="locationType"
                checked={!isNewLocation}
                onChange={() => setIsNewLocation(false)}
                className="mr-2"
              />
              Select from existing locations
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="locationType"
                checked={isNewLocation}
                onChange={() => setIsNewLocation(true)}
                className="mr-2"
              />
              Create new location
            </label>
          </div>
        </div>

        {!isNewLocation ? (
          <Select
            name="location"
            label="Select Location"
            value={`${city}, ${country}`}
            onChange={(e) => handleLocationSelect(e.target.value)}
            options={[
              { value: '', label: 'Choose a location' },
              ...existingLocations.map((loc) => ({ 
                value: `${loc.city}, ${loc.country}`, 
                label: `${loc.city}, ${loc.country}` 
              }))
            ]}
          />
        ) : (
          <>
            <Input
              label="City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., Vienna, Berlin, New York"
              required
            />
            <Input
              label="Country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g., Austria, Germany, USA"
              required
            />
          </>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <SecondaryBtn onClick={handleClose} disabled={isLoading}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn type="submit" disabled={isLoading || !city.trim() || !country.trim()}>
            {isLoading ? <LoadingSpinner size="sm" /> : 'Add Location'}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
};

export default AddLocationModal; 