import Container from "../shared/Container";
import Section from "../shared/Section";
import SearchBar from "./SearchBar";

const SearchSection = () => {
  return (
    <Section className="h-[50vh]">
      <Container>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold mb-4">Search for Developers</h1>
          <p className="text-lg mb-8 source-code">
            Find the best developers for your projects
          </p>
          <SearchBar />
        </div>
      </Container>
    </Section>
  );
};

export default SearchSection;
