const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const layanans = sequelize.define(
    'layanans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

kode_layanan: {
        type: DataTypes.TEXT,
      
      

      },

nama: {
        type: DataTypes.TEXT,
      
      

      },

deskripsi: {
        type: DataTypes.TEXT,
      
      

      },

durasi_menit: {
        type: DataTypes.INTEGER,
      
      

      },

harga_dasar: {
        type: DataTypes.DECIMAL,
      
      

      },

is_active: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      

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

  layanans.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity









    db.layanans.hasMany(db.tarif_ukurans, {
      as: 'tarif_ukurans_layanan',
      foreignKey: {
          name: 'layananId',
      },
      constraints: false,
    });



    db.layanans.hasMany(db.bookings, {
      as: 'bookings_layanan',
      foreignKey: {
          name: 'layananId',
      },
      constraints: false,
    });








//end loop






    db.layanans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.layanans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return layanans;
};


