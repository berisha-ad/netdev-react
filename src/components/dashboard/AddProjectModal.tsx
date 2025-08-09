import React, { useState } from 'react';
import { Skill, ProjectForm } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import PrimaryBtn from '../shared/PrimaryBtn';
import SecondaryBtn from '../shared/SecondaryBtn';
import LoadingSpinner from '../shared/LoadingSpinner';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (projectData: ProjectForm) => Promise<void>;
  userSkills: Skill[];
  isLoading: boolean;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  userSkills,
  isLoading,
}) => {
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    name: '',
    description: '',
    date: '',
    link: '',
    skill_ids: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim() || !projectForm.description.trim() || !projectForm.date) return;
    
    await onAddProject(projectForm);
    setProjectForm({
      name: '',
      description: '',
      date: '',
      link: '',
      skill_ids: []
    });
  };

  const handleSkillToggle = (skillId: number) => {
    setProjectForm(prev => ({
      ...prev,
      skill_ids: prev.skill_ids.includes(skillId)
        ? prev.skill_ids.filter(id => id !== skillId)
        : [...prev.skill_ids, skillId]
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Project"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name"
          name="name"
          value={projectForm.name}
          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
          placeholder="e.g., E-commerce Platform"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={projectForm.description}
            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Describe your project..."
            required
          />
        </div>

        <Input
          label="Date"
          name="date"
          type="date"
          value={projectForm.date}
          onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
          required
        />

        <Input
          label="Project Link (Optional)"
          name="link"
          value={projectForm.link}
          onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
          placeholder="https://github.com/username/project"
        />

        {userSkills.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills Used</label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {userSkills.map((skill) => (
                <label key={skill.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={projectForm.skill_ids.includes(skill.id)}
                    onChange={() => handleSkillToggle(skill.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{skill.skill}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <SecondaryBtn onClick={onClose} disabled={isLoading}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn 
            type="submit" 
            disabled={isLoading || !projectForm.name.trim() || !projectForm.description.trim() || !projectForm.date}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : 'Add Project'}
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
};

export default AddProjectModal; 