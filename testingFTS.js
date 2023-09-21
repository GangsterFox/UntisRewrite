const WebUntis = require("webuntis");
const fs = require("fs");
const untis = new WebUntis('FTS-Villingen-Schwenningen', 'HayvanDin', 'Dinis2006.', 'arche.webuntis.com');

untis.login().then( async () => {
    const testing = untis.getRooms();
    fs.writeFileSync('./testing.json', JSON.stringify(testing));
    console.log("written all data into JSON's\n")
}
).then(untis.logout())
