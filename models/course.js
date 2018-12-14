/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom_course: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    nom_organisateur: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    date_debut_course: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    date_fin_course: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'course',
    timestamps: false

  });
};
