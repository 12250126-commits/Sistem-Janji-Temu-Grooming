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

import { create } from '../../stores/tarif_ukurans/tarif_ukuransSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    layanan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    ukuran_hewan: 'kecil',
    
    
    
    
    
    
    
    tarif_tambahan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}


const Tarif_ukuransNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/tarif_ukurans/tarif_ukurans-list')
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





















  <FormField label="Layanan" labelFor="layanan">
      <Field name="layanan" id="layanan" component={SelectField} options={[]} itemRef={'layanans'}></Field>
  </FormField>























  <FormField label="UkuranHewan" labelFor="ukuran_hewan">
      <Field name="ukuran_hewan" id="ukuran_hewan" component="select">
      
        <option value="kecil">kecil</option>
      
        <option value="sedang">sedang</option>
      
        <option value="besar">besar</option>
      
      </Field>
  </FormField>



















    <FormField
        label="TarifTambahan"
    >
        <Field
            type="number"
            name="tarif_tambahan"
            placeholder="TarifTambahan"
        />
    </FormField>



















              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/tarif_ukurans/tarif_ukurans-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

Tarif_ukuransNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_TARIF_UKURANS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Tarif_ukuransNew
