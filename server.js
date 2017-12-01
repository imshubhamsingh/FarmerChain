"use strict";
import config from './config';
import express from 'express';

import { serverRender } from './serverRender';

const server = express();



server.set('view engine', 'ejs');


server.get(['/','/cartfarm','/poolfarm','/farmerbank'],(req, res)=>{
    let url = req.url;
    res.render('index', {
        initialMarkup:  serverRender(url)
    });
})

server.use(express.static('public'));




server.listen(config.port, config.host, ()=>{
    console.info('Express listening on port ',config.port);
});