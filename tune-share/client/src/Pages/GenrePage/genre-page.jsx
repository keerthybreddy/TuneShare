import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
export function GenrePage() {
    const [ArtistName, setArtistName] = useState([]);
    const [ArtistID, setArtistID] = useState([]);
    const [AlbumName, setAlbumName] = useState([]);
    const [AlbumID, setAlbumID] = useState([]);
    const [SongName, setSongName] = useState([]);
    const [isSongsIterated, setIsSongsIterated] = useState(false);
    const [isAlbumsIterated, setIsAlbumsIterated] = useState(false);
    const [isArtistsIterated, setIsArtistsIterated] = useState(false);
    const listSongNames = SongName.map((Name) => <li>{Name}</li>);
    const combinedAlbums = AlbumName.map((name, index) => [name, AlbumID[index]]);
    const listAlbums = combinedAlbums.map((Album) => <Link to={`http://localhost:3000/album-page/${Album[1]}`}><li>{Album[0]}</li></Link>);
    const combinedArtists = ArtistName.map((name, index) => [name, ArtistID[index]]);
    const listArtists = combinedArtists.map((Artist) => <Link to={`http://localhost:3000/artist-profile/${Artist[1]}`}><li>{Artist[0]}</li></Link>);
    const listArtistNames = ArtistName.map((Name) => <li>{Name}</li>);
    let { genreIDParam } = useParams();
    useEffect(() => {
        axios.post(`http://localhost:5000/genre-page/${genreIDParam}`, {AlbumName: AlbumName, AlbumID: AlbumID, ArtistName: ArtistName, ArtistID: ArtistID, SongName: SongName})
        .then(data => {
            console.log('Response from server:', data.data);
            const albumNameList = [];
            const artistNameList = [];
            const albumIDList = [];
            const artistIDList = [];
            const songNameList = [];
            if (isSongsIterated === false) {
                for(let i = 0; i < data.data.length; i++) {
                    if (!songNameList.includes(String(data.data[i].SongName))) {
                        songNameList.push(data.data[i].SongName);
                    }
                }
                setSongName(songNameList);
                setIsSongsIterated(true);
            }
            if (isAlbumsIterated === false) {
                for(let i = 0; i < data.data.length; i++) {
                    if (!albumNameList.includes(String(data.data[i].AlbumName))) {
                        albumIDList.push(data.data[i].AlbumID);
                        albumNameList.push(data.data[i].AlbumName);
                    }
                }
                setAlbumName(albumNameList);
                setAlbumID(albumIDList);
                setIsAlbumsIterated(true);
            }
            if (isArtistsIterated === false) {
                for(let i = 0; i < data.data.length; i++) {
                    if (!artistNameList.includes(String(data.data[i].ArtistName))) {
                        artistIDList.push(data.data[i].ArtistID);
                        artistNameList.push(data.data[i].ArtistName);
                    }
                }
                setArtistName(artistNameList);
                setArtistID(artistIDList);
                setIsArtistsIterated(true);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        })
    });
    
    return (
        <>
        <h1>Genre ID: {genreIDParam}</h1>
        <h1>Artists</h1>
        <ul>{listArtists}</ul>
        <h1>Albums</h1>
        <ul>{listAlbums}</ul>
        <h1>Songs</h1>
        <ul>{listSongNames}</ul>
        </>
    )
}