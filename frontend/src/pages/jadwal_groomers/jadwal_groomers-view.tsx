import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/jadwal_groomers/jadwal_groomersSlice'
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


const Jadwal_groomersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { jadwal_groomers } = useAppSelector((state) => state.jadwal_groomers)
    

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
              <title>{getPageTitle('View jadwal_groomers')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View jadwal_groomers')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/jadwal_groomers/jadwal_groomers-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Groomer</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{jadwal_groomers?.groomer?.nama_tampilan ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Hari</p>
                    <p>{jadwal_groomers?.hari ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>JamMulai(HH:MM)</p>
                    <p>{jadwal_groomers?.jam_mulai}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>JamSelesai(HH:MM)</p>
                    <p>{jadwal_groomers?.jam_selesai}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>JamIstirahatMulai(HH:MM)</p>
                    <p>{jadwal_groomers?.jam_istirahat_mulai}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>JamIstirahatSelesai(HH:MM)</p>
                    <p>{jadwal_groomers?.jam_istirahat_selesai}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>KapasitasSlot</p>
                  <p>{jadwal_groomers?.kapasitas_slot || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Aktif'>
                    <SwitchField
                      field={{name: 'is_active', value: jadwal_groomers?.is_active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/jadwal_groomers/jadwal_groomers-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Jadwal_groomersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_JADWAL_GROOMERS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default Jadwal_groomersView;