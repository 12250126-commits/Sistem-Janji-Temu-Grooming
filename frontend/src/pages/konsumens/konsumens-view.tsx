import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/konsumens/konsumensSlice'
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


const KonsumensView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { konsumens } = useAppSelector((state) => state.konsumens)
    

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
              <title>{getPageTitle('View konsumens')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View konsumens')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/konsumens/konsumens-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>AkunPengguna</p>
                    
                    
                        <p>{konsumens?.user?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>KodeKonsumen</p>
                    <p>{konsumens?.kode_konsumen}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={konsumens?.alamat} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='SetujuTerimaNotifikasiWhatsApp'>
                    <SwitchField
                      field={{name: 'wa_opt_in', value: konsumens?.wa_opt_in}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Hewans Pemilik</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>NamaHewan</th>
                                
                                
                                
                                <th>Jenis</th>
                                
                                
                                
                                <th>Ras</th>
                                
                                
                                
                                <th>Ukuran</th>
                                
                                
                                
                                <th>Umur(bulan)</th>
                                
                                
                                
                                <th>Berat(kg)</th>
                                
                                
                                
                                <th>CatatanKhusus</th>
                                
                                
                                
                                
                                
                                <th>Aktif</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {konsumens.hewans_konsumen && Array.isArray(konsumens.hewans_konsumen) &&
                              konsumens.hewans_konsumen.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/hewans/hewans-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="nama">
                                        { item.nama }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="jenis">
                                        { item.jenis }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="ras">
                                        { item.ras }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="ukuran">
                                        { item.ukuran }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="umur_bulan">
                                        { item.umur_bulan }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="berat_kg">
                                        { item.berat_kg }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="catatan_khusus">
                                        { item.catatan_khusus }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="is_active">
                                        { dataFormatter.booleanFormatter(item.is_active) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!konsumens?.hewans_konsumen?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Bookings Konsumen</p>
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
                            {konsumens.bookings_konsumen && Array.isArray(konsumens.bookings_konsumen) &&
                              konsumens.bookings_konsumen.map((item: any) => (
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
                        {!konsumens?.bookings_konsumen?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/konsumens/konsumens-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

KonsumensView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_KONSUMENS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default KonsumensView;