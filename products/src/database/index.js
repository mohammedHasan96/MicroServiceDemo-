/** @format */

import Sequelize from 'sequelize';
import config from 'config';
import logger from 'logger';
import fs from 'fs';
import path from 'path';

const {
  database: {
    connect: {
      DATABASE, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST
    },
  },
} = config;

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: 5432,
  dialect: 'postgres',
  logging: logger.debug.bind(logger),
  // logging: console.log,
  define: {
    underscored: false,
  },
  protocol: 'postgres',
});
const modelsDir = `${__dirname}/../models/`;
const db = {};
fs.readdirSync(modelsDir)
  .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(modelsDir, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
