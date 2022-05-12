const WebUntisLib = require('webuntis');

const QRCodeData = 'untis://setschool?url=herakles.webuntis.com&school=GoldenB Schule&user=HayvanDin&key=AJCO5JHYCHBIFEUC&schoolNumber=5401500';
const untis = new WebUntisLib.WebUntisQR(QRCodeData);

untis
    .login()
    .then(() => {
        return untis.getStudents();
    })
    .then((answer) => {
        let males = [];
for (const user of answer) {
    if (user.gender == "female") males.push(user)
}
console.log(males.length)
    });
