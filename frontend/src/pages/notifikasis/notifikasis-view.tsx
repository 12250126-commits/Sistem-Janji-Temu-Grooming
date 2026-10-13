import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/notifikasis/notifikasisSlice'
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


const NotifikasisView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { notifikasis } = useAppSelector((state) => state.notifikasis)
    

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
              <title>{getPageTitle('View notifikasis')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View notifikasis')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/notifikasis/notifikasis-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Channel</p>
                    <p>{notifikasis?.channel ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>JenisNotifikasi</p>
                    <p>{notifikasis?.jenis ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Booking</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{notifikasis?.booking?.kode_booking ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>NomorTujuan</p>
                    <p>{notifikasis?.tujuan}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={notifikasis?.pesan} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>StatusKirim</p>
                    <p>{notifikasis?.status_kirim ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='DijadwalkanPada'>
                    {notifikasis.dijadwalkan_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={notifikasis.dijadwalkan_pada ?
                        new Date(
                          dayjs(notifikasis.dijadwalkan_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DijadwalkanPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='DikirimPada'>
                    {notifikasis.dikirim_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={notifikasis.dikirim_pada ?
                        new Date(
                          dayjs(notifikasis.dikirim_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DikirimPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Provider</p>
                    <p>{notifikasis?.provider}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ReferensiPesanProvider</p>
                    <p>{notifikasis?.provider_message_ref}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={notifikasis?.response_raw} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>JumlahPercobaan</p>
                  <p>{notifikasis?.retry_count || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/notifikasis/notifikasis-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

NotifikasisView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_NOTIFIKASIS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default NotifikasisView;