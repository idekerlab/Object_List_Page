import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, searchType: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("quick");

  const handleSearch = () => {
    onSearch(query, searchType);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case "sql":
        return "Enter SQL WHERE clause...";
      case "advanced":
        return "Enter advanced search query...";
      default:
        return "Search by name, ID, or content...";
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="text"
        placeholder={getPlaceholder()}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="quick">Quick Search</option>
        <option value="advanced">Advanced Search</option>
        <option value="sql">SQL Query</option>
      </select>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
