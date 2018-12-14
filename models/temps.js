/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temps', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_pilote: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ordre_speciale: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    temps: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    penalite: {
      type: DataTypes.INTEGER(50),
      allowNull: true
    },
    depart: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dms: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    arrivee: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ams: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    id_speciale: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'temps',
    timestamps: false

  });
};
