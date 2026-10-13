
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Salon_settingsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const salon_settings = await db.salon_settings.create(
            {
                id: data.id || undefined,
        
        nama_salon: data.nama_salon
        ||
        null
            ,
            
        alamat_salon: data.alamat_salon
        ||
        null
            ,
            
        nomor_whatsapp_salon: data.nomor_whatsapp_salon
        ||
        null
            ,
            
        email_salon: data.email_salon
        ||
        null
            ,
            
        jam_operasional: data.jam_operasional
        ||
        null
            ,
            
        catatan_kebijakan: data.catatan_kebijakan
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.salon_settings.getTableName(),
                belongsToColumn: 'logo',
                belongsToId: salon_settings.id,
            },
            data.logo,
            options,
        );
        

        return salon_settings;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const salon_settingsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                nama_salon: item.nama_salon
            ||
            null
            ,
            
                alamat_salon: item.alamat_salon
            ||
            null
            ,
            
                nomor_whatsapp_salon: item.nomor_whatsapp_salon
            ||
            null
            ,
            
                email_salon: item.email_salon
            ||
            null
            ,
            
                jam_operasional: item.jam_operasional
            ||
            null
            ,
            
                catatan_kebijakan: item.catatan_kebijakan
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const salon_settings = await db.salon_settings.bulkCreate(salon_settingsData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < salon_settings.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.salon_settings.getTableName(),
                    belongsToColumn: 'logo',
                    belongsToId: salon_settings[i].id,
                },
                data[i].logo,
                options,
            );
        }
        

        return salon_settings;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const salon_settings = await db.salon_settings.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.nama_salon !== undefined) updatePayload.nama_salon = data.nama_salon;
        
        
        if (data.alamat_salon !== undefined) updatePayload.alamat_salon = data.alamat_salon;
        
        
        if (data.nomor_whatsapp_salon !== undefined) updatePayload.nomor_whatsapp_salon = data.nomor_whatsapp_salon;
        
        
        if (data.email_salon !== undefined) updatePayload.email_salon = data.email_salon;
        
        
        if (data.jam_operasional !== undefined) updatePayload.jam_operasional = data.jam_operasional;
        
        
        if (data.catatan_kebijakan !== undefined) updatePayload.catatan_kebijakan = data.catatan_kebijakan;
        
        
        updatePayload.updatedById = currentUser.id;

        await salon_settings.update(updatePayload, {transaction});

        
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.salon_settings.getTableName(),
                belongsToColumn: 'logo',
                belongsToId: salon_settings.id,
            },
            data.logo,
            options,
        );
        

        return salon_settings;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const salon_settings = await db.salon_settings.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of salon_settings) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of salon_settings) {
                await record.destroy({transaction});
            }
        });


        return salon_settings;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const salon_settings = await db.salon_settings.findByPk(id, options);

        await salon_settings.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await salon_settings.destroy({
            transaction
        });

        return salon_settings;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const salon_settings = await db.salon_settings.findOne(
            { where },
            { transaction },
        );

        if (!salon_settings) {
            return salon_settings;
        }

        const output = salon_settings.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.logo = await salon_settings.getLogo({
            transaction
        });
        
        

        return output;
    }

    static async findAll(
          filter,
           options
        ) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        

        

        offset = currentPage * limit;

        const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [



      {
        model: db.file,
        as: 'logo',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.nama_salon) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'salon_settings',
                        'nama_salon',
                        filter.nama_salon,
                    ),
                };
            }
            
            if (filter.alamat_salon) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'salon_settings',
                        'alamat_salon',
                        filter.alamat_salon,
                    ),
                };
            }
            
            if (filter.nomor_whatsapp_salon) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'salon_settings',
                        'nomor_whatsapp_salon',
                        filter.nomor_whatsapp_salon,
                    ),
                };
            }
            
            if (filter.email_salon) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'salon_settings',
                        'email_salon',
                        filter.email_salon,
                    ),
                };
            }
            
            if (filter.jam_operasional) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'salon_settings',
                        'jam_operasional',
                        filter.jam_operasional,
                    ),
                };
            }
            
            if (filter.catatan_kebijakan) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'salon_settings',
                        'catatan_kebijakan',
                        filter.catatan_kebijakan,
                    ),
                };
            }
            

            
            

            

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            




            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }
        

        

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.salon_settings.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset, ) {
        let where = {};
        
        

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'salon_settings',
                        'nama_salon',
                        query,
                    ),
                ],
            };
        }

        const records = await db.salon_settings.findAll({
            attributes: [ 'id', 'nama_salon' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['nama_salon', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.nama_salon,
        }));
    }

    
};

