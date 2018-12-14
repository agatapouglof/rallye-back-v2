/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pbk', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    GroupID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '-1'
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Number: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'pbk'
  });
};
