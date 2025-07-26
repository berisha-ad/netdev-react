import Container from "../shared/Container";
import Section from "../shared/Section";
import DeveloperGrid from "./DeveloperGrid";

const RecentlyJoined = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-3xl font-bold mb-6">Recently Joined</h2>
        <DeveloperGrid />
      </Container>
    </Section>
  );
};

export default RecentlyJoined;
