import React from 'react';
import { Skill } from '../../types';
import BorderBox from '../shared/BorderBox';
import SecondaryBtn from '../shared/SecondaryBtn';
import DangerBtn from '../shared/DangerBtn';
import LoadingSpinner from '../shared/LoadingSpinner';

interface SkillsSectionProps {
  userSkills: Skill[];
  isLoadingSkills: boolean;
  onAddSkill: () => void;
  onRemoveSkill: (skillId: number) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  userSkills,
  isLoadingSkills,
  onAddSkill,
  onRemoveSkill,
}) => {
  return (
    <BorderBox>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        <SecondaryBtn onClick={onAddSkill}>Add Skill</SecondaryBtn>
      </div>

      {isLoadingSkills ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      ) : userSkills.length > 0 ? (
        <div className="space-y-3">
          {userSkills.map((skill) => (
            <div key={skill.id} className="group flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-medium">{skill.skill}</span>
              <button
                onClick={() => onRemoveSkill(skill.id)}
                className="md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                title="Remove skill"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No skills added yet. Add your first skill!</p>
      )}
    </BorderBox>
  );
};

export default SkillsSection; 