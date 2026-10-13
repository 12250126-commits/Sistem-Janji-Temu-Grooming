
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Jadwal_groomersDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const jadwal_groomers = await db.jadwal_groomers.create(
            {
                id: data.id || undefined,
        
        hari: data.hari
        ||
        null
            ,
            
        jam_mulai: data.jam_mulai
        ||
        null
            ,
            
        jam_selesai: data.jam_selesai
        ||
        null
            ,
            
        jam_istirahat_mulai: data.jam_istirahat_mulai
        ||
        null
            ,
            
        jam_istirahat_selesai: data.jam_istirahat_selesai
        ||
        null
            ,
            
        kapasitas_slot: data.kapasitas_slot
        ||
        null
            ,
            
        is_active: data.is_active
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await jadwal_groomers.setGroomer( data.groomer || null, {
            transaction,
        });
        

        

        

        return jadwal_groomers;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const jadwal_groomersData = data.map((item, index) => ({
                id: item.id || undefined,
                
                hari: item.hari
            ||
            null
            ,
            
                jam_mulai: item.jam_mulai
            ||
            null
            ,
            
                jam_selesai: item.jam_selesai
            ||
            null
            ,
            
                jam_istirahat_mulai: item.jam_istirahat_mulai
            ||
            null
            ,
            
                jam_istirahat_selesai: item.jam_istirahat_selesai
            ||
            null
            ,
            
                kapasitas_slot: item.kapasitas_slot
            ||
            null
            ,
            
                is_active: item.is_active
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const jadwal_groomers = await db.jadwal_groomers.bulkCreate(jadwal_groomersData, { transaction });

        // For each item created, replace relation files
        

        return jadwal_groomers;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const jadwal_groomers = await db.jadwal_groomers.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.hari !== undefined) updatePayload.hari = data.hari;
        
        
        if (data.jam_mulai !== undefined) updatePayload.jam_mulai = data.jam_mulai;
        
        
        if (data.jam_selesai !== undefined) updatePayload.jam_selesai = data.jam_selesai;
        
        
        if (data.jam_istirahat_mulai !== undefined) updatePayload.jam_istirahat_mulai = data.jam_istirahat_mulai;
        
        
        if (data.jam_istirahat_selesai !== undefined) updatePayload.jam_istirahat_selesai = data.jam_istirahat_selesai;
        
        
        if (data.kapasitas_slot !== undefined) updatePayload.kapasitas_slot = data.kapasitas_slot;
        
        
        if (data.is_active !== undefined) updatePayload.is_active = data.is_active;
        
        
        updatePayload.updatedById = currentUser.id;

        await jadwal_groomers.update(updatePayload, {transaction});

        
        
        if (data.groomer !== undefined) {
            await jadwal_groomers.setGroomer(
              
              data.groomer,
              
              { transaction }
            );
        }
        

        
        

        

        return jadwal_groomers;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const jadwal_groomers = await db.jadwal_groomers.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of jadwal_groomers) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of jadwal_groomers) {
                await record.destroy({transaction});
            }
        });


        return jadwal_groomers;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const jadwal_groomers = await db.jadwal_groomers.findByPk(id, options);

        await jadwal_groomers.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await jadwal_groomers.destroy({
            transaction
        });

        return jadwal_groomers;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const jadwal_groomers = await db.jadwal_groomers.findOne(
            { where },
            { transaction },
        );

        if (!jadwal_groomers) {
            return jadwal_groomers;
        }

        const output = jadwal_groomers.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.groomer = await jadwal_groomers.getGroomer({
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
        model: db.groomers,
        as: 'groomer',
        
        where: filter.groomer ? {
          [Op.or]: [
            { id: { [Op.in]: filter.groomer.split('|').map(term => Utils.uuid(term)) } },
            {
              nama_tampilan: {
                [Op.or]: filter.groomer.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
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

            
            if (filter.jam_mulai) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'jadwal_groomers',
                        'jam_mulai',
                        filter.jam_mulai,
                    ),
                };
            }
            
            if (filter.jam_selesai) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'jadwal_groomers',
                        'jam_selesai',
                        filter.jam_selesai,
                    ),
                };
            }
            
            if (filter.jam_istirahat_mulai) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'jadwal_groomers',
                        'jam_istirahat_mulai',
                        filter.jam_istirahat_mulai,
                    ),
                };
            }
            
            if (filter.jam_istirahat_selesai) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'jadwal_groomers',
                        'jam_istirahat_selesai',
                        filter.jam_istirahat_selesai,
                    ),
                };
            }
            

            
            

            
            if (filter.kapasitas_slotRange) {
                const [start, end] = filter.kapasitas_slotRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    kapasitas_slot: {
                    ...where.kapasitas_slot,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    kapasitas_slot: {
                    ...where.kapasitas_slot,
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

            
            if (filter.hari) {
                where = {
                    ...where,
                hari: filter.hari,
            };
            }
            
            if (filter.is_active) {
                where = {
                    ...where,
                is_active: filter.is_active,
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
            const { rows, count } = await db.jadwal_groomers.findAndCountAll(queryOptions);

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
                        'jadwal_groomers',
                        'hari',
                        query,
                    ),
                ],
            };
        }

        const records = await db.jadwal_groomers.findAll({
            attributes: [ 'id', 'hari' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['hari', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.hari,
        }));
    }

    
};

