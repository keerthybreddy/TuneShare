import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./genre-page.css";

export function GenrePage() {
    const [genreName, setGenreName] = useState("");
    const [Artists, setArtists] = useState([]);
    const [Albums, setAlbums] = useState([]);
    const [Songs, setSongs] = useState([]);
    const [Playlists, setPlaylists] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState({});
    const [hovering, setHovering] = useState(null);
    const [showNavigation, setShowNavigation] = useState(false);

    const { currentUser } = useAuthContext();
    const navigate = useNavigate();
    let { genreIDParam } = useParams();

    const maxGenrePages = 5;

    useEffect(() => {
        axios
            .post(`http://localhost:5000/genre-page/${genreIDParam}`, {})
            .then((response) => {
                const data = response.data;

                if (data.length > 0) {
                    const genre = data[0].GenreName;
                    const artists = [];
                    const albums = [];
                    const songs = [];

                    data.forEach((item) => {
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
                        });
                    });

                    setGenreName(genre);
                    setArtists(artists);
                    setAlbums(albums);
                    setSongs(songs);
                }
            })
            .catch((error) => console.error("Error fetching genre data:", error));

        axios
            .get("http://localhost:5000/fetch-playlists")
            .then((response) => setPlaylists(response.data))
            .catch((error) => console.error("Error fetching playlists:", error));
    }, [genreIDParam]);

    const handleAddToPlaylist = (playlistID, songID) => {
        axios
            .post("http://localhost:5000/add-song-to-playlist", {
                playlistID,
                songID,
            })
            .then(() => alert("Song added to playlist successfully!"))
            .catch((error) => {
                console.error("Error adding song to playlist:", error);
                alert("Failed to add song to playlist.");
            });
    };

    const handleAddToLikedSongs = (songID) => {
        if (!currentUser) {
            alert("You need to be logged in to like songs.");
            return;
        }

        axios
            .post("http://localhost:5000/add-to-liked-songs", {
                userID: currentUser.username,
                songID,
            })
            .then(() => alert("Song added to Liked Songs successfully!"))
            .catch((error) => {
                console.error("Error adding song to liked songs:", error);
                alert("Failed to add song to Liked Songs.");
            });
    };

    const toggleDropdown = (songID) => {
        setDropdownVisible((prevState) => ({
            ...prevState,
            [songID]: !prevState[songID],
        }));
    };

    const handleBack = () => {
        let currentID = parseInt(genreIDParam, 10);
        let previousID = currentID === 1 ? maxGenrePages : currentID - 1;
        navigate(`/genre-page/${previousID}`);
    };

    const handleNext = () => {
        let currentID = parseInt(genreIDParam, 10);
        let nextID = currentID === maxGenrePages ? 1 : currentID + 1;
        navigate(`/genre-page/${nextID}`);
    };

    const handleMenu = () => {
        navigate('/user-profile/', { state: { username: currentUser?.username } });
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
            <header className="genre-header">
                <h1>{genreName}</h1>
                <button
                    className="waffle-button"
                    onClick={() => setShowNavigation((prev) => !prev)}
                >
                    {showNavigation ? "x" : "☰"}
                </button>
                {showNavigation && (
                    <div className="navigation-sidebar">
                        <button
                            onClick={() =>
                                navigate("/user-profile", {
                                    state: { username: currentUser?.username },
                                })
                            }
                        >
                            Profile
                        </button>
                        <button onClick={() => navigate("/album-page/1")}>Albums Page</button>
                        <button onClick={() => navigate("/artist-profile/1")}>Artist Profile</button>
                        <button onClick={() => navigate("/catalog-page/")}>Catalog Page</button>
                        <button onClick={() => navigate("/users-page/")}>Users Page</button>
                        <button onClick={() => navigate("/playlist-page/")}>Playlist Page</button>
                    </div>
                )}
            </header>
            <main className="genre-content">
                <div className="left-container">
                    <section className="genre-section">
                        <h2>Artists</h2>
                        <ul className="artist-list">
                            {Artists.map((artist) => (
                                <li key={artist.ArtistID} className="artist-item">
                                    <Link to={`/artist-profile/${artist.ArtistID}`}>
                                        {artist.ArtistName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="genre-section">
                        <h2>Albums</h2>
                        <ul className="album-list">
                            {Albums.map((album) => (
                                <li key={album.AlbumID} className="album-item">
                                    <Link to={`/album-page/${album.AlbumID}`}>
                                        {album.AlbumName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className="right-container">
                    <section className="genre-section">
                        <h2>Songs</h2>
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
                                            <button
                                                className="dropdown-item-genre"
                                                onClick={() =>
                                                    handleAddToLikedSongs(song.SongID)
                                                }
                                            >
                                                Add to Liked Songs
                                            </button>
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
                    </section>
                </div>
            </main>
            <div className="navigation-buttons">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleMenu}>Menu</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}
