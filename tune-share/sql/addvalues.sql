USE TuneShareDB;

-- Insert static playlists
INSERT INTO Playlists (PlaylistName) VALUES
('Playlist1'),
('Playlist2'),
('Playlist3');

-- Insert genres
INSERT INTO Genres (GenreName) VALUES 
('Pop'), 
('Rap'), 
('Country'), 
('Rock'), 
('Electronic'), 
('Classical');

-- Insert artists
INSERT INTO Artists (ArtistName, GenreID) VALUES
('Taylor Swift', 1),
('Kendrick Lamar', 2),
('Kacey Musgraves', 3),
('Foo Fighters', 4),
('Calvin Harris', 5),
('Ludovico Einaudi', 6);

-- Insert artist images
INSERT INTO Images (type, reference_id, url) VALUES
('artist', 1, '/assets/TaylorSwift/taylorswift-profile.jpeg'),
('artist', 2, '/assets/KendrickLamar/kendricklamar-profile.jpeg'),
('artist', 3, '/assets/KaceyMusgraves/kaceymusgraves-profile.jpeg'),
('artist', 4, '/assets/FooFighters/foofighters-profile.jpeg'),
('artist', 5, '/assets/CalvinHarris/calvinharris-profile.jpeg'),
('artist', 6, '/assets/LudovicoEinaudi/ludovicoeinaudi-profile.jpeg');

-- Insert albums
INSERT INTO Albums (AlbumName, ArtistID) VALUES
('1989', 1),
('Lover', 1),
('DAMN.', 2),
('good kid, m.A.A.d city', 2),
('Golden Hour', 3),
('Pageant Material', 3),
('The Colour and the Shape', 4),
('Wasting Light', 4),
('18 Months', 5),
('Funk Wav Bounces Vol. 1', 5),
('Divenire', 6),
('In a Time Lapse', 6);

-- Insert album images
INSERT INTO Images (type, reference_id, url) VALUES
('album', 1, '/assets/TaylorSwift/1989-albumcover.jpeg'),
('album', 2, '/assets/TaylorSwift/lover-albumcover.png'),
('album', 3, '/assets/KendrickLamar/damn-albumcover.png'),
('album', 4, '/assets/KendrickLamar/goodkid-albumcover.jpg'),
('album', 5, '/assets/KaceyMusgraves/goldenhour-albumcover.png'),
('album', 6, '/assets/KaceyMusgraves/pageantmaterial-albumcover.png'),
('album', 7, '/assets/FooFighters/thecolour-albumcover.jpg'),
('album', 8, '/assets/FooFighters/wastinglight-albumcover.jpg'),
('album', 9, '/assets/CalvinHarris/18months-albumcover.png'),
('album', 10, '/assets/CalvinHarris/funkwav-albumcover.jpg'),
('album', 11, '/assets/LudovicoEinaudi/divenire-ludovico.jpeg'),
('album', 12, '/assets/LudovicoEinaudi/timelapse-albumcover.jpeg');

-- Insert songs
INSERT INTO Songs (SongName, AlbumID) VALUES
-- Taylor Swift
('Shake It Off', 1),
('Blank Space', 1),
('Style', 1),
('Lover', 2),
('Cruel Summer', 2),
-- Kendrick Lamar
('HUMBLE.', 3),
('DNA.', 3),
('LOVE.', 3),
('Swimming Pools (Drank)', 4),
('Money Trees (feat. Jay Rock)', 4),
-- Kacey Musgraves
('Slow Burn', 5),
('Space Cowboy', 5),
('Butterflies', 5),
('Dime Store Cowgirl', 6),
('Biscuits', 6),
-- Foo Fighters
('Everlong', 7),
('My Hero', 7),
('Monkey Wrench', 7),
('Walk', 8),
('These Days', 8),
-- Calvin Harris
('Feel So Close', 9),
('We Found Love (feat. Rihanna)', 9),
('Sweet Nothing (feat. Florence Welch)', 9),
('Slide (feat. Frank Ocean & Migos)', 10),
('Heatstroke (feat. Pharrell Williams, Young Thug & Ariana Grande)', 10),
-- Ludovico Einaudi
('Divenire', 11),
('Primavera', 11),
('Andare', 11),
('Experience', 12);

-- Insert song images
INSERT INTO Images (type, reference_id, url) VALUES
-- Taylor Swift
('song', 1, '/assets/TaylorSwift/shakeitoff-taylor.jpeg'),
('song', 2, '/assets/TaylorSwift/blankspace-taylor.jpg'),
('song', 3, '/assets/TaylorSwift/style-taylor.png'),
('song', 4, '/assets/TaylorSwift/lover-taylor.png'),
('song', 5, '/assets/TaylorSwift/cruelsummer-taylor.jpg'),
-- Kendrick Lamar
('song', 6, '/assets/KendrickLamar/humble-kendrick.jpg'),
('song', 7, '/assets/KendrickLamar/dna-kendrick.jpeg'),
('song', 8, '/assets/KendrickLamar/love-kendrick.jpg'),
('song', 9, '/assets/KendrickLamar/swimming-kendrick.jpg'),
('song', 10, '/assets/KendrickLamar/money-kendrick.jpg'),
-- Kacey Musgraves
('song', 11, '/assets/KaceyMusgraves/slowburn-kacey.jpg'),
('song', 12, '/assets/KaceyMusgraves/spacecowboy-kacey.jpg'),
('song', 13, '/assets/KaceyMusgraves/butterflies-kacey.png'),
('song', 14, '/assets/KaceyMusgraves/dimestore-kacey.jpg'),
('song', 15, '/assets/KaceyMusgraves/biscuits-kacey.jpg'),
-- Foo Fighters
('song', 16, '/assets/FooFighters/everlong-foo.jpg'),
('song', 17, '/assets/FooFighters/myhero-foo.jpg'),
('song', 18, '/assets/FooFighters/monkeywrench-foo.jpg'),
('song', 19, '/assets/FooFighters/walk-foo.jpg'),
('song', 20, '/assets/FooFighters/thesedays-foo.jpg'),
-- Calvin Harris
('song', 21, '/assets/CalvinHarris/feelsoclose-calvin.jpg'),
('song', 22, '/assets/CalvinHarris/wefoundlove-calvin.jpg'),
('song', 23, '/assets/CalvinHarris/sweetnothing-calvin.jpeg'),
('song', 24, '/assets/CalvinHarris/slide-calvin.jpg'),
('song', 25, '/assets/CalvinHarris/heatstroke-calvin.jpeg'),
-- Ludovico Einaudi
('song', 26, '/assets/LudovicoEinaudi/divenire-ludovico.jpg'),
('song', 27, '/assets/LudovicoEinaudi/primavera-ludovico.jpg'),
('song', 28, '/assets/LudovicoEinaudi/andare-ludovico.jpg'),
('song', 29, '/assets/LudovicoEinaudi/experience-ludovico.jpeg');

-- Insert sample songs into playlists
INSERT INTO PlaylistSongs (PlaylistID, SongID) VALUES
(1, 1), -- 'Shake It Off' in Playlist1
(1, 2), -- 'Blank Space' in Playlist1
(2, 6), -- 'HUMBLE.' in Playlist2
(2, 16), -- 'Everlong' in Playlist2
(3, 27); -- 'Primavera' in Playlist3
