const { Client } = require('pg');



const client = new Client({   connectionString: `postgres://tkxrcaebobveui:c898ac2fb30216bd23690ad6bd7e92e40f2a376652d93d66935ec973fc055d62@ec2-34-233-157-9.compute-1.amazonaws.com:5432/d3p0q54nte5l2q?sslmode=require`,   ssl: {     rejectUnauthorized: false   } });
client.connect();

module.exports = client;