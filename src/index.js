const fs = require('fs');
const path = require('path');
const { authorize, getNewToken } = require('./common');
const { basicReadData: callback } = require('./my-files');
// const { basicWriteData: callback } = require('./my-files');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/spreadsheets'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = 'token.json';
const tokenPath = path.join(__dirname, TOKEN_PATH);

// TOKEN_PATH and SCOPES should be different for MY and GL drives.

const CREDENTIALS_PATH = 'credentials.json';
const credentialsPath = path.join(__dirname, CREDENTIALS_PATH);

// Load client secrets from a local file.
fs.readFile(credentialsPath, (err, content) => {
    // content is Buffer.

    if (err) {
        return console.log('Error loading client secret file:', err);
    }

    // Authorize a client with credentials, then call the Google Sheets API.
    const oAuth2Client = authorize(JSON.parse(content));

    fs.readFile(tokenPath, (err, token) => {
        if (err) {
            return getNewToken(oAuth2Client, callback, tokenPath, SCOPES);
        }
        oAuth2Client.setCredentials(JSON.parse(token));

        callback(oAuth2Client);
    });

});