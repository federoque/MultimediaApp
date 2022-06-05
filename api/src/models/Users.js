const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('User', {
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
    PASSWORD: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ROLE: {
      type: DataTypes.ENUM('Admin', 'User'), 
      allowNull: false, 
      defaultValue: 'User'
    }
  })
}