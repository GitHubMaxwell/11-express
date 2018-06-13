'use strict';

//1st party modules which means they are part of Node and dont require us to require extra dependencies in
//in this case we are requiring in Node's HTTP module which will allow us to
// let http = require('http');

//going to replace the Nodes http module with express
//we'll also have to deal with const app = http.serverCreate(router.route)
const express = require('express');
const app = express();

// the router file is allowing us to
// to express-ify this app delete the router.js file and delete this line
// const router = require('./lib/router.js');


const api = require('./api/api.js');
//the api file does
//you can call it and not use it explicitly becauase what else requires it???

app.use(express.json());
//this line is becauase we dont have our parser.js file anymore parsing the title and content data anymore
//this is middleware that will parse all the body content 
//this has to be above the app.use(api)


app.use(api);
//this tells express to use the api that we gave it which is an object exported from the api file that is express routes that knows how to deal with request responses


//this is where we will open up a server connection using router.route as our entry point. that method will get run on every connection we make
//comment out the below line because weve redeclared the app variable above to = express();
//what does this line do
//but the below line creates server

// const app = http.createServer(router.route);

let isRunning = false;
//this is our flag we'll use in our start and stop methods the will

module.exports = {
  start: (port) => {
    if(!isRunning) {
      //this should still work with app being redclared to express()
      app.listen(port, (err)=>{
        if(err) {throw err;}
        //tick the running flag after we have started the serve up on the designated port
        isRunning = true;
        console.log(`Server is up on port: ${port}`);
      });
    }
  },
  stop: () => {
    app.close(() => {
      //the flag back to false
      isRunning = false;
      console.log('Server connection has been stopped');
    });
  },
};