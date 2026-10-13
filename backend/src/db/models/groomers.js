const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const groomers = sequelize.define(
    'groomers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

kode_groomer: {
        type: DataTypes.TEXT,
      
      

      },

nama_tampilan: {
        type: DataTypes.TEXT,
      
      

      },

bio_singkat: {
        type: DataTypes.TEXT,
      
      

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

  groomers.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity










    db.groomers.hasMany(db.jadwal_groomers, {
      as: 'jadwal_groomers_groomer',
      foreignKey: {
          name: 'groomerId',
      },
      constraints: false,
    });


    db.groomers.hasMany(db.bookings, {
      as: 'bookings_groomer',
      foreignKey: {
          name: 'groomerId',
      },
      constraints: false,
    });



    db.groomers.hasMany(db.riwayat_groomings, {
      as: 'riwayat_groomings_groomer',
      foreignKey: {
          name: 'groomerId',
      },
      constraints: false,
    });






//end loop



    db.groomers.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });




    db.groomers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.groomers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return groomers;
};


