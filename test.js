const WebUntis = require("webuntis");
const fs = require("fs");
const untis = new WebUntis.WebUntisAnonymousAuth('GWS Villingen', 'kephiso.webuntis.com');

untis.login().then(async () => {

fs.writeFileSync('./testing.json', JSON.stringify(await untis.getClasses()));
const testing = JSON.parse(fs.readFileSync('./output/testing.json'));

console.log(`Amount: ${testing.length}`);

}).then(() => untis.logout(console.log("\nlogged out"))).catch(console.error);
