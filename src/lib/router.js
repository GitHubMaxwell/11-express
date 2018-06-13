'use strict';

const parser = require('./parser');
const router = module.exports = {};

router.routes = {};
//this will hold our routing table (watch video)
//below 


////////////////////////////////////////////////////////////////////////////////
const methods = ['GET','PUT','PATCH','POST','DELETE'];
methods.forEach( method => {
  router.routes[method] = {};
  // so for each index in the methods array we'll build its own object
  router[method.toLocaleLowerCase()] = function(path,callback) {
    router.routes[method][callback] = callback;
  };
});
////////////////////////////////////////////////////////////////////////////////

router.route = (req,res) => {
  return parser(req)
    .then(req => {
      let handler = router.routes[req.method][req.parsed.pathname];
      if(handler) {
        return handler(req,res);
      }
    })
    .catch(err => {
      console.error('NOT_Found', req.parsed.pathname);
      res.statusCode = 404;
      res.statusMessage = 'Not Found';
      res.write(`Resource Not Found (${req.parsed.pathname})`);
      res.end();
    });
};