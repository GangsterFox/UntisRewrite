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
const rooms = await untis.getRooms();
const classes = await untis.getClasses();
const holidays = await untis.getHolidays();
const subjects = await untis.getSubjects();
const timetable = await untis.getOwnTimetableForWeek(new Date());
// const schuljahro = await untis.getLatestSchoolyear();

// write it into jsons
fs.writeFileSync('./rooms.json', JSON.stringify(rooms));
fs.writeFileSync('./classes.json', JSON.stringify(classes));
fs.writeFileSync('./holidays.json', JSON.stringify(holidays));
fs.writeFileSync('./subjects.json', JSON.stringify(subjects));
fs.writeFileSync('./timetable.json', JSON.stringify(timetable));
console.log("written all data into JSON's");

// console.log(`Current Schoolyear: ${schuljahro.name}`);

// log the amounts
console.log(`\nAmount of rooms: ${rooms.length}`);
console.log(`Amount of classes: ${classes.length}`);
console.log(`Amount of holidays: ${holidays.length}`);
console.log(`Amount of subjects: ${subjects.length}`);
console.log(`Amount of timetable entries: ${timetable.length}`);

// log out
}).then(() => untis.logout(console.log("\nlogged out"))).catch(console.error);
