const WebUntis = require("webuntis");
const fs = require("fs");
const env = require("dotenv");
env.config();
const untis = new WebUntis.WebUntisQR(process.env.loginDetails);

// we worked out that getSubjects, getRooms, getClasses and getHolidays are the things that work and are useful
// so we're gonna do it like this:
// getRooms, getClasses, getHolidays, getSubjects is what we are going to use

// log in
untis.login().then(async () => {

// fetch what we need
const roomies = await untis.getRooms();
const classisi = await untis.getClasses();
const holidayo = await untis.getHolidays();
const subjectoiano = await untis.getSubjects();

// write it into jsons
fs.writeFileSync('./rooms.json', JSON.stringify(roomies));
fs.writeFileSync('./classes.json', JSON.stringify(classisi));
fs.writeFileSync('./holidays.json', JSON.stringify(holidayo));
fs.writeFileSync('./subjects.json', JSON.stringify(subjectoiano));
console.log("written all data into JSON's\n");

// log the amounts
console.log(`Amount of rooms: ${roomies.length}`);
console.log(`Amount of classes: ${classisi.length}`);
console.log(`Amount of holidays: ${holidayo.length}`);
console.log(`Amount of subjects: ${subjectoiano.length}`);

// log out
}).then(() => untis.logout(console.log("\nlogged out"))).catch(console.error);