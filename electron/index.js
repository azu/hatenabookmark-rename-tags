// MIT © 2019 azu
"use strict";

const electron = require("electron");
const dialog = electron.dialog;

const CONSUMER = {
    key: "KP3igGP/IxuINQ==",
    secret: "3DGtEHE/YEEZdmWGngc5zqAPV5w="
};
const AuthenticationHatena = require("electron-authentication-hatena").AuthenticationHatena;
// http://developer.hatena.com/ja/documents/auth/apis/oauth/consumer
const hatena = new AuthenticationHatena({
    key: CONSUMER.key,
    secret: CONSUMER.secret,
    scopes: ["read_public", "write_public"]
});
hatena.startRequest().then(function(result) {
    var accessToken = result.accessToken;
    var accessTokenSecret = result.accessTokenSecret;
    dialog.showErrorBox("hatenabookmark-rename-tags",
        `
# Copy these tokens    

HATENA_ACCESS_TOKEN="${accessToken}"
HATENA_ACCESS_SECRET="${accessTokenSecret}"
        `);
    console.log(accessToken, accessTokenSecret);
}).catch(function(error) {
    console.error(error, error.stack);
});
