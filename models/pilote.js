/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pilote', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true
    },
    num_transpondeur: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    nom_pilote: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    prenom_pilote: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    nat_pilote: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'CIV'
    },
    nom_copilote: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    prenom_copilote: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    nat_copilote: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'CIV'
    },
    marque_vehicule: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id_categorie: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    id_etape: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    arc: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    homologue: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    classgroup: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'S'
    },
    abandon: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'pilote',
    timestamps: false

  });
};
