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

import { update, fetch } from '../../stores/tarif_ukurans/tarif_ukuransSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditTarif_ukuransPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    layanan: null,
    

    
    
    

    

    

    

    

    

    

    

    
    ukuran_hewan: '',
    

    

    

    

    
    
    
    'tarif_tambahan': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { tarif_ukurans } = useAppSelector((state) => state.tarif_ukurans)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof tarif_ukurans === 'object') {
      setInitialValues(tarif_ukurans)
    }
  }, [tarif_ukurans])

  useEffect(() => {
      if (typeof tarif_ukurans === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (tarif_ukurans)[el])
          setInitialValues(newInitialVal);
      }
  }, [tarif_ukurans])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/tarif_ukurans/tarif_ukurans-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit tarif_ukurans')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit tarif_ukurans'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Layanan' labelFor='layanan'>
        <Field
            name='layanan'
            id='layanan'
            component={SelectField}
            options={initialValues.layanan}
            itemRef={'layanans'}
      
        
      
        
      
        
      
        
      
        
      
        
      
        
            showField={'nama'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
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

EditTarif_ukuransPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_TARIF_UKURANS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditTarif_ukuransPage
