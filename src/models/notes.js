'use strict';

import storage from '../lib/storage/data-store.js';
//require in the data storage vehicle that has been chosen by the switch case and env file

import uuid from 'uuid';
//this will create us a unique id on each of the notes that we create

class Note {
  constructor(config) {
    this.id = uuid();
    // fires up the uuid generator and makes a new one per constructor call
    this.createdOn = new Date();
    //creates a new date instance
    this.title = config && config.title || '';
    //ssets the title key value to either the config.title value or an empty string
    //this first will check if theres a config file (LTR evaluation = short circuit evaluation)
    this.content = config && config.content || '';
  }

  save() {
    return storage.save(this);
    //this save method returns the results of calling the storage.save() method taking in contextual 'this'
    //we can use this becase when creating a Note we have to use the 'new' key word which creates the contextual this
  }

  static fetchAll() {
    return storage.getAll();
    //this static method is called is returns/retrieves all notes that are currently storage
  }

  static findOne(id) {
    return storage.get(id);
  }

  static updateOne(criteria) {
    return storage.update(this);
    // so this method takes in criteria which is an object?? how do you combine this with passing in 'this' to storage.update
  }

  static deleteOne(id) {
    return storage.delete(id);
  }
}

export default Note;
// module.exports = Note;
//export the class