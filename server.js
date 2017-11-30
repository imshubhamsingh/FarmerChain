"use strict"
import 'babel-register'
import config from './config';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import { join } from 'path';
import cookieParser from 'cookie-parser'



import { serverRender } from './serverRender';

const server = express();

var src = join(__dirname,'scss');
var dest = join(__dirname,'public');

server.use(sassMiddleware({
    src: src,
    dest: dest,
    outputStyle: 'compressed'
}));

server.set('view engine', 'ejs');

server.get('/',(req, res)=>{
    res.render('index', {
        initialMarkup:  serverRender(req)
    });
})

server.use(express.static('public'));


server.listen(config.port, config.host, ()=>{
    console.info('Express listening on port ',config.port);
});