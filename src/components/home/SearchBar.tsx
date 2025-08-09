import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center w-full max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for developers..."
        className="bg-white custom-border p-3 rounded-l-lg flex-1 min-w-0"
      />
      <button 
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 cursor-pointer transition-all duration-150 font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
