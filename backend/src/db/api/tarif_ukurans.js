
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Tarif_ukuransDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const tarif_ukurans = await db.tarif_ukurans.create(
            {
                id: data.id || undefined,
        
        ukuran_hewan: data.ukuran_hewan
        ||
        null
            ,
            
        tarif_tambahan: data.tarif_tambahan
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await tarif_ukurans.setLayanan( data.layanan || null, {
            transaction,
        });
        

        

        

        return tarif_ukurans;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const tarif_ukuransData = data.map((item, index) => ({
                id: item.id || undefined,
                
                ukuran_hewan: item.ukuran_hewan
            ||
            null
            ,
            
                tarif_tambahan: item.tarif_tambahan
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const tarif_ukurans = await db.tarif_ukurans.bulkCreate(tarif_ukuransData, { transaction });

        // For each item created, replace relation files
        

        return tarif_ukurans;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const tarif_ukurans = await db.tarif_ukurans.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.ukuran_hewan !== undefined) updatePayload.ukuran_hewan = data.ukuran_hewan;
        
        
        if (data.tarif_tambahan !== undefined) updatePayload.tarif_tambahan = data.tarif_tambahan;
        
        
        updatePayload.updatedById = currentUser.id;

        await tarif_ukurans.update(updatePayload, {transaction});

        
        
        if (data.layanan !== undefined) {
            await tarif_ukurans.setLayanan(
              
              data.layanan,
              
              { transaction }
            );
        }
        

        
        

        

        return tarif_ukurans;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const tarif_ukurans = await db.tarif_ukurans.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of tarif_ukurans) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of tarif_ukurans) {
                await record.destroy({transaction});
            }
        });


        return tarif_ukurans;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const tarif_ukurans = await db.tarif_ukurans.findByPk(id, options);

        await tarif_ukurans.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await tarif_ukurans.destroy({
            transaction
        });

        return tarif_ukurans;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const tarif_ukurans = await db.tarif_ukurans.findOne(
            { where },
            { transaction },
        );

        if (!tarif_ukurans) {
            return tarif_ukurans;
        }

        const output = tarif_ukurans.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.layanan = await tarif_ukurans.getLayanan({
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
        model: db.layanans,
        as: 'layanan',
        
        where: filter.layanan ? {
          [Op.or]: [
            { id: { [Op.in]: filter.layanan.split('|').map(term => Utils.uuid(term)) } },
            {
              nama: {
                [Op.or]: filter.layanan.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
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

            

            
            

            
            if (filter.tarif_tambahanRange) {
                const [start, end] = filter.tarif_tambahanRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    tarif_tambahan: {
                    ...where.tarif_tambahan,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    tarif_tambahan: {
                    ...where.tarif_tambahan,
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

            
            if (filter.ukuran_hewan) {
                where = {
                    ...where,
                ukuran_hewan: filter.ukuran_hewan,
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
            const { rows, count } = await db.tarif_ukurans.findAndCountAll(queryOptions);

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
                        'tarif_ukurans',
                        'ukuran_hewan',
                        query,
                    ),
                ],
            };
        }

        const records = await db.tarif_ukurans.findAll({
            attributes: [ 'id', 'ukuran_hewan' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['ukuran_hewan', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.ukuran_hewan,
        }));
    }

    
};

