const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const salon_settings = sequelize.define(
    'salon_settings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

nama_salon: {
        type: DataTypes.TEXT,
      
      

      },

alamat_salon: {
        type: DataTypes.TEXT,
      
      

      },

nomor_whatsapp_salon: {
        type: DataTypes.TEXT,
      
      

      },

email_salon: {
        type: DataTypes.TEXT,
      
      

      },

jam_operasional: {
        type: DataTypes.TEXT,
      
      

      },

catatan_kebijakan: {
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

  salon_settings.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity


















//end loop





    db.salon_settings.hasMany(db.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.salon_settings.getTableName(),
        belongsToColumn: 'logo',
      },
    });


    db.salon_settings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.salon_settings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return salon_settings;
};


