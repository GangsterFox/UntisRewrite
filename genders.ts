const WebUntisLib = require('webuntis');
const fs = require('fs');
const QRCodeData = 'untis://setschool?url=herakles.webuntis.com&school=GoldenB Schule&user=HayvanDin&key=AJCO5JHYCHBIFEUC&schoolNumber=5401500';
const untis = new WebUntisLib.WebUntisQR(QRCodeData);

// this is the worst way to make it write to a json and also console log it fr
// I will make this not a pain someday but not today because this shit works 

untis
    .login()
    .then(() => {
        return untis.getStudents();
    })
    .then((students) => {
        fs.writeFileSync('./students.json', JSON.stringify(students))
        console.log('written all students to a json')
    })
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
    })