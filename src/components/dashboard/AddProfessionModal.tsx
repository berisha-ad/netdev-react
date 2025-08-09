import React, { useState } from 'react';
import { Profession } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Select from '../shared/Select';
import PrimaryBtn from '../shared/PrimaryBtn';
import SecondaryBtn from '../shared/SecondaryBtn';
import LoadingSpinner from '../shared/LoadingSpinner';

interface AddProfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (profession: string, isNewProfession: boolean) => Promise<void>;
  existingProfessions: Profession[];
  isLoading: boolean;
}

const AddProfessionModal: React.FC<AddProfessionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingProfessions,
  isLoading,
}) => {
  const [profession, setProfession] = useState('');
  const [isNewProfession, setIsNewProfession] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profession.trim()) {
      await onAdd(profession.trim(), isNewProfession);
      setProfession('');
      setIsNewProfession(false);
    }
  };

  const handleClose = () => {
    setProfession('');
    setIsNewProfession(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Profession"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Profession Type
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="professionType"
                checked={!isNewProfession}
                onChange={() => setIsNewProfession(false)}
                className="mr-2"
              />
              Select from existing professions
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="professionType"
                checked={isNewProfession}
                onChange={() => setIsNewProfession(true)}
                className="mr-2"
              />
              Create new profession
            </label>
          </div>
        </div>

        {!isNewProfession ? (
          <Select
            name="profession"
            label="Select Profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            options={[
              { value: '', label: 'Choose a profession' },
              ...existingProfessions.map((prof) => ({ 
                value: prof.profession, 
                label: prof.profession 
              }))
            ]}
          />
        ) : (
          <Input
            label="New Profession"
            name="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="e.g., Full Stack Developer, DevOps Engineer"
            required
          />
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <SecondaryBtn onClick={handleClose} disabled={isLoading}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn type="submit" disabled={isLoading || !profession.trim()}>
            {isLoading ? <LoadingSpinner size="sm" /> : 'Add Profession'}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
};

export default AddProfessionModal; 