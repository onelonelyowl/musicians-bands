const {Sequelize, db} = require('../db');

const Manager = db.define("Manager", {
    name: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    salary: Sequelize.DataTypes.INTEGER,
    dateHired: Sequelize.DataTypes.DATE
});

module.exports = {
    Manager
};