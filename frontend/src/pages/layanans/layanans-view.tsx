import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/layanans/layanansSlice'
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


const LayanansView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { layanans } = useAppSelector((state) => state.layanans)
    

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
              <title>{getPageTitle('View layanans')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View layanans')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/layanans/layanans-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>KodeLayanan</p>
                    <p>{layanans?.kode_layanan}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>NamaLayanan</p>
                    <p>{layanans?.nama}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Deskripsi</p>
                  {layanans.deskripsi
                    ? <p dangerouslySetInnerHTML={{__html: layanans.deskripsi}}/>
                    : <p>No data</p>
                  }
                </div>
              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Durasi(menit)</p>
                  <p>{layanans?.durasi_menit || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>HargaDasar</p>
                  <p>{layanans?.harga_dasar || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Aktif'>
                    <SwitchField
                      field={{name: 'is_active', value: layanans?.is_active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Tarif_ukurans Layanan</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>UkuranHewan</th>
                                
                                
                                
                                <th>TarifTambahan</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {layanans.tarif_ukurans_layanan && Array.isArray(layanans.tarif_ukurans_layanan) &&
                              layanans.tarif_ukurans_layanan.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/tarif_ukurans/tarif_ukurans-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="ukuran_hewan">
                                        { item.ukuran_hewan }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="tarif_tambahan">
                                        { item.tarif_tambahan }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!layanans?.tarif_ukurans_layanan?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Bookings Layanan</p>
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
                            {layanans.bookings_layanan && Array.isArray(layanans.bookings_layanan) &&
                              layanans.bookings_layanan.map((item: any) => (
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
                        {!layanans?.bookings_layanan?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/layanans/layanans-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

LayanansView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_LAYANANS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default LayanansView;