const WebUntisLib = require('webuntis');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()
const QRCodeData = process.env.QRCodeData

const untis = new WebUntisLib.WebUntisQR(QRCodeData);

untis
    .login()
    .then(() => {
        return untis.getStudents();
    })
    .then((fam) => {
        let females = [];
        let males = [];
        let unknown = [];
        fs.writeFileSync('./students.json', JSON.stringify(fam))
        console.log('written all students to a json \n')
        for (const user of fam) {
            if (user.gender == "female") females.push(user);
            else if (user.gender == "male") males.push(user);
            else if (user.gender == "") unknown.push(user)
        }
        console.log('females:', females.length);
        console.log('males:',  males.length);
        console.log('unknown:', unknown.length);
        console.log('Everyone:', males.length + females.length + unknown.length);
        untis.logout()
        console.log('\nlogged out')
    })