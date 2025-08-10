import { useParams, Link } from "react-router-dom";
import Container from "../components/shared/Container";
import Section from "../components/shared/Section";
import BorderBox from "../components/shared/BorderBox";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import { getProfileImageUrl } from "../utils/profileImage";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { user, userInfo, skills, projects, isLoading, error } = useProfile(username);

  if (isLoading) {
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

  if (error) {
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <ErrorMessage
              message={error}
              className="mb-6"
            />
            <Link 
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  if (!user) {
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <BorderBox>
              <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h1>
                <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
                <Link 
                  to="/"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </BorderBox>
          </div>
        </Container>
      </Section>
    );
  }

  const profileImageUrl = user.profile_image || getProfileImageUrl(user.id);



  return (
    <Section>
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-8">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl"></div>
            
            {/* Profile Header */}
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={profileImageUrl}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-2xl md:text-3xl border-4 border-white shadow-lg"
                      style={{ display: 'none' }}
                    >
                      {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold source-code mb-2">
                    {user.first_name} {user.last_name}
                  </h1>
                  <p className="text-blue-100 text-lg mb-3">@{user.username}</p>
                  {userInfo?.tagline && (
                    <p className="text-xl text-blue-100 mb-4">{userInfo.tagline}</p>
                  )}
                  
                  {/* Professional Details */}
                  <div className="flex flex-wrap gap-4 mb-4 text-blue-100">
                    {userInfo?.profession && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                        <span>{userInfo.profession.profession}</span>
                      </div>
                    )}
                    {userInfo?.location && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{userInfo.location.city}, {userInfo.location.country}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Status Badge */}
                  {userInfo?.status && (
                    <div className="inline-block mb-4">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium capitalize ${
                        userInfo.status === 'available' 
                          ? 'bg-green-500 text-white'
                          : userInfo.status === 'open to work'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}>
                        {userInfo.status}
                      </span>
                    </div>
                  )}

                  {/* Contact Button */}
                  <div className="mt-4">
                    <a
                      href={`mailto:${user.email}?subject=Hello ${user.first_name} - I found you on NetDev`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact This Dev
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex-shrink-0">
                  <div className="flex space-x-3">
                    {userInfo?.github_link && (
                      <a 
                        href={userInfo.github_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        title="GitHub Profile"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {userInfo?.linkedin_link && (
                      <a 
                        href={userInfo.linkedin_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {userInfo?.portfolio_link && (
                      <a 
                        href={userInfo.portfolio_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        title="Portfolio Website"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9H3"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - About & Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* About Section */}
              {userInfo?.description && (
                <BorderBox>
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed">{userInfo.description}</p>
                </BorderBox>
              )}

              {/* Professional Information */}
              <BorderBox>
                <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
                <div className="space-y-4">
                  {userInfo?.profession && (
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Profession</span>
                      <p className="font-medium text-gray-900">{userInfo.profession.profession}</p>
                    </div>
                  )}
                  {userInfo?.location && (
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Location</span>
                      <p className="font-medium text-gray-900">{userInfo.location.city}, {userInfo.location.country}</p>
                    </div>
                  )}
                  {userInfo?.started_date && (
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Started</span>
                      <p className="font-medium text-gray-900">{new Date(userInfo.started_date).toLocaleDateString()}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">Member Since</span>
                    <p className="font-medium text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </BorderBox>

              {/* Contact Information */}
              <BorderBox>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">Email</span>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{user.email}</p>
                      <a
                        href={`mailto:${user.email}?subject=Hello ${user.first_name} - I found you on NetDev`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Send email"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  {(userInfo?.github_link || userInfo?.linkedin_link || userInfo?.portfolio_link) && (
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Social Links</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userInfo?.github_link && (
                          <a 
                            href={userInfo.github_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                        )}
                        {userInfo?.linkedin_link && (
                          <a 
                            href={userInfo.linkedin_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </a>
                        )}
                        {userInfo?.portfolio_link && (
                          <a 
                            href={userInfo.portfolio_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9H3"/>
                            </svg>
                            Portfolio
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </BorderBox>

              {/* Skills Section */}
              <BorderBox>
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill.skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills listed yet.</p>
                )}
              </BorderBox>
            </div>

            {/* Right Column - Projects */}
            <div className="lg:col-span-2">
              <BorderBox>
                <h2 className="text-xl font-semibold mb-6">Projects</h2>
                {projects.length > 0 ? (
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{project.name}</h3>
                            <p className="text-gray-600 text-sm">{new Date(project.date).toLocaleDateString()}</p>
                          </div>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              View Project
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                        {project.skills && project.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
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
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-gray-500">No projects listed yet.</p>
                  </div>
                )}
              </BorderBox>
            </div>
          </div>

          {/* Back to Search */}
          <div className="mt-12 text-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Search
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Profile; 