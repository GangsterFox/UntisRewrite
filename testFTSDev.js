const WebUntis = require("webuntis");
const fs = require("fs");
require("dotenv").config();
const untis = new WebUntis.WebUntisQR(process.env.loginDetails);

// most api calls sadly stopped working for unknown reasons
// TODO: fix the getOwnTimetableForWeek function to use the new format
// TODO: find new ways to get student data, current wrapper broke
// TODO: fix this mess, it stopped counting the amount of entries correctly

// log in
untis.login().then(async () => {

// fetch what we need
const timetable = await untis.getOwnTimetableForWeek(new Date());
// const schoolyear = await untis.getLatestSchoolyear();

// write it into jsons
await fs.writeFileSync('./rooms.json', JSON.stringify(await untis.getRooms()));
await fs.writeFileSync('./classes.json', JSON.stringify(await untis.getClasses()));
await fs.writeFileSync('./holidays.json', JSON.stringify(await untis.getHolidays()));
await fs.writeFileSync('./subjects.json', JSON.stringify(await untis.getSubjects()));
//fs.writeFileSync('./timetable.json', JSON.stringify(await untis.getTimetableForWeek(new Date())));

fs.writeFileSync('./timetable.json', JSON.stringify(timetable));
console.log("written all data into JSON's");

// console.log('Current Schoolyear: +', untis.getLatestSchoolyear());

// log the amounts
console.log(`\nAmount of rooms: ${'./rooms.json'.length}`);
console.log(`Amount of classes: ${'./classes.json'.length}`);
console.log(`Amount of holidays: ${'./holidays.json'.length}`);
console.log(`Amount of subjects: ${'./subjects.json'.length}`);
console.log(`Amount of timetable entries: ${'./timetable.json'.length}`);
//console.log(`students: ${students.length}`);

// log out
}).then(() => untis.logout(console.log("\nlogged out"))).catch(console.error);
