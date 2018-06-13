'use strict';

const router = require('../lib/router');
//why dont we have to put the .js at the end of the file name
//we need to require in this because the router.js file handle creating the route table and building routes from server calls

const Notes = require('../models/notes');
//require in Notes because per the route we make we will be createing new instances of the note


let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'ok';
  res.setHeader('Content-Type', 'application/json');
  // why do we need to set this
  res.write(JSON.stringify(data));
  res.end();
  //you have to end all connections?? check docs for exact explanation
};

let serverError = (res,err) => {
  let error = {error:err};
  //   assigning the err value generated to the key error in the object literal assigned to variable 'error'
  res.statusCode = 500;
  //500 are server errors
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

router.get('api/v1/notes', (req,res)=> {
  if(req.query.id) {
    Notes.findOne(req.query.id)
      .then(data => sendJSON(res,data))
      .catch(err => serverError(res, err));
  } else {
    Notes.fetchAll()
      .then(data=>sendJSON(res,data))
      .catch(err=>serverError(res,err));
  }
});

router.delete('api/v1/notes', (req,res)=>{
  if(req.query.id) {
    Notes.deletOne(req.query.id)
      .then(success=>{
        let data = {id:req.query.id,deleted:success};
        sendJSON(res,data);
      });
  }
});

router.post('api/v1/notes', (req,res)=>{
  let record = new Notes(req.body);
  record.save()
  //record is a new instance of the Notes object so we can call the Notes class' save method
    .then(data => sendJSON(res,data))
    .catch(console.error);
});

module.exports = {};
//why just an empty object