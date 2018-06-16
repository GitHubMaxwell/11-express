//job of this file is to start of the server / fire up the server / and newly fire up babel
'use strict';
//puts you in a strict operating context whereby it prevents certain actions from being taken and throws more exceptions (cant use 'with' key word cant assign variables without keyword like var,let,const makes some types of mistakes throw errors etc)

require('babel-register');

require('dotenv').config();
//can we not change this to an import because of the .config()
//what does .config() do
//it reads your env file, parses its contents, assigns it to process.env and returns and OBJECT with the parsed key containing the loaded

require('./src/app.js').start(process.env.PORT);
//going to start the server immediately by calling/requiring our server (app.js) and calling the start method on our environment variables set in the .env file which the dotenv dependency