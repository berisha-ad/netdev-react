import React, { useState } from 'react';
import type { Skill } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Select from '../shared/Select';
import PrimaryBtn from '../shared/PrimaryBtn';
import SecondaryBtn from '../shared/SecondaryBtn';
import LoadingSpinner from '../shared/LoadingSpinner';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkill: (skillData: { skill: string; isNewSkill: boolean }) => Promise<void>;
  allSkills: Skill[];
  userSkills: Skill[];
  isLoading: boolean;
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({
  isOpen,
  onClose,
  onAddSkill,
  allSkills,
  userSkills,
  isLoading,
}) => {
  const [skillForm, setSkillForm] = useState({
    skill: '',
    isNewSkill: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillForm.skill.trim()) {
      console.error('Skill name is empty');
      return;
    }
    
    if (!skillForm.isNewSkill) {
      const skillId = parseInt(skillForm.skill);
      if (isNaN(skillId) || skillId <= 0) {
        console.error('Invalid skill ID selected');
        return;
      }
      console.log('Selected existing skill ID:', skillId);
    } else {
      const trimmedSkill = skillForm.skill.trim();
      if (trimmedSkill.length < 2) {
        console.error('Skill name too short');
        return;
      }
      
      const skillRegex = /^[a-zA-Z0-9\s\-\.]+$/;
      if (!skillRegex.test(trimmedSkill)) {
        console.error('Skill name contains invalid characters');
        return;
      }
      
      const formattedSkill = trimmedSkill
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      if (skillExists(formattedSkill)) {
        console.log('Skill already exists, suggesting to select from existing skills');
      }
      
      console.log('Submitting new skill:', formattedSkill);
      await onAddSkill({ ...skillForm, skill: formattedSkill });
      setSkillForm({ skill: '', isNewSkill: false });
      return;
    }
    
    console.log('Submitting existing skill ID:', skillForm.skill);
    await onAddSkill(skillForm);
    setSkillForm({ skill: '', isNewSkill: false });
  };

  const availableSkills = allSkills.filter(skill => 
    !userSkills.some(userSkill => userSkill.id === skill.id)
  );

  const skillExists = (skillName: string) => {
    return allSkills.some(skill => 
      skill.skill.toLowerCase() === skillName.toLowerCase()
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Skill"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill Type</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={!skillForm.isNewSkill}
                onChange={() => setSkillForm({ ...skillForm, isNewSkill: false, skill: '' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Select from existing skills</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={skillForm.isNewSkill}
                onChange={() => setSkillForm({ ...skillForm, isNewSkill: true, skill: '' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Add new skill</span>
            </label>
          </div>
        </div>

        {!skillForm.isNewSkill ? (
          <Select
            name="skill"
            label="Select Skill"
            value={skillForm.skill}
            onChange={(e) => setSkillForm({ ...skillForm, skill: e.target.value })}
            options={[
              { value: '', label: 'Choose a skill' },
              ...availableSkills.map((skill) => ({ value: skill.id.toString(), label: skill.skill }))
            ]}
          />
        ) : (
          <Input
            label="New Skill Name"
            name="skill"
            value={skillForm.skill}
            onChange={(e) => setSkillForm({ ...skillForm, skill: e.target.value })}
            placeholder="e.g., React, TypeScript, Laravel"
          />
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <SecondaryBtn onClick={onClose} disabled={isLoading}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn type="submit" disabled={isLoading || !skillForm.skill.trim()}>
            {isLoading ? <LoadingSpinner size="sm" /> : 'Add Skill'}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
};

export default AddSkillModal; 