import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import TableNotifikasis from '../../components/Notifikasis/TableNotifikasis'
import BaseButton from '../../components/BaseButton'
import axios from "axios";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import CardBoxModal from "../../components/CardBoxModal";
import DragDropFilePicker from "../../components/DragDropFilePicker";
import {setRefetch, uploadCsv} from '../../stores/notifikasis/notifikasisSlice';


import {hasPermission} from "../../helpers/userPermissions";



const NotifikasisTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  
  const { currentUser } = useAppSelector((state) => state.auth);
  

  const dispatch = useAppDispatch();


  const [filters] = useState([{label: 'NomorTujuan', title: 'tujuan'},{label: 'Pesan', title: 'pesan'},{label: 'Provider', title: 'provider'},{label: 'ReferensiPesanProvider', title: 'provider_message_ref'},{label: 'ResponseRaw', title: 'response_raw'},
          {label: 'JumlahPercobaan', title: 'retry_count', number: 'true'},
          
          {label: 'DijadwalkanPada', title: 'dijadwalkan_pada', date: 'true'},{label: 'DikirimPada', title: 'dikirim_pada', date: 'true'},
    
    
    {label: 'Booking', title: 'booking'},
    
    
          
          {label: 'Channel', title: 'channel', type: 'enum', options: ['whatsapp']},{label: 'JenisNotifikasi', title: 'jenis', type: 'enum', options: ['booking_baru','booking_dikonfirmasi','booking_ditolak','perubahan_jadwal','pembatalan','pengingat_h1','pengingat_h2','grooming_selesai']},{label: 'StatusKirim', title: 'status_kirim', type: 'enum', options: ['queued','sent','failed','skipped']},
  ]);
    
    const hasCreatePermission = currentUser && hasPermission(currentUser, 'CREATE_NOTIFIKASIS');
    

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

    const getNotifikasisCSV = async () => {
        const response = await axios({url: '/notifikasis?filetype=csv', method: 'GET',responseType: 'blob'});
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'notifikasisCSV.csv'
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
        <title>{getPageTitle('Notifikasis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Notifikasis" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox   className='mb-6' cardBoxClassName='flex flex-wrap'>
          
            {hasCreatePermission && <BaseButton className={'mr-3'} href={'/notifikasis/notifikasis-new'} color='info' label='New Item'/>}
          
          <BaseButton
              className={'mr-3'}
              color='info'
              label='Filter'
              onClick={addFilter}
          />
          <BaseButton className={'mr-3'} color='info' label='Download CSV' onClick={getNotifikasisCSV} />
          
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
          
        </CardBox>
        
        <CardBox className="mb-6" hasTable>
          <TableNotifikasis
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

NotifikasisTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
        permission={'READ_NOTIFIKASIS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default NotifikasisTablesPage
