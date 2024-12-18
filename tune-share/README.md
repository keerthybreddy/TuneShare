# TuneShare

TuneShare is a web-based application that allows users to explore a database of songs, albums, and music artists along with their friends. TuneShare enables users to explore different genres of songs, albums, and artists, ‘favorite’ songs that they love, create and exchange playlists with others, add their friends on the application, and share tracks that they have favorited with their friends. The focus of this project was to deliver a user-friendly interface that facilitates music sharing and interaction between users.

## Project Setup Instructions

Before setting up the project, ensure you have the following installed:

`Node.js` (v16.x or higher)

`MySQL` (v8.x or higher)

`npm` (Node Package Manager)


### 1. Clone the Repository:
   `git clone https://github.com/keerthybreddy/TuneShare.git`

### 2. Configuring the Database
Create a MySQL database named `TuneShareDB`.

Run the provided schema.sql file to create tables:

`createdb.sql`

`addvalues.sql`

### 3. Install dependencies
Navigate to `tune-share/`

Run command `npm install`

Navigate to `tune-share/server/`

Run command `npm install`

Navigate to `tune-share/client/`

Run command `npm install`

### 4. Application Setup
Navigate to `tune-share/server/server.js` file

In line 15, replace `password` field with your MySQL account password

### 5. Start the application
Navigate to backend of application: `tune-share/server/`

Run the command `npm run dev`

Navigate to the front end of the application: `tune-share/client/`

Run the command `npm run start`

---

## Division of Work

### Andrian Than
Designed the Application UI Format

Developing the albums page

Developing the artists page

Implemented Navigation Buttons

### Jadon Camacho
Database Integration

Contributed to Development of Users Page

General Debugging of Application

Optimized the layout and styling of application using CSS 

Database Schema Normalization

Managed indexing for query optimization

### Katherine Yee
User’s liked songs and friends(follow/unfollow users) functionality

Built playlist page, shows songs in playlist and option to remove songs

Option to add songs to playlists from genre page

Frontend/UI for users page, catalog page, genre page, playlist page, activity board

Implemented waffle navigation popup

### Keerthy Reddy
Set up the initial React application, Node.js and Express.js backend, and MySQL setup

Built the Activity Board page

Built backend for the Catalog page, Genre Pages, User Login and Registration pages

Implemented custom URL parameterizing for page routes

---
