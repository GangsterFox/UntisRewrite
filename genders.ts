const WebUntisLib = require('webuntis');

const QRCodeData = 'untis://setschool?url=herakles.webuntis.com&school=GoldenB Schule&user=HayvanDin&key=AJCO5JHYCHBIFEUC&schoolNumber=5401500';
const untis = new WebUntisLib.WebUntisQR(QRCodeData);

untis
    .login()
    .then(() => {
        return untis.getStudents();
    })
    .then((fam) => {
        let females = [];
        let males = [];
        for (const user of fam) {
            if (user.gender == "female") females.push(user);
            else if (user.gender == "male") males.push(user)
        }
        console.log('females:', females.length);
        console.log('males:',  males.length);
        console.log('Everyone:', males.length + females.length)
    }), untis.logout()
