const {Sequelize, db} = require('../db');

const Band = db.define("Band", {
    name: Sequelize.DataTypes.STRING,
    genre: Sequelize.DataTypes.STRING
});

module.exports = {
    Band
};