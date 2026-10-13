
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class HewansDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const hewans = await db.hewans.create(
            {
                id: data.id || undefined,
        
        nama: data.nama
        ||
        null
            ,
            
        jenis: data.jenis
        ||
        null
            ,
            
        ras: data.ras
        ||
        null
            ,
            
        ukuran: data.ukuran
        ||
        null
            ,
            
        umur_bulan: data.umur_bulan
        ||
        null
            ,
            
        berat_kg: data.berat_kg
        ||
        null
            ,
            
        catatan_khusus: data.catatan_khusus
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

        
        await hewans.setKonsumen( data.konsumen || null, {
            transaction,
        });
        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.hewans.getTableName(),
                belongsToColumn: 'foto',
                belongsToId: hewans.id,
            },
            data.foto,
            options,
        );
        

        return hewans;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const hewansData = data.map((item, index) => ({
                id: item.id || undefined,
                
                nama: item.nama
            ||
            null
            ,
            
                jenis: item.jenis
            ||
            null
            ,
            
                ras: item.ras
            ||
            null
            ,
            
                ukuran: item.ukuran
            ||
            null
            ,
            
                umur_bulan: item.umur_bulan
            ||
            null
            ,
            
                berat_kg: item.berat_kg
            ||
            null
            ,
            
                catatan_khusus: item.catatan_khusus
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
        const hewans = await db.hewans.bulkCreate(hewansData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < hewans.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.hewans.getTableName(),
                    belongsToColumn: 'foto',
                    belongsToId: hewans[i].id,
                },
                data[i].foto,
                options,
            );
        }
        

        return hewans;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const hewans = await db.hewans.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.nama !== undefined) updatePayload.nama = data.nama;
        
        
        if (data.jenis !== undefined) updatePayload.jenis = data.jenis;
        
        
        if (data.ras !== undefined) updatePayload.ras = data.ras;
        
        
        if (data.ukuran !== undefined) updatePayload.ukuran = data.ukuran;
        
        
        if (data.umur_bulan !== undefined) updatePayload.umur_bulan = data.umur_bulan;
        
        
        if (data.berat_kg !== undefined) updatePayload.berat_kg = data.berat_kg;
        
        
        if (data.catatan_khusus !== undefined) updatePayload.catatan_khusus = data.catatan_khusus;
        
        
        if (data.is_active !== undefined) updatePayload.is_active = data.is_active;
        
        
        updatePayload.updatedById = currentUser.id;

        await hewans.update(updatePayload, {transaction});

        
        
        if (data.konsumen !== undefined) {
            await hewans.setKonsumen(
              
              data.konsumen,
              
              { transaction }
            );
        }
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.hewans.getTableName(),
                belongsToColumn: 'foto',
                belongsToId: hewans.id,
            },
            data.foto,
            options,
        );
        

        return hewans;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const hewans = await db.hewans.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of hewans) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of hewans) {
                await record.destroy({transaction});
            }
        });


        return hewans;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const hewans = await db.hewans.findByPk(id, options);

        await hewans.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await hewans.destroy({
            transaction
        });

        return hewans;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const hewans = await db.hewans.findOne(
            { where },
            { transaction },
        );

        if (!hewans) {
            return hewans;
        }

        const output = hewans.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        output.bookings_hewan = await hewans.getBookings_hewan({
            transaction
        });
        
        
        
        output.riwayat_groomings_hewan = await hewans.getRiwayat_groomings_hewan({
            transaction
        });
        
        
        
        
        
        
        output.konsumen = await hewans.getKonsumen({
            transaction
        });
        
        
        output.foto = await hewans.getFoto({
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
        model: db.konsumens,
        as: 'konsumen',
        
        where: filter.konsumen ? {
          [Op.or]: [
            { id: { [Op.in]: filter.konsumen.split('|').map(term => Utils.uuid(term)) } },
            {
              kode_konsumen: {
                [Op.or]: filter.konsumen.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },



      {
        model: db.file,
        as: 'foto',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.nama) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'hewans',
                        'nama',
                        filter.nama,
                    ),
                };
            }
            
            if (filter.ras) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'hewans',
                        'ras',
                        filter.ras,
                    ),
                };
            }
            
            if (filter.catatan_khusus) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'hewans',
                        'catatan_khusus',
                        filter.catatan_khusus,
                    ),
                };
            }
            

            
            

            
            if (filter.umur_bulanRange) {
                const [start, end] = filter.umur_bulanRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    umur_bulan: {
                    ...where.umur_bulan,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    umur_bulan: {
                    ...where.umur_bulan,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.berat_kgRange) {
                const [start, end] = filter.berat_kgRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    berat_kg: {
                    ...where.berat_kg,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    berat_kg: {
                    ...where.berat_kg,
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

            
            if (filter.jenis) {
                where = {
                    ...where,
                jenis: filter.jenis,
            };
            }
            
            if (filter.ukuran) {
                where = {
                    ...where,
                ukuran: filter.ukuran,
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
            const { rows, count } = await db.hewans.findAndCountAll(queryOptions);

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
                        'hewans',
                        'nama',
                        query,
                    ),
                ],
            };
        }

        const records = await db.hewans.findAll({
            attributes: [ 'id', 'nama' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['nama', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.nama,
        }));
    }

    
};

