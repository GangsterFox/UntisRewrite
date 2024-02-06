const WebUntis = require("webuntis");
const fs = require("fs");
require("dotenv").config();
const untis = new WebUntis.WebUntisQR(process.env.loginDetails);

// most api calls sadly stopped working for unknown reasons
// TODO: fix schoolyear
// TODO: find new ways to get student data, current wrapper broke

// log in
untis.login().then(async () => {

    
// write it into jsons
const rooms = await untis.getRooms(); fs.writeFileSync('./rooms.json', JSON.stringify(rooms));
const classes = await untis.getClasses(); fs.writeFileSync('./classes.json', JSON.stringify(classes));
const holidays = await untis.getHolidays(); fs.writeFileSync('./holidays.json', JSON.stringify(holidays));
const subjects = await untis.getSubjects(); fs.writeFileSync('./subjects.json', JSON.stringify(subjects));
const timetable = await untis.getOwnTimetableForWeek(new Date()); fs.writeFileSync('./timetable.json', JSON.stringify(timetable));
//const schoolyear = await untis.getLatestSchoolyear();
console.log("written all data into JSON's");
  
//log the amounts
//console.log(`Current Schoolyear: ${schoolyear.name}`);

console.log(`\nAmount of rooms: ${rooms.length}`);
console.log(`Amount of classes: ${classes.length}`);
console.log(`Amount of holidays: ${holidays.length}`);
console.log(`Amount of subjects: ${subjects.length}`);
console.log(`Amount of timetable entries: ${timetable.length}`);

// log out
}).then(() => untis.logout(console.log("\nlogged out"))).catch(console.error);
