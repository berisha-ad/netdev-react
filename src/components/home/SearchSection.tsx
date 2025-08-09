import { Link } from "react-router-dom";
import Container from "../shared/Container";
import Section from "../shared/Section";
import SearchBar from "./SearchBar";
import { useAuth } from "../../contexts/AuthContext";

const SearchSection = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Section className="min-h-[60vh]">
      <Container>
        <div className="flex flex-col items-center justify-center h-full py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 source-code">
              Find Your Perfect Developer
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Connect with talented developers from around the world
            </p>
            <p className="text-lg text-gray-500">
              Search by skills, location, profession, and more
            </p>
          </div>
          
          <div className="w-full max-w-2xl mb-8 flex justify-center">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link 
              to="/search"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Advanced Search with Filters
            </Link>
            {!isAuthenticated ? (
              <Link 
                to="/register"
                className="text-blue-600 hover:text-blue-700 underline font-medium"
              >
                Join as a Developer →
              </Link>
            ) : (
              <Link 
                to="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Go to Dashboard →
              </Link>
            )}
          </div>
          

        </div>
      </Container>
    </Section>
  );
};

export default SearchSection;
