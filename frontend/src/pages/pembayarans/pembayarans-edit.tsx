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

import { update, fetch } from '../../stores/pembayarans/pembayaransSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditPembayaransPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    booking: null,
    

    
    
    

    

    

    

    

    

    

    

    
    metode: '',
    

    

    

    

    
    
    
    'jumlah_tagihan': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'jumlah_dibayar': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    status_pembayaran: '',
    

    

    

    

    
    
    

    

    

    

    

    
    dibayar_pada: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    
    bukti_bayar: [],
    

    

    

    
    
    

    

    

    

    

    
    diverifikasi_pada: new Date(),
    

    

    

    

    

    

    

    
    
    
    'diverifikasi_oleh': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    catatan_verifikasi: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { pembayarans } = useAppSelector((state) => state.pembayarans)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof pembayarans === 'object') {
      setInitialValues(pembayarans)
    }
  }, [pembayarans])

  useEffect(() => {
      if (typeof pembayarans === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (pembayarans)[el])
          setInitialValues(newInitialVal);
      }
  }, [pembayarans])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/pembayarans/pembayarans-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit pembayarans')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit pembayarans'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
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
    

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="MetodePembayaran" labelFor="metode">
        <Field name="metode" id="metode" component="select">
          
            <option value="cash">cash</option>
          
            <option value="transfer_bank">transfer_bank</option>
          
            <option value="e_wallet">e_wallet</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  
    <FormField
        label="JumlahTagihan"
    >
        <Field
            type="number"
            name="jumlah_tagihan"
            placeholder="JumlahTagihan"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="JumlahDibayar"
    >
        <Field
            type="number"
            name="jumlah_dibayar"
            placeholder="JumlahDibayar"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="StatusPembayaran" labelFor="status_pembayaran">
        <Field name="status_pembayaran" id="status_pembayaran" component="select">
          
            <option value="belum_bayar">belum_bayar</option>
          
            <option value="dp">dp</option>
          
            <option value="lunas">lunas</option>
          
            <option value="refund">refund</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="DibayarPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.dibayar_pada ?
                  new Date(
                      dayjs(initialValues.dibayar_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'dibayar_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    

  
        <FormField>
          <Field
            label='BuktiPembayaran'
            color='info'
            icon={mdiUpload}
            path={'pembayarans/bukti_bayar'}
            name='bukti_bayar'
            id='bukti_bayar'
            schema={{
                size: undefined,
                formats: undefined,
            }}
            component={FormFilePicker}
          ></Field>
        </FormField>
  



  

  

  

  

  

  
      <FormField
          label="DiverifikasiPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.diverifikasi_pada ?
                  new Date(
                      dayjs(initialValues.diverifikasi_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'diverifikasi_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  
    <FormField
        label="DiverifikasiOleh"
    >
        <Field
            name="diverifikasi_oleh"
            placeholder="DiverifikasiOleh"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="CatatanVerifikasi" hasTextareaHeight>
        <Field name="catatan_verifikasi" as="textarea" placeholder="CatatanVerifikasi" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/pembayarans/pembayarans-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditPembayaransPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_PEMBAYARANS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditPembayaransPage
