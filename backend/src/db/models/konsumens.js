const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const konsumens = sequelize.define(
    'konsumens',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

kode_konsumen: {
        type: DataTypes.TEXT,
      
      

      },

alamat: {
        type: DataTypes.TEXT,
      
      

      },

wa_opt_in: {
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

  konsumens.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity







    db.konsumens.hasMany(db.hewans, {
      as: 'hewans_konsumen',
      foreignKey: {
          name: 'konsumenId',
      },
      constraints: false,
    });





    db.konsumens.hasMany(db.bookings, {
      as: 'bookings_konsumen',
      foreignKey: {
          name: 'konsumenId',
      },
      constraints: false,
    });








//end loop



    db.konsumens.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });




    db.konsumens.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.konsumens.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return konsumens;
};


