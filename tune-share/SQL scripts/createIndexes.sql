Use TuneShareDB;

-- albums page indicies
CREATE INDEX image_ref_idx
ON Images(type, reference_id);

CREATE INDEX songs_albumID_idx
ON Songs(AlbumID);




-- genre page indicies
CREATE INDEX artists_genreID_idx
ON Artists(GenreID);

CREATE INDEX albums_artistID_idx 
ON Albums(ArtistID);




-- friends indicies
CREATE INDEX friends_userID_idx
ON Friends(userID);

CREATE INDEX friends_friendID_idx
ON Friends(friendID);




-- liked songs indicies
CREATE INDEX likedsongs_userID_idx
ON LikedSongs(userID);

CREATE INDEX likedsongs_songID_idx 
ON LikedSongs(SongID);

