import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users-page.css";

export function UsersPage() {
    const [users, setUsers] = useState([]); // State to hold user data
    const [following, setFollowing] = useState(new Set()); // State to track followed users

    // Fetch users from the backend when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users-page");
                console.log("Users fetched:", response.data); // Debugging log
                setUsers(response.data); // Set the user data into state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Handle follow/unfollow button click
    const handleFollow = (username) => {
        setFollowing((prev) => {
            const updatedFollowing = new Set(prev);
            if (updatedFollowing.has(username)) {
                updatedFollowing.delete(username); // Unfollow the user
            } else {
                updatedFollowing.add(username); // Follow the user
            }
            return updatedFollowing;
        });
    };

    return (
        <div className="users-container">
            <h1 className="users-header">Users Page</h1>
            <ul className="users-list">
                {users.length === 0 ? (
                    <p>No users found.</p> // Display if no users are fetched
                ) : (
                    users.map((user) => (
                        <li key={user.username} className="user-item">
                            <div className="user-info">
                                <strong>{user.firstName} {user.lastName}</strong>
                                <br />
                                <em>{user.username}</em>
                            </div>
                            <button
                                className={`follow-button ${
                                    following.has(user.username) ? "unfollow-button" : ""
                                }`}
                                onClick={() => handleFollow(user.username)}
                            >
                                {following.has(user.username) ? "Unfollow" : "Follow"}
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
