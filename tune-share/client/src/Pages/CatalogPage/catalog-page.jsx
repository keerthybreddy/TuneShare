import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import "./catalog-page.css";

export function CatalogPage() {
    const [GenreID, setGenreID] = useState([]);
    const [GenreName, setGenreName] = useState([]);
    const [isGenresIterated, setIsGenresIterated] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();

    const combinedGenres = GenreName.map((name, index) => [name, GenreID[index]]);

    const listGenres = combinedGenres.map((Genre) => (
        <Link to={`/genre-page/${Genre[1]}`} key={Genre[1]}>
            <button className="genre-button">{Genre[0]}</button>
        </Link>
    ));

    useEffect(() => {
        axios
            .post(`http://localhost:5000/catalog-page`, { GenreID, GenreName })
            .then((data) => {
                const genreNameList = [];
                const genreIDList = [];

                if (!isGenresIterated) {
                    data.data.forEach((genre) => {
                        genreIDList.push(genre.GenreID);
                        genreNameList.push(genre.GenreName);
                    });
                    setGenreID(genreIDList);
                    setGenreName(genreNameList);
                    setIsGenresIterated(true);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [isGenresIterated]);

    return (
        <div className="catalog-page">
            <header className="catalog-header">
                <h1>Catalog Page</h1>
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
                        <button onClick={() => navigate("/users-page/")}>Users Page</button>
                        <button onClick={() => navigate("/playlist-page/")}>Playlist Page</button>
                    </div>
                )}
            </header>

            <div className="catalog-content">
                <div className="genre-container">{listGenres}</div>
            </div>
        </div>
    );
}
