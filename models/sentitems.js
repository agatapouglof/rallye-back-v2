/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sentitems', {
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
    SendingDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    DeliveryDateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    DestinationNumber: {
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
      defaultValue: '0',
      primaryKey: true
    },
    SenderID: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SequencePosition: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      primaryKey: true
    },
    Status: {
      type: DataTypes.ENUM('SendingOK','SendingOKNoReport','SendingError','DeliveryOK','DeliveryFailed','DeliveryPending','DeliveryUnknown','Error'),
      allowNull: false,
      defaultValue: 'SendingOK'
    },
    StatusError: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '-1'
    },
    TPMR: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '-1'
    },
    RelativeValidity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '-1'
    },
    CreatorID: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'sentitems'
  });
};
