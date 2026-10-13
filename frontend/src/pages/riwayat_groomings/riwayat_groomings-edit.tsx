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

import { update, fetch } from '../../stores/riwayat_groomings/riwayat_groomingsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditRiwayat_groomingsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    booking: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    hewan: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    groomer: null,
    

    
    
    

    

    

    

    

    
    mulai_pada: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    selesai_pada: new Date(),
    

    

    

    

    

    

    

    
    
    
    'berat_kg_setelah': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    kondisi_setelah: '',
    

    

    

    

    
    
    

    
    catatan_tindakan: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    catatan_kondisi: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    
    foto_setelah: [],
    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { riwayat_groomings } = useAppSelector((state) => state.riwayat_groomings)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof riwayat_groomings === 'object') {
      setInitialValues(riwayat_groomings)
    }
  }, [riwayat_groomings])

  useEffect(() => {
      if (typeof riwayat_groomings === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (riwayat_groomings)[el])
          setInitialValues(newInitialVal);
      }
  }, [riwayat_groomings])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/riwayat_groomings/riwayat_groomings-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit riwayat_groomings')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit riwayat_groomings'} main>
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
          label="MulaiPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.mulai_pada ?
                  new Date(
                      dayjs(initialValues.mulai_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'mulai_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="SelesaiPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.selesai_pada ?
                  new Date(
                      dayjs(initialValues.selesai_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'selesai_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="BeratSetelah(kg)"
    >
        <Field
            type="number"
            name="berat_kg_setelah"
            placeholder="BeratSetelah(kg)"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="KondisiSetelah" labelFor="kondisi_setelah">
        <Field name="kondisi_setelah" id="kondisi_setelah" component="select">
          
            <option value="baik">baik</option>
          
            <option value="butuh_perhatian">butuh_perhatian</option>
          
            <option value="darurat">darurat</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  
    <FormField label="CatatanTindakan" hasTextareaHeight>
        <Field name="catatan_tindakan" as="textarea" placeholder="CatatanTindakan" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="CatatanKondisi" hasTextareaHeight>
        <Field name="catatan_kondisi" as="textarea" placeholder="CatatanKondisi" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    
        <FormField>
            <Field
                label='FotoSetelah'
                color='info'
                icon={mdiUpload}
                path={'riwayat_groomings/foto_setelah'}
                name='foto_setelah'
                id='foto_setelah'
                schema={{
                    size: undefined,
                    formats: undefined,
                }}
                component={FormImagePicker}
            ></Field>
        </FormField>
    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/riwayat_groomings/riwayat_groomings-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditRiwayat_groomingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_RIWAYAT_GROOMINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditRiwayat_groomingsPage
