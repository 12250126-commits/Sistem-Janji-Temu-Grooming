const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const riwayat_groomings = sequelize.define(
    'riwayat_groomings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

mulai_pada: {
        type: DataTypes.DATE,
      
      

      },

selesai_pada: {
        type: DataTypes.DATE,
      
      

      },

berat_kg_setelah: {
        type: DataTypes.DECIMAL,
      
      

      },

kondisi_setelah: {
        type: DataTypes.ENUM,
      
      

        values: [

"baik",


"butuh_perhatian",


"darurat"

        ],

      },

catatan_tindakan: {
        type: DataTypes.TEXT,
      
      

      },

catatan_kondisi: {
        type: DataTypes.TEXT,
      
      

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

  riwayat_groomings.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity


















//end loop



    db.riwayat_groomings.belongsTo(db.bookings, {
      as: 'booking',
      foreignKey: {
        name: 'bookingId',
      },
      constraints: false,
    });

    db.riwayat_groomings.belongsTo(db.hewans, {
      as: 'hewan',
      foreignKey: {
        name: 'hewanId',
      },
      constraints: false,
    });

    db.riwayat_groomings.belongsTo(db.groomers, {
      as: 'groomer',
      foreignKey: {
        name: 'groomerId',
      },
      constraints: false,
    });



    db.riwayat_groomings.hasMany(db.file, {
      as: 'foto_setelah',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.riwayat_groomings.getTableName(),
        belongsToColumn: 'foto_setelah',
      },
    });


    db.riwayat_groomings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.riwayat_groomings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return riwayat_groomings;
};


