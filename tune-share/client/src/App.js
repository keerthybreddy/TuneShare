import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { UserLogin } from './Pages/UserLoginPage/user-login'
import { UserProfile } from './Pages/UserProfilePage/user-profile'
import { ArtistProfile } from './Pages/ArtistProfilePage/artist-profile'
import { PlaylistPage } from './Pages/PlaylistPage/playlist-page'
import { AlbumPage } from './Pages/AlbumPage/album-page'
import {RegistrationPage} from "./Pages/RegistrationPage/registration-page";
import { useEffect, useState } from 'react'

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
      <div>
        {(typeof backendData.users === 'undefined') ? (
          <p>Loading...</p>
        ): (
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin/>} />
          <Route path="/user-login-page" element={<UserLogin />}/>
          <Route path="registration-page" element={<RegistrationPage />}/>
          <Route path="/user-profile" element={<UserProfile />}/>
          <Route path="/artist-profile" element={<ArtistProfile />}/>
          <Route path="/playlist-page" element={<PlaylistPage />}/>
          <Route path="/album-page" element={<AlbumPage />}/>
        </Routes>
      </Router>

    </div>

  )
}

export default App;
