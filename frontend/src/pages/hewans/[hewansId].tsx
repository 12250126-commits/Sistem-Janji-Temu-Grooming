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

import { update, fetch } from '../../stores/hewans/hewansSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditHewans = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    konsumen: null,
    

    
    
    
    'nama': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    jenis: '',
    

    

    

    

    
    
    
    'ras': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    ukuran: '',
    

    

    

    

    
    
    

    

    

    
    umur_bulan: '',
    

    

    

    

    

    

    

    

    

    
    
    
    'berat_kg': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    catatan_khusus: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    
    foto: [],
    

    

    
    
    

    

    

    

    

    

    
    is_active: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { hewans } = useAppSelector((state) => state.hewans)
  

  const { hewansId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: hewansId }))
  }, [hewansId])

  useEffect(() => {
    if (typeof hewans === 'object') {
      setInitialValues(hewans)
    }
  }, [hewans])

  useEffect(() => {
      if (typeof hewans === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (hewans)[el])

          setInitialValues(newInitialVal);
      }
  }, [hewans])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: hewansId, data }))
    await router.push('/hewans/hewans-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit hewans')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit hewans'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Pemilik' labelFor='konsumen'>
        <Field
            name='konsumen'
            id='konsumen'
            component={SelectField}
            options={initialValues.konsumen}
            itemRef={'konsumens'}
      
        
      
        
      
        
      
        
            showField={'kode_konsumen'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  
    <FormField
        label="NamaHewan"
    >
        <Field
            name="nama"
            placeholder="NamaHewan"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Jenis" labelFor="jenis">
        <Field name="jenis" id="jenis" component="select">
          
            <option value="kucing">kucing</option>
          
            <option value="anjing">anjing</option>
          
            <option value="lainnya">lainnya</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  
    <FormField
        label="Ras"
    >
        <Field
            name="ras"
            placeholder="Ras"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Ukuran" labelFor="ukuran">
        <Field name="ukuran" id="ukuran" component="select">
          
            <option value="kecil">kecil</option>
          
            <option value="sedang">sedang</option>
          
            <option value="besar">besar</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  
    <FormField
        label="Umur(bulan)"
    >
        <Field
            type="number"
            name="umur_bulan"
            placeholder="Umur(bulan)"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="Berat(kg)"
    >
        <Field
            type="number"
            name="berat_kg"
            placeholder="Berat(kg)"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="CatatanKhusus" hasTextareaHeight>
        <Field name="catatan_khusus" as="textarea" placeholder="CatatanKhusus" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    
        <FormField>
            <Field
                label='FotoHewan'
                color='info'
                icon={mdiUpload}
                path={'hewans/foto'}
                name='foto'
                id='foto'
                schema={{
                    size: undefined,
                    formats: undefined,
                }}
                component={FormImagePicker}
            ></Field>
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
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/hewans/hewans-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditHewans.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_HEWANS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditHewans
