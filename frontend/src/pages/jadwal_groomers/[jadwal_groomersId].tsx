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

import { update, fetch } from '../../stores/jadwal_groomers/jadwal_groomersSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditJadwal_groomers = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    groomer: null,
    

    
    
    

    

    

    

    

    

    

    

    
    hari: '',
    

    

    

    

    
    
    
    'jam_mulai': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'jam_selesai': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'jam_istirahat_mulai': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'jam_istirahat_selesai': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    
    kapasitas_slot: '',
    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    is_active: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { jadwal_groomers } = useAppSelector((state) => state.jadwal_groomers)
  

  const { jadwal_groomersId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: jadwal_groomersId }))
  }, [jadwal_groomersId])

  useEffect(() => {
    if (typeof jadwal_groomers === 'object') {
      setInitialValues(jadwal_groomers)
    }
  }, [jadwal_groomers])

  useEffect(() => {
      if (typeof jadwal_groomers === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (jadwal_groomers)[el])

          setInitialValues(newInitialVal);
      }
  }, [jadwal_groomers])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: jadwal_groomersId, data }))
    await router.push('/jadwal_groomers/jadwal_groomers-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit jadwal_groomers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit jadwal_groomers'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Groomer' labelFor='groomer'>
        <Field
            name='groomer'
            id='groomer'
            component={SelectField}
            options={initialValues.groomer}
            itemRef={'groomers'}
      
        
      
        
      
        
      
        
      
        
            showField={'nama_tampilan'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
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

EditJadwal_groomers.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_JADWAL_GROOMERS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditJadwal_groomers
