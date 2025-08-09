import React from 'react';
import { Project } from '../../types';
import BorderBox from '../shared/BorderBox';
import SecondaryBtn from '../shared/SecondaryBtn';
import DangerBtn from '../shared/DangerBtn';
import LoadingSpinner from '../shared/LoadingSpinner';

interface ProjectsSectionProps {
  projects: Project[];
  isLoadingProjects: boolean;
  onAddProject: () => void;
  onRemoveProject: (projectId: number) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isLoadingProjects,
  onAddProject,
  onRemoveProject,
}) => {
  return (
    <BorderBox>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <SecondaryBtn onClick={onAddProject}>Add Project</SecondaryBtn>
      </div>

      {isLoadingProjects ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      ) : projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="group border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-gray-600 text-sm">{new Date(project.date).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => onRemoveProject(project.id)}
                  className="md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                  title="Remove project"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-700 mb-3">{project.description}</p>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Project →
                </a>
              )}
              {project.skills && project.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {skill.skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No projects added yet. Add your first project!</p>
      )}
    </BorderBox>
  );
};

export default ProjectsSection; 