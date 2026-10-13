import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import TableRiwayat_groomings from '../../components/Riwayat_groomings/TableRiwayat_groomings'
import BaseButton from '../../components/BaseButton'
import axios from "axios";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import CardBoxModal from "../../components/CardBoxModal";
import DragDropFilePicker from "../../components/DragDropFilePicker";
import {setRefetch, uploadCsv} from '../../stores/riwayat_groomings/riwayat_groomingsSlice';


import {hasPermission} from "../../helpers/userPermissions";



const Riwayat_groomingsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  
  const { currentUser } = useAppSelector((state) => state.auth);
  

  const dispatch = useAppDispatch();


  const [filters] = useState([{label: 'CatatanTindakan', title: 'catatan_tindakan'},{label: 'CatatanKondisi', title: 'catatan_kondisi'},
          
          {label: 'BeratSetelah(kg)', title: 'berat_kg_setelah', number: 'true'},
          {label: 'MulaiPada', title: 'mulai_pada', date: 'true'},{label: 'SelesaiPada', title: 'selesai_pada', date: 'true'},
    
    
    {label: 'Booking', title: 'booking'},
    
    
    
    {label: 'Hewan', title: 'hewan'},
    
    
    
    {label: 'Groomer', title: 'groomer'},
    
    
          
          {label: 'KondisiSetelah', title: 'kondisi_setelah', type: 'enum', options: ['baik','butuh_perhatian','darurat']},
  ]);
    
    const hasCreatePermission = currentUser && hasPermission(currentUser, 'CREATE_RIWAYAT_GROOMINGS');
    

    const addFilter = () => {
        const newItem = {
            id: uniqueId(),
            fields: {
                filterValue: '',
                filterValueFrom: '',
                filterValueTo: '',
                selectedField: '',
            },
        };
        newItem.fields.selectedField = filters[0].title;
        setFilterItems([...filterItems, newItem]);
    };

    const getRiwayat_groomingsCSV = async () => {
        const response = await axios({url: '/riwayat_groomings?filetype=csv', method: 'GET',responseType: 'blob'});
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'riwayat_groomingsCSV.csv'
        link.click()
    };

    const onModalConfirm = async () => {
        if (!csvFile) return;
        await dispatch(uploadCsv(csvFile));
        dispatch(setRefetch(true));
        setCsvFile(null);
        setIsModalActive(false);
    };

    const onModalCancel = () => {
        setCsvFile(null);
        setIsModalActive(false);
    };

  return (
    <>
      <Head>
        <title>{getPageTitle('Riwayat_groomings')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Riwayat_groomings" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox   className='mb-6' cardBoxClassName='flex flex-wrap'>
          
            {hasCreatePermission && <BaseButton className={'mr-3'} href={'/riwayat_groomings/riwayat_groomings-new'} color='info' label='New Item'/>}
          
          <BaseButton
              className={'mr-3'}
              color='info'
              label='Filter'
              onClick={addFilter}
          />
          <BaseButton className={'mr-3'} color='info' label='Download CSV' onClick={getRiwayat_groomingsCSV} />
          
            {hasCreatePermission && (
              <BaseButton
                color='info'
                label='Upload CSV'
                onClick={() => setIsModalActive(true)}
              />
            )}
          
          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
          </div>  
          
            <div className='md:inline-flex items-center ms-auto'>
              <Link href={'/riwayat_groomings/riwayat_groomings-table'}>Switch to Table</Link>
            </div>
          
        </CardBox>
        
        <CardBox className="mb-6" hasTable>
          <TableRiwayat_groomings
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={false}
            />
        </CardBox>
        
      </SectionMain>
      <CardBoxModal
          title='Upload CSV'
          buttonColor='info'
          buttonLabel={'Confirm'}
        // buttonLabel={false ? 'Deleting...' : 'Confirm'}
          isActive={isModalActive}
          onConfirm={onModalConfirm}
          onCancel={onModalCancel}
      >
          <DragDropFilePicker
              file={csvFile}
              setFile={setCsvFile}
              formats={'.csv'}
          />
      </CardBoxModal>
    </>
  )
}

Riwayat_groomingsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
        permission={'READ_RIWAYAT_GROOMINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Riwayat_groomingsTablesPage
