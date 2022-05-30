const WebUntisLib = require('webuntis');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()
const QRCodeData = process.env.QRCodeData
const untis = new WebUntisLib.WebUntisQR(QRCodeData);

untis.login().then(async () => {

let females = [];
let males = [];
let unknown = [];
let teacher = [];

const students = await untis.getStudents();
const teachers = await untis.getTeachers();

fs.writeFileSync('./students.json', JSON.stringify(students))
console.log('written all students to a json \n')
const entrys = require("./students.json")
    for (const user of entrys) {
        try {
            if (user.gender == "female") females.push(user);
            else if (user.gender == "male") males.push(user);
            else if (user.gender == "") unknown.push(user)
            } catch (error) {
                console.log(error)
            };
        }
console.log('females:', females.length, '\nmales:', males.length, '\nunknown:', unknown.length, '\nEveryone:', males.length + females.length + unknown.length);

fs.writeFileSync('./teachers.json', JSON.stringify(teachers))
console.log("\nwritten all teachers to a json")
const entrys1 = require("./teachers.json")
for (const teacher1 of entrys1) {
    try {
        if (teacher1.title == "") teacher.push(teacher1)
        } catch (error) {
            console.log(error)
        }
    }
console.log("teachers:", teacher.length)

}).then(() => {
    untis.logout()
    console.log('\nlogged out')
});