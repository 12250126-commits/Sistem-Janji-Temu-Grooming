
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Riwayat_groomingsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const riwayat_groomings = await db.riwayat_groomings.create(
            {
                id: data.id || undefined,
        
        mulai_pada: data.mulai_pada
        ||
        null
            ,
            
        selesai_pada: data.selesai_pada
        ||
        null
            ,
            
        berat_kg_setelah: data.berat_kg_setelah
        ||
        null
            ,
            
        kondisi_setelah: data.kondisi_setelah
        ||
        null
            ,
            
        catatan_tindakan: data.catatan_tindakan
        ||
        null
            ,
            
        catatan_kondisi: data.catatan_kondisi
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await riwayat_groomings.setBooking( data.booking || null, {
            transaction,
        });
        
        await riwayat_groomings.setHewan( data.hewan || null, {
            transaction,
        });
        
        await riwayat_groomings.setGroomer( data.groomer || null, {
            transaction,
        });
        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.riwayat_groomings.getTableName(),
                belongsToColumn: 'foto_setelah',
                belongsToId: riwayat_groomings.id,
            },
            data.foto_setelah,
            options,
        );
        

        return riwayat_groomings;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const riwayat_groomingsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                mulai_pada: item.mulai_pada
            ||
            null
            ,
            
                selesai_pada: item.selesai_pada
            ||
            null
            ,
            
                berat_kg_setelah: item.berat_kg_setelah
            ||
            null
            ,
            
                kondisi_setelah: item.kondisi_setelah
            ||
            null
            ,
            
                catatan_tindakan: item.catatan_tindakan
            ||
            null
            ,
            
                catatan_kondisi: item.catatan_kondisi
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const riwayat_groomings = await db.riwayat_groomings.bulkCreate(riwayat_groomingsData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < riwayat_groomings.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.riwayat_groomings.getTableName(),
                    belongsToColumn: 'foto_setelah',
                    belongsToId: riwayat_groomings[i].id,
                },
                data[i].foto_setelah,
                options,
            );
        }
        

        return riwayat_groomings;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const riwayat_groomings = await db.riwayat_groomings.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.mulai_pada !== undefined) updatePayload.mulai_pada = data.mulai_pada;
        
        
        if (data.selesai_pada !== undefined) updatePayload.selesai_pada = data.selesai_pada;
        
        
        if (data.berat_kg_setelah !== undefined) updatePayload.berat_kg_setelah = data.berat_kg_setelah;
        
        
        if (data.kondisi_setelah !== undefined) updatePayload.kondisi_setelah = data.kondisi_setelah;
        
        
        if (data.catatan_tindakan !== undefined) updatePayload.catatan_tindakan = data.catatan_tindakan;
        
        
        if (data.catatan_kondisi !== undefined) updatePayload.catatan_kondisi = data.catatan_kondisi;
        
        
        updatePayload.updatedById = currentUser.id;

        await riwayat_groomings.update(updatePayload, {transaction});

        
        
        if (data.booking !== undefined) {
            await riwayat_groomings.setBooking(
              
              data.booking,
              
              { transaction }
            );
        }
        
        if (data.hewan !== undefined) {
            await riwayat_groomings.setHewan(
              
              data.hewan,
              
              { transaction }
            );
        }
        
        if (data.groomer !== undefined) {
            await riwayat_groomings.setGroomer(
              
              data.groomer,
              
              { transaction }
            );
        }
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.riwayat_groomings.getTableName(),
                belongsToColumn: 'foto_setelah',
                belongsToId: riwayat_groomings.id,
            },
            data.foto_setelah,
            options,
        );
        

        return riwayat_groomings;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const riwayat_groomings = await db.riwayat_groomings.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of riwayat_groomings) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of riwayat_groomings) {
                await record.destroy({transaction});
            }
        });


        return riwayat_groomings;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const riwayat_groomings = await db.riwayat_groomings.findByPk(id, options);

        await riwayat_groomings.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await riwayat_groomings.destroy({
            transaction
        });

        return riwayat_groomings;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const riwayat_groomings = await db.riwayat_groomings.findOne(
            { where },
            { transaction },
        );

        if (!riwayat_groomings) {
            return riwayat_groomings;
        }

        const output = riwayat_groomings.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.booking = await riwayat_groomings.getBooking({
            transaction
        });
        
        
        output.hewan = await riwayat_groomings.getHewan({
            transaction
        });
        
        
        output.groomer = await riwayat_groomings.getGroomer({
            transaction
        });
        
        
        output.foto_setelah = await riwayat_groomings.getFoto_setelah({
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
        model: db.hewans,
        as: 'hewan',
        
        where: filter.hewan ? {
          [Op.or]: [
            { id: { [Op.in]: filter.hewan.split('|').map(term => Utils.uuid(term)) } },
            {
              nama: {
                [Op.or]: filter.hewan.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },

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



      {
        model: db.file,
        as: 'foto_setelah',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.catatan_tindakan) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'riwayat_groomings',
                        'catatan_tindakan',
                        filter.catatan_tindakan,
                    ),
                };
            }
            
            if (filter.catatan_kondisi) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'riwayat_groomings',
                        'catatan_kondisi',
                        filter.catatan_kondisi,
                    ),
                };
            }
            

            
            
            if (filter.calendarStart && filter.calendarEnd) {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            mulai_pada: {
                                [Op.between]: [filter.calendarStart, filter.calendarEnd],
                            },
                    },
                {
                    selesai_pada: {
                        [Op.between]: [filter.calendarStart, filter.calendarEnd],
                    },
                },
                ],
            };
            }
            

            
            if (filter.mulai_padaRange) {
                const [start, end] = filter.mulai_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    mulai_pada: {
                    ...where.mulai_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    mulai_pada: {
                    ...where.mulai_pada,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.selesai_padaRange) {
                const [start, end] = filter.selesai_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    selesai_pada: {
                    ...where.selesai_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    selesai_pada: {
                    ...where.selesai_pada,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.berat_kg_setelahRange) {
                const [start, end] = filter.berat_kg_setelahRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    berat_kg_setelah: {
                    ...where.berat_kg_setelah,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    berat_kg_setelah: {
                    ...where.berat_kg_setelah,
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

            
            if (filter.kondisi_setelah) {
                where = {
                    ...where,
                kondisi_setelah: filter.kondisi_setelah,
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
            const { rows, count } = await db.riwayat_groomings.findAndCountAll(queryOptions);

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
                        'riwayat_groomings',
                        'kondisi_setelah',
                        query,
                    ),
                ],
            };
        }

        const records = await db.riwayat_groomings.findAll({
            attributes: [ 'id', 'kondisi_setelah' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['kondisi_setelah', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.kondisi_setelah,
        }));
    }

    
};

