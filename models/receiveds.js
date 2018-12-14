/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('receiveds', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_vendeur: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'receiveds'
  });
};
