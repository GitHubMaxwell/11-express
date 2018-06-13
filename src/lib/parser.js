'use strict';
//going to delete this when making it express

const url = require('url');
//the url node module gives us access to utilities that can parse and url resolution
//url.parse takes in a URL string, parses it and returns a url Object
const queryString = require('querystring');
//querystring is a node module that gives us access to utilities to parse and format URL strings
//specifically queryString.parse will parse a URL query string into a collection of key value pairs

module.exports = (req) => {
  return new Promise((resolve,reject) => {
    //why is this in a promise
    //immediately handle errors
    if( !(req || req.url) ) {reject('invalid request object. cannot parse'); }

    req.parsed = url.parsed(req.url);
    req.query = queryString.parse(req.parsed.query);
    //shouldnt the req.query and req.parsed.query be reversed?

    if(! req.method.match(/POST|PUT|PATCH/)){
      resolve(req);
      //as in if the req.method DOESNT match one of the methods in the regex, jsut return the newly parsed req object
    }

    let text = '';
    //let in strict mode causing this error because of scope?
    req.on('data', (buffer) => {
    //   console.log(buffer);
      text += buffer.toString();
      //on the end event 
    });
    req.on('end', () => {
      try{
        req.body = JSON.parse(text);
        resolve(req);
      }
      catch(err) {reject(err);}
        
    });
    req.on('err', reject);
  });
};