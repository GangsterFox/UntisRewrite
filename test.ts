const WebUntisLib = require('webuntis');
const fs = require('fs');
const tomorrow = new Date()

const QRCodeData = 'untis://setschool?url=herakles.webuntis.com&school=GoldenB Schule&user=HayvanDin&key=AJCO5JHYCHBIFEUC&schoolNumber=5401500';
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