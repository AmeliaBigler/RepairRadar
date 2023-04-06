const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection.js")

class Part extends Model {}

Part.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "Part",
    timestamps: false
})

module.exports = Part