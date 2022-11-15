/* **************************************************

TO DO LIST:
- LOGIN SCREEN WITH DATABASE (one time use codes)
- PAUSE / PLAY / NEXT / RANDOM BUTTONS
- SORTING SCRIPT
- PUT JSON IN SEPARATE FILE
- SEARCH FUNCTION


************************************************** */

const express = require('express');
const fs = require('fs');
const {stat, createReadStream} = require('fs');
const path = require('path');
const http = require('http');
const cors = require('cors');
const {promisify} = require('util');
const mysql = require('mysql2');



var ep = 0;



const videos = [
    {
        id: 0,
        poster: '/video/0/poster.jpg',
        duration: '3 mins',
        name: 'futurama',
        count: 3,
    },
    {
        id: 1,
        poster: '/video/1/poster',
        duration: '4 mins',
        name: 'seinfeld',
        count: 5,
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'theoffice',
        count: 3,
    },
    {
        id: 3,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Episode 3',
        count: 3,
    },
    {
        id: 4,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Episode 3'
    },
    {
        id: 5,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Episode 3',
        count: 3
    },
    {
        id: 6,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Episode 3'
    },
    {
        id: 7,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Episode 3'
    },
    {
        id: 8,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Episode 3'
    },
    {
        id: 9,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Episode 3'
    },
];

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "myauntieistired",
    database: "LoginSystem",
})

app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO users (username, pass) VALUES (?,?)", [username, password], (err, result) => {console.log(err);})
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM users WHERE username = ? AND pass = ?",
    [username, password],
    (err, result) => {
        if (err) { res.send({err: err}); }
        if (result.length > 0) {
            res.send("success");
        } else {
            res.send({ message: "Wrong username/password combination" });
        }
    })
})

app.get('/', (req, res) => {
   console.log("/ has been run"); 
   res.send("Hello World");
});

app.get('/videos', (req, res) => {
    console.log("/videos has been requested by: " + req.socket.remoteAddress.replace(/::ffff:/i, ""));
    ep = 0;
    res.json(videos);
});


app.get('/video/:id/data', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log("Data has been run");
    res.json(videos[id]);
});

app.get('/video/:id', (req, res) => {
    ep = 0;
    playEpisode(req,res);
    
});

app.get('/poster/:id', (req, res) => {
    res.sendFile(__dirname + '/assets/posters/poster' + req.params.id + '.jpg');
});

function getEpisode(show) {
    console.log("Show ID: " + show);
    //random number generator for episode
    num = (Math.round(Math.random() * (parseInt(videos[show].count) - 1) + 1))
    console.log("Episode Number: " + num);
    return num;
}

function playEpisode(req, res) {

    show = parseInt(req.params.id, 10);

    if(ep==0) { ep = getEpisode(show); }


    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }
  
    // get video stats (about 61MB)
    const videoPath = `assets/shows/${show}/${ep}.mp4`;
    const videoSize = fs.statSync(videoPath).size;
  
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
  
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);

}

app.listen(port, () => {
    console.log("Listening on port: " + port)
})
