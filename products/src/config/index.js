import dotenv from 'dotenv';

dotenv.config('./.env');
const { config } = require(process.env.NODE_ENV ? `./${process.env.NODE_ENV}.js` : './development.js');

export default config;

