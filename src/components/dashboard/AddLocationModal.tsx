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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && country.trim()) {
      setIsSubmitting(true);
      try {
        await onAdd(city.trim(), country.trim(), isNewLocation);
        // Reset form on success
        setCity('');
        setCountry('');
        setIsNewLocation(false);
      } catch (error) {
        // Error is handled by the parent component
        console.error('Location update failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setCity('');
    setCountry('');
    setIsNewLocation(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleLocationSelect = (locationString: string) => {
    if (locationString) {
      const [selectedCity, selectedCountry] = locationString.split(', ');
      setCity(selectedCity);
      setCountry(selectedCountry);
    } else {
      setCity('');
      setCountry('');
    }
  };

  const isFormValid = city.trim() && country.trim();
  const isDisabled = isLoading || isSubmitting || !isFormValid;

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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
            disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <Input
              label="Country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g., Austria, Germany, USA"
              required
              disabled={isSubmitting}
            />
          </>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <SecondaryBtn onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn type="submit" disabled={isDisabled}>
            {isSubmitting ? <LoadingSpinner size="sm" /> : 'Add Location'}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
};

export default AddLocationModal; 