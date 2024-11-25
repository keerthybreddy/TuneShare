import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users-page.css";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function UsersPage() {
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState(new Set());
    const [showNavigation, setShowNavigation] = useState(false);
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!currentUser) {
                console.error("No user is logged in");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5000/users-page?currUser=${currentUser.username}`
                );
                setUsers(response.data);

                const initialFollowing = new Set(
                    response.data.filter((user) => user.followed).map((user) => user.username)
                );
                setFollowing(initialFollowing);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentUser]);

    const handleFollow = async (username) => {
        try {
            if (following.has(username)) {
                await axios.post("http://localhost:5000/unfollow", {
                    userID: currentUser.username,
                    friendID: username,
                });
                setFollowing((prev) => new Set([...prev].filter((user) => user !== username)));
            } else {
                await axios.post("http://localhost:5000/follow", {
                    userID: currentUser.username,
                    friendID: username,
                });
                setFollowing((prev) => new Set(prev.add(username)));
            }
        } catch (error) {
            console.error("Error handling follow/unfollow:", error);
        }
    };

    return (
        <div className="users-container">
            <h1 className="users-header">Users Page</h1>

            <button
                className="waffle-button"
                onClick={() => setShowNavigation((prev) => !prev)}
            >
                {showNavigation ? "x" : "☰"}
            </button>

            {showNavigation && (
                <div className="navigation-sidebar">
                    <button onClick={() => navigate("/user-profile", { state: { username: currentUser.username } })}>
                        Profile
                    </button>
                    <button onClick={() => navigate("/album-page/1")}>Albums Page</button>
                    <button onClick={() => navigate("/artist-profile/1")}>Artist Profile</button>
                    <button onClick={() => navigate("/catalog-page/")}>Catalog Page</button>
                    <button onClick={() => navigate("/playlist-page/")}>Playlist Page</button>
                </div>
            )}

            <div className="users-list-container">
                <ul className="users-list">
                    {users
                        .slice(0, Math.ceil(users.length / 2))
                        .map((user) => (
                            <li key={user.username} className="user-item">
                                <div className="user-info">
                                    <strong>{user.firstName} {user.lastName}</strong>
                                    <br />
                                    <em>{user.username}</em>
                                </div>
                                <button
                                    className={following.has(user.username) ? "unfollow-button" : "follow-button"}
                                    onClick={() => handleFollow(user.username)}
                                >
                                    {following.has(user.username) ? "Unfollow" : "Follow"}
                                </button>
                            </li>
                        ))}
                </ul>
                <ul className="users-list">
                    {users
                        .slice(Math.ceil(users.length / 2))
                        .map((user) => (
                            <li key={user.username} className="user-item">
                                <div className="user-info">
                                    <strong>{user.firstName} {user.lastName}</strong>
                                    <br />
                                    <em>{user.username}</em>
                                </div>
                                <button
                                    className={following.has(user.username) ? "unfollow-button" : "follow-button"}
                                    onClick={() => handleFollow(user.username)}
                                >
                                    {following.has(user.username) ? "Unfollow" : "Follow"}
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
