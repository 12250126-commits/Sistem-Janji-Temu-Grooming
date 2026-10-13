const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const pembayarans = sequelize.define(
    'pembayarans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

metode: {
        type: DataTypes.ENUM,
      
      

        values: [

"cash",


"transfer_bank",


"e_wallet"

        ],

      },

jumlah_tagihan: {
        type: DataTypes.DECIMAL,
      
      

      },

jumlah_dibayar: {
        type: DataTypes.DECIMAL,
      
      

      },

status_pembayaran: {
        type: DataTypes.ENUM,
      
      

        values: [

"belum_bayar",


"dp",


"lunas",


"refund"

        ],

      },

dibayar_pada: {
        type: DataTypes.DATE,
      
      

      },

diverifikasi_pada: {
        type: DataTypes.DATE,
      
      

      },

diverifikasi_oleh: {
        type: DataTypes.TEXT,
      
      

      },

catatan_verifikasi: {
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

  pembayarans.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity


















//end loop



    db.pembayarans.belongsTo(db.bookings, {
      as: 'booking',
      foreignKey: {
        name: 'bookingId',
      },
      constraints: false,
    });



    db.pembayarans.hasMany(db.file, {
      as: 'bukti_bayar',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.pembayarans.getTableName(),
        belongsToColumn: 'bukti_bayar',
      },
    });


    db.pembayarans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pembayarans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return pembayarans;
};


