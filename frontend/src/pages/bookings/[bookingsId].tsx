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

import { update, fetch } from '../../stores/bookings/bookingsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditBookings = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'kode_booking': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    konsumen: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    hewan: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    layanan: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    groomer: null,
    

    
    
    

    

    

    

    

    
    waktu_mulai: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    waktu_selesai: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    
    durasi_menit: '',
    

    

    

    

    

    

    

    

    

    
    
    
    'harga_dasar_snapshot': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'tarif_ukuran_snapshot': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'total_biaya': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    status_booking: '',
    

    

    

    

    
    
    

    

    

    

    

    
    status_diubah_pada: new Date(),
    

    

    

    

    

    

    

    
    
    
    'status_diubah_oleh': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    catatan_konsumen: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    catatan_admin: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    dibatalkan_pada: new Date(),
    

    

    

    

    

    

    

    
    
    

    
    alasan_batal: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    butuh_reschedule: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { bookings } = useAppSelector((state) => state.bookings)
  

  const { bookingsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: bookingsId }))
  }, [bookingsId])

  useEffect(() => {
    if (typeof bookings === 'object') {
      setInitialValues(bookings)
    }
  }, [bookings])

  useEffect(() => {
      if (typeof bookings === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (bookings)[el])

          setInitialValues(newInitialVal);
      }
  }, [bookings])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: bookingsId, data }))
    await router.push('/bookings/bookings-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit bookings')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit bookings'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  
    <FormField
        label="KodeBooking"
    >
        <Field
            name="kode_booking"
            placeholder="KodeBooking"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Konsumen' labelFor='konsumen'>
        <Field
            name='konsumen'
            id='konsumen'
            component={SelectField}
            options={initialValues.konsumen}
            itemRef={'konsumens'}
      
        
      
        
      
        
      
        
            showField={'kode_konsumen'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Hewan' labelFor='hewan'>
        <Field
            name='hewan'
            id='hewan'
            component={SelectField}
            options={initialValues.hewan}
            itemRef={'hewans'}
      
        
      
        
      
        
      
        
      
        
      
        
            showField={'nama'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Layanan' labelFor='layanan'>
        <Field
            name='layanan'
            id='layanan'
            component={SelectField}
            options={initialValues.layanan}
            itemRef={'layanans'}
      
        
      
        
      
        
      
        
      
        
      
        
      
        
            showField={'nama'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Groomer' labelFor='groomer'>
        <Field
            name='groomer'
            id='groomer'
            component={SelectField}
            options={initialValues.groomer}
            itemRef={'groomers'}
      
        
      
        
      
        
      
        
      
        
            showField={'nama_tampilan'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="WaktuMulai"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.waktu_mulai ?
                  new Date(
                      dayjs(initialValues.waktu_mulai).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'waktu_mulai': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="WaktuSelesai"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.waktu_selesai ?
                  new Date(
                      dayjs(initialValues.waktu_selesai).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'waktu_selesai': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="Durasi(menit)"
    >
        <Field
            type="number"
            name="durasi_menit"
            placeholder="Durasi(menit)"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="HargaDasar(snapshot)"
    >
        <Field
            type="number"
            name="harga_dasar_snapshot"
            placeholder="HargaDasar(snapshot)"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="TarifUkuran(snapshot)"
    >
        <Field
            type="number"
            name="tarif_ukuran_snapshot"
            placeholder="TarifUkuran(snapshot)"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="TotalBiaya"
    >
        <Field
            type="number"
            name="total_biaya"
            placeholder="TotalBiaya"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="StatusBooking" labelFor="status_booking">
        <Field name="status_booking" id="status_booking" component="select">
          
            <option value="pending">pending</option>
          
            <option value="confirmed">confirmed</option>
          
            <option value="on_progress">on_progress</option>
          
            <option value="done">done</option>
          
            <option value="cancelled">cancelled</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="StatusDiubahPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.status_diubah_pada ?
                  new Date(
                      dayjs(initialValues.status_diubah_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'status_diubah_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  
    <FormField
        label="StatusDiubahOleh"
    >
        <Field
            name="status_diubah_oleh"
            placeholder="StatusDiubahOleh"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="CatatanKonsumen" hasTextareaHeight>
        <Field name="catatan_konsumen" as="textarea" placeholder="CatatanKonsumen" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="CatatanAdmin" hasTextareaHeight>
        <Field name="catatan_admin" as="textarea" placeholder="CatatanAdmin" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="DibatalkanPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.dibatalkan_pada ?
                  new Date(
                      dayjs(initialValues.dibatalkan_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'dibatalkan_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  
    <FormField label="AlasanBatal" hasTextareaHeight>
        <Field name="alasan_batal" as="textarea" placeholder="AlasanBatal" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='ButuhPenjadwalanUlang' labelFor='butuh_reschedule'>
        <Field
            name='butuh_reschedule'
            id='butuh_reschedule'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/bookings/bookings-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditBookings.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_BOOKINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditBookings
