// https://developers.google.com/sheets/api/quickstart/nodejs
const { google } = require('googleapis');

// cars-db
// https://docs.google.com/spreadsheets/d/12xbjW3xv6i6oYMowSXFLzu1dMYenIKoqqqgDgSzC6Ro/edit#gid=0
const spreadsheetId = '12xbjW3xv6i6oYMowSXFLzu1dMYenIKoqqqgDgSzC6Ro';

/**
 * Read Spreadsheet Data
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function basicReadData(auth, range = 'Sheet1!A1:C3') {
    const sheets = google.sheets({ version: 'v4', auth });

    sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    }, (err, res) => {
        if (err) {
            return console.log('The API returned an error: ' + err);
        }
        const rows = res.data.values;
        if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(row);
                // console.log(`${row[0]}, ${row[4]}`);
            });
        } else {
            console.log('No data found.');
        }
    });
}

/**
 * Write Spreadsheet Data
 * @param {*} auth
 * @param {string} range The range of values to append.
 * @param {object} valueInputOption Value input options.
 * @param {(string[])[]} _values A 2d array of values to append.
 * https://github.com/gsuitedevs/node-samples/blob/master/sheets/snippets/snippets.js#L194
 * https://developers.google.com/sheets/api/reference/rest/
 */
function basicWriteData(auth, range = 'Sheet1!A1:C3', valueInputOption, _values) {
    const sheets = google.sheets({ version: 'v4', auth });

    sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
    }, (err, res) => {
        if (err) {
            return console.log('The API returned an error: ' + err);
        }
        const rows = res.data.values;
        if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(row);
                // console.log(`${row[0]}, ${row[4]}`);
            });
        } else {
            console.log('No data found.');
        }
    });
}

module.exports = {
    basicReadData,
    basicWriteData,
}