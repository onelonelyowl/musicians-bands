const {Sequelize, db} = require('../db');

const Musician = db.define("Musician", {
    name: Sequelize.DataTypes.STRING,
    instrument: Sequelize.DataTypes.STRING
});

module.exports = {
    Musician
};