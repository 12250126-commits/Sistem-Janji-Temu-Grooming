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

import { create } from '../../stores/notifikasis/notifikasisSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    channel: 'whatsapp',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    jenis: 'booking_baru',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    booking: '',
    
    
    
    
    tujuan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    pesan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    status_kirim: 'queued',
    
    
    
    
    
    
    
    
    
    
    
    
    dijadwalkan_pada: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    dikirim_pada: '',
    
    
    
    
    
    
    
    
    
    
    provider: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    provider_message_ref: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    response_raw: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    retry_count: '',
    
    
    
    
    
    
    
    
    
    
    
}


const NotifikasisNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/notifikasis/notifikasis-list')
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

















  <FormField label="Channel" labelFor="channel">
      <Field name="channel" id="channel" component="select">
      
        <option value="whatsapp">whatsapp</option>
      
      </Field>
  </FormField>



























  <FormField label="JenisNotifikasi" labelFor="jenis">
      <Field name="jenis" id="jenis" component="select">
      
        <option value="booking_baru">booking_baru</option>
      
        <option value="booking_dikonfirmasi">booking_dikonfirmasi</option>
      
        <option value="booking_ditolak">booking_ditolak</option>
      
        <option value="perubahan_jadwal">perubahan_jadwal</option>
      
        <option value="pembatalan">pembatalan</option>
      
        <option value="pengingat_h1">pengingat_h1</option>
      
        <option value="pengingat_h2">pengingat_h2</option>
      
        <option value="grooming_selesai">grooming_selesai</option>
      
      </Field>
  </FormField>































  <FormField label="Booking" labelFor="booking">
      <Field name="booking" id="booking" component={SelectField} options={[]} itemRef={'bookings'}></Field>
  </FormField>









  <FormField
      label="NomorTujuan"
  >
      <Field
          name="tujuan"
          placeholder="NomorTujuan"
      />
  </FormField>





























    <FormField label="Pesan" hasTextareaHeight>
        <Field name="pesan" as="textarea" placeholder="Pesan" />
    </FormField>







































  <FormField label="StatusKirim" labelFor="status_kirim">
      <Field name="status_kirim" id="status_kirim" component="select">
      
        <option value="queued">queued</option>
      
        <option value="sent">sent</option>
      
        <option value="failed">failed</option>
      
        <option value="skipped">skipped</option>
      
      </Field>
  </FormField>























  <FormField
      label="DijadwalkanPada"
  >
      <Field
          type="datetime-local"
          name="dijadwalkan_pada"
          placeholder="DijadwalkanPada"
      />
  </FormField>



























  <FormField
      label="DikirimPada"
  >
      <Field
          type="datetime-local"
          name="dikirim_pada"
          placeholder="DikirimPada"
      />
  </FormField>

















  <FormField
      label="Provider"
  >
      <Field
          name="provider"
          placeholder="Provider"
      />
  </FormField>



























  <FormField
      label="ReferensiPesanProvider"
  >
      <Field
          name="provider_message_ref"
          placeholder="ReferensiPesanProvider"
      />
  </FormField>





























    <FormField label="ResponseRaw" hasTextareaHeight>
        <Field name="response_raw" as="textarea" placeholder="ResponseRaw" />
    </FormField>































    <FormField
        label="JumlahPercobaan"
    >
        <Field
            type="number"
            name="retry_count"
            placeholder="JumlahPercobaan"
        />
    </FormField>



















              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/notifikasis/notifikasis-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

NotifikasisNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_NOTIFIKASIS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default NotifikasisNew
