
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Log_aktivitasDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const log_aktivitas = await db.log_aktivitas.create(
            {
                id: data.id || undefined,
        
        aksi: data.aksi
        ||
        null
            ,
            
        entitas: data.entitas
        ||
        null
            ,
            
        kunci_entitas: data.kunci_entitas
        ||
        null
            ,
            
        deskripsi: data.deskripsi
        ||
        null
            ,
            
        ip_address: data.ip_address
        ||
        null
            ,
            
        user_agent: data.user_agent
        ||
        null
            ,
            
        terjadi_pada: data.terjadi_pada
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await log_aktivitas.setUser( data.user || null, {
            transaction,
        });
        

        

        

        return log_aktivitas;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const log_aktivitasData = data.map((item, index) => ({
                id: item.id || undefined,
                
                aksi: item.aksi
            ||
            null
            ,
            
                entitas: item.entitas
            ||
            null
            ,
            
                kunci_entitas: item.kunci_entitas
            ||
            null
            ,
            
                deskripsi: item.deskripsi
            ||
            null
            ,
            
                ip_address: item.ip_address
            ||
            null
            ,
            
                user_agent: item.user_agent
            ||
            null
            ,
            
                terjadi_pada: item.terjadi_pada
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const log_aktivitas = await db.log_aktivitas.bulkCreate(log_aktivitasData, { transaction });

        // For each item created, replace relation files
        

        return log_aktivitas;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const log_aktivitas = await db.log_aktivitas.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.aksi !== undefined) updatePayload.aksi = data.aksi;
        
        
        if (data.entitas !== undefined) updatePayload.entitas = data.entitas;
        
        
        if (data.kunci_entitas !== undefined) updatePayload.kunci_entitas = data.kunci_entitas;
        
        
        if (data.deskripsi !== undefined) updatePayload.deskripsi = data.deskripsi;
        
        
        if (data.ip_address !== undefined) updatePayload.ip_address = data.ip_address;
        
        
        if (data.user_agent !== undefined) updatePayload.user_agent = data.user_agent;
        
        
        if (data.terjadi_pada !== undefined) updatePayload.terjadi_pada = data.terjadi_pada;
        
        
        updatePayload.updatedById = currentUser.id;

        await log_aktivitas.update(updatePayload, {transaction});

        
        
        if (data.user !== undefined) {
            await log_aktivitas.setUser(
              
              data.user,
              
              { transaction }
            );
        }
        

        
        

        

        return log_aktivitas;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const log_aktivitas = await db.log_aktivitas.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of log_aktivitas) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of log_aktivitas) {
                await record.destroy({transaction});
            }
        });


        return log_aktivitas;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const log_aktivitas = await db.log_aktivitas.findByPk(id, options);

        await log_aktivitas.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await log_aktivitas.destroy({
            transaction
        });

        return log_aktivitas;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const log_aktivitas = await db.log_aktivitas.findOne(
            { where },
            { transaction },
        );

        if (!log_aktivitas) {
            return log_aktivitas;
        }

        const output = log_aktivitas.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.user = await log_aktivitas.getUser({
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
        model: db.users,
        as: 'user',
        
        where: filter.user ? {
          [Op.or]: [
            { id: { [Op.in]: filter.user.split('|').map(term => Utils.uuid(term)) } },
            {
              firstName: {
                [Op.or]: filter.user.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },



    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.aksi) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'log_aktivitas',
                        'aksi',
                        filter.aksi,
                    ),
                };
            }
            
            if (filter.entitas) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'log_aktivitas',
                        'entitas',
                        filter.entitas,
                    ),
                };
            }
            
            if (filter.kunci_entitas) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'log_aktivitas',
                        'kunci_entitas',
                        filter.kunci_entitas,
                    ),
                };
            }
            
            if (filter.deskripsi) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'log_aktivitas',
                        'deskripsi',
                        filter.deskripsi,
                    ),
                };
            }
            
            if (filter.ip_address) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'log_aktivitas',
                        'ip_address',
                        filter.ip_address,
                    ),
                };
            }
            
            if (filter.user_agent) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'log_aktivitas',
                        'user_agent',
                        filter.user_agent,
                    ),
                };
            }
            

            
            

            
            if (filter.terjadi_padaRange) {
                const [start, end] = filter.terjadi_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    terjadi_pada: {
                    ...where.terjadi_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    terjadi_pada: {
                    ...where.terjadi_pada,
                            [Op.lte]: end,
                    },
                };
                }
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
            const { rows, count } = await db.log_aktivitas.findAndCountAll(queryOptions);

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
                        'log_aktivitas',
                        'aksi',
                        query,
                    ),
                ],
            };
        }

        const records = await db.log_aktivitas.findAll({
            attributes: [ 'id', 'aksi' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['aksi', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.aksi,
        }));
    }

    
};

