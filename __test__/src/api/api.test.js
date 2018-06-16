import superagent from 'superagent';
import app from '../../../src/app.js';

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
});
      
afterAll(() => {
  app.stop();
});

describe('API Module', () => {

  it('POST FAIL test', (done) => {
    // [x] POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
    let obj = {};

    superagent.post('http://localhost:3000/api/v1/notes')
      .send(obj)
      .catch( res => {
        expect(res.status).toEqual(400);
        expect(res.message).toBe('Bad Request');
        done();
      });
  });

  it('POST SUCCESS test', (done) => {
    // [x] POST: test 200, it should respond with the body content for a post request with a valid body
    let obj = {
      content:'max',
      title:'maxtitle',
    };
    superagent.post('http://localhost:3000/api/v1/notes')
      .send(obj)
      .then(res => {
        expect(res.body).not.toBeUndefined();
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('GET SUCCESS test: should equal 200', (done) => {
    // [x] GET: test 200, it should contain a response body for a request made with a valid id

    //testing for a sync test to work
    // expect(true).toEqual(true);
    //this doesnt have to do with server up or not
    let obj = {
      content:'max',
      title:'maxtitle',
    };
  
    superagent.post('http://localhost:3000/api/v1/notes')
      .send(obj)
      .then(data => {
        // console.log('RES BODY: ', res.body);
        // console.log('RES BODY STATUS: ', res.status);
        superagent.get(`http://localhost:3000/api/v1/notes/${data.body.id}`)
          .then(res => {
            // expect(data).toBeDefined();
            //after confirmed getting positve make it fail just to stress test it
            expect(res.body.title).toEqual('maxtitle');
            expect(res.status).toEqual(200);
            done();
          });
      });
  });

  it('GET FAIL test: should equal 404 when no id given in request', (done) => {
    // [x] GET: test 404, it should respond with 'not found' for valid requests made with an id that was not found
    superagent.get(`http://localhost:3000/api/v1/notes/123`)
      .catch(res => {
        expect(res.status).toEqual(404);
        done();
      });
  });
});//closing the describe