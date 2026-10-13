





















const db = require('../models');
const Users = db.users;






const Konsumens = db.konsumens;

const Groomers = db.groomers;

const Hewans = db.hewans;

const Layanans = db.layanans;

const TarifUkurans = db.tarif_ukurans;

const JadwalGroomers = db.jadwal_groomers;

const Bookings = db.bookings;

const Pembayarans = db.pembayarans;

const RiwayatGroomings = db.riwayat_groomings;

const Notifikasis = db.notifikasis;

const LogAktivitas = db.log_aktivitas;

const SalonSettings = db.salon_settings;







const KonsumensData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_konsumen": "Grace Hopper",
            
        
    
        
        
            
                "alamat": "Ada Lovelace",
            
        
    
        
        
            
                "wa_opt_in": true,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_konsumen": "Alan Turing",
            
        
    
        
        
            
                "alamat": "Marie Curie",
            
        
    
        
        
            
                "wa_opt_in": true,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_konsumen": "Grace Hopper",
            
        
    
        
        
            
                "alamat": "Marie Curie",
            
        
    
        
        
            
                "wa_opt_in": true,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_konsumen": "Grace Hopper",
            
        
    
        
        
            
                "alamat": "Alan Turing",
            
        
    
        
        
            
                "wa_opt_in": false,
            
        
    
    },
    
];



const GroomersData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_groomer": "Grace Hopper",
            
        
    
        
        
            
                "nama_tampilan": "Ada Lovelace",
            
        
    
        
        
            
                "bio_singkat": "Alan Turing",
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_groomer": "Grace Hopper",
            
        
    
        
        
            
                "nama_tampilan": "Alan Turing",
            
        
    
        
        
            
                "bio_singkat": "Ada Lovelace",
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_groomer": "Ada Lovelace",
            
        
    
        
        
            
                "nama_tampilan": "Marie Curie",
            
        
    
        
        
            
                "bio_singkat": "Marie Curie",
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "kode_groomer": "Alan Turing",
            
        
    
        
        
            
                "nama_tampilan": "Alan Turing",
            
        
    
        
        
            
                "bio_singkat": "Grace Hopper",
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
];



const HewansData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "nama": "Ada Lovelace",
            
        
    
        
        
            
                "jenis": "kucing",
            
        
    
        
        
            
                "ras": "Grace Hopper",
            
        
    
        
        
            
                "ukuran": "kecil",
            
        
    
        
        
            
                "umur_bulan": 4,
            
        
    
        
        
            
                "berat_kg": 7.49,
            
        
    
        
        
            
                "catatan_khusus": "Marie Curie",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "nama": "Marie Curie",
            
        
    
        
        
            
                "jenis": "kucing",
            
        
    
        
        
            
                "ras": "Marie Curie",
            
        
    
        
        
            
                "ukuran": "sedang",
            
        
    
        
        
            
                "umur_bulan": 1,
            
        
    
        
        
            
                "berat_kg": 7.61,
            
        
    
        
        
            
                "catatan_khusus": "Alan Turing",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "nama": "Alan Turing",
            
        
    
        
        
            
                "jenis": "lainnya",
            
        
    
        
        
            
                "ras": "Grace Hopper",
            
        
    
        
        
            
                "ukuran": "sedang",
            
        
    
        
        
            
                "umur_bulan": 5,
            
        
    
        
        
            
                "berat_kg": 5.21,
            
        
    
        
        
            
                "catatan_khusus": "Marie Curie",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "nama": "Alan Turing",
            
        
    
        
        
            
                "jenis": "kucing",
            
        
    
        
        
            
                "ras": "Marie Curie",
            
        
    
        
        
            
                "ukuran": "kecil",
            
        
    
        
        
            
                "umur_bulan": 7,
            
        
    
        
        
            
                "berat_kg": 7.79,
            
        
    
        
        
            
                "catatan_khusus": "Grace Hopper",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
];



