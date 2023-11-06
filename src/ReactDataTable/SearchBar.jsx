function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div>
            <label>Search:</label>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={e => onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;