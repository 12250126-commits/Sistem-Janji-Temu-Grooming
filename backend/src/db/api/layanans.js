
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LayanansDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const layanans = await db.layanans.create(
            {
                id: data.id || undefined,
        
        kode_layanan: data.kode_layanan
        ||
        null
            ,
            
        nama: data.nama
        ||
        null
            ,
            
        deskripsi: data.deskripsi
        ||
        null
            ,
            
        durasi_menit: data.durasi_menit
        ||
        null
            ,
            
        harga_dasar: data.harga_dasar
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

        

        

        

        return layanans;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const layanansData = data.map((item, index) => ({
                id: item.id || undefined,
                
                kode_layanan: item.kode_layanan
            ||
            null
            ,
            
                nama: item.nama
            ||
            null
            ,
            
                deskripsi: item.deskripsi
            ||
            null
            ,
            
                durasi_menit: item.durasi_menit
            ||
            null
            ,
            
                harga_dasar: item.harga_dasar
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
        const layanans = await db.layanans.bulkCreate(layanansData, { transaction });

        // For each item created, replace relation files
        

        return layanans;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const layanans = await db.layanans.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.kode_layanan !== undefined) updatePayload.kode_layanan = data.kode_layanan;
        
        
        if (data.nama !== undefined) updatePayload.nama = data.nama;
        
        
        if (data.deskripsi !== undefined) updatePayload.deskripsi = data.deskripsi;
        
        
        if (data.durasi_menit !== undefined) updatePayload.durasi_menit = data.durasi_menit;
        
        
        if (data.harga_dasar !== undefined) updatePayload.harga_dasar = data.harga_dasar;
        
        
        if (data.is_active !== undefined) updatePayload.is_active = data.is_active;
        
        
        updatePayload.updatedById = currentUser.id;

        await layanans.update(updatePayload, {transaction});

        
        

        
        

        

        return layanans;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const layanans = await db.layanans.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of layanans) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of layanans) {
                await record.destroy({transaction});
            }
        });


        return layanans;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const layanans = await db.layanans.findByPk(id, options);

        await layanans.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await layanans.destroy({
            transaction
        });

        return layanans;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const layanans = await db.layanans.findOne(
            { where },
            { transaction },
        );

        if (!layanans) {
            return layanans;
        }

        const output = layanans.get({plain: true});

        
        
        
        
        
        
        
        
        output.tarif_ukurans_layanan = await layanans.getTarif_ukurans_layanan({
            transaction
        });
        
        
        
        output.bookings_layanan = await layanans.getBookings_layanan({
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



    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.kode_layanan) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'layanans',
                        'kode_layanan',
                        filter.kode_layanan,
                    ),
                };
            }
            
            if (filter.nama) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'layanans',
                        'nama',
                        filter.nama,
                    ),
                };
            }
            
            if (filter.deskripsi) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'layanans',
                        'deskripsi',
                        filter.deskripsi,
                    ),
                };
            }
            

            
            

            
            if (filter.durasi_menitRange) {
                const [start, end] = filter.durasi_menitRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    durasi_menit: {
                    ...where.durasi_menit,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    durasi_menit: {
                    ...where.durasi_menit,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.harga_dasarRange) {
                const [start, end] = filter.harga_dasarRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    harga_dasar: {
                    ...where.harga_dasar,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    harga_dasar: {
                    ...where.harga_dasar,
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
            const { rows, count } = await db.layanans.findAndCountAll(queryOptions);

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
                        'layanans',
                        'nama',
                        query,
                    ),
                ],
            };
        }

        const records = await db.layanans.findAll({
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

