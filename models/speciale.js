/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('speciale', {
    id: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    nom_speciale: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    distance_speciale: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    id_course: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    id_etape: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    ordre: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'speciale',
    timestamps: false

  });
};
