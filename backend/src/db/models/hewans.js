const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const hewans = sequelize.define(
    'hewans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

nama: {
        type: DataTypes.TEXT,
      
      

      },

jenis: {
        type: DataTypes.ENUM,
      
      

        values: [

"kucing",


"anjing",


"lainnya"

        ],

      },

ras: {
        type: DataTypes.TEXT,
      
      

      },

ukuran: {
        type: DataTypes.ENUM,
      
      

        values: [

"kecil",


"sedang",


"besar"

        ],

      },

umur_bulan: {
        type: DataTypes.INTEGER,
      
      

      },

berat_kg: {
        type: DataTypes.DECIMAL,
      
      

      },

catatan_khusus: {
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

  hewans.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity











    db.hewans.hasMany(db.bookings, {
      as: 'bookings_hewan',
      foreignKey: {
          name: 'hewanId',
      },
      constraints: false,
    });



    db.hewans.hasMany(db.riwayat_groomings, {
      as: 'riwayat_groomings_hewan',
      foreignKey: {
          name: 'hewanId',
      },
      constraints: false,
    });






//end loop



    db.hewans.belongsTo(db.konsumens, {
      as: 'konsumen',
      foreignKey: {
        name: 'konsumenId',
      },
      constraints: false,
    });



    db.hewans.hasMany(db.file, {
      as: 'foto',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.hewans.getTableName(),
        belongsToColumn: 'foto',
      },
    });


    db.hewans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.hewans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return hewans;
};


