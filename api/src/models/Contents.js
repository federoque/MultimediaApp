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
    IMG:{
      type: DataTypes.TEXT,
      allowNull:false,
      defaultValue: "https://i.pinimg.com/736x/48/5d/34/485d3490861e058d4af3c69c7f41eb2d.jpg"
    }
  })
}