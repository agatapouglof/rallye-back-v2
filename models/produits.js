/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('produits', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    max: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'produits'
  });
};
