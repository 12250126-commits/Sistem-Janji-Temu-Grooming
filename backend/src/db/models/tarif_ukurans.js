const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const tarif_ukurans = sequelize.define(
    'tarif_ukurans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

ukuran_hewan: {
        type: DataTypes.ENUM,
      
      

        values: [

"kecil",


"sedang",


"besar"

        ],

      },

tarif_tambahan: {
        type: DataTypes.DECIMAL,
      
      

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  tarif_ukurans.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity


















//end loop



    db.tarif_ukurans.belongsTo(db.layanans, {
      as: 'layanan',
      foreignKey: {
        name: 'layananId',
      },
      constraints: false,
    });




    db.tarif_ukurans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tarif_ukurans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return tarif_ukurans;
};


