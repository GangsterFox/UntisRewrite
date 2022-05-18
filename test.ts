const WebUntisLib = require('webuntis');
const fs = require('fs');
const tomorrow = new Date()
const dotenv = require('dotenv')
dotenv.config()
const QRCodeData = process.env.QRCodeData

const untis = new WebUntisLib.WebUntisQR(QRCodeData);

untis
    .login()
    .then(() => {
        return untis.getOwnClassTimetableFor(tomorrow);
    })
    .then((answer) => {
        fs.writeFileSync('./test.json', JSON.stringify(answer))
        console.log("success")
    })
    untis.logout()
    .then(() =>
    console.log('logged out'));