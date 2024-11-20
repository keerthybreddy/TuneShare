import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TuneShareDB',
});

export async function getUser() {
    try {
        const [rows] = await pool.query("SELECT * FROM User");
        console.log(rows);
        return rows;
    } catch (error) {
        console.error("Database error:", error);
    }
}
export async function getGenres() {
    try {
        const [rows] = await pool.query("SELECT * FROM Genres");
        console.log(rows);
        return rows;
    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function getArtists() {
    try {
        const[rows] = await pool.query("SELECT * FROM Artists");
        console.log(rows);
        return rows;
    }catch (error){
        console.log("Database error:", error);
    }
}


export async function getAlbums() {
    try {
        const[rows] = await pool.query("SELECT * FROM Albums");
        console.log(rows);
        return rows;
    } catch (error) {
        console.log("Database error:", error);
    }
}

export async function getSongs(artistID) {
    try {
        const[rows] = await pool.query("SELECT * FROM Songs");
        return rows;
    } catch (error) {
        console.log("Database error:", error);
    }
}

export async function getSongsByArtistName(artistName) {
    try {
        const [rows] = await pool.query(
            `
            SELECT 
                Songs.SongID, 
                Songs.SongName, 
                Albums.AlbumName 
            FROM 
                Songs
            JOIN 
                Albums 
            ON 
                Songs.AlbumID = Albums.AlbumID
            JOIN 
                Artists 
            ON 
                Albums.ArtistID = Artists.ArtistID
            WHERE 
                Artists.ArtistName = ?;
            `,
            [artistName] // Use parameterized queries to prevent SQL injection
        );
        console.log(rows); // Logs songs and album names for the artist
        return rows;
    } catch (error) {
        console.error("Database error in getSongsByArtistName:", error);
    }
}


getSongsByArtistName('Taylor Swift');