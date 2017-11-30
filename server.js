import config from './config';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import { join } from 'path';


import serverRender from './serverRender';

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
    serverRender(req.params.contestId)
        .then(({initialMarkup, initialData})=>{
            res.render('index', {
                initialMarkup,
                initialData
            });
        })
        .catch(console.error);
});

server.use(express.static('public'));


server.listen(config.port, config.host, ()=>{
    console.info('Express listening on port ',config.port);
});