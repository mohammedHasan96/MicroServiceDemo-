import { Sequelize } from 'sequelize';
import Umzug from 'umzug';
import dotenv from 'dotenv';
import config from './src/config';
dotenv.config('./.env');
// load the right .env.APP_ENV in local development
const {
  database: {
    connect: {
      DATABASE, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST
    }
  }
} = config;
console.log('process.env.NODE_ENV', DATABASE, DATABASE_USER);

if (!DATABASE) throw new Error('You have to set NODE_ENV');

const sequelize = new Sequelize(
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: false,
    },
  },
);

const umzug = new Umzug({
  migrations: {
    path: './migrations',
    // pattern: '*.js',
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
});

const seeders = new Umzug({
  migrations: {
    path: './seeders',
    // pattern: new RegExp('*.js'),
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize,
    modelName: 'SequelizeData'
  },
});
const migrations = async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  try {
    console.log('Migrations started');
    await umzug.up();
    return await seeders.up();
  } catch (error) {
    console.log('error => ', error);
    // eslint-disable-next-line
    throw new Error('Migrations Fail')
  }
};


export default migrations;