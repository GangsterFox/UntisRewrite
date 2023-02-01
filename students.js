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
    .then((students) => {
        let females = [];
        let males = [];
        let unknown = [];
        fs.writeFileSync('./students.json', JSON.stringify(students))
        console.log('written all students to a json \n')
        for (const user of students) {
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
    })
    .then(() => {
        return untis.getTeachers();
    })
    .then((teachers) => {
        let teacher = [];
        fs.writeFileSync('./teachers.json', JSON.stringify(teachers))
        console.log("\nwritten all teachers to a json")
        for (const teacher1 of teachers) {
            try {
                if (teacher1.title == "") teacher.push(teacher1)
            } catch (error) {
                console.log(error)
            }
        }
        console.log("teachers:", teacher.length)
        untis.logout()
        console.log("\nlogged out")
    })