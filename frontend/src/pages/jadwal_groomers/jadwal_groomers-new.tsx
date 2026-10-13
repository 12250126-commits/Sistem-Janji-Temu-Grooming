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

import { create } from '../../stores/jadwal_groomers/jadwal_groomersSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    groomer: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    hari: 'senin',
    
    
    
    
    
    
    
    jam_mulai: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    jam_selesai: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    jam_istirahat_mulai: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    jam_istirahat_selesai: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    kapasitas_slot: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    is_active: false,
    
    
    
    
    
    
    
    
}


const Jadwal_groomersNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/jadwal_groomers/jadwal_groomers-list')
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





















  <FormField label="Groomer" labelFor="groomer">
      <Field name="groomer" id="groomer" component={SelectField} options={[]} itemRef={'groomers'}></Field>
  </FormField>























  <FormField label="Hari" labelFor="hari">
      <Field name="hari" id="hari" component="select">
      
        <option value="senin">senin</option>
      
        <option value="selasa">selasa</option>
      
        <option value="rabu">rabu</option>
      
        <option value="kamis">kamis</option>
      
        <option value="jumat">jumat</option>
      
        <option value="sabtu">sabtu</option>
      
        <option value="minggu">minggu</option>
      
      </Field>
  </FormField>













  <FormField
      label="JamMulai(HH:MM)"
  >
      <Field
          name="jam_mulai"
          placeholder="JamMulai(HH:MM)"
      />
  </FormField>



























  <FormField
      label="JamSelesai(HH:MM)"
  >
      <Field
          name="jam_selesai"
          placeholder="JamSelesai(HH:MM)"
      />
  </FormField>



























  <FormField
      label="JamIstirahatMulai(HH:MM)"
  >
      <Field
          name="jam_istirahat_mulai"
          placeholder="JamIstirahatMulai(HH:MM)"
      />
  </FormField>



























  <FormField
      label="JamIstirahatSelesai(HH:MM)"
  >
      <Field
          name="jam_istirahat_selesai"
          placeholder="JamIstirahatSelesai(HH:MM)"
      />
  </FormField>

































    <FormField
        label="KapasitasSlot"
    >
        <Field
            type="number"
            name="kapasitas_slot"
            placeholder="KapasitasSlot"
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
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/jadwal_groomers/jadwal_groomers-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

Jadwal_groomersNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_JADWAL_GROOMERS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Jadwal_groomersNew
