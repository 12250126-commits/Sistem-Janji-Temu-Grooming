import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/hewans/hewansSlice'
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


const HewansView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { hewans } = useAppSelector((state) => state.hewans)
    

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
              <title>{getPageTitle('View hewans')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View hewans')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/hewans/hewans-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Pemilik</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{hewans?.konsumen?.kode_konsumen ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>NamaHewan</p>
                    <p>{hewans?.nama}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Jenis</p>
                    <p>{hewans?.jenis ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Ras</p>
                    <p>{hewans?.ras}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Ukuran</p>
                    <p>{hewans?.ukuran ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Umur(bulan)</p>
                  <p>{hewans?.umur_bulan || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Berat(kg)</p>
                  <p>{hewans?.berat_kg || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={hewans?.catatan_khusus} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>FotoHewan</p>
                    {hewans?.foto?.length
                      ? (
                        <ImageField
                          name={'foto'}
                          image={hewans?.foto}
                          className='w-20 h-20'
                        />
                      ) : <p>No FotoHewan</p>
                    }
                </div>
              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Aktif'>
                    <SwitchField
                      field={{name: 'is_active', value: hewans?.is_active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Bookings Hewan</p>
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
                            {hewans.bookings_hewan && Array.isArray(hewans.bookings_hewan) &&
                              hewans.bookings_hewan.map((item: any) => (
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
                        {!hewans?.bookings_hewan?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Riwayat_groomings Hewan</p>
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
                            {hewans.riwayat_groomings_hewan && Array.isArray(hewans.riwayat_groomings_hewan) &&
                              hewans.riwayat_groomings_hewan.map((item: any) => (
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
                        {!hewans?.riwayat_groomings_hewan?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/hewans/hewans-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

HewansView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_HEWANS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default HewansView;