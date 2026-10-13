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

import { update, fetch } from '../../stores/salon_settings/salon_settingsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditSalon_settingsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'nama_salon': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    alamat_salon: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'nomor_whatsapp_salon': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'email_salon': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    jam_operasional: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    
    catatan_kebijakan: '',
    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    
    logo: [],
    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { salon_settings } = useAppSelector((state) => state.salon_settings)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof salon_settings === 'object') {
      setInitialValues(salon_settings)
    }
  }, [salon_settings])

  useEffect(() => {
      if (typeof salon_settings === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (salon_settings)[el])
          setInitialValues(newInitialVal);
      }
  }, [salon_settings])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/salon_settings/salon_settings-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit salon_settings')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit salon_settings'} main>
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
        label="NamaSalon"
    >
        <Field
            name="nama_salon"
            placeholder="NamaSalon"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="AlamatSalon" hasTextareaHeight>
        <Field name="alamat_salon" as="textarea" placeholder="AlamatSalon" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="NomorWhatsAppSalon"
    >
        <Field
            name="nomor_whatsapp_salon"
            placeholder="NomorWhatsAppSalon"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="EmailSalon"
    >
        <Field
            name="email_salon"
            placeholder="EmailSalon"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="JamOperasional" hasTextareaHeight>
        <Field name="jam_operasional" as="textarea" placeholder="JamOperasional" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  
    <FormField label='KebijakanPembatalandanReschedule' hasTextareaHeight>
        <Field
            name='catatan_kebijakan'
            id='catatan_kebijakan'
            component={RichTextField}
        ></Field>
    </FormField>
  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    
        <FormField>
            <Field
                label='Logo'
                color='info'
                icon={mdiUpload}
                path={'salon_settings/logo'}
                name='logo'
                id='logo'
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
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/salon_settings/salon_settings-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditSalon_settingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_SALON_SETTINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditSalon_settingsPage
