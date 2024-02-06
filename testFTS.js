const WebUntis = require("webuntis");
const fs = require("fs");
const env = require("dotenv");
env.config();
const untis = new WebUntis.WebUntisQR(process.env.loginDetails);

// what works: getRooms, getClasses, getHolidays, getSubjects, getOwnTimetableForWeek
// TODO: make this look more professional

// log in
untis.login().then(async () => {

// fetch what we need
const roomies = await untis.getRooms();
const classisi = await untis.getClasses();
const holidayo = await untis.getHolidays();
const subjectoiano = await untis.getSubjects();
const timetablao = await untis.getOwnTimetableForWeek(new Date());
// const schuljahro = await untis.getLatestSchoolyear();

// write it into jsons
fs.writeFileSync('./rooms.json', JSON.stringify(roomies));
fs.writeFileSync('./classes.json', JSON.stringify(classisi));
fs.writeFileSync('./holidays.json', JSON.stringify(holidayo));
fs.writeFileSync('./subjects.json', JSON.stringify(subjectoiano));
fs.writeFileSync('./timetable.json', JSON.stringify(timetablao));
console.log("written all data into JSON's");

// console.log(`Current Schoolyear: ${schuljahro.name}`);

// log the amounts
console.log(`\nAmount of rooms: ${roomies.length}`);
console.log(`Amount of classes: ${classisi.length}`);
console.log(`Amount of holidays: ${holidayo.length}`);
console.log(`Amount of subjects: ${subjectoiano.length}`);
console.log(`Amount of timetable entries: ${timetablao.length}`);

// log out
}).then(() => untis.logout(console.log("\nlogged out"))).catch(console.error);
