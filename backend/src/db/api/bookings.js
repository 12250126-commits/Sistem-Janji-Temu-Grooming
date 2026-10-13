
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BookingsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const bookings = await db.bookings.create(
            {
                id: data.id || undefined,
        
        kode_booking: data.kode_booking
        ||
        null
            ,
            
        waktu_mulai: data.waktu_mulai
        ||
        null
            ,
            
        waktu_selesai: data.waktu_selesai
        ||
        null
            ,
            
        durasi_menit: data.durasi_menit
        ||
        null
            ,
            
        harga_dasar_snapshot: data.harga_dasar_snapshot
        ||
        null
            ,
            
        tarif_ukuran_snapshot: data.tarif_ukuran_snapshot
        ||
        null
            ,
            
        total_biaya: data.total_biaya
        ||
        null
            ,
            
        status_booking: data.status_booking
        ||
        null
            ,
            
        status_diubah_pada: data.status_diubah_pada
        ||
        null
            ,
            
        status_diubah_oleh: data.status_diubah_oleh
        ||
        null
            ,
            
        catatan_konsumen: data.catatan_konsumen
        ||
        null
            ,
            
        catatan_admin: data.catatan_admin
        ||
        null
            ,
            
        dibatalkan_pada: data.dibatalkan_pada
        ||
        null
            ,
            
        alasan_batal: data.alasan_batal
        ||
        null
            ,
            
        butuh_reschedule: data.butuh_reschedule
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await bookings.setKonsumen( data.konsumen || null, {
            transaction,
        });
        
        await bookings.setHewan( data.hewan || null, {
            transaction,
        });
        
        await bookings.setLayanan( data.layanan || null, {
            transaction,
        });
        
        await bookings.setGroomer( data.groomer || null, {
            transaction,
        });
        

        

        

        return bookings;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const bookingsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                kode_booking: item.kode_booking
            ||
            null
            ,
            
                waktu_mulai: item.waktu_mulai
            ||
            null
            ,
            
                waktu_selesai: item.waktu_selesai
            ||
            null
            ,
            
                durasi_menit: item.durasi_menit
            ||
            null
            ,
            
                harga_dasar_snapshot: item.harga_dasar_snapshot
            ||
            null
            ,
            
                tarif_ukuran_snapshot: item.tarif_ukuran_snapshot
            ||
            null
            ,
            
                total_biaya: item.total_biaya
            ||
            null
            ,
            
                status_booking: item.status_booking
            ||
            null
            ,
            
                status_diubah_pada: item.status_diubah_pada
            ||
            null
            ,
            
                status_diubah_oleh: item.status_diubah_oleh
            ||
            null
            ,
            
                catatan_konsumen: item.catatan_konsumen
            ||
            null
            ,
            
                catatan_admin: item.catatan_admin
            ||
            null
            ,
            
                dibatalkan_pada: item.dibatalkan_pada
            ||
            null
            ,
            
                alasan_batal: item.alasan_batal
            ||
            null
            ,
            
                butuh_reschedule: item.butuh_reschedule
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const bookings = await db.bookings.bulkCreate(bookingsData, { transaction });

        // For each item created, replace relation files
        

        return bookings;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const bookings = await db.bookings.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.kode_booking !== undefined) updatePayload.kode_booking = data.kode_booking;
        
        
        if (data.waktu_mulai !== undefined) updatePayload.waktu_mulai = data.waktu_mulai;
        
        
        if (data.waktu_selesai !== undefined) updatePayload.waktu_selesai = data.waktu_selesai;
        
        
        if (data.durasi_menit !== undefined) updatePayload.durasi_menit = data.durasi_menit;
        
        
        if (data.harga_dasar_snapshot !== undefined) updatePayload.harga_dasar_snapshot = data.harga_dasar_snapshot;
        
        
        if (data.tarif_ukuran_snapshot !== undefined) updatePayload.tarif_ukuran_snapshot = data.tarif_ukuran_snapshot;
        
        
        if (data.total_biaya !== undefined) updatePayload.total_biaya = data.total_biaya;
        
        
        if (data.status_booking !== undefined) updatePayload.status_booking = data.status_booking;
        
        
        if (data.status_diubah_pada !== undefined) updatePayload.status_diubah_pada = data.status_diubah_pada;
        
        
        if (data.status_diubah_oleh !== undefined) updatePayload.status_diubah_oleh = data.status_diubah_oleh;
        
        
        if (data.catatan_konsumen !== undefined) updatePayload.catatan_konsumen = data.catatan_konsumen;
        
        
        if (data.catatan_admin !== undefined) updatePayload.catatan_admin = data.catatan_admin;
        
        
        if (data.dibatalkan_pada !== undefined) updatePayload.dibatalkan_pada = data.dibatalkan_pada;
        
        
        if (data.alasan_batal !== undefined) updatePayload.alasan_batal = data.alasan_batal;
        
        
        if (data.butuh_reschedule !== undefined) updatePayload.butuh_reschedule = data.butuh_reschedule;
        
        
        updatePayload.updatedById = currentUser.id;

        await bookings.update(updatePayload, {transaction});

        
        
        if (data.konsumen !== undefined) {
            await bookings.setKonsumen(
              
              data.konsumen,
              
              { transaction }
            );
        }
        
        if (data.hewan !== undefined) {
            await bookings.setHewan(
              
              data.hewan,
              
              { transaction }
            );
        }
        
        if (data.layanan !== undefined) {
            await bookings.setLayanan(
              
              data.layanan,
              
              { transaction }
            );
        }
        
        if (data.groomer !== undefined) {
            await bookings.setGroomer(
              
              data.groomer,
              
              { transaction }
            );
        }
        

        
        

        

        return bookings;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const bookings = await db.bookings.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of bookings) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of bookings) {
                await record.destroy({transaction});
            }
        });


        return bookings;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const bookings = await db.bookings.findByPk(id, options);

        await bookings.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await bookings.destroy({
            transaction
        });

        return bookings;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const bookings = await db.bookings.findOne(
            { where },
            { transaction },
        );

        if (!bookings) {
            return bookings;
        }

        const output = bookings.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        output.pembayarans_booking = await bookings.getPembayarans_booking({
            transaction
        });
        
        
        output.riwayat_groomings_booking = await bookings.getRiwayat_groomings_booking({
            transaction
        });
        
        
        output.notifikasis_booking = await bookings.getNotifikasis_booking({
            transaction
        });
        
        
        
        
        
        output.konsumen = await bookings.getKonsumen({
            transaction
        });
        
        
        output.hewan = await bookings.getHewan({
            transaction
        });
        
        
        output.layanan = await bookings.getLayanan({
            transaction
        });
        
        
        output.groomer = await bookings.getGroomer({
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

            
            if (filter.kode_booking) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'bookings',
                        'kode_booking',
                        filter.kode_booking,
                    ),
                };
            }
            
            if (filter.status_diubah_oleh) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'bookings',
                        'status_diubah_oleh',
                        filter.status_diubah_oleh,
                    ),
                };
            }
            
            if (filter.catatan_konsumen) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'bookings',
                        'catatan_konsumen',
                        filter.catatan_konsumen,
                    ),
                };
            }
            
            if (filter.catatan_admin) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'bookings',
                        'catatan_admin',
                        filter.catatan_admin,
                    ),
                };
            }
            
            if (filter.alasan_batal) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'bookings',
                        'alasan_batal',
                        filter.alasan_batal,
                    ),
                };
            }
            

            
            

            
            if (filter.waktu_mulaiRange) {
                const [start, end] = filter.waktu_mulaiRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    waktu_mulai: {
                    ...where.waktu_mulai,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    waktu_mulai: {
                    ...where.waktu_mulai,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.waktu_selesaiRange) {
                const [start, end] = filter.waktu_selesaiRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    waktu_selesai: {
                    ...where.waktu_selesai,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    waktu_selesai: {
                    ...where.waktu_selesai,
                            [Op.lte]: end,
                    },
                };
                }
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
            
            if (filter.harga_dasar_snapshotRange) {
                const [start, end] = filter.harga_dasar_snapshotRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    harga_dasar_snapshot: {
                    ...where.harga_dasar_snapshot,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    harga_dasar_snapshot: {
                    ...where.harga_dasar_snapshot,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.tarif_ukuran_snapshotRange) {
                const [start, end] = filter.tarif_ukuran_snapshotRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    tarif_ukuran_snapshot: {
                    ...where.tarif_ukuran_snapshot,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    tarif_ukuran_snapshot: {
                    ...where.tarif_ukuran_snapshot,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.total_biayaRange) {
                const [start, end] = filter.total_biayaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    total_biaya: {
                    ...where.total_biaya,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    total_biaya: {
                    ...where.total_biaya,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.status_diubah_padaRange) {
                const [start, end] = filter.status_diubah_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    status_diubah_pada: {
                    ...where.status_diubah_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    status_diubah_pada: {
                    ...where.status_diubah_pada,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.dibatalkan_padaRange) {
                const [start, end] = filter.dibatalkan_padaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    dibatalkan_pada: {
                    ...where.dibatalkan_pada,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    dibatalkan_pada: {
                    ...where.dibatalkan_pada,
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

            
            if (filter.status_booking) {
                where = {
                    ...where,
                status_booking: filter.status_booking,
            };
            }
            
            if (filter.butuh_reschedule) {
                where = {
                    ...where,
                butuh_reschedule: filter.butuh_reschedule,
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
            const { rows, count } = await db.bookings.findAndCountAll(queryOptions);

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
                        'bookings',
                        'kode_booking',
                        query,
                    ),
                ],
            };
        }

        const records = await db.bookings.findAll({
            attributes: [ 'id', 'kode_booking' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['kode_booking', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.kode_booking,
        }));
    }

    
};

