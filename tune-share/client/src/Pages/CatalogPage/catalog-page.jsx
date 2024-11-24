import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './catalog-page.css';

export function CatalogPage() {
    const [GenreID, setGenreID] = useState([]);
    const [GenreName, setGenreName] = useState([]);
    const [isGenresIterated, setIsGenresIterated] = useState(false);

    const combinedGenres = GenreName.map((name, index) => [name, GenreID[index]]);
    
    const listGenres = combinedGenres.map((Genre) => (
        <Link to={`/genre-page/${Genre[1]}`} key={Genre[1]}>
            <button className="genre-button">{Genre[0]}</button>
        </Link>
    ));

    useEffect(() => {
        axios.post(`http://localhost:5000/catalog-page`, { GenreID, GenreName })
            .then(data => {
                const genreNameList = [];
                const genreIDList = [];

                if (!isGenresIterated) {
                    data.data.forEach(genre => {
                        genreIDList.push(genre.GenreID);
                        genreNameList.push(genre.GenreName);
                    });
                    setGenreID(genreIDList);
                    setGenreName(genreNameList);
                    setIsGenresIterated(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [isGenresIterated]);

    return (
        <div className="catalog-page">
            <header className="catalog-header">
                <h1>Catalog Page</h1>
            </header>
            <div className="catalog-content">
                <div className="genre-container">{listGenres}</div>
            </div>
        </div>
    );
}
