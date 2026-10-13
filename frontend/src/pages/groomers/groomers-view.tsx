import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/groomers/groomersSlice'
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


const GroomersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { groomers } = useAppSelector((state) => state.groomers)
    

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
              <title>{getPageTitle('View groomers')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View groomers')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/groomers/groomers-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>AkunPengguna</p>
                    
                    
                        <p>{groomers?.user?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>KodeGroomer</p>
                    <p>{groomers?.kode_groomer}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>NamaTampilan</p>
                    <p>{groomers?.nama_tampilan}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={groomers?.bio_singkat} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Aktif'>
                    <SwitchField
                      field={{name: 'is_active', value: groomers?.is_active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Jadwal_groomers Groomer</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>Hari</th>
                                
                                
                                
                                <th>JamMulai(HH:MM)</th>
                                
                                
                                
                                <th>JamSelesai(HH:MM)</th>
                                
                                
                                
                                <th>JamIstirahatMulai(HH:MM)</th>
                                
                                
                                
                                <th>JamIstirahatSelesai(HH:MM)</th>
                                
                                
                                
                                <th>KapasitasSlot</th>
                                
                                
                                
                                <th>Aktif</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {groomers.jadwal_groomers_groomer && Array.isArray(groomers.jadwal_groomers_groomer) &&
                              groomers.jadwal_groomers_groomer.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/jadwal_groomers/jadwal_groomers-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="hari">
                                        { item.hari }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jam_mulai">
                                        { item.jam_mulai }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jam_selesai">
                                        { item.jam_selesai }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jam_istirahat_mulai">
                                        { item.jam_istirahat_mulai }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jam_istirahat_selesai">
                                        { item.jam_istirahat_selesai }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="kapasitas_slot">
                                        { item.kapasitas_slot }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_active">
                                        { dataFormatter.booleanFormatter(item.is_active) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!groomers?.jadwal_groomers_groomer?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Bookings Groomer</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                <th>KodeBooking</th>
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>WaktuMulai</th>
                                
                                
                                
                                <th>WaktuSelesai</th>
                                
                                
                                
                                <th>Durasi(menit)</th>
                                
                                
                                
                                <th>HargaDasar(snapshot)</th>
                                
                                
                                
                                <th>TarifUkuran(snapshot)</th>
                                
                                
                                
                                <th>TotalBiaya</th>
                                
                                
                                
                                <th>StatusBooking</th>
                                
                                
                                
                                <th>StatusDiubahPada</th>
                                
                                
                                
                                <th>StatusDiubahOleh</th>
                                
                                
                                
                                <th>CatatanKonsumen</th>
                                
                                
                                
                                <th>CatatanAdmin</th>
                                
                                
                                
                                <th>DibatalkanPada</th>
                                
                                
                                
                                <th>AlasanBatal</th>
                                
                                
                                
                                <th>ButuhPenjadwalanUlang</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {groomers.bookings_groomer && Array.isArray(groomers.bookings_groomer) &&
                              groomers.bookings_groomer.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/bookings/bookings-view/?id=${item.id}`)}>
                                    
                                    
                                    <td data-label="kode_booking">
                                        { item.kode_booking }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="waktu_mulai">
                                        { dataFormatter.dateTimeFormatter(item.waktu_mulai) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="waktu_selesai">
                                        { dataFormatter.dateTimeFormatter(item.waktu_selesai) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="durasi_menit">
                                        { item.durasi_menit }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="harga_dasar_snapshot">
                                        { item.harga_dasar_snapshot }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="tarif_ukuran_snapshot">
                                        { item.tarif_ukuran_snapshot }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="total_biaya">
                                        { item.total_biaya }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status_booking">
                                        { item.status_booking }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status_diubah_pada">
                                        { dataFormatter.dateTimeFormatter(item.status_diubah_pada) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status_diubah_oleh">
                                        { item.status_diubah_oleh }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="catatan_konsumen">
                                        { item.catatan_konsumen }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="catatan_admin">
                                        { item.catatan_admin }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="dibatalkan_pada">
                                        { dataFormatter.dateTimeFormatter(item.dibatalkan_pada) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="alasan_batal">
                                        { item.alasan_batal }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="butuh_reschedule">
                                        { dataFormatter.booleanFormatter(item.butuh_reschedule) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!groomers?.bookings_groomer?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Riwayat_groomings Groomer</p>
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
                            {groomers.riwayat_groomings_groomer && Array.isArray(groomers.riwayat_groomings_groomer) &&
                              groomers.riwayat_groomings_groomer.map((item: any) => (
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
                        {!groomers?.riwayat_groomings_groomer?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/groomers/groomers-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

GroomersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_GROOMERS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default GroomersView;