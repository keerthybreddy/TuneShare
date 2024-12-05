import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from "../../context/AuthContext";


export function ArtistProfile() {
    const [albums, setAlbums] = useState([]); // Array of albums with details
    const [songs, setSongs] = useState([]); // Array of songs with details
    const [artistName, setArtistName] = useState(''); // Artist's name
    const [genre, setGenre] = useState(''); // Artist's genre
    const [artistProfile, setArtistProfile] = useState(""); // State for artist profile picture
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();

    const maxAlbumPages = 6;
    let { artistIDParam } = useParams(); // Get artist ID from the URL


    useEffect(() => {
        axios
            .post(`http://localhost:5000/artist-profile/${artistIDParam}`)
            .then((response) => {
                const data = response.data;
                if (data.length > 0) {
                    // Set artist name, genre, and profile image
                    setArtistName(data[0].ArtistName);
                    setGenre(data[0].GenreName);
                    setArtistProfile(data[0].ArtistProfile); // Set artist profile image

                    // Process albums and songs
                    const albumList = [];
                    const songList = [];

                    data.forEach((item) => {
                        // Add unique albums
                        if (!albumList.some((album) => album.id === item.AlbumID)) {
                            albumList.push({
                                id: item.AlbumID,
                                name: item.AlbumName,
                                image: item.AlbumCover, // Use AlbumCover from the response
                            });
                        }

                        // Add songs
                        songList.push({
                            id: item.SongID,
                            name: item.SongName,
                            albumID: item.AlbumID,
                            cover: item.SongCover, // Use SongCover from the response
                        });
                    });

                    // Update state
                    setAlbums(albumList);
                    setSongs(songList);
                }
            })
            .catch((error) => {
                console.error("Error fetching artist profile:", error);
            });
    }, [artistIDParam]);


    const handleBack = () => {
        let currentID = parseInt(artistIDParam, 10);
        let previousID = currentID === 1 ? maxAlbumPages : currentID - 1;
        navigate(`/artist-profile/${previousID}`);
    };

    // Handle navigation to next page
    const handleNext = () => {
        let currentID = parseInt(artistIDParam, 10);
        let nextID = currentID === maxAlbumPages ? 1 : currentID + 1;
        navigate(`/artist-profile/${nextID}`);
    };

    const handleMenu = () => {
        navigate('/user-profile/', { state: { username: currentUser.username } });
    }

    return (
        <div className="artist-container">
            <div className="artist-header">
                <img
                    src={artistProfile || "/assets/default-profile.jpg"} // Fallback to default if artistProfile is empty
                    alt={`${artistName}-profile`}
                    className="artist-picture"
                />
                <h1 className="artist-name">{artistName}</h1>
            </div>
            <div className="artist-content">
                <div className="popular-songs">
                    <h2>Popular Songs</h2>
                    <ul className="song-list">
                        {songs.map((song, index) => (
                            <li key={index} className="song-item">
                                <img src={song.cover} alt="song-thumbnail" className="song-image" />
                                <a href={`http://localhost:3000/#/song/${song.id}`} className="song-name">
                                    {song.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="artist-albums">
                    <h2>Albums</h2>
                    <ul className="album-list">
                        {albums.map((album, index) => (
                            <li key={index} className="album-item">
                                <img src={album.image} alt="album-thumbnail" className="album-image" />
                                <div className="album-name">
                                    <a href={`http://localhost:3000/#/album-page/${album.id}`}>{album.name}</a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="genre">
                    <h2>Genre</h2>
                    <p>{genre}</p>
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={handleBack}> Back </button>
                <button onClick={handleMenu}> Menu </button>
                <button onClick={handleNext}> Next </button>
            </div>
        </div>
    );
}