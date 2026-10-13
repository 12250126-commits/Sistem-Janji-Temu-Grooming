module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {
            
                
                    await queryInterface.createTable('users', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('roles', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('permissions', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('konsumens', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('groomers', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('hewans', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('layanans', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('tarif_ukurans', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('jadwal_groomers', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('bookings', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('pembayarans', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('riwayat_groomings', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('notifikasis', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('log_aktivitas', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('salon_settings', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'firstName',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'lastName',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'phoneNumber',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'disabled',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerified',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationToken',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'passwordResetToken',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'passwordResetTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'provider',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'app_roleId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'roles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'roles',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'roles',
                      'role_customization',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'permissions',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'konsumens',
                      'userId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'konsumens',
                      'kode_konsumen',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'konsumens',
                      'alamat',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'konsumens',
                      'wa_opt_in',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'groomers',
                      'userId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'groomers',
                      'kode_groomer',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'groomers',
                      'nama_tampilan',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'groomers',
                      'bio_singkat',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'groomers',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'konsumenId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'konsumens',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'nama',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'jenis',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['kucing','anjing','lainnya'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'ras',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'ukuran',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['kecil','sedang','besar'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'umur_bulan',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'berat_kg',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'catatan_khusus',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'hewans',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'layanans',
                      'kode_layanan',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'layanans',
                      'nama',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'layanans',
                      'deskripsi',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'layanans',
                      'durasi_menit',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'layanans',
                      'harga_dasar',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'layanans',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'tarif_ukurans',
                      'layananId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'layanans',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'tarif_ukurans',
                      'ukuran_hewan',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['kecil','sedang','besar'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'tarif_ukurans',
                      'tarif_tambahan',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'groomerId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'groomers',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'hari',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['senin','selasa','rabu','kamis','jumat','sabtu','minggu'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'jam_mulai',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'jam_selesai',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'jam_istirahat_mulai',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'jam_istirahat_selesai',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'kapasitas_slot',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'jadwal_groomers',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'kode_booking',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'konsumenId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'konsumens',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'hewanId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'hewans',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'layananId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'layanans',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'groomerId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'groomers',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'waktu_mulai',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'waktu_selesai',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'durasi_menit',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'harga_dasar_snapshot',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'tarif_ukuran_snapshot',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'total_biaya',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'status_booking',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['pending','confirmed','on_progress','done','cancelled'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'status_diubah_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'status_diubah_oleh',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'catatan_konsumen',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'catatan_admin',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'dibatalkan_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'alasan_batal',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'bookings',
                      'butuh_reschedule',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'bookingId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'bookings',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'metode',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['cash','transfer_bank','e_wallet'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'jumlah_tagihan',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'jumlah_dibayar',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'status_pembayaran',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['belum_bayar','dp','lunas','refund'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'dibayar_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'diverifikasi_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'diverifikasi_oleh',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'pembayarans',
                      'catatan_verifikasi',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'bookingId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'bookings',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'hewanId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'hewans',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'groomerId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'groomers',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'mulai_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'selesai_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'berat_kg_setelah',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'kondisi_setelah',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['baik','butuh_perhatian','darurat'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'catatan_tindakan',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'riwayat_groomings',
                      'catatan_kondisi',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'channel',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['whatsapp'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'jenis',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['booking_baru','booking_dikonfirmasi','booking_ditolak','perubahan_jadwal','pembatalan','pengingat_h1','pengingat_h2','grooming_selesai'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'bookingId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'bookings',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'tujuan',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'pesan',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'status_kirim',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['queued','sent','failed','skipped'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'dijadwalkan_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'dikirim_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'provider',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'provider_message_ref',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'response_raw',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'notifikasis',
                      'retry_count',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'userId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'aksi',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'entitas',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'kunci_entitas',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'deskripsi',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'ip_address',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'user_agent',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'log_aktivitas',
                      'terjadi_pada',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'salon_settings',
                      'nama_salon',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'salon_settings',
                      'alamat_salon',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'salon_settings',
                      'nomor_whatsapp_salon',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'salon_settings',
                      'email_salon',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'salon_settings',
                      'jam_operasional',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'salon_settings',
                      'catatan_kebijakan',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
            
            
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {
            
                
            
                
                    await queryInterface.removeColumn(
                        'salon_settings',
                        'catatan_kebijakan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'salon_settings',
                        'jam_operasional',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'salon_settings',
                        'email_salon',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'salon_settings',
                        'nomor_whatsapp_salon',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'salon_settings',
                        'alamat_salon',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'salon_settings',
                        'nama_salon',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'terjadi_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'user_agent',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'ip_address',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'deskripsi',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'kunci_entitas',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'entitas',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'aksi',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'log_aktivitas',
                        'userId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'retry_count',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'response_raw',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'provider_message_ref',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'provider',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'dikirim_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'dijadwalkan_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'status_kirim',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'pesan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'tujuan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'bookingId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'jenis',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'notifikasis',
                        'channel',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'catatan_kondisi',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'catatan_tindakan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'kondisi_setelah',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'berat_kg_setelah',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'selesai_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'mulai_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'groomerId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'hewanId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'riwayat_groomings',
                        'bookingId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'catatan_verifikasi',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'diverifikasi_oleh',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'diverifikasi_pada',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'dibayar_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'status_pembayaran',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'jumlah_dibayar',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'jumlah_tagihan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'metode',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'pembayarans',
                        'bookingId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'butuh_reschedule',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'alasan_batal',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'dibatalkan_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'catatan_admin',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'catatan_konsumen',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'status_diubah_oleh',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'status_diubah_pada',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'status_booking',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'total_biaya',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'tarif_ukuran_snapshot',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'harga_dasar_snapshot',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'durasi_menit',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'waktu_selesai',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'waktu_mulai',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'groomerId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'layananId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'hewanId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'konsumenId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'bookings',
                        'kode_booking',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'is_active',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'kapasitas_slot',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'jam_istirahat_selesai',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'jam_istirahat_mulai',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'jam_selesai',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'jam_mulai',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'hari',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'jadwal_groomers',
                        'groomerId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'tarif_ukurans',
                        'tarif_tambahan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'tarif_ukurans',
                        'ukuran_hewan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'tarif_ukurans',
                        'layananId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'layanans',
                        'is_active',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'layanans',
                        'harga_dasar',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'layanans',
                        'durasi_menit',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'layanans',
                        'deskripsi',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'layanans',
                        'nama',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'layanans',
                        'kode_layanan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'is_active',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'catatan_khusus',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'berat_kg',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'umur_bulan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'ukuran',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'ras',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'jenis',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'nama',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'hewans',
                        'konsumenId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'groomers',
                        'is_active',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'groomers',
                        'bio_singkat',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'groomers',
                        'nama_tampilan',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'groomers',
                        'kode_groomer',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'groomers',
                        'userId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'konsumens',
                        'wa_opt_in',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'konsumens',
                        'alamat',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'konsumens',
                        'kode_konsumen',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'konsumens',
                        'userId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'permissions',
                        'name',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'roles',
                        'role_customization',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'roles',
                        'name',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'app_roleId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'provider',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetTokenExpiresAt',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetToken',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationTokenExpiresAt',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationToken',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerified',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'password',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'disabled',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'email',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'phoneNumber',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'lastName',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'firstName',
                        { transaction }
                    );
                
            
                
                    await queryInterface.dropTable('salon_settings', { transaction });
                
            
                
                    await queryInterface.dropTable('log_aktivitas', { transaction });
                
            
                
                    await queryInterface.dropTable('notifikasis', { transaction });
                
            
                
                    await queryInterface.dropTable('riwayat_groomings', { transaction });
                
            
                
                    await queryInterface.dropTable('pembayarans', { transaction });
                
            
                
                    await queryInterface.dropTable('bookings', { transaction });
                
            
                
                    await queryInterface.dropTable('jadwal_groomers', { transaction });
                
            
                
                    await queryInterface.dropTable('tarif_ukurans', { transaction });
                
            
                
                    await queryInterface.dropTable('layanans', { transaction });
                
            
                
                    await queryInterface.dropTable('hewans', { transaction });
                
            
                
                    await queryInterface.dropTable('groomers', { transaction });
                
            
                
                    await queryInterface.dropTable('konsumens', { transaction });
                
            
                
                    await queryInterface.dropTable('permissions', { transaction });
                
            
                
                    await queryInterface.dropTable('roles', { transaction });
                
            
                
                    await queryInterface.dropTable('users', { transaction });
                
            
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
