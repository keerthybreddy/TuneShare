import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./album-page.css";
import "../ArtistProfilePage/artist-profile.css";

export function AlbumPage() {
    // State variables to store album data
    const [AlbumName, setAlbumName] = useState('');
    const [ArtistName, setArtistName] = useState('');
    const [Songs, setSongs] = useState([]); // Array to hold songs with IDs and names

    let { albumIDParam } = useParams(); // Extract albumIDParam from URL parameters

    useEffect(() => {
        // Fetch album data
        axios
            .post(`http://localhost:5000/album-page/${albumIDParam}`)
            .then(response => {
                const data = response.data;

                // Set album and artist details
                if (data.length > 0) {
                    setAlbumName(data[0].AlbumName || '');
                    setArtistName(data[0].ArtistName || '');

                    // Map songs into an array of objects
                    const songs = data.map(song => ({
                        id: song.SongID,
                        name: song.SongName,
                    }));
                    setSongs(songs);
                }
            })
            .catch(error => {
                console.error('Error fetching album data:', error);
            });
    }, [albumIDParam]); // Runs when albumIDParam changes

    return (
        <div className="artist-container">
            <div className="artist-header">
                <img src="/assets/sza-profile.jpeg" alt="artist" className="artist-picture" />
                <h1 className="artist-name">{AlbumName || 'Loading Album...'}</h1>
                <h2 className="artist-name">{ArtistName || 'Loading Artist...'}</h2>
            </div>
            <div className="album-content">
                <h1>Album Songs</h1>
                <ul className="album-songs">
                    {Songs.length > 0 ? (
                        Songs.map(song => (
                            <li key={song.id}>
                                {song.id}. {song.name}
                            </li>
                        ))
                    ) : (
                        <li>Loading Songs...</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
