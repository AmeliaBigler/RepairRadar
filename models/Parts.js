const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Parts extends Model { };

Parts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'parts',
    }
);

module.exports = Parts;


