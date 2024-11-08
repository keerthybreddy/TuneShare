import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { UserLogin } from './Pages/user-login'
import { UserProfile } from './Pages/user-profile'
import { ArtistProfile } from './Pages/artist-profile'
import { PlaylistPage } from './Pages/playlist-page'
import { AlbumPage } from './Pages/album-page'
import {RegistrationPage} from "./Pages/registration-page";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />}/>
        <Route path="registration-page" element={<RegistrationPage />}/>
        <Route path="/user-profile" element={<UserProfile />}/>
        <Route path="/artist-profile" element={<ArtistProfile />}/>
        <Route path="/playlist-page" element={<PlaylistPage />}/>
        <Route path="/album-page" element={<AlbumPage />}/>
      </Routes>
    </Router>



  )
}

export default App;
