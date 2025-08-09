import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/shared/Container';
import Section from '../components/shared/Section';
import BorderBox from '../components/shared/BorderBox';

const About = () => {
  return (
    <Section>
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold source-code mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              About NetDev
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connecting developers worldwide through skills, projects, and collaboration. 
              NetDev is the premier platform for developers to showcase their expertise, 
              discover talented peers, and build meaningful professional relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <BorderBox>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold source-code">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To create the world's most comprehensive developer networking platform, 
                  where talent meets opportunity and innovation thrives through meaningful 
                  connections and collaboration.
                </p>
              </div>
            </BorderBox>

            <BorderBox>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold source-code">Our Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  A world where every developer can easily discover, connect with, and 
                  collaborate with peers who share their passion for technology and innovation.
                </p>
              </div>
            </BorderBox>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold source-code text-center mb-12">Why Choose NetDev?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BorderBox>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Global Network</h3>
                  <p className="text-gray-600">
                    Connect with developers from around the world, share knowledge, and build 
                    meaningful professional relationships.
                  </p>
                </div>
              </BorderBox>

              <BorderBox>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Skill Discovery</h3>
                  <p className="text-gray-600">
                    Find developers with specific skills, explore new technologies, and discover 
                    the perfect collaborators for your projects.
                  </p>
                </div>
              </BorderBox>

              <BorderBox>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Project Showcase</h3>
                  <p className="text-gray-600">
                    Showcase your projects, get feedback from peers, and discover exciting 
                    opportunities to collaborate on innovative solutions.
                  </p>
                </div>
              </BorderBox>

              <BorderBox>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
                  <p className="text-gray-600">
                    Build your professional brand, connect with industry leaders, and discover 
                    new career opportunities in the tech industry.
                  </p>
                </div>
              </BorderBox>

              <BorderBox>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Community First</h3>
                  <p className="text-gray-600">
                    Join a supportive community of developers who share your passion for 
                    technology and innovation.
                  </p>
                </div>
              </BorderBox>

              <BorderBox>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                  <p className="text-gray-600">
                    Your data is protected with industry-standard security measures. 
                    Control your privacy and share only what you want.
                  </p>
                </div>
              </BorderBox>
            </div>
          </div>

          <div className="mb-16">
            <BorderBox>
              <div className="p-8">
                <h2 className="text-3xl font-bold source-code text-center mb-8">NetDev by the Numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                    <div className="text-gray-600">Developers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-gray-600">Skills</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
                    <div className="text-gray-600">Countries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
                    <div className="text-gray-600">Connections Made</div>
                  </div>
                </div>
              </div>
            </BorderBox>
          </div>

          <div className="text-center mb-16">
            <BorderBox>
              <div className="p-12">
                <h2 className="text-3xl font-bold source-code mb-4">Ready to Join NetDev?</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Start building your professional network, showcase your skills, and connect 
                  with developers from around the world.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Join as a Developer
                  </Link>
                  <Link
                    to="/"
                    className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Explore Developers
                  </Link>
                </div>
              </div>
            </BorderBox>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
