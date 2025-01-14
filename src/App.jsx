import React, { useState } from 'react'
import Logo from './components/Logo'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'
import './App.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <header className="header">
        <Logo />
        <SearchBar onSearch={setSearchTerm} />
      </header>
      <ImageGrid searchTerm={searchTerm} />
    </div>
  )
}

export default App
