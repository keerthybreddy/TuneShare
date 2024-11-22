import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./user-profile.css";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export function UserProfile() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { username } = state; // Passed from the previous page
    const { currentUser } = useAuthContext(); // Current logged-in user
    const [friends, setFriends] = useState([]); // State to hold the friends list

    // Fetch the list of friends (users that the current user follows)
    useEffect(() => {
        const fetchFriends = async () => {
            if (!currentUser) {
                console.error("No user is logged in");
                return;
            }

            try {
                // Fetch the list of friends from the backend
                const response = await axios.get(
                    `http://localhost:5000/friends-list?currUser=${currentUser.username}`
                );
                console.log("Friends fetched:", response.data); // Debugging log
                setFriends(response.data); // Set the fetched friends list
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        fetchFriends();
    }, [currentUser]);

    return (
        <div className="user-profile-container">
            <div className="user-profile-header">
                <h1 className="user-name">Welcome, {username}!</h1>
            </div>

            <div className="user-profile-content">
                <div className="user-profile-sidebar">
                    <button onClick={() => navigate("/album-page/1")}>Albums Page</button>
                    <button onClick={() => navigate("/artist-profile/1")}>Artist Profile</button>
                    <button onClick={() => navigate("/users-page/")}>Users Page</button>
                    <button onClick={() => navigate("/catalog-page/")}>Catalog Page</button>
                </div>

                {/* Two-column layout for Liked Songs and Friends List */}
                <div className="user-columns">
                    {/* Liked Songs Column */}
                    <div className="liked-songs-column">
                        <h1>Liked Songs</h1>
                    </div>

                    {/* Friends List Column */}
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
        </div>
    );
}
