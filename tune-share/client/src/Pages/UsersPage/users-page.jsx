import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users-page.css";
import {useLocation, useParams} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";

export function UsersPage() {
    const [users, setUsers] = useState([]); // State to hold user data
    const [following, setFollowing] = useState(new Set()); // State to track followed users
    const { currentUser } = useAuthContext();  // Access the logged-in user's username


    // Fetch users from the backend when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            if (!currentUser) {
                console.error("No user is logged in");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/users-page?currUser=${currentUser.username}`);
                console.log("Users fetched:", response.data); // Debugging log
                setUsers(response.data);

                // Prepopulate the following set
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
        if (!currentUser) {
            console.error("No user is logged in");
            return;
        }

        try {
            if (following.has(username)) {
                // Unfollow user
                await axios.post("http://localhost:5000/unfollow", {
                    userID: currentUser.username,
                    friendID: username,
                });
            } else {
                // Follow user
                await axios.post("http://localhost:5000/follow", {
                    userID: currentUser.username,
                    friendID: username,
                });
            }

            // Update the local state
            setFollowing((prev) => {
                const updatedFollowing = new Set(prev);
                if (updatedFollowing.has(username)) {
                    updatedFollowing.delete(username); // Unfollow locally
                } else {
                    updatedFollowing.add(username); // Follow locally
                }
                return updatedFollowing;
            });
        } catch (error) {
            console.error("Error handling follow/unfollow:", error);
        }
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

// ------------- OLD FETCH AND HANDLE ----------------------

// Fetch users from the backend when the component mounts
// useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/users-page");
//             console.log("Users fetched:", response.data); // Debugging log
//             setUsers(response.data); // Set the user data into state
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };
//
//     fetchUsers();
// }, []);

// Handle follow/unfollow button click
// const handleFollow = (username) => {
//     setFollowing((prev) => {
//         const updatedFollowing = new Set(prev);
//         if (updatedFollowing.has(username)) {
//             updatedFollowing.delete(username); // Unfollow the user
//         } else {
//             updatedFollowing.add(username); // Follow the user
//         }
//         return updatedFollowing;
//     });
// };
