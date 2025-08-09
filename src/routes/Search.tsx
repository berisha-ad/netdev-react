import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/shared/Container";
import Section from "../components/shared/Section";
import BorderBox from "../components/shared/BorderBox";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import PrimaryBtn from "../components/shared/PrimaryBtn";
import SecondaryBtn from "../components/shared/SecondaryBtn";
import Pagination from "../components/shared/Pagination";
import DeveloperCard from "../components/home/DeveloperCard";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const {
    users,
    skills,
    professions,
    locations,
    pagination,
    currentPage,
    perPage,
    isLoading,
    error,
    searchText,
    selectedSkills,
    selectedProfession,
    selectedLocation,
    selectedCity,
    selectedCountry,
    setSearchText,
    setSelectedSkills,
    setSelectedProfession,
    setSelectedLocation,
    setSelectedCity,
    setSelectedCountry,
    handleSkillToggle,
    clearFilters,
    performSearch,
    setError,
    goToPage,
    changePerPage
  } = useSearch();

  useEffect(() => {
    performSearch();
  }, [searchText, selectedSkills, selectedProfession, selectedLocation, selectedCity, selectedCountry, currentPage, perPage]);

  return (
    <Section>
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold source-code mb-4">Search Developers</h1>
            <p className="text-gray-600">
              Find developers by skills, location, profession, and more
            </p>
          </div>

          {/* Search Filters */}
          <div className="mb-8">
            <BorderBox>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <Input
                    label="Search by name or username"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="e.g., John, john_doe"
                  />

                  <Select
                    name="profession"
                    label="Profession"
                    value={selectedProfession}
                    onChange={(e) => setSelectedProfession(e.target.value)}
                    options={[
                      { value: '', label: 'All professions' },
                      ...professions.map(prof => ({ 
                        value: prof.id.toString(), 
                        label: prof.profession 
                      }))
                    ]}
                  />

                  <Select
                    name="location"
                    label="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    options={[
                      { value: '', label: 'All locations' },
                      ...locations.map(loc => ({ 
                        value: loc.id.toString(), 
                        label: `${loc.city}, ${loc.country}` 
                      }))
                    ]}
                  />
                </div>

                {/* Skills Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => handleSkillToggle(skill.id.toString())}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                          selectedSkills.includes(skill.id.toString())
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill.skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <SecondaryBtn
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </SecondaryBtn>
                  <PrimaryBtn
                    onClick={performSearch}
                  >
                    Search
                  </PrimaryBtn>
                </div>
              </div>
            </BorderBox>
          </div>

          {/* Search Results */}
          <div>
            {error && (
              <ErrorMessage
                message={error}
                onRetry={() => performSearch()}
                className="mb-6"
              />
            )}

            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : users.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((user) => (
                    <DeveloperCard key={user.id} user={user} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  lastPage={pagination.last_page}
                  total={pagination.total}
                  perPage={perPage}
                  onPageChange={goToPage}
                  onPerPageChange={changePerPage}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <BorderBox>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search criteria or filters to find more developers.
                    </p>
                                          <PrimaryBtn
                        onClick={clearFilters}
                      >
                        Clear All Filters
                      </PrimaryBtn>
                  </div>
                </BorderBox>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Search; 