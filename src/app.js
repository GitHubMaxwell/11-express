'use strict';

//1st party modules which means they are part of Node and dont require us to require extra dependencies in
//in this case we are requiring in Node's HTTP module which will allow us to

let http = require('http');

const router = require('./lib/router.js');
//the router file is allowing us to
const api = require('./api/api.js');
//the api file does
//you can call it and not use it explicitly becauase what else requires it???

//this is where we will open up a server connection using router.route as our entry point. that method will get run on every connection we make
const app = http.createServer(router.route);

let isRunning = false;
//this is our flag we'll use in our start and stop methods the will

module.exports = {
  start: (port) => {
    if(!isRunning) {
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