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

import { create } from '../../stores/bookings/bookingsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    kode_booking: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    konsumen: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    hewan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    layanan: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    groomer: '',
    
    
    
    
    
    
    
    
    
    waktu_mulai: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    waktu_selesai: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    durasi_menit: '',
    
    
    
    
    
    
    
    
    
    
    
    
    harga_dasar_snapshot: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    tarif_ukuran_snapshot: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    total_biaya: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    status_booking: 'pending',
    
    
    
    
    
    
    
    
    
    
    
    
    status_diubah_pada: '',
    
    
    
    
    
    
    
    
    
    
    status_diubah_oleh: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    catatan_konsumen: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    catatan_admin: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    dibatalkan_pada: '',
    
    
    
    
    
    
    
    
    
    
    
    alasan_batal: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    butuh_reschedule: false,
    
    
    
    
    
    
    
    
}


const BookingsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/bookings/bookings-list')
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
      label="KodeBooking"
  >
      <Field
          name="kode_booking"
          placeholder="KodeBooking"
      />
  </FormField>













































  <FormField label="Konsumen" labelFor="konsumen">
      <Field name="konsumen" id="konsumen" component={SelectField} options={[]} itemRef={'konsumens'}></Field>
  </FormField>



























  <FormField label="Hewan" labelFor="hewan">
      <Field name="hewan" id="hewan" component={SelectField} options={[]} itemRef={'hewans'}></Field>
  </FormField>



























  <FormField label="Layanan" labelFor="layanan">
      <Field name="layanan" id="layanan" component={SelectField} options={[]} itemRef={'layanans'}></Field>
  </FormField>



























  <FormField label="Groomer" labelFor="groomer">
      <Field name="groomer" id="groomer" component={SelectField} options={[]} itemRef={'groomers'}></Field>
  </FormField>



















  <FormField
      label="WaktuMulai"
  >
      <Field
          type="datetime-local"
          name="waktu_mulai"
          placeholder="WaktuMulai"
      />
  </FormField>



























  <FormField
      label="WaktuSelesai"
  >
      <Field
          type="datetime-local"
          name="waktu_selesai"
          placeholder="WaktuSelesai"
      />
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
        label="HargaDasar(snapshot)"
    >
        <Field
            type="number"
            name="harga_dasar_snapshot"
            placeholder="HargaDasar(snapshot)"
        />
    </FormField>



























    <FormField
        label="TarifUkuran(snapshot)"
    >
        <Field
            type="number"
            name="tarif_ukuran_snapshot"
            placeholder="TarifUkuran(snapshot)"
        />
    </FormField>



























    <FormField
        label="TotalBiaya"
    >
        <Field
            type="number"
            name="total_biaya"
            placeholder="TotalBiaya"
        />
    </FormField>



































  <FormField label="StatusBooking" labelFor="status_booking">
      <Field name="status_booking" id="status_booking" component="select">
      
        <option value="pending">pending</option>
      
        <option value="confirmed">confirmed</option>
      
        <option value="on_progress">on_progress</option>
      
        <option value="done">done</option>
      
        <option value="cancelled">cancelled</option>
      
      </Field>
  </FormField>























  <FormField
      label="StatusDiubahPada"
  >
      <Field
          type="datetime-local"
          name="status_diubah_pada"
          placeholder="StatusDiubahPada"
      />
  </FormField>

















  <FormField
      label="StatusDiubahOleh"
  >
      <Field
          name="status_diubah_oleh"
          placeholder="StatusDiubahOleh"
      />
  </FormField>





























    <FormField label="CatatanKonsumen" hasTextareaHeight>
        <Field name="catatan_konsumen" as="textarea" placeholder="CatatanKonsumen" />
    </FormField>



























    <FormField label="CatatanAdmin" hasTextareaHeight>
        <Field name="catatan_admin" as="textarea" placeholder="CatatanAdmin" />
    </FormField>



































  <FormField
      label="DibatalkanPada"
  >
      <Field
          type="datetime-local"
          name="dibatalkan_pada"
          placeholder="DibatalkanPada"
      />
  </FormField>



















    <FormField label="AlasanBatal" hasTextareaHeight>
        <Field name="alasan_batal" as="textarea" placeholder="AlasanBatal" />
    </FormField>









































  <FormField label='ButuhPenjadwalanUlang' labelFor='butuh_reschedule'>
      <Field
          name='butuh_reschedule'
          id='butuh_reschedule'
          component={SwitchField}
      ></Field>
  </FormField>









              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/bookings/bookings-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

BookingsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_BOOKINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default BookingsNew
