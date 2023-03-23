const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ticket extends Model {}

Ticket.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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