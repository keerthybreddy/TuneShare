import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import "./album-page.css";
import "../ArtistProfilePage/artist-profile.css";
import { useAuthContext } from "../../context/AuthContext";


export function AlbumPage() {
    // State variables to store album data
    const { currentUser } = useAuthContext();
    const [AlbumName, setAlbumName] = useState("");
    const [ArtistName, setArtistName] = useState("");
    const [ArtistProfile, setArtistProfile] = useState(""); // Store artist profile picture
    const [Songs, setSongs] = useState([]); // Array to hold songs with IDs, names, and covers

    let { albumIDParam } = useParams(); // Extract albumIDParam from URL parameters
    const navigate = useNavigate();

    const maxAlbumPages = 5;

    useEffect(() => {
        // Fetch album data
        axios
            .post(`http://localhost:5000/album-page/${albumIDParam}`)
            .then((response) => {
                const data = response.data;

                // Set album, artist, and song details
                if (data.length > 0) {
                    setAlbumName(data[0].AlbumName || "");
                    setArtistName(data[0].ArtistName || "");
                    setArtistProfile(data[0].ArtistProfile || "/assets/default-artist-profile.jpg"); // Fallback image for artist

                    // Map songs into an array of objects
                    const songs = data.map((song) => ({
                        id: song.SongID,
                        name: song.SongName,
                        cover: song.SongCover || "/assets/default-song-cover.jpg", // Fallback image for songs
                    }));
                    setSongs(songs);
                }
            })
            .catch((error) => {
                console.error("Error fetching album data:", error);
            });
    }, [albumIDParam]);

    // Handle navigation to previous page
    const handleBack = () => {
        let currentID = parseInt(albumIDParam, 10);
        let previousID = currentID === 1 ? maxAlbumPages : currentID - 1;
        navigate(`/album-page/${previousID}`);
    };

    // Handle navigation to next page
    const handleNext = () => {
        let currentID = parseInt(albumIDParam, 10);
        let nextID = currentID === maxAlbumPages ? 1 : currentID + 1;
        navigate(`/album-page/${nextID}`);
    };

    const handleMenu = () => {
        navigate('/user-profile/', { state: { username: currentUser.username } });
    };



    return (
        <div className="artist-container">
            <div className="artist-header">
                <img
                    src={ArtistProfile}
                    alt={`${ArtistName}-profile`}
                    className="artist-picture"
                />
                <h1 className="artist-name">{AlbumName || 'Loading Album...'}</h1>
                <h2 className="artist-name">{ArtistName || 'Loading Artist...'}</h2>
            </div>
            <div className="album-content">
                <h1>Album Songs</h1>
                <ul className="album-songs">
                    {Songs.length > 0 ? (
                        Songs.map((song) => (
                            <li key={song.id} className="song-item">
                                <img
                                    src={song.cover}
                                    alt={`${song.name}-cover`}
                                    className="song-image"
                                />
                                <span>{song.name}</span>
                            </li>
                        ))
                    ) : (
                        <li>Loading Songs...</li>
                    )}
                </ul>
            </div>
            <div className="navigation-buttons">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleMenu}>Menu</button>
                <button onClick={handleNext}>Next</button>
            </div>

        </div>
    );
}
