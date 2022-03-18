const { Pool } = require('pg');

const pool = new Pool({
  user: 'tkxrcaebobveui',
  password: 'c898ac2fb30216bd23690ad6bd7e92e40f2a376652d93d66935ec973fc055d62',
  host: 'ec2-34-233-157-9.compute-1.amazonaws.com',
  database: 'd3p0q54nte5l2q'
});

module.exports = pool;