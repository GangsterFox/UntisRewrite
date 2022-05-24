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
            try {
            if (user.gender == "female") females.push(user);
            else if (user.gender == "male") males.push(user);
            else if (user.gender == "") unknown.push(user)
            } catch (error) {
                console.log(error)
            };
        }
        console.log('females:', females.length, '\nmales:', males.length,
        '\nunknown:', unknown.length, '\nEveryone:', males.length + females.length + unknown.length);
        untis.logout()
        console.log('\nlogged out')
    })