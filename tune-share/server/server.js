const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user : 'root',
    password : 'password', //place your own mysql account password
    database : 'TuneShareDB'
});

app.post('/registration-page', (req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    db.query("INSERT INTO User (username, firstName, lastName, password, email) VALUES (?, ?, ?, ?, ?)", [username, firstName, lastName, password, email], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({username: username})
        }
    })
})

app.post('/user-login-page', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM User WHERE username = ? AND password = ?", [username, password], (err, result) => {
        // console.log("result:", result);
        if (result.length === 0) {
            console.log('Login unsuccessful!')
            return res.send('Login unsuccessful!')
        } else {
            console.log('Login successful!')
            return res.send({message: req.body})
        }
    })
})

app.post('/album-page/:albumIDParam', (req, res) => {
    const AlbumID = req.body.AlbumID;
    const AlbumName = req.body.AlbumName;
    const ArtistID = req.body.ArtistID;

    const { albumIDParam } = req.params;
    console.log("PARAM: ", albumIDParam);

    db.query("SELECT Albums.AlbumID, Albums.AlbumName, Albums.ArtistID, Songs.SongID, Songs.SongName FROM Albums JOIN Songs ON Albums.AlbumID = Songs.AlbumID WHERE Albums.AlbumID = ?", [albumIDParam], (err, result) => {
        console.log("result:", result);
        if (result === 0) {
            console.log('Page not found.')
            return res.send('Page not found.')
        } else {
            console.log('Page found!')
            return res.send(result)
        }
    })
})

app.post('/artist-profile/:artistIDParam', (req, res) => {
    const AlbumID = req.body.AlbumID;
    const AlbumName = req.body.AlbumName;
    const ArtistID = req.body.ArtistID;

    const { artistIDParam } = req.params;

    db.query("SELECT Albums.AlbumID, Albums.AlbumName, Songs.SongID, Songs.SongName, Artists.ArtistID,  Artists.ArtistName, Genres.GenreName FROM Artists JOIN Albums ON Artists.ArtistID = Albums.ArtistID JOIN Songs ON Albums.AlbumID = Songs.AlbumID JOIN Genres ON Artists.GenreID = Genres.GenreID WHERE Artists.ArtistID = ?;", [artistIDParam], (err, result) => {
        console.log("result:", result);
        if (result === 0) {
            console.log('Page not found.')
            return res.send('Page not found.')
        } else {
            console.log('Page found!')
            return res.send(result)
        }
    })
})

app.get('/users-page', (req, res) => {
    const query = 'SELECT username, firstName, lastName FROM User';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results); // Send the fetched users as JSON
    });
});



app.listen(5000, () => {console.log("Server started on port 5000")})

// send the user's liked songs, created playlists, and friends in this post request
// app.post('/user-profile-page', (req, res) => {
//     const username = req.body.username;
//     db.query("SELECT * FROM User WHERE username = ?", [username], (err, result) => {
//         console.log("result:", result);
//         if (result.length === 0) {
//             console.log('Login unsuccessful!')
//             return res.send('Login unsuccessful!')
//         } else {
//             console.log('Login successful!')
//             return res.send({message: req.body})
//         }
//     })
// })