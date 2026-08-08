// function SearchBar({ searchTerm, setSearchTerm }) {
//   return (
//     <div className="search-box">
//       <input
//         type="text"
//         placeholder="🔍 Search offers, business or category..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   );
// }

// export default SearchBar;

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search offers, businesses or categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <button
          className="clear-btn"
          onClick={() => setSearchTerm("")}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;