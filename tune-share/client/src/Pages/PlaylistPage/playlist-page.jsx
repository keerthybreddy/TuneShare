import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import "./playlist-page.css";

export function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [songsByPlaylist, setSongsByPlaylist] = useState({});
  const [showNavigation, setShowNavigation] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-playlists")
      .then((response) => {
        setPlaylists(response.data);

        const fetchSongsPromises = response.data.map((playlist) =>
          axios
            .get(
              `http://localhost:5000/get-playlist-songs?playlistID=${playlist.PlaylistID}`
            )
            .then((res) => ({
              playlistID: playlist.PlaylistID,
              songs: res.data,
            }))
        );

        Promise.all(fetchSongsPromises).then((results) => {
          const songsMap = {};
          results.forEach(({ playlistID, songs }) => {
            songsMap[playlistID] = songs;
          });
          setSongsByPlaylist(songsMap);
        });
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  const removeSongFromPlaylist = async (playlistID, songID) => {
    try {
      await axios.post("http://localhost:5000/remove-song-from-playlist", {
        playlistID,
        songID,
      });
      alert("Song removed from playlist!");

      setSongsByPlaylist((prevSongs) => {
        const updatedSongs = { ...prevSongs };
        updatedSongs[playlistID] = updatedSongs[playlistID].filter(
          (song) => song.SongID !== songID
        );
        return updatedSongs;
      });
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };

  return (
    <div className="playlist-page-container">
      <h1 className="playlist">Playlists</h1>
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
          <button onClick={() => navigate("/artist-profile/1")}>
            Artist Profile
          </button>
          <button onClick={() => navigate("/users-page/")}>Users Page</button>
          <button onClick={() => navigate("/catalog-page/")}>Catalog Page</button>
        </div>
      )}

      <div className="playlists">
        {playlists.map((playlist) => (
          <div key={playlist.PlaylistID} className="playlist-container">
            <h2 className="playlist-title">{playlist.PlaylistName}</h2>
            <div className="songs-list">
              {songsByPlaylist[playlist.PlaylistID]?.map((song) => (
                <div key={song.SongID} className="song-item">
                  {song.SongName}
                  <button
                    onClick={() =>
                      removeSongFromPlaylist(playlist.PlaylistID, song.SongID)
                    }
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
