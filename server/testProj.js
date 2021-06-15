const proj4 = require("proj4")
console.log(`❗ testProj.js:2 'proj4'`,proj4);
const TL_PX = [ 5718720.025639196, -8190390.92229111]


const espg4326 = proj4(proj4.defs("EPSG:4326"),proj4.defs("GOOGLE"), TL_PX);
console.log(`❗ testProj.js:5 'espg4326'`,espg4326);


