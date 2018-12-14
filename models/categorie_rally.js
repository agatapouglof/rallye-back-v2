/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categorie_rally', {
    id_categorie: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nom_categorie: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'categorie_rally'
  });
};
