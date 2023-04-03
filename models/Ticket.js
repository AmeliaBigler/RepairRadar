const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ticket extends Model { };

Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        carMake: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carModel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modelYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        issue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        winner: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultNull: true,
            references: {
                model: 'mechanic',
                key: 'id'
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }, 
        lat: {
            type: DataTypes.INTEGER
        },
        lon: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'ticket',
    }
);

module.exports = Ticket;