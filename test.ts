const WebUntisLib = require('webuntis');
const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config()
const QRCodeData = process.env.QRCodeData

const untis = new WebUntisLib.WebUntisQR(QRCodeData);

untis
    .login()
    .then(() => {
        return untis.getTeachers();
    })
    .then((answer) => {
        let teacher = [];
        fs.writeFileSync('./test.json', JSON.stringify(answer))
        for (const user of answer) {
            try {
                if (user.title == "") teacher.push(user)
            } catch (error) {
                console.log(error)
            }; 
        }
        console.log("teachers:", teacher.length)
        untis.logout();
        console.log('logged out');
    })