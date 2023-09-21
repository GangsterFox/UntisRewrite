const WebUntis = require("webuntis");
const fs = require("fs");
const untis = new WebUntis('FTS-Villingen-Schwenningen', 'HayvanDin', 'Dinis2006.', 'arche.webuntis.com');

// we worked out that getSubjects, getRooms, getClasses and getHolidays are the things that work and are useful
// so we're gonna do it like this:
// getRooms, getClasses, getHolidays, getSubjects is what we are going to use

// log in
untis.login().then(async () => {

// fetch what we need
const rooms = await untis.getRooms();
const classes = await untis.getClasses();
const holidays = await untis.getHolidays();
const subjects = await untis.getSubjects();

// write it into jsons
async function writeToJson() {
    fs.writeFileSync('./rooms.json', JSON.stringify(rooms));
    fs.writeFileSync('./classes.json', JSON.stringify(classes));
    fs.writeFileSync('./holidays.json', JSON.stringify(holidays));
    fs.writeFileSync('./subjects.json', JSON.stringify(subjects));
    console.log("written all data into JSON's\n");
};
writeToJson();

// require the jsons
const roomies = require("./rooms.json");
const classisi = require("./classes.json");
const holidayo = require("./holidays.json");
const subjectoiano = require("./subjects.json");

// count amounts of rooms
for (const roamo of roomies) {
    try {
        if (roamo.building = "") roomies.push(roamo)
    } catch (error) {
        console.log(error)
    };
};

// count amounts of classes
for (const classo of classisi) {
    try {
        if (classo.active = 'true') classisi.push(classo)
    } catch (error) {
        console.log(error)
    };
};

// count amounts of holidays
for (const holiday of holidayo) {
    try {
        data.filter(holiday => holiday.longName in holidayo); holidayo.push(holiday)
    } catch (error) {
        console.log(error)
    };
};

// count amounts of subjects
for (const subject of subjectoiano) {
    try {
        if (subject.active = 'true') subjectoiano.push(subject)
    } catch (error) {
        console.log(error)
    };
};

// log the amounts
console.log(`Amount of rooms: ${roomies.length}`);
console.log(`Amount of classes: ${classisi.length}`);
console.log(`Amount of holidays: ${holidayo.length}`);
console.log(`Amount of subjects: ${subjectoiano.length}`);

// log out
}).then(() => untis.logout(console.log("logged out"))).catch(console.error);