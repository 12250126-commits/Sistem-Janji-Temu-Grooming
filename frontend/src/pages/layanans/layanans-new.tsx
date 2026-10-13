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

import { create } from '../../stores/layanans/layanansSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    kode_layanan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    nama: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    deskripsi: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    durasi_menit: '',
    
    
    
    
    
    
    
    
    
    
    
    
    harga_dasar: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    is_active: false,
    
    
    
    
    
    
    
    
}


const LayanansNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/layanans/layanans-list')
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
      label="KodeLayanan"
  >
      <Field
          name="kode_layanan"
          placeholder="KodeLayanan"
      />
  </FormField>



























  <FormField
      label="NamaLayanan"
  >
      <Field
          name="nama"
          placeholder="NamaLayanan"
      />
  </FormField>































      <FormField label='Deskripsi' hasTextareaHeight>
          <Field
              name='deskripsi'
              id='deskripsi'
              component={RichTextField}
          ></Field>
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
        label="HargaDasar"
    >
        <Field
            type="number"
            name="harga_dasar"
            placeholder="HargaDasar"
        />
    </FormField>





































  <FormField label='Aktif' labelFor='is_active'>
      <Field
          name='is_active'
          id='is_active'
          component={SwitchField}
      ></Field>
  </FormField>









              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/layanans/layanans-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

LayanansNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_LAYANANS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default LayanansNew
