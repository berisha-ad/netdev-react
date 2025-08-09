import React, { useState, useEffect } from 'react';
import { EditProfileForm, Profession, Location } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Select from '../shared/Select';
import PrimaryBtn from '../shared/PrimaryBtn';
import SecondaryBtn from '../shared/SecondaryBtn';
import LoadingSpinner from '../shared/LoadingSpinner';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: EditProfileForm) => Promise<void>;
  initialData: EditProfileForm;
  professions?: Profession[];
  locations?: Location[];
  isLoading: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  professions,
  locations,
  isLoading,
}) => {
  const [formData, setFormData] = useState<EditProfileForm>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Tagline"
          name="tagline"
          value={formData.tagline}
          onChange={handleInputChange}
          placeholder="e.g., Full Stack Developer passionate about React"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Tell us about yourself, your experience, and what you're looking for..."
          />
        </div>

        <Select
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleSelectChange}
          options={[
            { value: 'available', label: 'Available' },
            { value: 'open to work', label: 'Open to Work' },
            { value: 'not available', label: 'Not Available' }
          ]}
        />



        <Input
          label="GitHub Link"
          name="github_link"
          value={formData.github_link}
          onChange={handleInputChange}
          placeholder="https://github.com/username"
        />

        <Input
          label="LinkedIn Link"
          name="linkedin_link"
          value={formData.linkedin_link}
          onChange={handleInputChange}
          placeholder="https://linkedin.com/in/username"
        />

        <Input
          label="Portfolio Link"
          name="portfolio_link"
          value={formData.portfolio_link}
          onChange={handleInputChange}
          placeholder="https://your-portfolio.com"
        />

        <Input
          label="Started Date"
          name="started_date"
          type="date"
          value={formData.started_date}
          onChange={handleInputChange}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <SecondaryBtn onClick={onClose} disabled={isLoading}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal; 