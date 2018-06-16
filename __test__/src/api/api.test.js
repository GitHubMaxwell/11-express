import superagent from 'superagent';
import app from '../../../src/app.js';

// GET: test 404, it should respond with 'not found' for valid requests made with an id that was not found
// GET: test 400, it should respond with 'bad request' if no id was provided in the request
// GET: test 200, it should contain a response body for a request made with a valid id
// POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
// POST: test 200, it should respond with the body content for a post request with a valid body

//running sync versus 
//tests arent waiting for the server to start because its async in the appjs whereas here its sync
beforeAll(() => {
  //ECONN means the startup is failing
  //make these async to do async tests and use done etc.
//   setTimeout(function(){
//     app.start(3000);
//     done();
//   },2000);

  app.start(3000);

  console.log('APP STARTED');

});
      
afterAll(() => {
  app.stop();
});

describe('API Module', () => {

  it('POST FAIL test', (done) => {

    // let obj = {test:'test'};
    let obj = {};

    superagent.post('http://localhost:3000/api/v1/notes')
      .send(obj)
    //CB in a end like this 1st errback callback isnt one itll send null
    //   .then( res => {
    //     // console.log('THEN ERROR:');
    //     // if(err) return done(err);
    //     // console.log('THEN RESPONSE', res);
    //   })
      .catch( res => {
        console.log('INSIDE THE CATCH', res.status);
        // console.log('catch RESPONSE status', err);
        expect(res.status).toEqual(400);
        done();
      });
  });

  xit('GET test', (done) => {
    //testing for a sync test to work
    // expect(true).toEqual(true);
    //this doesnt have to do with server up or not

    superagent.get('http://localhost:3000/api/v1/notes')
    //   .send()
      .then(data => {
        // expect(data).toBeDefined();
        //after confirmed gettign positve make it fail just to stress test it
        expect(true).toBe(true);
        done();

      })
      .catch((err)=>{
        console.log('ERROR');
        done();
      });
  });
//   it('should return error for post 400', () => {

//     let obj = {};
//     return superagent
//       .post('http://localhost:3000/api/v1/notes')
//       .send(obj)
//       .then(res => {
//         console.log(res.statusCode);
//       })
//       .catch(res => {
//         console.log(res.status);
//         expect(res.status).toEqual(400);
//       });
//   });
//   it('POST SUCCESS test', (done) => {

//     let obj = {
//       content:'max',
//       title:'maxtitle',
//     };

//     superagent.post('http://localhost:3000/api/v1/notes')
//       .send(obj)
//       .then(res => {
//         expect(res.status).toEqual(200);
//       });
//     done();
//   });

  //   it('POST PASS test', () => {
  //     let obj = {
  //       content:'max',
  //       title:'maxtitle',
  //     };
  //     return superagent.post('http://localhost:3000/api/v1/notes')
  //       .send(obj)
  //       .then(data => {
  //         console.log('DATA BODY CONTENT', data.body.content);
  //         expect(data.body.content).toEqual('max');
  //       });
  //     // .catch(err => {
  //     //   return err;
  //     // });
  //     // done();
  //   });

//   it('POST GET test', (done) => {
//     let obj = {
//       content:'postget_CONTENT',
//       title: 'postget_TITLE'};

//     superagent.post('http://localhost:3000/api/v1/notes')
//       .send(obj)
//       .then(data => {
//         // console.log(' POST GET DATA BODY', data.body);

//         superagent.get(`http://localhost:3000/api/v1/notes`)
//           .query({ id: `${data.body.id}` })
//           .then(res => {
//             // console.log('STATUS CODE', res.statusCode);
//             // expect(res.statusCode).toEqual(400);
//             expect(res.statusCode).toEqual(200);
//             done();
//             // expect(res).toEqual(204);
//           });
//       })
//       .catch(err => {
//         return err;
//       });
//   });

//   it('DELETE test', () => {
//     let obj = {
//       content:'max',
//       title: 'maxtitle',
//     };
//     console.log('run Delete');

//     return superagent.post('/api/v1/notes')
//       .send(obj)
//       .then(data => {
//         console.log('DATA BODY ID', data.body.id);

//         return superagent.delete(`http://localhost:3000/api/v1/notes`)
//           .query({ id: `${data.body.id}` })
//           .then((res) => {
//             console.log('DELETE after POST', res.statusCode);
//             expect(res.statusCode).toEqual(204);
//           });
//       })
//       .catch(err => {
//         return err;
//       });
//   });
});//closing the describe