const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

//const portofolioSheet = require("./secret/portfolioSheet");

const google_token = require("../config/keys_prod.js").googleToken;
const google_portofolioSheet = require("../config/keys_prod.js")
  .portofolioSheet;

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, data, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  if (process.env.NODE_ENV === "production") {
    console.log(google_token, "from google token");
    oAuth2Client.setCredentials(JSON.parse(google_token));
    callback(oAuth2Client, data);
  } else {
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, data);
    });
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth, name) {
  let values = [[name]];
  let resource = { values };
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.append(
    {
      spreadsheetId:
        process.env.NODE_ENV === "production"
          ? google_portofolioSheet
          : "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      range: "Sheet1!A2",
      valueInputOption: "RAW",
      resource
    },
    (err, result) => {
      if (err) {
        // Handle error.
        console.log(err);
      } else {
        console.log(` cells appended.`);
      }
    }
  );
  //   sheets.spreadsheets.values.get(
  //     {
  //       spreadsheetId: portofolioSheet,
  //       range: "A2:A5"
  //     },
  //     (err, res) => {
  //       if (err) return console.log("The API returned an error: " + err);
  //       const rows = res.data.values;
  //       if (rows.length) {
  //         console.log("Name, Major:");
  //         // Print columns A and E, which correspond to indices 0 and 4.
  //         rows.map(row => {
  //           console.log(`${row[0]}`);
  //         });
  //       } else {
  //         console.log("No data found.");
  //       }
  //     }
  //   );
}

function getTouch(auth, data, res) {
  let { name, email, phone, message } = data;
  let values = [[name, email, phone, message]];
  let resource = { values };
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.append(
    {
      spreadsheetId:
        process.env.NODE_ENV === "production"
          ? google_portofolioSheet
          : "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      range: "Sheet2!A2:D2",
      valueInputOption: "RAW",
      resource
    },
    (err, result) => {
      if (err) {
        // Handle error.
        console.log(err);
      } else {
        console.log(` cells appended.`);
      }
    }
  );
}

module.exports = {
  authorize,
  getNewToken,
  listMajors,
  getTouch
};
