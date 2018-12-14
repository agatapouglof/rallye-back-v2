/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phones', {
    ID: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UpdatedInDB: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    InsertIntoDB: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    TimeOut: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    Send: {
      type: DataTypes.ENUM('yes','no'),
      allowNull: false,
      defaultValue: 'no'
    },
    Receive: {
      type: DataTypes.ENUM('yes','no'),
      allowNull: false,
      defaultValue: 'no'
    },
    IMEI: {
      type: DataTypes.STRING(35),
      allowNull: false,
      primaryKey: true
    },
    NetCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: 'ERROR'
    },
    NetName: {
      type: DataTypes.STRING(35),
      allowNull: true,
      defaultValue: 'ERROR'
    },
    Client: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Battery: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '-1'
    },
    Signal: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '-1'
    },
    Sent: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    Received: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'phones'
  });
};
