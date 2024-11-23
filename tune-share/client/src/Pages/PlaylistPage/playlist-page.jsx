import { useState, useEffect } from "react";
import axios from "axios";
import "./playlist-page.css";

export function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [songsByPlaylist, setSongsByPlaylist] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-playlists")
      .then((response) => {
        setPlaylists(response.data);

        const fetchSongsPromises = response.data.map((playlist) =>
          axios
            .get(`http://localhost:5000/get-playlist-songs?playlistID=${playlist.PlaylistID}`)
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
