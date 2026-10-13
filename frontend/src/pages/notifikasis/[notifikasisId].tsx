import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import FormFilePicker from '../../components/FormFilePicker'
import FormImagePicker from '../../components/FormImagePicker'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/notifikasis/notifikasisSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditNotifikasis = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    
    channel: '',
    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    jenis: '',
    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    booking: null,
    

    
    
    
    'tujuan': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    pesan: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    status_kirim: '',
    

    

    

    

    
    
    

    

    

    

    

    
    dijadwalkan_pada: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    dikirim_pada: new Date(),
    

    

    

    

    

    

    

    
    
    
    'provider': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'provider_message_ref': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    response_raw: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    
    retry_count: '',
    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { notifikasis } = useAppSelector((state) => state.notifikasis)
  

  const { notifikasisId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: notifikasisId }))
  }, [notifikasisId])

  useEffect(() => {
    if (typeof notifikasis === 'object') {
      setInitialValues(notifikasis)
    }
  }, [notifikasis])

  useEffect(() => {
      if (typeof notifikasis === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (notifikasis)[el])

          setInitialValues(newInitialVal);
      }
  }, [notifikasis])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: notifikasisId, data }))
    await router.push('/notifikasis/notifikasis-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit notifikasis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit notifikasis'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  
    <FormField label="Channel" labelFor="channel">
        <Field name="channel" id="channel" component="select">
          
            <option value="whatsapp">whatsapp</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="JenisNotifikasi" labelFor="jenis">
        <Field name="jenis" id="jenis" component="select">
          
            <option value="booking_baru">booking_baru</option>
          
            <option value="booking_dikonfirmasi">booking_dikonfirmasi</option>
          
            <option value="booking_ditolak">booking_ditolak</option>
          
            <option value="perubahan_jadwal">perubahan_jadwal</option>
          
            <option value="pembatalan">pembatalan</option>
          
            <option value="pengingat_h1">pengingat_h1</option>
          
            <option value="pengingat_h2">pengingat_h2</option>
          
            <option value="grooming_selesai">grooming_selesai</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Booking' labelFor='booking'>
        <Field
            name='booking'
            id='booking'
            component={SelectField}
            options={initialValues.booking}
            itemRef={'bookings'}
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
            showField={'kode_booking'}
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  
    <FormField
        label="NomorTujuan"
    >
        <Field
            name="tujuan"
            placeholder="NomorTujuan"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="Pesan" hasTextareaHeight>
        <Field name="pesan" as="textarea" placeholder="Pesan" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="StatusKirim" labelFor="status_kirim">
        <Field name="status_kirim" id="status_kirim" component="select">
          
            <option value="queued">queued</option>
          
            <option value="sent">sent</option>
          
            <option value="failed">failed</option>
          
            <option value="skipped">skipped</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="DijadwalkanPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.dijadwalkan_pada ?
                  new Date(
                      dayjs(initialValues.dijadwalkan_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'dijadwalkan_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="DikirimPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.dikirim_pada ?
                  new Date(
                      dayjs(initialValues.dikirim_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'dikirim_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  
    <FormField
        label="Provider"
    >
        <Field
            name="provider"
            placeholder="Provider"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="ReferensiPesanProvider"
    >
        <Field
            name="provider_message_ref"
            placeholder="ReferensiPesanProvider"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="ResponseRaw" hasTextareaHeight>
        <Field name="response_raw" as="textarea" placeholder="ResponseRaw" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="JumlahPercobaan"
    >
        <Field
            type="number"
            name="retry_count"
            placeholder="JumlahPercobaan"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/notifikasis/notifikasis-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditNotifikasis.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_NOTIFIKASIS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditNotifikasis
