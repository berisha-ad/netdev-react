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
