/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inbox', {
    UpdatedInDB: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    ReceivingDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    SenderNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    Coding: {
      type: DataTypes.ENUM('Default_No_Compression','Unicode_No_Compression','8bit','Default_Compression','Unicode_Compression'),
      allowNull: false,
      defaultValue: 'Default_No_Compression'
    },
    UDH: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    SMSCNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    Class: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '-1'
    },
    TextDecoded: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    RecipientID: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Processed: {
      type: DataTypes.ENUM('false','true'),
      allowNull: false,
      defaultValue: 'false'
    }
  }, {
    tableName: 'inbox'
  });
};
