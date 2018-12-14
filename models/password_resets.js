/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('password_resets', {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'password_resets'
  });
};
