import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./activity-board-page.css";

export function ActivityBoardPage() {
    const { currentUser } = useAuthContext();
    const [activityBoardContent, setActivityBoardContent] = useState([]);
    const [showNavigation, setShowNavigation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivityBoardContent = async () => {
            if (!currentUser) {
                console.error("No user is logged in");
                return;
            }
            try {
                const response = await axios.get(
                    `http://localhost:5000/activity-board-page?currUser=${currentUser.username}`
                );
                const groupByUsername = {};

                response.data.forEach((friendEntry) => {
                    if (!groupByUsername[friendEntry.username]) {
                        groupByUsername[friendEntry.username] = [];
                    }
                    groupByUsername[friendEntry.username].push({
                        songName: friendEntry.SongName,
                        imagePath: friendEntry.ImagePath,
                        albumName: friendEntry.AlbumName,
                        artistName: friendEntry.ArtistName,
                        genreName: friendEntry.GenreName,
                    });
                });

                setActivityBoardContent(groupByUsername);
            } catch (error) {
                console.error("Error fetching Activity Board:", error);
            }
        };
        fetchActivityBoardContent();
    }, [currentUser]);

    return (
        <div className="activity-board-page-container">
            <h1 className="activity-board-title">Listening Activity</h1>
            <button
                className="waffle-button"
                onClick={() => setShowNavigation((prev) => !prev)}
            >
                ☰
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
                    <button onClick={() => navigate("/users-page/")}>Users Page</button>
                    <button onClick={() => navigate("/catalog-page/")}>Catalog Page</button>
                    <button onClick={() => navigate("/playlist-page/")}>Playlist Page</button>
                </div>
            )}

            <div className="activity-boards">
                {Object.entries(activityBoardContent).map(([username, songs]) => (
                    <div key={username} className="activity-board-container">
                        <h2 className="activity-board-username">{username}</h2>
                        <div className="songs-list">
                            {songs.map((song, index) => (
                                <div key={index} className="song-item">
                                    <img
                                        src={song.imagePath}
                                        alt={`${song.songName}-cover`}
                                        className="song-image"
                                    />
                                    <div className="song-details">
                                        <strong>{song.songName}</strong>
                                        <p>Artist: {song.artistName}</p>
                                        <p>Album: {song.albumName}</p>
                                        <p>Genre: {song.genreName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
