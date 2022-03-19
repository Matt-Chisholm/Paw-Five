require('dotenv').config()
const { Client } = require('pg');



const client = new Client({ connectionString: process.env["Heroku_KEY"], ssl: { rejectUnauthorized: false } });
// removed '?sslmode=require' from end of this request query
client.connect();

module.exports = client;