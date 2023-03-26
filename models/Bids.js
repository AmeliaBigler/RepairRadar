const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bids extends Model {};

Bids.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mechanicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'mechanic',
                key: 'id'
            }
        },
        ticketId: {
            type:DataTypes.INTEGER,
            references: {
                model: 'ticket',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'bids',
    }
);

module.exports = Bids;