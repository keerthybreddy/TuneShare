CREATE TABLE TuneShareDB.User (
    username VARCHAR(45) NOT NULL,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    PRIMARY KEY (username)
);


-- Create Playlists table
CREATE TABLE TuneShareDB.Playlists (
    PlaylistID INT AUTO_INCREMENT PRIMARY KEY,
    PlaylistName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS TuneShareDB.Friends (
    userID VARCHAR(45) NOT NULL,
    friendID VARCHAR(45) NOT NULL,
    PRIMARY KEY (userID, friendID),
    FOREIGN KEY (userID) REFERENCES User(username),
    FOREIGN KEY (friendID) REFERENCES User(username)
);




-- Table: Genres
CREATE TABLE TuneShareDB.Genres (
    GenreID INT AUTO_INCREMENT PRIMARY KEY,
    GenreName VARCHAR(100) NOT NULL UNIQUE
);

-- Table: Artists
CREATE TABLE TuneShareDB.Artists (
    ArtistID INT AUTO_INCREMENT PRIMARY KEY,
    ArtistName VARCHAR(100) NOT NULL,
    GenreID INT NOT NULL,
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);

-- Table: Albums
CREATE TABLE TuneShareDB.Albums (
    AlbumID INT AUTO_INCREMENT PRIMARY KEY,
    AlbumName VARCHAR(100) NOT NULL,
    ArtistID INT NOT NULL,
    FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

-- Table: Songs
CREATE TABLE TuneShareDB.Songs (
    SongID INT AUTO_INCREMENT PRIMARY KEY,
    SongName VARCHAR(200) NOT NULL,
    AlbumID INT NOT NULL,
    FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID)
);

-- Table: Images
CREATE TABLE TuneShareDB.Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('artist', 'album', 'song') NOT NULL,
    reference_id INT NOT NULL,                  
    url VARCHAR(255) NOT NULL                   
);


-- Create LikedSongs table
CREATE TABLE TuneShareDB.LikedSongs (
    UserID VARCHAR(45) NOT NULL,
    SongID INT NOT NULL,
    PRIMARY KEY (UserID, SongID),
    FOREIGN KEY (UserID) REFERENCES User(username) ON DELETE CASCADE,
    FOREIGN KEY (SongID) REFERENCES Songs(SongID) ON DELETE CASCADE
);

-- Create PlaylistSongs table
CREATE TABLE TuneShareDB.PlaylistSongs (
    PlaylistID INT NOT NULL,
    SongID INT NOT NULL,
    PRIMARY KEY (PlaylistID, SongID),
    FOREIGN KEY (PlaylistID) REFERENCES Playlists(PlaylistID) ON DELETE CASCADE,
    FOREIGN KEY (SongID) REFERENCES Songs(SongID) ON DELETE CASCADE
); 
