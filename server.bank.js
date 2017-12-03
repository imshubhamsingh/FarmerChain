const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/blockchain')));



const port = process.env.PORT || 5010;
app.listen(port);

console.log(`Project running on ${port}`);