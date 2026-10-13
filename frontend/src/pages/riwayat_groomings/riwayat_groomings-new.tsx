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

import { create } from '../../stores/riwayat_groomings/riwayat_groomingsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    booking: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    hewan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    groomer: '',
    
    
    
    
    
    
    
    
    
    mulai_pada: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    selesai_pada: '',
    
    
    
    
    
    
    
    
    
    
    berat_kg_setelah: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    kondisi_setelah: 'baik',
    
    
    
    
    
    
    
    
    catatan_tindakan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    catatan_kondisi: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    foto_setelah: [],
    
    
    
    
}


const Riwayat_groomingsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    
    // get from url params
    const { dateRangeStart, dateRangeEnd } = router.query
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/riwayat_groomings/riwayat_groomings-list')
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
                
                
                
                dateRangeStart && dateRangeEnd ?
                {
                    ...initialValues,
                    mulai_pada: moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    selesai_pada: moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                } : initialValues
                
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>





















  <FormField label="Booking" labelFor="booking">
      <Field name="booking" id="booking" component={SelectField} options={[]} itemRef={'bookings'}></Field>
  </FormField>



























  <FormField label="Hewan" labelFor="hewan">
      <Field name="hewan" id="hewan" component={SelectField} options={[]} itemRef={'hewans'}></Field>
  </FormField>



























  <FormField label="Groomer" labelFor="groomer">
      <Field name="groomer" id="groomer" component={SelectField} options={[]} itemRef={'groomers'}></Field>
  </FormField>



















  <FormField
      label="MulaiPada"
  >
      <Field
          type="datetime-local"
          name="mulai_pada"
          placeholder="MulaiPada"
      />
  </FormField>



























  <FormField
      label="SelesaiPada"
  >
      <Field
          type="datetime-local"
          name="selesai_pada"
          placeholder="SelesaiPada"
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

Riwayat_groomingsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_RIWAYAT_GROOMINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Riwayat_groomingsNew
