const WebUntis = require("webuntis");
const fs = require("fs");
require("dotenv").config();
//const untis = new WebUntis.WebUntisAnonymousAuth('GWS Villingen', 'kephiso.webuntis.com');
const untis = new WebUntis.WebUntisQR(process.env.loginDetails);

untis.login().then(async () => {

fs.writeFileSync('./output/testing.json', JSON.stringify(await untis.getStatusData(), null, 2));
const testing = JSON.parse(fs.readFileSync('./output/testing.json'));

console.log(`Amount: ${testing.length}`);

}).then(() => untis.logout(console.log("\nlogged out"))).catch(console.error);