const LayanansData = [
    
    {
    
        
        
            
                "kode_layanan": "Grace Hopper",
            
        
    
        
        
            
                "nama": "Alan Turing",
            
        
    
        
        
            
                "deskripsi": "Grace Hopper",
            
        
    
        
        
            
                "durasi_menit": 2,
            
        
    
        
        
            
                "harga_dasar": 9.18,
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
    {
    
        
        
            
                "kode_layanan": "Ada Lovelace",
            
        
    
        
        
            
                "nama": "Alan Turing",
            
        
    
        
        
            
                "deskripsi": "Alan Turing",
            
        
    
        
        
            
                "durasi_menit": 4,
            
        
    
        
        
            
                "harga_dasar": 7.2,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "kode_layanan": "Marie Curie",
            
        
    
        
        
            
                "nama": "Grace Hopper",
            
        
    
        
        
            
                "deskripsi": "Ada Lovelace",
            
        
    
        
        
            
                "durasi_menit": 6,
            
        
    
        
        
            
                "harga_dasar": 7.77,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
    {
    
        
        
            
                "kode_layanan": "Marie Curie",
            
        
    
        
        
            
                "nama": "Ada Lovelace",
            
        
    
        
        
            
                "deskripsi": "Grace Hopper",
            
        
    
        
        
            
                "durasi_menit": 7,
            
        
    
        
        
            
                "harga_dasar": 4.8,
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
];



const TarifUkuransData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "ukuran_hewan": "kecil",
            
        
    
        
        
            
                "tarif_tambahan": 1.75,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "ukuran_hewan": "besar",
            
        
    
        
        
            
                "tarif_tambahan": 0.4,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "ukuran_hewan": "sedang",
            
        
    
        
        
            
                "tarif_tambahan": 6.53,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "ukuran_hewan": "besar",
            
        
    
        
        
            
                "tarif_tambahan": 2.26,
            
        
    
    },
    
];



const JadwalGroomersData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "hari": "minggu",
            
        
    
        
        
            
                "jam_mulai": "Alan Turing",
            
        
    
        
        
            
                "jam_selesai": "Grace Hopper",
            
        
    
        
        
            
                "jam_istirahat_mulai": "Marie Curie",
            
        
    
        
        
            
                "jam_istirahat_selesai": "Ada Lovelace",
            
        
    
        
        
            
                "kapasitas_slot": 1,
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "hari": "minggu",
            
        
    
        
        
            
                "jam_mulai": "Alan Turing",
            
        
    
        
        
            
                "jam_selesai": "Grace Hopper",
            
        
    
        
        
            
                "jam_istirahat_mulai": "Alan Turing",
            
        
    
        
        
            
                "jam_istirahat_selesai": "Marie Curie",
            
        
    
        
        
            
                "kapasitas_slot": 8,
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "hari": "sabtu",
            
        
    
        
        
            
                "jam_mulai": "Grace Hopper",
            
        
    
        
        
            
                "jam_selesai": "Marie Curie",
            
        
    
        
        
            
                "jam_istirahat_mulai": "Alan Turing",
            
        
    
        
        
            
                "jam_istirahat_selesai": "Marie Curie",
            
        
    
        
        
            
                "kapasitas_slot": 3,
            
        
    
        
        
            
                "is_active": false,
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "hari": "rabu",
            
        
    
        
        
            
                "jam_mulai": "Alan Turing",
            
        
    
        
        
            
                "jam_selesai": "Ada Lovelace",
            
        
    
        
        
            
                "jam_istirahat_mulai": "Grace Hopper",
            
        
    
        
        
            
                "jam_istirahat_selesai": "Alan Turing",
            
        
    
        
        
            
                "kapasitas_slot": 4,
            
        
    
        
        
            
                "is_active": true,
            
        
    
    },
    
];



