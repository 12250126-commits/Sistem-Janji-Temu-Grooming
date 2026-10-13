import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/pembayarans/pembayaransSlice'
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


const PembayaransView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { pembayarans } = useAppSelector((state) => state.pembayarans)
    

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
              <title>{getPageTitle('View pembayarans')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View pembayarans')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/pembayarans/pembayarans-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Booking</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{pembayarans?.booking?.kode_booking ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>MetodePembayaran</p>
                    <p>{pembayarans?.metode ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>JumlahTagihan</p>
                  <p>{pembayarans?.jumlah_tagihan || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>JumlahDibayar</p>
                  <p>{pembayarans?.jumlah_dibayar || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>StatusPembayaran</p>
                    <p>{pembayarans?.status_pembayaran ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='DibayarPada'>
                    {pembayarans.dibayar_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={pembayarans.dibayar_pada ?
                        new Date(
                          dayjs(pembayarans.dibayar_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DibayarPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>BuktiPembayaran</p>
                    {pembayarans?.bukti_bayar?.length
                      ? dataFormatter.filesFormatter(pembayarans.bukti_bayar).map(link => (
                        <button
                          key={link.publicUrl}
                          onClick={(e) => saveFile(e, link.publicUrl, link.name)}
                        >
                            {link.name}
                        </button>
                      )) : <p>No BuktiPembayaran</p>
                    }
                </div>
              
              

              

              

              

              

              

              
                <FormField label='DiverifikasiPada'>
                    {pembayarans.diverifikasi_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={pembayarans.diverifikasi_pada ?
                        new Date(
                          dayjs(pembayarans.diverifikasi_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DiverifikasiPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>DiverifikasiOleh</p>
                    <p>{pembayarans?.diverifikasi_oleh}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={pembayarans?.catatan_verifikasi} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/pembayarans/pembayarans-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

PembayaransView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_PEMBAYARANS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default PembayaransView;