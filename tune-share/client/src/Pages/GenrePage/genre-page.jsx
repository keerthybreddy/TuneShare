import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./genre-page.css";

export function GenrePage() {
    const [Artists, setArtists] = useState([]);
    const [Albums, setAlbums] = useState([]);
    const [Songs, setSongs] = useState([]);
    const [Playlists, setPlaylists] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState({});
    const [hovering, setHovering] = useState(null);

    let { genreIDParam } = useParams();

    useEffect(() => {
        axios
            .post(`http://localhost:5000/genre-page/${genreIDParam}`, {})
            .then((data) => {
                console.log("Response from server:", data.data);

                const artists = [];
                const albums = [];
                const songs = [];

                data.data.forEach((item) => {
                    if (!artists.some((a) => a.ArtistID === item.ArtistID)) {
                        artists.push({
                            ArtistID: item.ArtistID,
                            ArtistName: item.ArtistName,
                        });
                    }
                    if (!albums.some((a) => a.AlbumID === item.AlbumID)) {
                        albums.push({
                            AlbumID: item.AlbumID,
                            AlbumName: item.AlbumName,
                        });
                    }
                    songs.push({
                        SongID: item.SongID,
                        SongName: item.SongName,
                        AlbumName: item.AlbumName,
                        ArtistName: item.ArtistName,
                    });
                });

                setArtists(artists);
                setAlbums(albums);
                setSongs(songs);
            })
            .catch((error) => {
                console.error("Error fetching genre data:", error);
            });

        axios
            .get("http://localhost:5000/fetch-playlists")
            .then((response) => {
                setPlaylists(response.data);
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
            });
    }, [genreIDParam]);

    const handleAddToPlaylist = (playlistID, songID) => {
        axios
            .post("http://localhost:5000/add-song-to-playlist", {
                playlistID,
                songID,
            })
            .then(() => {
                alert("Song added to playlist successfully!");
            })
            .catch((error) => {
                console.error("Error adding song to playlist:", error);
                alert("Failed to add song to playlist.");
            });
    };

    const toggleDropdown = (songID) => {
        setDropdownVisible((prevState) => ({
            ...prevState,
            [songID]: !prevState[songID],
        }));
    };

    const handleMouseEnter = (songID) => {
        setHovering(songID);
    };

    const handleMouseLeave = (songID) => {
        setTimeout(() => {
            if (hovering === songID) {
                setDropdownVisible((prevState) => ({
                    ...prevState,
                    [songID]: false,
                }));
                setHovering(null);
            }
        }, 200);
    };

    return (
        <div className="genre-page">
            <h1>Genre ID: {genreIDParam}</h1>
            <h1>Artists</h1>
            <ul className="artist-list">
                {Artists.map((artist) => (
                    <li key={artist.ArtistID} className="artist-item">
                        <Link to={`/artist-profile/${artist.ArtistID}`}>
                            {artist.ArtistName}
                        </Link>
                    </li>
                ))}
            </ul>
            <h1>Albums</h1>
            <ul className="album-list">
                {Albums.map((album) => (
                    <li key={album.AlbumID} className="album-item">
                        <Link to={`/album-page/${album.AlbumID}`}>
                            {album.AlbumName}
                        </Link>
                    </li>
                ))}
            </ul>
            <h1>Songs</h1>
            <ul className="song-list-genre">
                {Songs.map((song) => (
                    <li
                        key={song.SongID}
                        className="song-item-genre"
                        onMouseEnter={() => handleMouseEnter(song.SongID)}
                        onMouseLeave={() => handleMouseLeave(song.SongID)}
                    >
                        <div className="song-details">
                            <span className="song-name">{song.SongName}</span>
                        </div>
                        <button
                            className="add-button-genre"
                            onClick={() => toggleDropdown(song.SongID)}
                        >
                            ➕
                        </button>
                        {dropdownVisible[song.SongID] && (
                            <div
                                className="dropdown-menu-genre"
                                onMouseEnter={() => handleMouseEnter(song.SongID)}
                                onMouseLeave={() => handleMouseLeave(song.SongID)}
                            >
                                {Playlists.map((playlist) => (
                                    <button
                                        key={playlist.PlaylistID}
                                        className="dropdown-item-genre"
                                        onClick={() =>
                                            handleAddToPlaylist(
                                                playlist.PlaylistID,
                                                song.SongID
                                            )
                                        }
                                    >
                                        Add to {playlist.PlaylistName}
                                    </button>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
