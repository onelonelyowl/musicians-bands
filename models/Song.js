const {Sequelize, db} = require('../db');

const Song = db.define("Song", {
    title: Sequelize.DataTypes.STRING,
    year: Sequelize.DataTypes.INTEGER,
    length: Sequelize.DataTypes.INTEGER
});

module.exports = {
    Song
};