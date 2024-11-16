import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { UserLogin } from './Pages/UserLoginPage/user-login'
import { UserProfile } from './Pages/UserProfilePage/user-profile'
import { ArtistProfile } from './Pages/ArtistProfilePage/artist-profile'
import { PlaylistPage } from './Pages/PlaylistPage/playlist-page'
import { AlbumPage } from './Pages/AlbumPage/album-page'
import {RegistrationPage} from "./Pages/RegistrationPage/registration-page";
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  const apiCall = () => {
    axios.get('http://localhost:5000').then((data) => {
      console.log(data)
    })
  }

  return (
    <div>
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
