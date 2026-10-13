
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class NotifikasisDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const notifikasis = await db.notifikasis.create(
            {
                id: data.id || undefined,
        
        channel: data.channel
        ||
        null
            ,
            
        jenis: data.jenis
        ||
        null
            ,
            
        tujuan: data.tujuan
        ||
        null
            ,
            
        pesan: data.pesan
        ||
        null
            ,
            
        status_kirim: data.status_kirim
        ||
        null
            ,
            
        dijadwalkan_pada: data.dijadwalkan_pada
        ||
        null
            ,
            
        dikirim_pada: data.dikirim_pada
        ||
        null
            ,
            
        provider: data.provider
        ||
        null
            ,
            
        provider_message_ref: data.provider_message_ref
        ||
        null
            ,
            
        response_raw: data.response_raw
        ||
        null
            ,
            
        retry_count: data.retry_count
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await notifikasis.setBooking( data.booking || null, {
            transaction,
        });
        

        

        

        return notifikasis;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const notifikasisData = data.map((item, index) => ({
                id: item.id || undefined,
                
                channel: item.channel
            ||
            null
            ,
            
                jenis: item.jenis
            ||
            null
            ,
            
                tujuan: item.tujuan
            ||
            null
            ,
            
                pesan: item.pesan
            ||
            null
            ,
            
                status_kirim: item.status_kirim
            ||
            null
            ,
            
                dijadwalkan_pada: item.dijadwalkan_pada
            ||
            null
            ,
            
                dikirim_pada: item.dikirim_pada
            ||
            null
            ,
            
                provider: item.provider
            ||
            null
            ,
            
                provider_message_ref: item.provider_message_ref
            ||
            null
            ,
            
                response_raw: item.response_raw
            ||
            null
            ,
            
                retry_count: item.retry_count
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const notifikasis = await db.notifikasis.bulkCreate(notifikasisData, { transaction });

        // For each item created, replace relation files
        

        return notifikasis;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const notifikasis = await db.notifikasis.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.channel !== undefined) updatePayload.channel = data.channel;
        
        
        if (data.jenis !== undefined) updatePayload.jenis = data.jenis;
        
        
        if (data.tujuan !== undefined) updatePayload.tujuan = data.tujuan;
        
        
        if (data.pesan !== undefined) updatePayload.pesan = data.pesan;
        
        
        if (data.status_kirim !== undefined) updatePayload.status_kirim = data.status_kirim;
        
        
        if (data.dijadwalkan_pada !== undefined) updatePayload.dijadwalkan_pada = data.dijadwalkan_pada;
        
        
        if (data.dikirim_pada !== undefined) updatePayload.dikirim_pada = data.dikirim_pada;
        
        
        if (data.provider !== undefined) updatePayload.provider = data.provider;
        
        
        if (data.provider_message_ref !== undefined) updatePayload.provider_message_ref = data.provider_message_ref;
        
        
        if (data.response_raw !== undefined) updatePayload.response_raw = data.response_raw;
        
        
        if (data.retry_count !== undefined) updatePayload.retry_count = data.retry_count;
        
        
        updatePayload.updatedById = currentUser.id;

        await notifikasis.update(updatePayload, {transaction});

        
        
        if (data.booking !== undefined) {
            await notifikasis.setBooking(
              
              data.booking,
              
              { transaction }
            );
        }
        

        
        

        

        return notifikasis;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const notifikasis = await db.notifikasis.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of notifikasis) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of notifikasis) {
                await record.destroy({transaction});
            }
        });


        return notifikasis;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const notifikasis = await db.notifikasis.findByPk(id, options);

        await notifikasis.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await notifikasis.destroy({
            transaction
        });

        return notifikasis;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const notifikasis = await db.notifikasis.findOne(
            { where },
            { transaction },
        );

        if (!notifikasis) {
            return notifikasis;
        }

        const output = notifikasis.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.booking = await notifikasis.getBooking({
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



    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.tujuan) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'notifikasis',
                        'tujuan',
                        filter.tujuan,
                    ),
                };
            }
            
            if (filter.pesan) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'notifikasis',
                        'pesan',
                        filter.pesan,
                    ),
                };
            }
            
            if (filter.provider) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'notifikasis',
                        'provider',
                        filter.provider,
                    ),
                };
            }
            
            if (filter.provider_message_ref) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'notifikasis',
                        'provider_message_ref',
                        filter.provider_message_ref,
                    ),
                };
            }
            
            if (filter.response_raw) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'notifikasis',
                        'response_raw',
                        filter.response_raw,
                    ),
                };
            }
            

            
            

            
            if (filter.dijadwalkan_padaRange) {
                const [start, end] = filter.dijadwalkan_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    dijadwalkan_pada: {
                    ...where.dijadwalkan_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    dijadwalkan_pada: {
                    ...where.dijadwalkan_pada,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.dikirim_padaRange) {
                const [start, end] = filter.dikirim_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    dikirim_pada: {
                    ...where.dikirim_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    dikirim_pada: {
                    ...where.dikirim_pada,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.retry_countRange) {
                const [start, end] = filter.retry_countRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    retry_count: {
                    ...where.retry_count,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    retry_count: {
                    ...where.retry_count,
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

            
            if (filter.channel) {
                where = {
                    ...where,
                channel: filter.channel,
            };
            }
            
            if (filter.jenis) {
                where = {
                    ...where,
                jenis: filter.jenis,
            };
            }
            
            if (filter.status_kirim) {
                where = {
                    ...where,
                status_kirim: filter.status_kirim,
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
            const { rows, count } = await db.notifikasis.findAndCountAll(queryOptions);

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
                        'notifikasis',
                        'jenis',
                        query,
                    ),
                ],
            };
        }

        const records = await db.notifikasis.findAll({
            attributes: [ 'id', 'jenis' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['jenis', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.jenis,
        }));
    }

    
};

