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

import { create } from '../../stores/log_aktivitas/log_aktivitasSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    user: '',
    
    
    
    
    aksi: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    entitas: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    kunci_entitas: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    deskripsi: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ip_address: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    user_agent: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    terjadi_pada: '',
    
    
    
    
    
    
    
    
    
}


const Log_aktivitasNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/log_aktivitas/log_aktivitas-list')
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





















  <FormField label="Pengguna" labelFor="user">
      <Field name="user" id="user" component={SelectField} options={[]} itemRef={'users'}></Field>
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
      <Field
          type="datetime-local"
          name="terjadi_pada"
          placeholder="TerjadiPada"
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

Log_aktivitasNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_LOG_AKTIVITAS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Log_aktivitasNew
