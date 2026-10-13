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

import { update, fetch } from '../../stores/log_aktivitas/log_aktivitasSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditLog_aktivitas = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    user: null,
    

    
    
    
    'aksi': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'entitas': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'kunci_entitas': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    deskripsi: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'ip_address': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    user_agent: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    terjadi_pada: new Date(),
    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { log_aktivitas } = useAppSelector((state) => state.log_aktivitas)
  

  const { log_aktivitasId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: log_aktivitasId }))
  }, [log_aktivitasId])

  useEffect(() => {
    if (typeof log_aktivitas === 'object') {
      setInitialValues(log_aktivitas)
    }
  }, [log_aktivitas])

  useEffect(() => {
      if (typeof log_aktivitas === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (log_aktivitas)[el])

          setInitialValues(newInitialVal);
      }
  }, [log_aktivitas])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: log_aktivitasId, data }))
    await router.push('/log_aktivitas/log_aktivitas-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit log_aktivitas')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit log_aktivitas'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Pengguna' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}
      
        
            showField={'firstName'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  
    <FormField
        label="Aksi"
    >
        <Field
            name="aksi"
            placeholder="Aksi"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="Entitas"
    >
        <Field
            name="entitas"
            placeholder="Entitas"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="KunciEntitas"
    >
        <Field
            name="kunci_entitas"
            placeholder="KunciEntitas"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="Deskripsi" hasTextareaHeight>
        <Field name="deskripsi" as="textarea" placeholder="Deskripsi" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="IPAddress"
    >
        <Field
            name="ip_address"
            placeholder="IPAddress"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="UserAgent" hasTextareaHeight>
        <Field name="user_agent" as="textarea" placeholder="UserAgent" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="TerjadiPada"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.terjadi_pada ?
                  new Date(
                      dayjs(initialValues.terjadi_pada).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'terjadi_pada': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/log_aktivitas/log_aktivitas-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditLog_aktivitas.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_LOG_AKTIVITAS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditLog_aktivitas
