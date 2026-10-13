const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const bookings = sequelize.define(
    'bookings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

kode_booking: {
        type: DataTypes.TEXT,
      
      

      },

waktu_mulai: {
        type: DataTypes.DATE,
      
      

      },

waktu_selesai: {
        type: DataTypes.DATE,
      
      

      },

durasi_menit: {
        type: DataTypes.INTEGER,
      
      

      },

harga_dasar_snapshot: {
        type: DataTypes.DECIMAL,
      
      

      },

tarif_ukuran_snapshot: {
        type: DataTypes.DECIMAL,
      
      

      },

total_biaya: {
        type: DataTypes.DECIMAL,
      
      

      },

status_booking: {
        type: DataTypes.ENUM,
      
      

        values: [

"pending",


"confirmed",


"on_progress",


"done",


"cancelled"

        ],

      },

status_diubah_pada: {
        type: DataTypes.DATE,
      
      

      },

status_diubah_oleh: {
        type: DataTypes.TEXT,
      
      

      },

catatan_konsumen: {
        type: DataTypes.TEXT,
      
      

      },

catatan_admin: {
        type: DataTypes.TEXT,
      
      

      },

dibatalkan_pada: {
        type: DataTypes.DATE,
      
      

      },

alasan_batal: {
        type: DataTypes.TEXT,
      
      

      },

butuh_reschedule: {
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

  bookings.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity












    db.bookings.hasMany(db.pembayarans, {
      as: 'pembayarans_booking',
      foreignKey: {
          name: 'bookingId',
      },
      constraints: false,
    });


    db.bookings.hasMany(db.riwayat_groomings, {
      as: 'riwayat_groomings_booking',
      foreignKey: {
          name: 'bookingId',
      },
      constraints: false,
    });


    db.bookings.hasMany(db.notifikasis, {
      as: 'notifikasis_booking',
      foreignKey: {
          name: 'bookingId',
      },
      constraints: false,
    });





//end loop



    db.bookings.belongsTo(db.konsumens, {
      as: 'konsumen',
      foreignKey: {
        name: 'konsumenId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.hewans, {
      as: 'hewan',
      foreignKey: {
        name: 'hewanId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.layanans, {
      as: 'layanan',
      foreignKey: {
        name: 'layananId',
      },
      constraints: false,
    });

    db.bookings.belongsTo(db.groomers, {
      as: 'groomer',
      foreignKey: {
        name: 'groomerId',
      },
      constraints: false,
    });




    db.bookings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.bookings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return bookings;
};


