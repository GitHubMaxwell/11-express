'use strict';

// to express-ify this app delete the router.js file and delete this line
// const router = require('../lib/router');

//why dont we have to put the .js at the end of the file name
//we need to require in this because the router.js file handle creating the route table and building routes from server calls

import Notes from '../models/notes';
//require in Notes because per the route we make we will be createing new instances of the note

import express from 'express';
// const express = require('express');

const router = express.Router();
//this does what router.js did


let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'ok';
  res.setHeader('Content-Type', 'application/json');
  // we need to set this content-type to json in order for it to EXPECT json data
  //what does it default to?
  res.write(JSON.stringify(data));
  res.end();
  //you have to end all connections?? check docs for exact explanation
};

let serverError = (res,err) => {
  let error = {error:err};
  // assigning the err value generated to the key error in the object literal assigned to variable 'error'
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
//forgot to put slash infront of api/
router.get('/api/v1/notes/:id', (req,res)=> {

  req.query.id = req.params.id;

  if(!req.query.id) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('NO GET ID');
    res.end();

  } else if(req.query.id) {
    Notes.findOne(req.query.id)
      .then(data => sendJSON(res,data))
      .catch(err => serverError(res, err));
  } 
});

router.get('/api/v1/notes', (req,res)=> {
  Notes.fetchAll()
    .then(data=>sendJSON(res,data))
    .catch(err=>serverError(res,err));
  
});

router.delete('/api/v1/notes', (req,res)=>{
  if(req.query.id) {
    Notes.deleteOne(req.query.id)
      .then(success=>{
        let data = {id:req.query.id,deleted:success};
        sendJSON(res,data);
      });
  }
});

router.post('/api/v1/notes', (req,res)=>{
  if(!req.body.content || !req.body.title) {
    res.statusCode = 400;
    res.statusMessage = 'bad request';
    res.end();
  }
  let record = new Notes(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(console.error);
});

// module.exports = {};
//why just an empty object

//change this for expressify
// module.exports = router;
export default router;

