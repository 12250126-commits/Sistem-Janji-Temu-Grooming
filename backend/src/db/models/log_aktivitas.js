const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const log_aktivitas = sequelize.define(
    'log_aktivitas',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

aksi: {
        type: DataTypes.TEXT,
      
      

      },

entitas: {
        type: DataTypes.TEXT,
      
      

      },

kunci_entitas: {
        type: DataTypes.TEXT,
      
      

      },

deskripsi: {
        type: DataTypes.TEXT,
      
      

      },

ip_address: {
        type: DataTypes.TEXT,
      
      

      },

user_agent: {
        type: DataTypes.TEXT,
      
      

      },

terjadi_pada: {
        type: DataTypes.DATE,
      
      

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

  log_aktivitas.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity


















//end loop



    db.log_aktivitas.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });




    db.log_aktivitas.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.log_aktivitas.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return log_aktivitas;
};


