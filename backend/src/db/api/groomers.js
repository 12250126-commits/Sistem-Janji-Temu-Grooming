
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class GroomersDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const groomers = await db.groomers.create(
            {
                id: data.id || undefined,
        
        kode_groomer: data.kode_groomer
        ||
        null
            ,
            
        nama_tampilan: data.nama_tampilan
        ||
        null
            ,
            
        bio_singkat: data.bio_singkat
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

        
        await groomers.setUser( data.user || null, {
            transaction,
        });
        

        

        

        return groomers;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const groomersData = data.map((item, index) => ({
                id: item.id || undefined,
                
                kode_groomer: item.kode_groomer
            ||
            null
            ,
            
                nama_tampilan: item.nama_tampilan
            ||
            null
            ,
            
                bio_singkat: item.bio_singkat
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
        const groomers = await db.groomers.bulkCreate(groomersData, { transaction });

        // For each item created, replace relation files
        

        return groomers;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const groomers = await db.groomers.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.kode_groomer !== undefined) updatePayload.kode_groomer = data.kode_groomer;
        
        
        if (data.nama_tampilan !== undefined) updatePayload.nama_tampilan = data.nama_tampilan;
        
        
        if (data.bio_singkat !== undefined) updatePayload.bio_singkat = data.bio_singkat;
        
        
        if (data.is_active !== undefined) updatePayload.is_active = data.is_active;
        
        
        updatePayload.updatedById = currentUser.id;

        await groomers.update(updatePayload, {transaction});

        
        
        if (data.user !== undefined) {
            await groomers.setUser(
              
              data.user,
              
              { transaction }
            );
        }
        

        
        

        

        return groomers;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const groomers = await db.groomers.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of groomers) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of groomers) {
                await record.destroy({transaction});
            }
        });


        return groomers;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const groomers = await db.groomers.findByPk(id, options);

        await groomers.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await groomers.destroy({
            transaction
        });

        return groomers;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const groomers = await db.groomers.findOne(
            { where },
            { transaction },
        );

        if (!groomers) {
            return groomers;
        }

        const output = groomers.get({plain: true});

        
        
        
        
        
        
        
        
        
        output.jadwal_groomers_groomer = await groomers.getJadwal_groomers_groomer({
            transaction
        });
        
        
        output.bookings_groomer = await groomers.getBookings_groomer({
            transaction
        });
        
        
        
        output.riwayat_groomings_groomer = await groomers.getRiwayat_groomings_groomer({
            transaction
        });
        
        
        
        
        
        
        output.user = await groomers.getUser({
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

            
            if (filter.kode_groomer) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'groomers',
                        'kode_groomer',
                        filter.kode_groomer,
                    ),
                };
            }
            
            if (filter.nama_tampilan) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'groomers',
                        'nama_tampilan',
                        filter.nama_tampilan,
                    ),
                };
            }
            
            if (filter.bio_singkat) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'groomers',
                        'bio_singkat',
                        filter.bio_singkat,
                    ),
                };
            }
            

            
            

            

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
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
            const { rows, count } = await db.groomers.findAndCountAll(queryOptions);

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
                        'groomers',
                        'nama_tampilan',
                        query,
                    ),
                ],
            };
        }

        const records = await db.groomers.findAll({
            attributes: [ 'id', 'nama_tampilan' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['nama_tampilan', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.nama_tampilan,
        }));
    }

    
};

