const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection.js")
const moment = require('moment');

class Message extends Model { }

Message.init({
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
    },
    roomId: {
        type: DataTypes.UUID,
        references: {
            model: "Room",
            key: "room_id"
        }
    },
    content: {
        type: DataTypes.STRING
    },
    sentBy: {
        type: DataTypes.STRING
    }, 
    dateTime: {
        type: DataTypes.DATEONLY,
        get: function() {
           return moment(this.getDataValue('DateTime')).format('MM.DD.YYYY')
           
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    modelName: "Message",
    underscored: true
})

module.exports = Message