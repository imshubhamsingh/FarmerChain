const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

app.get('/api/accounts', (req, res) => {
    // Return them as json
    fs.readFile('./accounts/accounts.txt', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            let accounts = JSON.parse(data); //now it an object
            let chosenAccount = null;
            let flag = false
            Object.keys(accounts).forEach(function(account) {
                console.log(account, accounts[account]);
                if(!accounts[account] && !flag){
                    chosenAccount = account
                    accounts[account] = flag = true
                }
            });
            if(chosenAccount !== null){
                let updatedAccounts = JSON.stringify(accounts); //convert it back to json
                fs.writeFile('./accounts/accounts.txt', updatedAccounts, 'utf8'); // write it back
                res.json({
                    account: chosenAccount
                })
            }else{
                res.json({
                    account:'No accounts left'
                })
            }

        }});
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Project running on ${port}`);