
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PembayaransDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const pembayarans = await db.pembayarans.create(
            {
                id: data.id || undefined,
        
        metode: data.metode
        ||
        null
            ,
            
        jumlah_tagihan: data.jumlah_tagihan
        ||
        null
            ,
            
        jumlah_dibayar: data.jumlah_dibayar
        ||
        null
            ,
            
        status_pembayaran: data.status_pembayaran
        ||
        null
            ,
            
        dibayar_pada: data.dibayar_pada
        ||
        null
            ,
            
        diverifikasi_pada: data.diverifikasi_pada
        ||
        null
            ,
            
        diverifikasi_oleh: data.diverifikasi_oleh
        ||
        null
            ,
            
        catatan_verifikasi: data.catatan_verifikasi
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await pembayarans.setBooking( data.booking || null, {
            transaction,
        });
        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.pembayarans.getTableName(),
                belongsToColumn: 'bukti_bayar',
                belongsToId: pembayarans.id,
            },
            data.bukti_bayar,
            options,
        );
        

        return pembayarans;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const pembayaransData = data.map((item, index) => ({
                id: item.id || undefined,
                
                metode: item.metode
            ||
            null
            ,
            
                jumlah_tagihan: item.jumlah_tagihan
            ||
            null
            ,
            
                jumlah_dibayar: item.jumlah_dibayar
            ||
            null
            ,
            
                status_pembayaran: item.status_pembayaran
            ||
            null
            ,
            
                dibayar_pada: item.dibayar_pada
            ||
            null
            ,
            
                diverifikasi_pada: item.diverifikasi_pada
            ||
            null
            ,
            
                diverifikasi_oleh: item.diverifikasi_oleh
            ||
            null
            ,
            
                catatan_verifikasi: item.catatan_verifikasi
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const pembayarans = await db.pembayarans.bulkCreate(pembayaransData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < pembayarans.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.pembayarans.getTableName(),
                    belongsToColumn: 'bukti_bayar',
                    belongsToId: pembayarans[i].id,
                },
                data[i].bukti_bayar,
                options,
            );
        }
        

        return pembayarans;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const pembayarans = await db.pembayarans.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.metode !== undefined) updatePayload.metode = data.metode;
        
        
        if (data.jumlah_tagihan !== undefined) updatePayload.jumlah_tagihan = data.jumlah_tagihan;
        
        
        if (data.jumlah_dibayar !== undefined) updatePayload.jumlah_dibayar = data.jumlah_dibayar;
        
        
        if (data.status_pembayaran !== undefined) updatePayload.status_pembayaran = data.status_pembayaran;
        
        
        if (data.dibayar_pada !== undefined) updatePayload.dibayar_pada = data.dibayar_pada;
        
        
        if (data.diverifikasi_pada !== undefined) updatePayload.diverifikasi_pada = data.diverifikasi_pada;
        
        
        if (data.diverifikasi_oleh !== undefined) updatePayload.diverifikasi_oleh = data.diverifikasi_oleh;
        
        
        if (data.catatan_verifikasi !== undefined) updatePayload.catatan_verifikasi = data.catatan_verifikasi;
        
        
        updatePayload.updatedById = currentUser.id;

        await pembayarans.update(updatePayload, {transaction});

        
        
        if (data.booking !== undefined) {
            await pembayarans.setBooking(
              
              data.booking,
              
              { transaction }
            );
        }
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.pembayarans.getTableName(),
                belongsToColumn: 'bukti_bayar',
                belongsToId: pembayarans.id,
            },
            data.bukti_bayar,
            options,
        );
        

        return pembayarans;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const pembayarans = await db.pembayarans.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of pembayarans) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of pembayarans) {
                await record.destroy({transaction});
            }
        });


        return pembayarans;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const pembayarans = await db.pembayarans.findByPk(id, options);

        await pembayarans.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await pembayarans.destroy({
            transaction
        });

        return pembayarans;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const pembayarans = await db.pembayarans.findOne(
            { where },
            { transaction },
        );

        if (!pembayarans) {
            return pembayarans;
        }

        const output = pembayarans.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.booking = await pembayarans.getBooking({
            transaction
        });
        
        
        output.bukti_bayar = await pembayarans.getBukti_bayar({
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
        model: db.bookings,
        as: 'booking',
        
        where: filter.booking ? {
          [Op.or]: [
            { id: { [Op.in]: filter.booking.split('|').map(term => Utils.uuid(term)) } },
            {
              kode_booking: {
                [Op.or]: filter.booking.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },



      {
        model: db.file,
        as: 'bukti_bayar',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.diverifikasi_oleh) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pembayarans',
                        'diverifikasi_oleh',
                        filter.diverifikasi_oleh,
                    ),
                };
            }
            
            if (filter.catatan_verifikasi) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'pembayarans',
                        'catatan_verifikasi',
                        filter.catatan_verifikasi,
                    ),
                };
            }
            

            
            

            
            if (filter.jumlah_tagihanRange) {
                const [start, end] = filter.jumlah_tagihanRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    jumlah_tagihan: {
                    ...where.jumlah_tagihan,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    jumlah_tagihan: {
                    ...where.jumlah_tagihan,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.jumlah_dibayarRange) {
                const [start, end] = filter.jumlah_dibayarRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    jumlah_dibayar: {
                    ...where.jumlah_dibayar,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    jumlah_dibayar: {
                    ...where.jumlah_dibayar,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.dibayar_padaRange) {
                const [start, end] = filter.dibayar_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    dibayar_pada: {
                    ...where.dibayar_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    dibayar_pada: {
                    ...where.dibayar_pada,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.diverifikasi_padaRange) {
                const [start, end] = filter.diverifikasi_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    diverifikasi_pada: {
                    ...where.diverifikasi_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    diverifikasi_pada: {
                    ...where.diverifikasi_pada,
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

            
            if (filter.metode) {
                where = {
                    ...where,
                metode: filter.metode,
            };
            }
            
            if (filter.status_pembayaran) {
                where = {
                    ...where,
                status_pembayaran: filter.status_pembayaran,
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
            const { rows, count } = await db.pembayarans.findAndCountAll(queryOptions);

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
                        'pembayarans',
                        'status_pembayaran',
                        query,
                    ),
                ],
            };
        }

        const records = await db.pembayarans.findAll({
            attributes: [ 'id', 'status_pembayaran' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['status_pembayaran', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.status_pembayaran,
        }));
    }

    
};

