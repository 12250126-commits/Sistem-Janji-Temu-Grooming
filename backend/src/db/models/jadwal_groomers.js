const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const jadwal_groomers = sequelize.define(
    'jadwal_groomers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

hari: {
        type: DataTypes.ENUM,
      
      

        values: [

"senin",


"selasa",


"rabu",


"kamis",


"jumat",


"sabtu",


"minggu"

        ],

      },

jam_mulai: {
        type: DataTypes.TEXT,
      
      

      },

jam_selesai: {
        type: DataTypes.TEXT,
      
      

      },

jam_istirahat_mulai: {
        type: DataTypes.TEXT,
      
      

      },

jam_istirahat_selesai: {
        type: DataTypes.TEXT,
      
      

      },

kapasitas_slot: {
        type: DataTypes.INTEGER,
      
      

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

  jadwal_groomers.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity


















//end loop



    db.jadwal_groomers.belongsTo(db.groomers, {
      as: 'groomer',
      foreignKey: {
        name: 'groomerId',
      },
      constraints: false,
    });




    db.jadwal_groomers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.jadwal_groomers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return jadwal_groomers;
};


