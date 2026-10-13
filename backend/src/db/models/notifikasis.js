const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const notifikasis = sequelize.define(
    'notifikasis',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

channel: {
        type: DataTypes.ENUM,
      
      

        values: [

"whatsapp"

        ],

      },

jenis: {
        type: DataTypes.ENUM,
      
      

        values: [

"booking_baru",


"booking_dikonfirmasi",


"booking_ditolak",


"perubahan_jadwal",


"pembatalan",


"pengingat_h1",


"pengingat_h2",


"grooming_selesai"

        ],

      },

tujuan: {
        type: DataTypes.TEXT,
      
      

      },

pesan: {
        type: DataTypes.TEXT,
      
      

      },

status_kirim: {
        type: DataTypes.ENUM,
      
      

        values: [

"queued",


"sent",


"failed",


"skipped"

        ],

      },

dijadwalkan_pada: {
        type: DataTypes.DATE,
      
      

      },

dikirim_pada: {
        type: DataTypes.DATE,
      
      

      },

provider: {
        type: DataTypes.TEXT,
      
      

      },

provider_message_ref: {
        type: DataTypes.TEXT,
      
      

      },

response_raw: {
        type: DataTypes.TEXT,
      
      

      },

retry_count: {
        type: DataTypes.INTEGER,
      
      

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

  notifikasis.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity


















//end loop



    db.notifikasis.belongsTo(db.bookings, {
      as: 'booking',
      foreignKey: {
        name: 'bookingId',
      },
      constraints: false,
    });




    db.notifikasis.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.notifikasis.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return notifikasis;
};


