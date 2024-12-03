import { useLocation, useNavigate } from "react-router-dom";
import "./activity-board-page.css";
import "../ArtistProfilePage/artist-profile.css";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export function ActivityBoardPage() {

    const { currentUser } = useAuthContext();
    const [activityBoardContent, setActivityBoardContent] = useState([]);

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
                console.log(response.data);
                const groupByUsername = {};

                response.data.forEach((friendEntry) => {
                    if(!groupByUsername[friendEntry.username]) {
                        groupByUsername[friendEntry.username] = [];
                    }
                    groupByUsername[friendEntry.username].push({
                        songName: friendEntry.SongName,
                        imagePath: friendEntry.ImagePath,
                        albumName: friendEntry.AlbumName,
                        artistName: friendEntry.ArtistName,
                        genreName: friendEntry.GenreName
                    })

                });

                setActivityBoardContent(groupByUsername);
                console.log(activityBoardContent);
            
            } catch (error) {
                console.error("Error fetching Activity Board:", error);
            }
        };
        fetchActivityBoardContent();
    }, [currentUser]);

    // console.log(activityBoardContent);

    useEffect(() => {
        console.log("Activity Board Content:", activityBoardContent);
    }, [activityBoardContent]);  // Runs whenever userObjects changes

    return (
        <div className="">
            <div className="activity-board-container">
                    <h1 className="activity-board-header-text">Listening Activity</h1>
                    <ul>
                        {Object.entries(activityBoardContent).map(([username, songs]) => (
                            <div className="activity-board-card">
                                <h2>{username}</h2>
                                <ul>
                                {songs.map((song, index) => (
                                    <div className="activity-board-song-container">
                                        <li key={index} className="activity-board-header-text">
                                            <img
                                                src={song.imagePath}
                                                alt={`${song.songName}-cover`}
                                                className="song-image"
                                            />
                                            <strong>{song.songName}</strong>
                                            
                                        </li>
                                        <div className="activity-board-metadata">
                                            <p>Artist: {song.artistName}</p>
                                            <p>Album: {song.albumName}</p>
                                            <p>Genre: {song.genreName}</p>
                                        </div>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        ))}
                    </ul>
                </div>
        </div>
    )

}