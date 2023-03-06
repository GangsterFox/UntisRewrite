const WebUntisLib = require('webuntis');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const QRCodeData = process.env.QRCodeData;
const untis = new WebUntisLib.WebUntisQR(QRCodeData);

// start of script
untis.login().then(async () => {
let females = [];
let males = [];
let unknown = [];
let teacher = [];

// fetch the data we need
const students = await untis.getStudents();
const teachers = await untis.getTeachers();
const roomies = await untis.getRooms();
const classes = await untis.getClasses();
const unixtimestamp = await untis.getLatestImportTime();
const year = await untis.getLatestSchoolyear();

// write every fetch into jsons, gotta rework timestamp and year because its such a waste of space
fs.writeFileSync('./students.json', JSON.stringify(students));
fs.writeFileSync('./teachers.json', JSON.stringify(teachers));
fs.writeFileSync('./rooms.json', JSON.stringify(roomies));
fs.writeFileSync('./classes.json', JSON.stringify(classes));
fs.writeFileSync('./timestamp.json', JSON.stringify(unixtimestamp));
fs.writeFileSync('./year.json', JSON.stringify(year));
console.log("written all data into JSON's\n");

// we require the json fetches
const entrys = require("./students.json");
const entrys1 = require("./teachers.json");
const entrys2 = require("./rooms.json");
const entrys3 = require("./classes.json");
const writtenDate = require("./timestamp.json");
const SchoolYear = require("./year.json");

// user count and genders
for (const user of entrys) {
    try {
        if (user.gender == "female") females.push(user)
        else if (user.gender == "male") males.push(user)
        else if (user.gender == "") unknown.push(user)
        } catch (error) {
            console.log(error)
        }
};

// teachers count. also counts the hidden accounts like GT
for (const teacher1 of entrys1) {
    try {
        if (teacher1.title == "") teacher.push(teacher1)
        } catch (error) {
            console.log(error)
        };
};

// count amounts of rooms
for (const roamo of entrys2) {
    try {
        if (roamo.building = "") roomies.push(roamo)
    } catch (error) {
        console.log(error)
    };
};

// count amount of classes, has a class which is unknown
for (const classisi of entrys3) {
    try {
        if (classisi.active == "true") classes.push(classisi)
    } catch (error) {
        console.log(error)
    };
};

// I love deprecated functions!!!!!!!! (get latest time updated, not putting days because useless)
try {
    var date = new Date(writtenDate * 1000);
    var hours = date.getHours() + 1;
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
} catch (error) {
    console.log(error);
};

console.log('females:', females.length, '\nmales:', males.length, '\nunknown:', unknown.length, '\nEveryone:', males.length + females.length + unknown.length);
console.log('\nteachers:', teacher.length);
console.log('\nrooms:', roomies.length);
console.log('classes:', classes.length);
console.log('\nlast updated:', formattedTime, '\nSchool Year:', SchoolYear.name);

// magic logout
untis.logout()
console.log('\nlogged out')
});