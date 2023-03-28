const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require("../config/connection.js");

class Room extends Model { }

Room.init({
    roomId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    },
    mechanicId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Mechanic",
            key: "id"
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    modelName: "Room"
})

module.exports = Room