const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Qualification', {
    ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    QUALIFICATION: {
        type: DataTypes.INTEGER,
    },
  })
}