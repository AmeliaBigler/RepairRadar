const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ticket extends Model {}

Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        carMake: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carModel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'ticket',
    }
)

module.exports = Ticket