import DeveloperCard from "./DeveloperCard";

const DeveloperGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
      <DeveloperCard />
      <DeveloperCard />
      <DeveloperCard />
    </div>
  );
};

export default DeveloperGrid;
