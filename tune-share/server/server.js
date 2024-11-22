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
    password : 'password', //replace with your own mysql account password
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
            //console.log(localStorage.getItem('currentUser'));
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


app.get("/users-page", (req, res) => {
    console.log(req.url);  // Log the full URL
    const currentUser = req.query.currUser;
    console.log(currentUser);
    console.log("Current User:", currentUser);  // Log the currentUser value
    if (!currentUser) {
        return res.status(400).send({ error: "No current user provided" });
    }

    const query = `
        SELECT
            u.username,
            u.firstName,
            u.lastName,
            CASE
                WHEN f.userID = ? AND f.friendID = u.username THEN TRUE
                ELSE FALSE
            END AS followed
        FROM User u
        LEFT JOIN Friends f
            ON f.friendID = u.username
    `;

    db.query(query, [currentUser], (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).send({ error: "Failed to fetch users." });
        }
        res.status(200).send(results);
    });
});

// Add a friend
app.post("/follow", (req, res) => {
    const { userID, friendID } = req.body;
    const query = `
        INSERT INTO Friends (userID, friendID)
        VALUES (?, ?)
    `;
    db.query(query, [userID, friendID], (error, results) => {
        if (error) {
            console.error("Error adding friend:", error);
            return res.status(500).send({ error: "Failed to add friend." });
        }
        res.status(200).send({ message: "Friend added successfully!" });
    });
});

// Remove a friend
app.post("/unfollow", (req, res) => {
    const { userID, friendID } = req.body;
    const query = `
        DELETE FROM Friends
        WHERE userID = ? AND friendID = ?
    `;
    db.query(query, [userID, friendID], (error, results) => {
        if (error) {
            console.error("Error removing friend:", error);
            return res.status(500).send({ error: "Failed to remove friend." });
        }
        res.status(200).send({ message: "Friend removed successfully!" });
    });
});

app.post('/catalog-page', (req, res) => {
    db.query("SELECT * FROM Genres;", (err, result) => {
        console.log("result:", result);
        if (result.length === 0) {
            console.log('Page not found.')
            return res.send('Page not found.')
        } else {
            console.log('Page found!')
            return res.send(result)
        }
    })
})

app.post('/genre-page/:genreIDParam', (req, res) => {
    const { genreIDParam } = req.params;
	db.query("SELECT Artists.ArtistID, Artists.ArtistName, Albums.AlbumID, Albums.AlbumName, Songs.SongID, Songs.SongName, Genres.GenreID, Genres.GenreName FROM Artists JOIN Genres ON Artists.GenreID = Genres.GenreID JOIN Albums ON Artists.ArtistID = Albums.ArtistID JOIN Songs ON Albums.AlbumID = Songs.AlbumID WHERE Genres.GenreID = ?;", [genreIDParam], (err, result) => {
        console.log("result:", result);
        if (result.length === 0) {
            console.log('Page not found.')
            return res.send('Page not found.')
        } else {
            console.log('Page found!')
            return res.send(result)
        }
    })
})


app.get("/friends-list", (req, res) => {
    const currentUser = req.query.currUser;
    if (!currentUser) {
        return res.status(400).send({ error: "No current user provided" });
    }
    const query = `
        SELECT u.username, u.firstName, u.lastName
        FROM User u
        INNER JOIN Friends f ON u.username = f.friendID
        WHERE f.userID = ?
    `;
    db.query(query, [currentUser], (error, results) => {
        if (error) {
            console.error("Error fetching friends list:", error);
            return res.status(500).send({ error: "Failed to fetch friends list." });
        }
        res.status(200).send(results);
    });
});

app.listen(5000, () => {console.log("Server started on port 5000")})
