const db = require('../db/models');
const ValidationError = require('./notifications/errors/validation');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * @param {string} permission
 * @param {object} currentUser
 */
async function checkPermissions(permission, currentUser) {

  if (!currentUser) {
    throw new ValidationError('auth.unauthorized');
  }

  const userPermission = currentUser.custom_permissions.find(
    (cp) => cp.name === permission,
  );

  if (userPermission) {
    return true;
  }

  try {
    if (!currentUser.app_role) {
      throw new ValidationError('auth.forbidden');
    }

    const permissions = await currentUser.app_role.getPermissions();

    return !!permissions.find((p) => p.name === permission);
  } catch (e) {
    throw e;
  }
}

module.exports = class SearchService {
  static async search(searchQuery, currentUser ) {
    try {
      if (!searchQuery) {
        throw new ValidationError('iam.errors.searchQueryRequired');
      }
      const tableColumns = {
        
          
          

          
            "users": [
              
                "firstName",
              
                "lastName",
              
                "phoneNumber",
              
                "email",
              
            ],
          
        
          
          
          
          

          
            "konsumens": [
              
                "kode_konsumen",
              
                "alamat",
              
            ],
          
        
          
          

          
            "groomers": [
              
                "kode_groomer",
              
                "nama_tampilan",
              
                "bio_singkat",
              
            ],
          
        
          
          

          
            "hewans": [
              
                "nama",
              
                "ras",
              
                "catatan_khusus",
              
            ],
          
        
          
          

          
            "layanans": [
              
                "kode_layanan",
              
                "nama",
              
                "deskripsi",
              
            ],
          
        
          
          

          
        
          
          

          
            "jadwal_groomers": [
              
                "jam_mulai",
              
                "jam_selesai",
              
                "jam_istirahat_mulai",
              
                "jam_istirahat_selesai",
              
            ],
          
        
          
          

          
            "bookings": [
              
                "kode_booking",
              
                "status_diubah_oleh",
              
                "catatan_konsumen",
              
                "catatan_admin",
              
                "alasan_batal",
              
            ],
          
        
          
          

          
            "pembayarans": [
              
                "diverifikasi_oleh",
              
                "catatan_verifikasi",
              
            ],
          
        
          
          

          
            "riwayat_groomings": [
              
                "catatan_tindakan",
              
                "catatan_kondisi",
              
            ],
          
        
          
          

          
            "notifikasis": [
              
                "tujuan",
              
                "pesan",
              
                "provider",
              
                "provider_message_ref",
              
                "response_raw",
              
            ],
          
        
          
          

          
            "log_aktivitas": [
              
                "aksi",
              
                "entitas",
              
                "kunci_entitas",
              
                "deskripsi",
              
                "ip_address",
              
                "user_agent",
              
            ],
          
        
          
          

          
            "salon_settings": [
              
                "nama_salon",
              
                "alamat_salon",
              
                "nomor_whatsapp_salon",
              
                "email_salon",
              
                "jam_operasional",
              
                "catatan_kebijakan",
              
            ],
          
        
      };
      const columnsInt = {
        
          
          
          
        
          
          
          
          
          
        
          
          
          
        
          
          
          
            "hewans": [
              
                "umur_bulan",
              
                "berat_kg",
              
            ],
          
        
          
          
          
            "layanans": [
              
                "durasi_menit",
              
                "harga_dasar",
              
            ],
          
        
          
          
          
            "tarif_ukurans": [
              
                "tarif_tambahan",
              
            ],
          
        
          
          
          
            "jadwal_groomers": [
              
                "kapasitas_slot",
              
            ],
          
        
          
          
          
            "bookings": [
              
                "durasi_menit",
              
                "harga_dasar_snapshot",
              
                "tarif_ukuran_snapshot",
              
                "total_biaya",
              
            ],
          
        
          
          
          
            "pembayarans": [
              
                "jumlah_tagihan",
              
                "jumlah_dibayar",
              
            ],
          
        
          
          
          
            "riwayat_groomings": [
              
                "berat_kg_setelah",
              
            ],
          
        
          
          
          
            "notifikasis": [
              
                "retry_count",
              
            ],
          
        
          
          
          
        
          
          
          
        
      };

      let allFoundRecords = [];

      for (const tableName in tableColumns) {
        if (tableColumns.hasOwnProperty(tableName)) {
          const attributesToSearch = tableColumns[tableName];
          const attributesIntToSearch = columnsInt[tableName] || [];
          const whereCondition = {
            [Op.or]: [
              ...attributesToSearch.map(attribute => ({
                [attribute]: {
                  [Op.iLike] : `%${searchQuery}%`,
                },
              })),
              ...attributesIntToSearch.map(attribute => (
                Sequelize.where(
                  Sequelize.cast(Sequelize.col(`${tableName}.${attribute}`), 'varchar'),
                  { [Op.iLike]: `%${searchQuery}%` }
                )
              )),
            ],
          };

          

          const hasPermission = await checkPermissions(`READ_${tableName.toUpperCase()}`, currentUser);
          if (!hasPermission) {
            continue;
          }

          const foundRecords = await db[tableName].findAll({
            where: whereCondition,
            attributes: [...tableColumns[tableName], 'id', ...attributesIntToSearch],
          });
      
          const modifiedRecords = foundRecords.map((record) => {
            const matchAttribute = [];
 
            for (const attribute of attributesToSearch) {
              if (record[attribute]?.toLowerCase()?.includes(searchQuery.toLowerCase())) {
                matchAttribute.push(attribute);
              }
            }

            for (const attribute of attributesIntToSearch) {
              const castedValue = String(record[attribute]);
              if (castedValue && castedValue.toLowerCase().includes(searchQuery.toLowerCase())) {
                matchAttribute.push(attribute);
              }
            }
      
            return {
              ...record.get(),
              matchAttribute,
              tableName,
            };
          });

          allFoundRecords = allFoundRecords.concat(modifiedRecords);
        }
      }

      return allFoundRecords;
    } catch (error) {
      throw error;
    }
  }
}