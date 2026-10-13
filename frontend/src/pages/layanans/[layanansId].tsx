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

import { update, fetch } from '../../stores/layanans/layanansSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditLayanans = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'kode_layanan': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'nama': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    
    deskripsi: '',
    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    
    durasi_menit: '',
    

    

    

    

    

    

    

    

    

    
    
    
    'harga_dasar': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    is_active: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { layanans } = useAppSelector((state) => state.layanans)
  

  const { layanansId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: layanansId }))
  }, [layanansId])

  useEffect(() => {
    if (typeof layanans === 'object') {
      setInitialValues(layanans)
    }
  }, [layanans])

  useEffect(() => {
      if (typeof layanans === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (layanans)[el])

          setInitialValues(newInitialVal);
      }
  }, [layanans])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: layanansId, data }))
    await router.push('/layanans/layanans-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit layanans')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit layanans'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
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

EditLayanans.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_LAYANANS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditLayanans
