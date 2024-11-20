import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function ArtistProfile() {

    const [AlbumID, setAlbumID] = useState([]);
    const [AlbumName, setAlbumName] = useState([]);
    const [ArtistID, setArtistID] = useState('');
    const [ArtistName, setArtistName] = useState('');
    // const [GenreID, setGenreID] = useState('');
    const [isAlbumsIterated, setIsAlbumsIterated] = useState(false);

    let { artistIDParam } = useParams();

    const listAlbumIDs = AlbumID.map((ID) => <li>{ID}</li>);
    const listAlbumNames = AlbumName.map((Name) => <li><a href="http://localhost:3000/#/album-page/:albumIDParam">{Name}</a></li>);  //incorrect albumIDParam, need to figure out how to get the albumID for each album and insert it into the url

    useEffect(() => {
        axios.post(`http://localhost:5000/artist-profile/${artistIDParam}`, {AlbumID: AlbumID, AlbumName: AlbumName, ArtistID: ArtistID, ArtistName: ArtistName})
        .then(data => {
            console.log('Response from server:', data.data);
            setArtistID(data.data[0].ArtistID);
            setArtistName(data.data[0].ArtistName);  
            
            const albumIDList = [];
            const albumNameList = [];

            if (isAlbumsIterated === false) {
                for(let i = 0; i < data.data.length; i++) {
                    albumIDList.push(data.data[i].AlbumID);
                    albumNameList.push(data.data[i].AlbumName);
                }
                setAlbumID(albumIDList);
                setAlbumName(albumNameList);
                setIsAlbumsIterated(true);
            }

            for (let i = 0; i < AlbumID.length; i++) {
                console.log(AlbumID[i]);
                console.log(AlbumName[i]);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    });

    return (
        <>
        <h1>Artist ID: {ArtistID}</h1>
        <h1>Artist Name: {ArtistName}</h1>

        <h1>Album IDs</h1>
        <ul>{listAlbumIDs}</ul>

        <h1>Album Names</h1>
        <ul>{listAlbumNames}</ul>
        </>
    )
}