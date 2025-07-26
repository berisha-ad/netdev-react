const SearchBar = () => {
  return (
    <form className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search for developers..."
        className="bg-white custom-border p-2 rounded-l-lg w-100"
      />
      <button className="px-6 p-2 bg-blue-400 text-white rounded-r-lg hover:bg-blue-300 cursor-pointer transition-all duration-150">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
