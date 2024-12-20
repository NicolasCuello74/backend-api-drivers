require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require('pg');
const fs = require('fs');
const path = require('path');
const { POSTGRES_URL
} = process.env;

const sequelize = new Sequelize(`${POSTGRES_URL}`, {
  dialect: 'postgres', 
  dialectModule: pg, 
  protocol: 'postgres',  
  logging: false,  
  native: false,  
  dialectOptions: {  
    ssl: {  
      require: true,
      rejectUnauthorized: false,
    },  
  }, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Driver, Team } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Driver.belongsToMany(Team, { through: 'DriverTeams' });
Team.belongsToMany(Driver, { through: "DriverTeams" });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};