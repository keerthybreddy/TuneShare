import { useState, useEffect } from 'react';
import axios from 'axios';

export function AlbumPage() {

    const [AlbumID, setAlbumID] = useState('');
    const [AlbumName, setAlbumName] = useState('');
    const [ArtistID, setArtistID] = useState('');
    const [SongID, setSongID] = useState([]);
    const [SongName, setSongName] = useState([]);
    const [isSongsIterated, setIsSongsIterated] = useState(false);

    const listSongIDs = SongID.map((ID) => <li>{ID}</li>);
    const listSongNames = SongName.map((Name) => <li>{Name}</li>);

    useEffect(() => {
        axios.post('http://localhost:5000/album-page/', {AlbumID: AlbumID, AlbumName: AlbumName, ArtistID: ArtistID, SongID: SongID, SongName: SongName})
        .then(data => {
            console.log('Response from server:', data.data);
            setAlbumID(data.data[0].AlbumID);
            setAlbumName(data.data[0].AlbumName);
            setArtistID(data.data[0].ArtistID);

            const songIDList = [];
            const songNameList = [];

            if (isSongsIterated === false) {
                for(let i = 0; i < data.data.length; i++) {
                    songIDList.push(data.data[i].SongID);
                    songNameList.push(data.data[i].SongName);
                }
                setSongID(songIDList);
                setSongName(songNameList);
                setIsSongsIterated(true);
            }

            for (let i = 0; i < SongID.length; i++) {
                console.log(SongID[i]);
                console.log(SongName[i]);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        })
    });

    return (
        <>
        <h1>Album ID: {AlbumID}</h1>
        <h1>Album Name: {AlbumName}</h1>
        <h1>Artist ID: {ArtistID}</h1>

        <h1>Song IDs</h1>
        <ul>{listSongIDs}</ul>

        <h1>Song Names</h1>
        <ul>{listSongNames}</ul>

        </>
    )
}