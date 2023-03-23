const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TicketParts extends Model {}

TicketParts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
      ticketId: {
        type: DataTypes.UUID,
        references: {
          model: "ticket",
          key: "id"
          }
        },
      partsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "parts",
          key: "id"
          }
        }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'ticketParts',
    }
  );
  
  module.exports = TicketParts;