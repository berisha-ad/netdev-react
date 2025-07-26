import { Link } from "react-router";

const DeveloperCard = () => {
  return (
    <Link className="developer-card rounded-lg" to="/about">
      <div className="flex gap-4 justify-between bg-white custom-border p-4 rounded-lg shadow-md">
        <div className="">
          <h3 className="text-lg font-semibold">Developer</h3>
          <p>Details about the developer...</p>
          <p className="text-sm">Vienna</p>
          <span className="text-gray-500 text-sm">2 minutes ago</span>
        </div>
        <img
          src="https://placehold.co/50x50"
          alt="Developer Avatar"
          className="h-15 w-15 object-cover rounded-full"
        />
      </div>
    </Link>
  );
};

export default DeveloperCard;
