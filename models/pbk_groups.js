/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pbk_groups', {
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'pbk_groups'
  });
};
