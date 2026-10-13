import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/riwayat_groomings/riwayat_groomingsSlice'
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


const Riwayat_groomingsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { riwayat_groomings } = useAppSelector((state) => state.riwayat_groomings)
    

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
              <title>{getPageTitle('View riwayat_groomings')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View riwayat_groomings')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/riwayat_groomings/riwayat_groomings-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Booking</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{riwayat_groomings?.booking?.kode_booking ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Hewan</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{riwayat_groomings?.hewan?.nama ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Groomer</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{riwayat_groomings?.groomer?.nama_tampilan ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              
                <FormField label='MulaiPada'>
                    {riwayat_groomings.mulai_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={riwayat_groomings.mulai_pada ?
                        new Date(
                          dayjs(riwayat_groomings.mulai_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No MulaiPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='SelesaiPada'>
                    {riwayat_groomings.selesai_pada ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={riwayat_groomings.selesai_pada ?
                        new Date(
                          dayjs(riwayat_groomings.selesai_pada).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No SelesaiPada</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>BeratSetelah(kg)</p>
                  <p>{riwayat_groomings?.berat_kg_setelah || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>KondisiSetelah</p>
                    <p>{riwayat_groomings?.kondisi_setelah ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={riwayat_groomings?.catatan_tindakan} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={riwayat_groomings?.catatan_kondisi} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>FotoSetelah</p>
                    {riwayat_groomings?.foto_setelah?.length
                      ? (
                        <ImageField
                          name={'foto_setelah'}
                          image={riwayat_groomings?.foto_setelah}
                          className='w-20 h-20'
                        />
                      ) : <p>No FotoSetelah</p>
                    }
                </div>
              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/riwayat_groomings/riwayat_groomings-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Riwayat_groomingsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_RIWAYAT_GROOMINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default Riwayat_groomingsView;