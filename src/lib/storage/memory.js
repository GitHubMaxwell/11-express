'use strict';

const storage = {};

//we create an empty object to store our notes in
const database = {};

storage.getAll = () => {
  //this is a straight Promise resolve which will make it immediately resolve with the arguments you pass in if any / this means you dont have to wire it up like a normal promise with thens and catch? / the new keyword with resolve and reject?? (check below)
  return Promise.resolve(database);
};

storage.get = (id) => {
  return new Promise((resolve,reject) => {
    if(database[id]) {resolve(database[id]);}
    else {reject(`${id} Not Found`);}
  });
};

storage.delete = (data) => {
  return new Promise((resolve,reject)=>{
    if(database[data.id]) {
      resolve(database[data.id][data.content] = '',database[data.id][data.title] = '');
    } else {
      reject('CANT DELETE');
    }
  });
};

storage.save = (data) => {
  // console.log('DATA in memory', data);
  return new Promise((resolve,reject) => {
    if(data.id){
      database[data.id] = data;
      resolve(database[data.id]);
    }
    else {
      reject('Invalid Data (no ID)');
    }
  });
};

export default storage;