const BookingsData = [
    
    {
    
        
        
            
                "kode_booking": "Ada Lovelace",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "waktu_mulai": new Date(Date.now()),
            
        
    
        
        
            
                "waktu_selesai": new Date(Date.now()),
            
        
    
        
        
            
                "durasi_menit": 2,
            
        
    
        
        
            
                "harga_dasar_snapshot": 8.48,
            
        
    
        
        
            
                "tarif_ukuran_snapshot": 4.08,
            
        
    
        
        
            
                "total_biaya": 2.52,
            
        
    
        
        
            
                "status_booking": "done",
            
        
    
        
        
            
                "status_diubah_pada": new Date(Date.now()),
            
        
    
        
        
            
                "status_diubah_oleh": "Grace Hopper",
            
        
    
        
        
            
                "catatan_konsumen": "Ada Lovelace",
            
        
    
        
        
            
                "catatan_admin": "Marie Curie",
            
        
    
        
        
            
                "dibatalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "alasan_batal": "Grace Hopper",
            
        
    
        
        
            
                "butuh_reschedule": false,
            
        
    
    },
    
    {
    
        
        
            
                "kode_booking": "Ada Lovelace",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "waktu_mulai": new Date(Date.now()),
            
        
    
        
        
            
                "waktu_selesai": new Date(Date.now()),
            
        
    
        
        
            
                "durasi_menit": 7,
            
        
    
        
        
            
                "harga_dasar_snapshot": 2.92,
            
        
    
        
        
            
                "tarif_ukuran_snapshot": 4.23,
            
        
    
        
        
            
                "total_biaya": 6.28,
            
        
    
        
        
            
                "status_booking": "done",
            
        
    
        
        
            
                "status_diubah_pada": new Date(Date.now()),
            
        
    
        
        
            
                "status_diubah_oleh": "Alan Turing",
            
        
    
        
        
            
                "catatan_konsumen": "Grace Hopper",
            
        
    
        
        
            
                "catatan_admin": "Marie Curie",
            
        
    
        
        
            
                "dibatalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "alasan_batal": "Grace Hopper",
            
        
    
        
        
            
                "butuh_reschedule": false,
            
        
    
    },
    
    {
    
        
        
            
                "kode_booking": "Marie Curie",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "waktu_mulai": new Date(Date.now()),
            
        
    
        
        
            
                "waktu_selesai": new Date(Date.now()),
            
        
    
        
        
            
                "durasi_menit": 4,
            
        
    
        
        
            
                "harga_dasar_snapshot": 7.22,
            
        
    
        
        
            
                "tarif_ukuran_snapshot": 7.55,
            
        
    
        
        
            
                "total_biaya": 3.92,
            
        
    
        
        
            
                "status_booking": "confirmed",
            
        
    
        
        
            
                "status_diubah_pada": new Date(Date.now()),
            
        
    
        
        
            
                "status_diubah_oleh": "Marie Curie",
            
        
    
        
        
            
                "catatan_konsumen": "Grace Hopper",
            
        
    
        
        
            
                "catatan_admin": "Alan Turing",
            
        
    
        
        
            
                "dibatalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "alasan_batal": "Marie Curie",
            
        
    
        
        
            
                "butuh_reschedule": true,
            
        
    
    },
    
    {
    
        
        
            
                "kode_booking": "Grace Hopper",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "waktu_mulai": new Date(Date.now()),
            
        
    
        
        
            
                "waktu_selesai": new Date(Date.now()),
            
        
    
        
        
            
                "durasi_menit": 9,
            
        
    
        
        
            
                "harga_dasar_snapshot": 2.28,
            
        
    
        
        
            
                "tarif_ukuran_snapshot": 0.69,
            
        
    
        
        
            
                "total_biaya": 0.8,
            
        
    
        
        
            
                "status_booking": "done",
            
        
    
        
        
            
                "status_diubah_pada": new Date(Date.now()),
            
        
    
        
        
            
                "status_diubah_oleh": "Marie Curie",
            
        
    
        
        
            
                "catatan_konsumen": "Ada Lovelace",
            
        
    
        
        
            
                "catatan_admin": "Alan Turing",
            
        
    
        
        
            
                "dibatalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "alasan_batal": "Ada Lovelace",
            
        
    
        
        
            
                "butuh_reschedule": false,
            
        
    
    },
    
];



const PembayaransData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "metode": "transfer_bank",
            
        
    
        
        
            
                "jumlah_tagihan": 2.38,
            
        
    
        
        
            
                "jumlah_dibayar": 7.53,
            
        
    
        
        
            
                "status_pembayaran": "dp",
            
        
    
        
        
            
                "dibayar_pada": new Date(Date.now()),
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "diverifikasi_pada": new Date(Date.now()),
            
        
    
        
        
            
                "diverifikasi_oleh": "Ada Lovelace",
            
        
    
        
        
            
                "catatan_verifikasi": "Grace Hopper",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "metode": "e_wallet",
            
        
    
        
        
            
                "jumlah_tagihan": 1.24,
            
        
    
        
        
            
                "jumlah_dibayar": 5.13,
            
        
    
        
        
            
                "status_pembayaran": "lunas",
            
        
    
        
        
            
                "dibayar_pada": new Date(Date.now()),
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "diverifikasi_pada": new Date(Date.now()),
            
        
    
        
        
            
                "diverifikasi_oleh": "Alan Turing",
            
        
    
        
        
            
                "catatan_verifikasi": "Ada Lovelace",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "metode": "cash",
            
        
    
        
        
            
                "jumlah_tagihan": 9.59,
            
        
    
        
        
            
                "jumlah_dibayar": 6.41,
            
        
    
        
        
            
                "status_pembayaran": "belum_bayar",
            
        
    
        
        
            
                "dibayar_pada": new Date(Date.now()),
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "diverifikasi_pada": new Date(Date.now()),
            
        
    
        
        
            
                "diverifikasi_oleh": "Alan Turing",
            
        
    
        
        
            
                "catatan_verifikasi": "Grace Hopper",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "metode": "transfer_bank",
            
        
    
        
        
            
                "jumlah_tagihan": 6.94,
            
        
    
        
        
            
                "jumlah_dibayar": 3.4,
            
        
    
        
        
            
                "status_pembayaran": "dp",
            
        
    
        
        
            
                "dibayar_pada": new Date(Date.now()),
            
        
    
        
        
            
                // type code here for "files" field
            
        
    
        
        
            
                "diverifikasi_pada": new Date(Date.now()),
            
        
    
        
        
            
                "diverifikasi_oleh": "Marie Curie",
            
        
    
        
        
            
                "catatan_verifikasi": "Grace Hopper",
            
        
    
    },
    
];



const RiwayatGroomingsData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "mulai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "selesai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "berat_kg_setelah": 3.47,
            
        
    
        
        
            
                "kondisi_setelah": "darurat",
            
        
    
        
        
            
                "catatan_tindakan": "Grace Hopper",
            
        
    
        
        
            
                "catatan_kondisi": "Marie Curie",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "mulai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "selesai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "berat_kg_setelah": 9.02,
            
        
    
        
        
            
                "kondisi_setelah": "baik",
            
        
    
        
        
            
                "catatan_tindakan": "Ada Lovelace",
            
        
    
        
        
            
                "catatan_kondisi": "Ada Lovelace",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "mulai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "selesai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "berat_kg_setelah": 8.68,
            
        
    
        
        
            
                "kondisi_setelah": "darurat",
            
        
    
        
        
            
                "catatan_tindakan": "Ada Lovelace",
            
        
    
        
        
            
                "catatan_kondisi": "Marie Curie",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "mulai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "selesai_pada": new Date(Date.now()),
            
        
    
        
        
            
                "berat_kg_setelah": 4.48,
            
        
    
        
        
            
                "kondisi_setelah": "baik",
            
        
    
        
        
            
                "catatan_tindakan": "Alan Turing",
            
        
    
        
        
            
                "catatan_kondisi": "Grace Hopper",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
];



const NotifikasisData = [
    
    {
    
        
        
            
                "channel": "whatsapp",
            
        
    
        
        
            
                "jenis": "grooming_selesai",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "tujuan": "Marie Curie",
            
        
    
        
        
            
                "pesan": "Ada Lovelace",
            
        
    
        
        
            
                "status_kirim": "failed",
            
        
    
        
        
            
                "dijadwalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "dikirim_pada": new Date(Date.now()),
            
        
    
        
        
            
                "provider": "Marie Curie",
            
        
    
        
        
            
                "provider_message_ref": "Ada Lovelace",
            
        
    
        
        
            
                "response_raw": "Marie Curie",
            
        
    
        
        
            
                "retry_count": 8,
            
        
    
    },
    
    {
    
        
        
            
                "channel": "whatsapp",
            
        
    
        
        
            
                "jenis": "pengingat_h1",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "tujuan": "Marie Curie",
            
        
    
        
        
            
                "pesan": "Marie Curie",
            
        
    
        
        
            
                "status_kirim": "sent",
            
        
    
        
        
            
                "dijadwalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "dikirim_pada": new Date(Date.now()),
            
        
    
        
        
            
                "provider": "Grace Hopper",
            
        
    
        
        
            
                "provider_message_ref": "Marie Curie",
            
        
    
        
        
            
                "response_raw": "Alan Turing",
            
        
    
        
        
            
                "retry_count": 2,
            
        
    
    },
    
    {
    
        
        
            
                "channel": "whatsapp",
            
        
    
        
        
            
                "jenis": "pembatalan",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "tujuan": "Grace Hopper",
            
        
    
        
        
            
                "pesan": "Ada Lovelace",
            
        
    
        
        
            
                "status_kirim": "failed",
            
        
    
        
        
            
                "dijadwalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "dikirim_pada": new Date(Date.now()),
            
        
    
        
        
            
                "provider": "Alan Turing",
            
        
    
        
        
            
                "provider_message_ref": "Grace Hopper",
            
        
    
        
        
            
                "response_raw": "Alan Turing",
            
        
    
        
        
            
                "retry_count": 7,
            
        
    
    },
    
    {
    
        
        
            
                "channel": "whatsapp",
            
        
    
        
        
            
                "jenis": "pembatalan",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "tujuan": "Marie Curie",
            
        
    
        
        
            
                "pesan": "Grace Hopper",
            
        
    
        
        
            
                "status_kirim": "sent",
            
        
    
        
        
            
                "dijadwalkan_pada": new Date(Date.now()),
            
        
    
        
        
            
                "dikirim_pada": new Date(Date.now()),
            
        
    
        
        
            
                "provider": "Marie Curie",
            
        
    
        
        
            
                "provider_message_ref": "Marie Curie",
            
        
    
        
        
            
                "response_raw": "Ada Lovelace",
            
        
    
        
        
            
                "retry_count": 5,
            
        
    
    },
    
];



const LogAktivitasData = [
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "aksi": "Ada Lovelace",
            
        
    
        
        
            
                "entitas": "Grace Hopper",
            
        
    
        
        
            
                "kunci_entitas": "Ada Lovelace",
            
        
    
        
        
            
                "deskripsi": "Ada Lovelace",
            
        
    
        
        
            
                "ip_address": "Marie Curie",
            
        
    
        
        
            
                "user_agent": "Grace Hopper",
            
        
    
        
        
            
                "terjadi_pada": new Date(Date.now()),
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "aksi": "Alan Turing",
            
        
    
        
        
            
                "entitas": "Marie Curie",
            
        
    
        
        
            
                "kunci_entitas": "Ada Lovelace",
            
        
    
        
        
            
                "deskripsi": "Marie Curie",
            
        
    
        
        
            
                "ip_address": "Ada Lovelace",
            
        
    
        
        
            
                "user_agent": "Alan Turing",
            
        
    
        
        
            
                "terjadi_pada": new Date(Date.now()),
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "aksi": "Marie Curie",
            
        
    
        
        
            
                "entitas": "Alan Turing",
            
        
    
        
        
            
                "kunci_entitas": "Alan Turing",
            
        
    
        
        
            
                "deskripsi": "Ada Lovelace",
            
        
    
        
        
            
                "ip_address": "Marie Curie",
            
        
    
        
        
            
                "user_agent": "Marie Curie",
            
        
    
        
        
            
                "terjadi_pada": new Date(Date.now()),
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "aksi": "Marie Curie",
            
        
    
        
        
            
                "entitas": "Grace Hopper",
            
        
    
        
        
            
                "kunci_entitas": "Ada Lovelace",
            
        
    
        
        
            
                "deskripsi": "Alan Turing",
            
        
    
        
        
            
                "ip_address": "Grace Hopper",
            
        
    
        
        
            
                "user_agent": "Grace Hopper",
            
        
    
        
        
            
                "terjadi_pada": new Date(Date.now()),
            
        
    
    },
    
];



const SalonSettingsData = [
    
    {
    
        
        
            
                "nama_salon": "Marie Curie",
            
        
    
        
        
            
                "alamat_salon": "Alan Turing",
            
        
    
        
        
            
                "nomor_whatsapp_salon": "Marie Curie",
            
        
    
        
        
            
                "email_salon": "Alan Turing",
            
        
    
        
        
            
                "jam_operasional": "Grace Hopper",
            
        
    
        
        
            
                "catatan_kebijakan": "Grace Hopper",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                "nama_salon": "Grace Hopper",
            
        
    
        
        
            
                "alamat_salon": "Alan Turing",
            
        
    
        
        
            
                "nomor_whatsapp_salon": "Ada Lovelace",
            
        
    
        
        
            
                "email_salon": "Marie Curie",
            
        
    
        
        
            
                "jam_operasional": "Alan Turing",
            
        
    
        
        
            
                "catatan_kebijakan": "Ada Lovelace",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                "nama_salon": "Alan Turing",
            
        
    
        
        
            
                "alamat_salon": "Marie Curie",
            
        
    
        
        
            
                "nomor_whatsapp_salon": "Grace Hopper",
            
        
    
        
        
            
                "email_salon": "Ada Lovelace",
            
        
    
        
        
            
                "jam_operasional": "Grace Hopper",
            
        
    
        
        
            
                "catatan_kebijakan": "Marie Curie",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                "nama_salon": "Marie Curie",
            
        
    
        
        
            
                "alamat_salon": "Alan Turing",
            
        
    
        
        
            
                "nomor_whatsapp_salon": "Grace Hopper",
            
        
    
        
        
            
                "email_salon": "Alan Turing",
            
        
    
        
        
            
                "jam_operasional": "Grace Hopper",
            
        
    
        
        
            
                "catatan_kebijakan": "Alan Turing",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
];




    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
            // Similar logic for "relation_many"
        
    

    
    
    
    
    
        
            
            async function associateKonsumenWithUser() {
            
                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Konsumen0 = await Konsumens.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Konsumen0?.setUser)
                {
                    await
                    Konsumen0.
                    setUser(relatedUser0);
                }
            
                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Konsumen1 = await Konsumens.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Konsumen1?.setUser)
                {
                    await
                    Konsumen1.
                    setUser(relatedUser1);
                }
            
                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Konsumen2 = await Konsumens.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Konsumen2?.setUser)
                {
                    await
                    Konsumen2.
                    setUser(relatedUser2);
                }
            
                const relatedUser3 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Konsumen3 = await Konsumens.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Konsumen3?.setUser)
                {
                    await
                    Konsumen3.
                    setUser(relatedUser3);
                }
            
        }
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateGroomerWithUser() {
            
                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Groomer0 = await Groomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Groomer0?.setUser)
                {
                    await
                    Groomer0.
                    setUser(relatedUser0);
                }
            
                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Groomer1 = await Groomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Groomer1?.setUser)
                {
                    await
                    Groomer1.
                    setUser(relatedUser1);
                }
            
                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Groomer2 = await Groomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Groomer2?.setUser)
                {
                    await
                    Groomer2.
                    setUser(relatedUser2);
                }
            
                const relatedUser3 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Groomer3 = await Groomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Groomer3?.setUser)
                {
                    await
                    Groomer3.
                    setUser(relatedUser3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateHewanWithKonsumen() {
            
                const relatedKonsumen0 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Hewan0 = await Hewans.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Hewan0?.setKonsumen)
                {
                    await
                    Hewan0.
                    setKonsumen(relatedKonsumen0);
                }
            
                const relatedKonsumen1 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Hewan1 = await Hewans.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Hewan1?.setKonsumen)
                {
                    await
                    Hewan1.
                    setKonsumen(relatedKonsumen1);
                }
            
                const relatedKonsumen2 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Hewan2 = await Hewans.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Hewan2?.setKonsumen)
                {
                    await
                    Hewan2.
                    setKonsumen(relatedKonsumen2);
                }
            
                const relatedKonsumen3 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Hewan3 = await Hewans.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Hewan3?.setKonsumen)
                {
                    await
                    Hewan3.
                    setKonsumen(relatedKonsumen3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateTarifUkuranWithLayanan() {
            
                const relatedLayanan0 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const TarifUkuran0 = await TarifUkurans.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (TarifUkuran0?.setLayanan)
                {
                    await
                    TarifUkuran0.
                    setLayanan(relatedLayanan0);
                }
            
                const relatedLayanan1 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const TarifUkuran1 = await TarifUkurans.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (TarifUkuran1?.setLayanan)
                {
                    await
                    TarifUkuran1.
                    setLayanan(relatedLayanan1);
                }
            
                const relatedLayanan2 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const TarifUkuran2 = await TarifUkurans.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (TarifUkuran2?.setLayanan)
                {
                    await
                    TarifUkuran2.
                    setLayanan(relatedLayanan2);
                }
            
                const relatedLayanan3 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const TarifUkuran3 = await TarifUkurans.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (TarifUkuran3?.setLayanan)
                {
                    await
                    TarifUkuran3.
                    setLayanan(relatedLayanan3);
                }
            
        }
        
    
        
    
        
    

    
    
    
        
            
            async function associateJadwalGroomerWithGroomer() {
            
                const relatedGroomer0 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const JadwalGroomer0 = await JadwalGroomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (JadwalGroomer0?.setGroomer)
                {
                    await
                    JadwalGroomer0.
                    setGroomer(relatedGroomer0);
                }
            
                const relatedGroomer1 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const JadwalGroomer1 = await JadwalGroomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (JadwalGroomer1?.setGroomer)
                {
                    await
                    JadwalGroomer1.
                    setGroomer(relatedGroomer1);
                }
            
                const relatedGroomer2 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const JadwalGroomer2 = await JadwalGroomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (JadwalGroomer2?.setGroomer)
                {
                    await
                    JadwalGroomer2.
                    setGroomer(relatedGroomer2);
                }
            
                const relatedGroomer3 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const JadwalGroomer3 = await JadwalGroomers.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (JadwalGroomer3?.setGroomer)
                {
                    await
                    JadwalGroomer3.
                    setGroomer(relatedGroomer3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
            
            async function associateBookingWithKonsumen() {
            
                const relatedKonsumen0 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Booking0 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Booking0?.setKonsumen)
                {
                    await
                    Booking0.
                    setKonsumen(relatedKonsumen0);
                }
            
                const relatedKonsumen1 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Booking1 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Booking1?.setKonsumen)
                {
                    await
                    Booking1.
                    setKonsumen(relatedKonsumen1);
                }
            
                const relatedKonsumen2 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Booking2 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Booking2?.setKonsumen)
                {
                    await
                    Booking2.
                    setKonsumen(relatedKonsumen2);
                }
            
                const relatedKonsumen3 = await Konsumens.findOne({
                    offset: Math.floor(Math.random() * (await Konsumens.count())),
                });
                const Booking3 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Booking3?.setKonsumen)
                {
                    await
                    Booking3.
                    setKonsumen(relatedKonsumen3);
                }
            
        }
        
    
        
            
            async function associateBookingWithHewan() {
            
                const relatedHewan0 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const Booking0 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Booking0?.setHewan)
                {
                    await
                    Booking0.
                    setHewan(relatedHewan0);
                }
            
                const relatedHewan1 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const Booking1 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Booking1?.setHewan)
                {
                    await
                    Booking1.
                    setHewan(relatedHewan1);
                }
            
                const relatedHewan2 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const Booking2 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Booking2?.setHewan)
                {
                    await
                    Booking2.
                    setHewan(relatedHewan2);
                }
            
                const relatedHewan3 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const Booking3 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Booking3?.setHewan)
                {
                    await
                    Booking3.
                    setHewan(relatedHewan3);
                }
            
        }
        
    
        
            
            async function associateBookingWithLayanan() {
            
                const relatedLayanan0 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const Booking0 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Booking0?.setLayanan)
                {
                    await
                    Booking0.
                    setLayanan(relatedLayanan0);
                }
            
                const relatedLayanan1 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const Booking1 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Booking1?.setLayanan)
                {
                    await
                    Booking1.
                    setLayanan(relatedLayanan1);
                }
            
                const relatedLayanan2 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const Booking2 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Booking2?.setLayanan)
                {
                    await
                    Booking2.
                    setLayanan(relatedLayanan2);
                }
            
                const relatedLayanan3 = await Layanans.findOne({
                    offset: Math.floor(Math.random() * (await Layanans.count())),
                });
                const Booking3 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Booking3?.setLayanan)
                {
                    await
                    Booking3.
                    setLayanan(relatedLayanan3);
                }
            
        }
        
    
        
            
            async function associateBookingWithGroomer() {
            
                const relatedGroomer0 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const Booking0 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Booking0?.setGroomer)
                {
                    await
                    Booking0.
                    setGroomer(relatedGroomer0);
                }
            
                const relatedGroomer1 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const Booking1 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Booking1?.setGroomer)
                {
                    await
                    Booking1.
                    setGroomer(relatedGroomer1);
                }
            
                const relatedGroomer2 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const Booking2 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Booking2?.setGroomer)
                {
                    await
                    Booking2.
                    setGroomer(relatedGroomer2);
                }
            
                const relatedGroomer3 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const Booking3 = await Bookings.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Booking3?.setGroomer)
                {
                    await
                    Booking3.
                    setGroomer(relatedGroomer3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associatePembayaranWithBooking() {
            
                const relatedBooking0 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Pembayaran0 = await Pembayarans.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Pembayaran0?.setBooking)
                {
                    await
                    Pembayaran0.
                    setBooking(relatedBooking0);
                }
            
                const relatedBooking1 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Pembayaran1 = await Pembayarans.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Pembayaran1?.setBooking)
                {
                    await
                    Pembayaran1.
                    setBooking(relatedBooking1);
                }
            
                const relatedBooking2 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Pembayaran2 = await Pembayarans.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Pembayaran2?.setBooking)
                {
                    await
                    Pembayaran2.
                    setBooking(relatedBooking2);
                }
            
                const relatedBooking3 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Pembayaran3 = await Pembayarans.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Pembayaran3?.setBooking)
                {
                    await
                    Pembayaran3.
                    setBooking(relatedBooking3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateRiwayatGroomingWithBooking() {
            
                const relatedBooking0 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const RiwayatGrooming0 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (RiwayatGrooming0?.setBooking)
                {
                    await
                    RiwayatGrooming0.
                    setBooking(relatedBooking0);
                }
            
                const relatedBooking1 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const RiwayatGrooming1 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (RiwayatGrooming1?.setBooking)
                {
                    await
                    RiwayatGrooming1.
                    setBooking(relatedBooking1);
                }
            
                const relatedBooking2 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const RiwayatGrooming2 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (RiwayatGrooming2?.setBooking)
                {
                    await
                    RiwayatGrooming2.
                    setBooking(relatedBooking2);
                }
            
                const relatedBooking3 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const RiwayatGrooming3 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (RiwayatGrooming3?.setBooking)
                {
                    await
                    RiwayatGrooming3.
                    setBooking(relatedBooking3);
                }
            
        }
        
    
        
            
            async function associateRiwayatGroomingWithHewan() {
            
                const relatedHewan0 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const RiwayatGrooming0 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (RiwayatGrooming0?.setHewan)
                {
                    await
                    RiwayatGrooming0.
                    setHewan(relatedHewan0);
                }
            
                const relatedHewan1 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const RiwayatGrooming1 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (RiwayatGrooming1?.setHewan)
                {
                    await
                    RiwayatGrooming1.
                    setHewan(relatedHewan1);
                }
            
                const relatedHewan2 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const RiwayatGrooming2 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (RiwayatGrooming2?.setHewan)
                {
                    await
                    RiwayatGrooming2.
                    setHewan(relatedHewan2);
                }
            
                const relatedHewan3 = await Hewans.findOne({
                    offset: Math.floor(Math.random() * (await Hewans.count())),
                });
                const RiwayatGrooming3 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (RiwayatGrooming3?.setHewan)
                {
                    await
                    RiwayatGrooming3.
                    setHewan(relatedHewan3);
                }
            
        }
        
    
        
            
            async function associateRiwayatGroomingWithGroomer() {
            
                const relatedGroomer0 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const RiwayatGrooming0 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (RiwayatGrooming0?.setGroomer)
                {
                    await
                    RiwayatGrooming0.
                    setGroomer(relatedGroomer0);
                }
            
                const relatedGroomer1 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const RiwayatGrooming1 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (RiwayatGrooming1?.setGroomer)
                {
                    await
                    RiwayatGrooming1.
                    setGroomer(relatedGroomer1);
                }
            
                const relatedGroomer2 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const RiwayatGrooming2 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (RiwayatGrooming2?.setGroomer)
                {
                    await
                    RiwayatGrooming2.
                    setGroomer(relatedGroomer2);
                }
            
                const relatedGroomer3 = await Groomers.findOne({
                    offset: Math.floor(Math.random() * (await Groomers.count())),
                });
                const RiwayatGrooming3 = await RiwayatGroomings.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (RiwayatGrooming3?.setGroomer)
                {
                    await
                    RiwayatGrooming3.
                    setGroomer(relatedGroomer3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
            
            async function associateNotifikasiWithBooking() {
            
                const relatedBooking0 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Notifikasi0 = await Notifikasis.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Notifikasi0?.setBooking)
                {
                    await
                    Notifikasi0.
                    setBooking(relatedBooking0);
                }
            
                const relatedBooking1 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Notifikasi1 = await Notifikasis.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Notifikasi1?.setBooking)
                {
                    await
                    Notifikasi1.
                    setBooking(relatedBooking1);
                }
            
                const relatedBooking2 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Notifikasi2 = await Notifikasis.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Notifikasi2?.setBooking)
                {
                    await
                    Notifikasi2.
                    setBooking(relatedBooking2);
                }
            
                const relatedBooking3 = await Bookings.findOne({
                    offset: Math.floor(Math.random() * (await Bookings.count())),
                });
                const Notifikasi3 = await Notifikasis.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Notifikasi3?.setBooking)
                {
                    await
                    Notifikasi3.
                    setBooking(relatedBooking3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
            
            async function associateLogAktivitaWithUser() {
            
                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const LogAktivita0 = await LogAktivitas.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (LogAktivita0?.setUser)
                {
                    await
                    LogAktivita0.
                    setUser(relatedUser0);
                }
            
                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const LogAktivita1 = await LogAktivitas.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (LogAktivita1?.setUser)
                {
                    await
                    LogAktivita1.
                    setUser(relatedUser1);
                }
            
                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const LogAktivita2 = await LogAktivitas.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (LogAktivita2?.setUser)
                {
                    await
                    LogAktivita2.
                    setUser(relatedUser2);
                }
            
                const relatedUser3 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const LogAktivita3 = await LogAktivitas.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (LogAktivita3?.setUser)
                {
                    await
                    LogAktivita3.
                    setUser(relatedUser3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    


module.exports = {
    up: async (queryInterface, Sequelize) => {
        
            
            
            
            
            
                
                await Konsumens.bulkCreate(KonsumensData);
                
            
            
                
                await Groomers.bulkCreate(GroomersData);
                
            
            
                
                await Hewans.bulkCreate(HewansData);
                
            
            
                
                await Layanans.bulkCreate(LayanansData);
                
            
            
                
                await TarifUkurans.bulkCreate(TarifUkuransData);
                
            
            
                
                await JadwalGroomers.bulkCreate(JadwalGroomersData);
                
            
            
                
                await Bookings.bulkCreate(BookingsData);
                
            
            
                
                await Pembayarans.bulkCreate(PembayaransData);
                
            
            
                
                await RiwayatGroomings.bulkCreate(RiwayatGroomingsData);
                
            
            
                
                await Notifikasis.bulkCreate(NotifikasisData);
                
            
            
                
                await LogAktivitas.bulkCreate(LogAktivitasData);
                
            
            
                
                await SalonSettings.bulkCreate(SalonSettingsData);
                
            
            await Promise.all([
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                        // Similar logic for "relation_many"
                    
                
            
                
                
                
                
                    
                        
                        await associateKonsumenWithUser(),
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateGroomerWithUser(),
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateHewanWithKonsumen(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateTarifUkuranWithLayanan(),
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateJadwalGroomerWithGroomer(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                        
                        await associateBookingWithKonsumen(),
                    
                
                    
                        
                        await associateBookingWithHewan(),
                    
                
                    
                        
                        await associateBookingWithLayanan(),
                    
                
                    
                        
                        await associateBookingWithGroomer(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associatePembayaranWithBooking(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateRiwayatGroomingWithBooking(),
                    
                
                    
                        
                        await associateRiwayatGroomingWithHewan(),
                    
                
                    
                        
                        await associateRiwayatGroomingWithGroomer(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                        
                        await associateNotifikasiWithBooking(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                        
                        await associateLogAktivitaWithUser(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
            ]);
        
    },

    down: async (queryInterface, Sequelize) => {
        
            
            
            
            
            
            await queryInterface.bulkDelete('konsumens', null, {});
            
            
            await queryInterface.bulkDelete('groomers', null, {});
            
            
            await queryInterface.bulkDelete('hewans', null, {});
            
            
            await queryInterface.bulkDelete('layanans', null, {});
            
            
            await queryInterface.bulkDelete('tarif_ukurans', null, {});
            
            
            await queryInterface.bulkDelete('jadwal_groomers', null, {});
            
            
            await queryInterface.bulkDelete('bookings', null, {});
            
            
            await queryInterface.bulkDelete('pembayarans', null, {});
            
            
            await queryInterface.bulkDelete('riwayat_groomings', null, {});
            
            
            await queryInterface.bulkDelete('notifikasis', null, {});
            
            
            await queryInterface.bulkDelete('log_aktivitas', null, {});
            
            
            await queryInterface.bulkDelete('salon_settings', null, {});
            
        
    },
};