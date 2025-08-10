import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDashboard } from "../hooks/useDashboard";
import { useDashboardActions } from "../hooks/useDashboardActions";
import { api, getCsrfToken } from "../api";
import Container from "../components/shared/Container";
import Section from "../components/shared/Section";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ProfileSection from "../components/dashboard/ProfileSection";
import ProfessionSection from "../components/dashboard/ProfessionSection";
import LocationSection from "../components/dashboard/LocationSection";
import SkillsSection from "../components/dashboard/SkillsSection";
import ProjectsSection from "../components/dashboard/ProjectsSection";
import EditProfileModal from "../components/dashboard/EditProfileModal";
import AddSkillModal from "../components/dashboard/AddSkillModal";
import AddProjectModal from "../components/dashboard/AddProjectModal";
import AddProfessionModal from "../components/dashboard/AddProfessionModal";
import AddLocationModal from "../components/dashboard/AddLocationModal";
import DeleteAccountModal from "../components/dashboard/DeleteAccountModal";

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingProfession, setIsAddingProfession] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const {
    profileImage,
    error,
    userSkills,
    allSkills,
    projects,
    professions,
    locations,
    isLoadingSkills,
    isLoadingProjects,
    setError,
    setProfileImage,
    refreshUserInfo,
    refreshSkills,
    refreshProjects,
    refreshProfessions,
    refreshLocations,
    refreshAllSkills,
  } = useDashboard();



  const { userInfo, refreshAllUserData } = useAuth();

  const profession = userInfo?.profession_id && professions 
    ? professions.find(p => p.id === userInfo.profession_id) || null 
    : null;

  const location = userInfo?.location_id && locations 
    ? locations.find(l => l.id === userInfo.location_id) || null 
    : null;

  const {
    handleSaveProfile,
    handleAddSkill,
    handleRemoveSkill,
    handleAddProject,
    handleRemoveProject,
    handleAddProfession,
    handleAddLocation,
  } = useDashboardActions(setError, refreshUserInfo, refreshSkills, refreshProjects, refreshProfessions, refreshLocations, refreshAllSkills, userInfo);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);
      setError(null);
      
      await api.get('/sanctum/csrf-cookie');
      const csrfToken = await getCsrfToken();
      
      await api.delete('/api/user', {
        headers: {
          'X-XSRF-TOKEN': csrfToken || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      
      // Account deleted successfully, logout and redirect
      await logout();
    } catch (error: any) {
      console.error('Error deleting account:', error);
      setError(error.response?.data?.message || 'Failed to delete account');
      throw error;
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const handleEditProfile = () => setIsEditingProfile(true);
  const handleProfileImageUpload = async (fileUrl: string, fileName?: string) => {
    if (!fileUrl) {
      try {
        await api.get('/sanctum/csrf-cookie');
        const csrfToken = await getCsrfToken();
        
        await api.put('/api/user', { profile_image: null }, {
          headers: {
            'X-XSRF-TOKEN': csrfToken || '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        
        setProfileImage(null);
        await refreshAllUserData();
      } catch (error: any) {
        console.error('Error deleting profile image:', error);
        setError(error.response?.data?.message || 'Failed to delete profile image');
      }
    } else {
      setProfileImage(fileUrl);
      await refreshAllUserData();
    }
  };
  const handleProfileImageError = (error: string) => setError(error);
  
  const handleAddSkillWithClose = async (skillData: { skill: string; isNewSkill: boolean }) => {
    try {
      await handleAddSkill(skillData);
      setIsAddingSkill(false);
    } catch (error) {
    }
  };
  
  const handleAddProjectWithClose = async (projectData: any) => {
    try {
      await handleAddProject(projectData);
      setIsAddingProject(false);
    } catch (error) {
    }
  };

  const handleAddProfessionWithClose = async (profession: string, isNewProfession: boolean) => {
    try {
      await handleAddProfession({ profession, isNewProfession });
      setIsAddingProfession(false);
    } catch (error) {
    }
  };

  const handleAddLocationWithClose = async (city: string, country: string, isNewLocation: boolean) => {
    try {
      await handleAddLocation({ city, country, isNewLocation });
      setIsAddingLocation(false);
    } catch (error: any) {
      console.error('Location update failed:', error);
      // Error is already set by handleAddLocation, so we don't need to set it again
      // The modal will stay open so the user can see the error and try again
    }
  };

  if (isLoadingSkills || isLoadingProjects) {
    return (
      <Section>
        <Container>
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className="max-w-6xl mx-auto">
          <DashboardHeader 
            onLogout={handleLogout} 
            onDeleteAccount={() => setIsDeleteAccountModalOpen(true)}
            skillsCount={userSkills.length}
            projectsCount={projects.length}
          />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <ProfileSection
                user={user!}
                userInfo={userInfo}
                profileImage={profileImage}
                onEditProfile={handleEditProfile}
                onProfileImageUpload={handleProfileImageUpload}
                onProfileImageError={handleProfileImageError}
              />
            </div>

            {/* Right Column - Profession, Location, Skills, Projects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top Row - Profession and Location */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <ProfessionSection
                    profession={profession}
                    onAddProfession={() => setIsAddingProfession(true)}
                  />
                </div>
                <div className="flex-1">
                  <LocationSection
                    location={location}
                    onAddLocation={() => setIsAddingLocation(true)}
                  />
                </div>
              </div>

              {/* Skills Section */}
              <SkillsSection
                userSkills={userSkills}
                isLoadingSkills={isLoadingSkills}
                onAddSkill={() => setIsAddingSkill(true)}
                onRemoveSkill={handleRemoveSkill}
              />

              {/* Projects Section */}
              <ProjectsSection
                projects={projects}
                isLoadingProjects={isLoadingProjects}
                onAddProject={() => setIsAddingProject(true)}
                onRemoveProject={handleRemoveProject}
              />
            </div>
          </div>

          {/* Modals */}
          <EditProfileModal
            isOpen={isEditingProfile}
            onClose={() => setIsEditingProfile(false)}
            onSave={handleSaveProfile}
            initialData={{
              tagline: userInfo?.tagline || '',
              description: userInfo?.description || '',
              status: userInfo?.status || 'available',
              profession_id: userInfo?.profession_id?.toString() || '',
              location_id: userInfo?.location_id?.toString() || '',
              github_link: userInfo?.github_link || '',
              linkedin_link: userInfo?.linkedin_link || '',
              portfolio_link: userInfo?.portfolio_link || '',
              started_date: userInfo?.started_date ? new Date(userInfo.started_date).toISOString().split('T')[0] : '',
            }}
            isLoading={false}
            professions={[]}
            locations={[]}
          />

          <AddSkillModal
            isOpen={isAddingSkill}
            onClose={() => setIsAddingSkill(false)}
            onAddSkill={handleAddSkillWithClose}
            userSkills={userSkills}
            isLoading={false}
            allSkills={allSkills}
          />

          <AddProjectModal
            isOpen={isAddingProject}
            onClose={() => setIsAddingProject(false)}
            onAddProject={handleAddProjectWithClose}
            isLoading={false}
            userSkills={userSkills}
          />

          <AddProfessionModal
            isOpen={isAddingProfession}
            onClose={() => setIsAddingProfession(false)}
            onAdd={handleAddProfessionWithClose}
            existingProfessions={professions}
            isLoading={false}
          />

          <AddLocationModal
            isOpen={isAddingLocation}
            onClose={() => setIsAddingLocation(false)}
            onAdd={handleAddLocationWithClose}
            existingLocations={locations}
            isLoading={false}
          />

          <DeleteAccountModal
            isOpen={isDeleteAccountModalOpen}
            onClose={() => setIsDeleteAccountModalOpen(false)}
            onDeleteAccount={handleDeleteAccount}
            isLoading={isDeletingAccount}
          />
        </div>
      </Container>
    </Section>
  );
};

export default Dashboard; 