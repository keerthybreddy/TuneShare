import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { UserLogin } from './Pages/UserLoginPage/user-login'
import { UserProfile } from './Pages/UserProfilePage/user-profile'
import { ArtistProfile } from './Pages/ArtistProfilePage/artist-profile'
import { PlaylistPage } from './Pages/PlaylistPage/playlist-page'
import { AlbumPage } from './Pages/AlbumPage/album-page'
import {RegistrationPage} from "./Pages/RegistrationPage/registration-page";
import {CatalogPage} from "./Pages/CatalogPage/catalog-page";
import {UsersPage} from "./Pages/UsersPage/users-page";
import {GenrePage} from "./Pages/GenrePage/genre-page";
import axios from 'axios';
import {AuthProvider} from "./context/AuthContext";

function App() {

  const apiCall = () => {
    axios.get('http://localhost:5000').then((data) => {
    })
  }


  // wrap in AuthProvider to pass currentUser globally
  return (
    <div>
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<UserLogin/>} />
                  <Route path="/user-login-page" element={<UserLogin />}/>
                  <Route path="/registration-page" element={<RegistrationPage />}/>
                  <Route path="/user-profile" element={<UserProfile />}/>
                  <Route path="/artist-profile/:artistIDParam" element={<ArtistProfile />}/>
                  <Route path="/playlist-page" element={<PlaylistPage />}/>
                  <Route path="/album-page/:albumIDParam" element={<AlbumPage />}/>
                  <Route path="/users-page/" element={<UsersPage />}/>
                  <Route path="/catalog-page" element={<CatalogPage />}/>
                  <Route path="/genre-page/:genreIDParam" element={<GenrePage />}/>
              </Routes>
          </Router>
      </AuthProvider>
    </div>

  )
}

export default App;
