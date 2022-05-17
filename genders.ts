const WebUntisLib = require('webuntis');
const fs = require('fs');
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
        fs.writeFileSync('./students.json', JSON.stringify(fam))
        console.log('written all students to a json \n')
        for (const user of fam) {
            if (user.gender == "female") females.push(user);
            else if (user.gender == "male") males.push(user)
        }
        console.log('females:', females.length);
        console.log('males:',  males.length);
        console.log('Everyone:', males.length + females.length)
    })
    .then(() => {
        untis.logout()
        console.log('\nlogged out')
    })