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

import { create } from '../../stores/pembayarans/pembayaransSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    booking: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    metode: 'cash',
    
    
    
    
    
    
    
    jumlah_tagihan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    jumlah_dibayar: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    status_pembayaran: 'belum_bayar',
    
    
    
    
    
    
    
    
    
    
    
    
    dibayar_pada: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    bukti_bayar: [],
    
    
    
    
    
    
    
    
    
    
    
    diverifikasi_pada: '',
    
    
    
    
    
    
    
    
    
    
    diverifikasi_oleh: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    catatan_verifikasi: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
}


const PembayaransNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/pembayarans/pembayarans-list')
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





















  <FormField label="Booking" labelFor="booking">
      <Field name="booking" id="booking" component={SelectField} options={[]} itemRef={'bookings'}></Field>
  </FormField>























  <FormField label="MetodePembayaran" labelFor="metode">
      <Field name="metode" id="metode" component="select">
      
        <option value="cash">cash</option>
      
        <option value="transfer_bank">transfer_bank</option>
      
        <option value="e_wallet">e_wallet</option>
      
      </Field>
  </FormField>



















    <FormField
        label="JumlahTagihan"
    >
        <Field
            type="number"
            name="jumlah_tagihan"
            placeholder="JumlahTagihan"
        />
    </FormField>



























    <FormField
        label="JumlahDibayar"
    >
        <Field
            type="number"
            name="jumlah_dibayar"
            placeholder="JumlahDibayar"
        />
    </FormField>



































  <FormField label="StatusPembayaran" labelFor="status_pembayaran">
      <Field name="status_pembayaran" id="status_pembayaran" component="select">
      
        <option value="belum_bayar">belum_bayar</option>
      
        <option value="dp">dp</option>
      
        <option value="lunas">lunas</option>
      
        <option value="refund">refund</option>
      
      </Field>
  </FormField>























  <FormField
      label="DibayarPada"
  >
      <Field
          type="datetime-local"
          name="dibayar_pada"
          placeholder="DibayarPada"
      />
  </FormField>








































  <FormField>
      <Field
          label='BuktiPembayaran'
          color='info'
          icon={mdiUpload}
          path={'pembayarans/bukti_bayar'}
          name='bukti_bayar'
          id='bukti_bayar'
          schema={{
            size: undefined,
            formats: undefined,
          }}
          component={FormFilePicker}
      ></Field>
  </FormField>














  <FormField
      label="DiverifikasiPada"
  >
      <Field
          type="datetime-local"
          name="diverifikasi_pada"
          placeholder="DiverifikasiPada"
      />
  </FormField>

















  <FormField
      label="DiverifikasiOleh"
  >
      <Field
          name="diverifikasi_oleh"
          placeholder="DiverifikasiOleh"
      />
  </FormField>





























    <FormField label="CatatanVerifikasi" hasTextareaHeight>
        <Field name="catatan_verifikasi" as="textarea" placeholder="CatatanVerifikasi" />
    </FormField>























              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/pembayarans/pembayarans-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

PembayaransNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_PEMBAYARANS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default PembayaransNew
