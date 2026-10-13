
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class KonsumensDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const konsumens = await db.konsumens.create(
            {
                id: data.id || undefined,
        
        kode_konsumen: data.kode_konsumen
        ||
        null
            ,
            
        alamat: data.alamat
        ||
        null
            ,
            
        wa_opt_in: data.wa_opt_in
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await konsumens.setUser( data.user || null, {
            transaction,
        });
        

        

        

        return konsumens;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const konsumensData = data.map((item, index) => ({
                id: item.id || undefined,
                
                kode_konsumen: item.kode_konsumen
            ||
            null
            ,
            
                alamat: item.alamat
            ||
            null
            ,
            
                wa_opt_in: item.wa_opt_in
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const konsumens = await db.konsumens.bulkCreate(konsumensData, { transaction });

        // For each item created, replace relation files
        

        return konsumens;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const konsumens = await db.konsumens.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.kode_konsumen !== undefined) updatePayload.kode_konsumen = data.kode_konsumen;
        
        
        if (data.alamat !== undefined) updatePayload.alamat = data.alamat;
        
        
        if (data.wa_opt_in !== undefined) updatePayload.wa_opt_in = data.wa_opt_in;
        
        
        updatePayload.updatedById = currentUser.id;

        await konsumens.update(updatePayload, {transaction});

        
        
        if (data.user !== undefined) {
            await konsumens.setUser(
              
              data.user,
              
              { transaction }
            );
        }
        

        
        

        

        return konsumens;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const konsumens = await db.konsumens.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of konsumens) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of konsumens) {
                await record.destroy({transaction});
            }
        });


        return konsumens;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const konsumens = await db.konsumens.findByPk(id, options);

        await konsumens.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await konsumens.destroy({
            transaction
        });

        return konsumens;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const konsumens = await db.konsumens.findOne(
            { where },
            { transaction },
        );

        if (!konsumens) {
            return konsumens;
        }

        const output = konsumens.get({plain: true});

        
        
        
        
        
        
        output.hewans_konsumen = await konsumens.getHewans_konsumen({
            transaction
        });
        
        
        
        
        
        output.bookings_konsumen = await konsumens.getBookings_konsumen({
            transaction
        });
        
        
        
        
        
        
        
        
        output.user = await konsumens.getUser({
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

            
            if (filter.kode_konsumen) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'konsumens',
                        'kode_konsumen',
                        filter.kode_konsumen,
                    ),
                };
            }
            
            if (filter.alamat) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'konsumens',
                        'alamat',
                        filter.alamat,
                    ),
                };
            }
            

            
            

            

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            
            if (filter.wa_opt_in) {
                where = {
                    ...where,
                wa_opt_in: filter.wa_opt_in,
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
            const { rows, count } = await db.konsumens.findAndCountAll(queryOptions);

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
                        'konsumens',
                        'kode_konsumen',
                        query,
                    ),
                ],
            };
        }

        const records = await db.konsumens.findAll({
            attributes: [ 'id', 'kode_konsumen' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['kode_konsumen', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.kode_konsumen,
        }));
    }

    
};

