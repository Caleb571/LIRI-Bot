var Spotify = require('node-spotify-api');

var axios = require("axios");

const fs = require('fs');

require('dotenv').config();

var keys = require('./Keys.js');



var spotify = new Spotify(keys.spotifyKeys); 

var getSongs = function(song) {



  spotify.search({ type: 'track', query: song }, function(err, data) {

    if (err) {

      return console.log('Error occurred: ' + err);

    }

 

   

    var songs = data.tracks.items;

    for (let i = 0; i < songs.length; i++) {

        console.log(i);


    console.log("Artist: " + data.tracks.items[i].album.artists[i].name);

    console.log("Album Name: " + data.tracks.items[i].album.name);

    console.log("Release Date: " + data.tracks.items[i].album.release_date);

    console.log("Links: " + data.tracks.items[i].preview_url);  
    }

  });

}



  var getMovie = function(movieName) {

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=3ce0af1c";

axios.get(queryUrl).then(

  function(response) {

    console.log("Release Year: " + response.data.Year);

    console.log("Rating: " + response.data.Rated);

    console.log("Cast: " + response.data.Actors);

    console.log("Plot " + response.data.Plot);

  })

  .catch(function(error) {

    if (error.response) {

  

      console.log("---------------Data---------------");

      console.log(error.response.data);

      console.log("---------------Status---------------");

      console.log(error.response.status);

      console.log("---------------Status---------------");

      console.log(error.response.headers);

    } else if (error.request) {

      console.log(error.request);

    } else {

      console.log("Error", error.message);

    }

    console.log(error.config);

  });

}



fs.readFile('text.txt', 'utf8', function (err, data) {

    if (err) throw err;

    console.log(data);

});

var focus = function(inputTopic, inputFunction) {

switch (inputTopic){

    case "spotify-this-song":

        getSongs(inputFunction);

        break;

    case "movie-this":

        getMovie(inputFunction);

    default:

    console.log("LIRI does not compute");

}

}



var liriFind = function(One, Two) {

    focus(One, Two);

};



liriFind(process.argv[2], process.argv[3]);