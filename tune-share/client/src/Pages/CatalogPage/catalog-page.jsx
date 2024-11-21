import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
export function CatalogPage() {
    const [GenreID, setGenreID] = useState([]);
    const [GenreName, setGenreName] = useState([]);
    // const [Genres, setGenres] = useState([{genreId: 0, genreName: ""} ])
    const [isGenresIterated, setIsGenresIterated] = useState(false);
    const combinedGenres = GenreName.map((name, index) => [name, GenreID[index]]);
    const listGenres = combinedGenres.map((Genre) => <Link to={`http://localhost:3000/genre-page/${Genre[1]}`}><button>{Genre[0]}</button></Link>);
    useEffect(() => {
        axios.post(`http://localhost:5000/catalog-page`, {GenreID: GenreID, GenreName: GenreName})
        .then(data => {
            console.log('Response from server:', data);
            const genreNameList = [];
            const genreIDList = [];
        
            if (isGenresIterated === false) {
                for(let i = 0; i < data.data.length; i++) {
                    genreIDList.push(data.data[i].GenreID);
                    genreNameList.push(data.data[i].GenreName);
                }
                setGenreID(genreIDList);
                setGenreName(genreNameList);
                setIsGenresIterated(true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    });
    return (
        <>
        <h1>Catalog Page</h1>
        <h1>Pick a Genre:</h1>
        {listGenres}
        </>
    )
}