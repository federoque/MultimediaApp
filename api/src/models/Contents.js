const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Content', {
    ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    URL: {
      type: DataTypes.TEXT,
        allowNull: false,
    },
  })
}