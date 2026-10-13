import { mdiAccount, mdiChartTimelineVariant, mdiMail, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import { SelectFieldMany } from "../../components/SelectFieldMany";
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/salon_settings/salon_settingsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    nama_salon: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    alamat_salon: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    nomor_whatsapp_salon: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    email_salon: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    jam_operasional: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    catatan_kebijakan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    logo: [],
    
    
    
    
}


const Salon_settingsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/salon_settings/salon_settings-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                
                initialValues
                
            }
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

Salon_settingsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_SALON_SETTINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Salon_settingsNew
