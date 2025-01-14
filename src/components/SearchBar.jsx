import React from 'react'
import '../css/SearchBar.css'

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="You're looking for something?"
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar

