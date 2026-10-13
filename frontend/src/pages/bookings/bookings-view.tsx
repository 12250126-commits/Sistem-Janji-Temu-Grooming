import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/bookings/bookingsSlice'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";


const BookingsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { bookings } = useAppSelector((state) => state.bookings)
    

    const { id } = router.query;
    
    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);


    return (
      <>
          <Head>
              <title>{getPageTitle('View bookings')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View bookings')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/bookings/bookings-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>KodeBooking</p>
                    <p>{bookings?.kode_booking}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Konsumen</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{bookings?.konsumen?.kode_konsumen ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Hewan</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{bookings?.hewan?.nama ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Layanan</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{bookings?.layanan?.nama ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Groomer</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{bookings?.groomer?.nama_tampilan ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              
                <FormField label='WaktuMulai'>
                    {bookings.waktu_mulai ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={bookings.waktu_mulai ?
                        new Date(
                          dayjs(bookings.waktu_mulai).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No WaktuMulai</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='WaktuSelesai'>
                    {bookings.waktu_selesai ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={bookings.waktu_selesai ?
                        new Date(
                          dayjs(bookings.waktu_selesai).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No WaktuSelesai</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Durasi(menit)</p>
                  <p>{bookings?.durasi_menit || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>HargaDasar(snapshot)</p>
                  <p>{bookings?.harga_dasar_snapshot || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>TarifUkuran(snapshot)</p>
                  <p>{bookings?.tarif_ukuran_snapshot || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>TotalBiaya</p>
                  <p>{bookings?.total_biaya || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>StatusBooking</p>
                    <p>{bookings?.status_booking ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='StatusDiubahPada'>
                    {bookings.status_diubah_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={bookings.status_diubah_pada ?
                        new Date(
                          dayjs(bookings.status_diubah_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No StatusDiubahPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>StatusDiubahOleh</p>
                    <p>{bookings?.status_diubah_oleh}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={bookings?.catatan_konsumen} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={bookings?.catatan_admin} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='DibatalkanPada'>
                    {bookings.dibatalkan_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={bookings.dibatalkan_pada ?
                        new Date(
                          dayjs(bookings.dibatalkan_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DibatalkanPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={bookings?.alasan_batal} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='ButuhPenjadwalanUlang'>
                    <SwitchField
                      field={{name: 'butuh_reschedule', value: bookings?.butuh_reschedule}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Pembayarans Booking</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>MetodePembayaran</th>
                                
                                
                                
                                <th>JumlahTagihan</th>
                                
                                
                                
                                <th>JumlahDibayar</th>
                                
                                
                                
                                <th>StatusPembayaran</th>
                                
                                
                                
                                <th>DibayarPada</th>
                                
                                
                                
                                
                                
                                <th>DiverifikasiPada</th>
                                
                                
                                
                                <th>DiverifikasiOleh</th>
                                
                                
                                
                                <th>CatatanVerifikasi</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {bookings.pembayarans_booking && Array.isArray(bookings.pembayarans_booking) &&
                              bookings.pembayarans_booking.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/pembayarans/pembayarans-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="metode">
                                        { item.metode }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jumlah_tagihan">
                                        { item.jumlah_tagihan }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jumlah_dibayar">
                                        { item.jumlah_dibayar }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status_pembayaran">
                                        { item.status_pembayaran }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="dibayar_pada">
                                        { dataFormatter.dateTimeFormatter(item.dibayar_pada) }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="diverifikasi_pada">
                                        { dataFormatter.dateTimeFormatter(item.diverifikasi_pada) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="diverifikasi_oleh">
                                        { item.diverifikasi_oleh }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="catatan_verifikasi">
                                        { item.catatan_verifikasi }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!bookings?.pembayarans_booking?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Riwayat_groomings Booking</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>MulaiPada</th>
                                
                                
                                
                                <th>SelesaiPada</th>
                                
                                
                                
                                <th>BeratSetelah(kg)</th>
                                
                                
                                
                                <th>KondisiSetelah</th>
                                
                                
                                
                                <th>CatatanTindakan</th>
                                
                                
                                
                                <th>CatatanKondisi</th>
                                
                                
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {bookings.riwayat_groomings_booking && Array.isArray(bookings.riwayat_groomings_booking) &&
                              bookings.riwayat_groomings_booking.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/riwayat_groomings/riwayat_groomings-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="mulai_pada">
                                        { dataFormatter.dateTimeFormatter(item.mulai_pada) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="selesai_pada">
                                        { dataFormatter.dateTimeFormatter(item.selesai_pada) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="berat_kg_setelah">
                                        { item.berat_kg_setelah }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="kondisi_setelah">
                                        { item.kondisi_setelah }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="catatan_tindakan">
                                        { item.catatan_tindakan }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="catatan_kondisi">
                                        { item.catatan_kondisi }
                                    </td>
                                    
                                    
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!bookings?.riwayat_groomings_booking?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Notifikasis Booking</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                <th>Channel</th>
                                
                                
                                
                                <th>JenisNotifikasi</th>
                                
                                
                                
                                
                                
                                <th>NomorTujuan</th>
                                
                                
                                
                                <th>Pesan</th>
                                
                                
                                
                                <th>StatusKirim</th>
                                
                                
                                
                                <th>DijadwalkanPada</th>
                                
                                
                                
                                <th>DikirimPada</th>
                                
                                
                                
                                <th>Provider</th>
                                
                                
                                
                                <th>ReferensiPesanProvider</th>
                                
                                
                                
                                <th>ResponseRaw</th>
                                
                                
                                
                                <th>JumlahPercobaan</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {bookings.notifikasis_booking && Array.isArray(bookings.notifikasis_booking) &&
                              bookings.notifikasis_booking.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/notifikasis/notifikasis-view/?id=${item.id}`)}>
                                    
                                    
                                    <td data-label="channel">
                                        { item.channel }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jenis">
                                        { item.jenis }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="tujuan">
                                        { item.tujuan }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="pesan">
                                        { item.pesan }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status_kirim">
                                        { item.status_kirim }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="dijadwalkan_pada">
                                        { dataFormatter.dateTimeFormatter(item.dijadwalkan_pada) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="dikirim_pada">
                                        { dataFormatter.dateTimeFormatter(item.dikirim_pada) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="provider">
                                        { item.provider }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="provider_message_ref">
                                        { item.provider_message_ref }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="response_raw">
                                        { item.response_raw }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="retry_count">
                                        { item.retry_count }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!bookings?.notifikasis_booking?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/bookings/bookings-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

BookingsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_BOOKINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default BookingsView;