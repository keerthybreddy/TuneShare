import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./user-profile.css";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export function UserProfile() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { username } = state;
    const { currentUser } = useAuthContext();
    const [friends, setFriends] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);

    // Fetch the list of friends
    useEffect(() => {
        const fetchFriends = async () => {
            if (!currentUser) {
                console.error("No user is logged in");
                return;
            }
            try {
                const response = await axios.get(
                    `http://localhost:5000/friends-list?currUser=${currentUser.username}`
                );
                console.log("Friends fetched:", response.data);
                setFriends(response.data);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        // Fetch the liked songs
        const fetchLikedSongs = async () => {
            if (!currentUser) {
                console.error("No user is logged in");
                return;
            }
            try {
                const response = await axios.get(
                    `http://localhost:5000/liked-songs-list?currUser=${currentUser.username}`
                );
                console.log("Liked songs fetched:", response.data);
                setLikedSongs(response.data);
            } catch (error) {
                console.error("Error fetching liked songs:", error);
            }
        };

        fetchFriends();
        fetchLikedSongs();
    }, [currentUser]);

    return (
        <div className="user-profile-container">
            <div className="user-profile-header">
                <h1 className="user-name">Welcome, {username}!</h1>
            </div>

            <div className="user-profile-content">
                <div className="user-profile-sidebar">
                    <h1>Navigation</h1>
                    <button onClick={() => navigate("/album-page/1")}>Albums Page</button>
                    <button onClick={() => navigate("/artist-profile/1")}>Artist Profile</button>
                    <button onClick={() => navigate("/users-page/")}>Users Page</button>
                    <button onClick={() => navigate("/catalog-page/")}>Catalog Page</button>
                    <button onClick={() => navigate("/playlist-page/")}>Playlist Page</button>
                </div>

                <div className="liked-songs-column">
                    <h1>Liked Songs</h1>
                    {likedSongs.length === 0 ? (
                        <p>No liked songs yet.</p>
                    ) : (
                        <ul className="liked-songs-list">
                            {likedSongs.map((song) => (
                                <li key={song.SongID} className="liked-song-item">
                                    <strong>{song.SongName}</strong>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="friends-list-column">
                    <h1>Friends List</h1>
                    {friends.length === 0 ? (
                        <p>No friends yet.</p>
                    ) : (
                        <ul className="friends-list">
                            {friends.map((friend) => (
                                <li key={friend.username} className="friend-item">
                                    <strong>{friend.firstName} {friend.lastName}</strong>
                                    <br />
                                    <em>{friend.username}</em>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
