const {Sequelize, db} = require('../db');

const Band = db.define("Band", {
    name: Sequelize.DataTypes.STRING,
    genre: Sequelize.DataTypes.STRING,
    showCount: Sequelize.DataTypes.INTEGER
});

module.exports = {
    Band
};