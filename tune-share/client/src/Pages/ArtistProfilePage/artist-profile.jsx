import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import pfp from "./sza-profile.jpeg";
import "./artist-profile.css";

export function ArtistProfile() {
    const [albums, setAlbums] = useState([]); // Array of albums with details
    const [songs, setSongs] = useState([]); // Array of songs with details
    const [artistName, setArtistName] = useState(''); // Artist's name
    const [genre, setGenre] = useState(''); // Artist's genre

    let { artistIDParam } = useParams(); // Get artist ID from the URL

    useEffect(() => {
        axios
            .post(`http://localhost:5000/artist-profile/${artistIDParam}`)
            .then((response) => {
                const data = response.data;

                if (data.length > 0) {
                    // Set artist name and genre
                    setArtistName(data[0].ArtistName);
                    setGenre(data[0].GenreName);

                    // Process albums and songs
                    const albumList = [];
                    const songList = [];

                    data.forEach((item) => {
                        if (!albumList.some((album) => album.id === item.AlbumID)) {
                            albumList.push({
                                id: item.AlbumID,
                                name: item.AlbumName,
                                image: item.AlbumImage || "default-album.jpg", // Placeholder if no image
                            });
                        }

                        songList.push({
                            id: item.SongID,
                            name: item.SongName,
                            albumID: item.AlbumID,
                            image: item.SongImage || "default-song.jpg", // Placeholder if no image
                        });
                    });

                    setAlbums(albumList); // Update albums state
                    setSongs(songList); // Update songs state
                }
            })
            .catch((error) => {
                console.error("Error fetching artist profile:", error);
            });
    }, [artistIDParam]);

    return (
        <div className="artist-container">
            <div className="artist-header">
                <img src={pfp} alt="artist" className="artist-picture" />
                <h1 className="artist-name">{artistName}</h1>
            </div>
            <div className="artist-content">
                <div className="popular-songs">
                    <h2>Popular Songs</h2>
                    <ul className="song-list">
                        {songs.map((song, index) => (
                            <li key={index} className="song-item">
                                <img src={song.image} alt="song-thumbnail" className="song-image" />
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
        </div>
    );
}