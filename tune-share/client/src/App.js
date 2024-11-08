import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { UserLogin } from './Pages/user-login'
import { UserProfile } from './Pages/user-profile'
import { ArtistProfile } from './Pages/artist-profile'
import { PlaylistPage } from './Pages/playlist-page'
import { AlbumPage } from './Pages/album-page'
import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />}/>
          <Route path="/user-profile" element={<UserProfile />}/>
          <Route path="/artist-profile" element={<ArtistProfile />}/>
          <Route path="playlist-page/" element={<PlaylistPage />}/>
          <Route path="album-page/" element={<AlbumPage />}/>
        </Routes>
      </Router>
    
      {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  )
}

export default App;
