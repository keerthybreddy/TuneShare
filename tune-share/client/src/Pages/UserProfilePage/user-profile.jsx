import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './user-profile.css';
import pfp from "../ArtistProfilePage/sza-profile.jpeg";
import {useAuthContext} from "../../context/AuthContext";
import {useEffect} from "react";

export function UserProfile() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {username} = state;

    return (
        <div className="user-profile-container">
            <div className="user-profile-header">
                <h1 className="user-name">Welcome, {username}!</h1>
            </div>

            <div className="user-profile-content">
                <div className="user-profile-sidebar">
                    <button onClick={() => navigate('/album-page/1')}>Albums Page</button>
                    <button onClick={() => navigate('/artist-profile/1')}>Artist Profile</button>
                    <button onClick={() => navigate('/users-page/')}>Users Page</button>
                    <button onClick={() => navigate('/catalog-page/')}>Catalog Page</button>
                </div>
                <h1>Liked Songs</h1>
                <h1>Friends List</h1>
            </div>
        </div>
    )
}