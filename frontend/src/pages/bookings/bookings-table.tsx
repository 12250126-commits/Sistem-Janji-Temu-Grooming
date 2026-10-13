import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import TableBookings from '../../components/Bookings/TableBookings'
import BaseButton from '../../components/BaseButton'
import axios from "axios";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import CardBoxModal from "../../components/CardBoxModal";
import DragDropFilePicker from "../../components/DragDropFilePicker";
import {setRefetch, uploadCsv} from '../../stores/bookings/bookingsSlice';


import {hasPermission} from "../../helpers/userPermissions";



const BookingsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  
  const { currentUser } = useAppSelector((state) => state.auth);
  

  const dispatch = useAppDispatch();


  const [filters] = useState([{label: 'KodeBooking', title: 'kode_booking'},{label: 'StatusDiubahOleh', title: 'status_diubah_oleh'},{label: 'CatatanKonsumen', title: 'catatan_konsumen'},{label: 'CatatanAdmin', title: 'catatan_admin'},{label: 'AlasanBatal', title: 'alasan_batal'},
          {label: 'Durasi(menit)', title: 'durasi_menit', number: 'true'},
          {label: 'HargaDasar(snapshot)', title: 'harga_dasar_snapshot', number: 'true'},{label: 'TarifUkuran(snapshot)', title: 'tarif_ukuran_snapshot', number: 'true'},{label: 'TotalBiaya', title: 'total_biaya', number: 'true'},
          {label: 'WaktuMulai', title: 'waktu_mulai', date: 'true'},{label: 'WaktuSelesai', title: 'waktu_selesai', date: 'true'},{label: 'StatusDiubahPada', title: 'status_diubah_pada', date: 'true'},{label: 'DibatalkanPada', title: 'dibatalkan_pada', date: 'true'},
    
    
    {label: 'Konsumen', title: 'konsumen'},
    
    
    
    {label: 'Hewan', title: 'hewan'},
    
    
    
    {label: 'Layanan', title: 'layanan'},
    
    
    
    {label: 'Groomer', title: 'groomer'},
    
    
              
          {label: 'StatusBooking', title: 'status_booking', type: 'enum', options: ['pending','confirmed','on_progress','done','cancelled']},
  ]);
    
    const hasCreatePermission = currentUser && hasPermission(currentUser, 'CREATE_BOOKINGS');
    

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

    const getBookingsCSV = async () => {
        const response = await axios({url: '/bookings?filetype=csv', method: 'GET',responseType: 'blob'});
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'bookingsCSV.csv'
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
        <title>{getPageTitle('Bookings')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Bookings" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          
            {hasCreatePermission && <BaseButton className={'mr-3'} href={'/bookings/bookings-new'} color='info' label='New Item'/>}
          
          <BaseButton
              className={'mr-3'}
              color='info'
              label='Filter'
              onClick={addFilter}
          />
          <BaseButton className={'mr-3'} color='info' label='Download CSV' onClick={getBookingsCSV} />
          
            {hasCreatePermission && (
              <BaseButton
                color='info'
                label='Upload CSV'
                onClick={() => setIsModalActive(true)}
              />
            )}
          
          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
            
              <Link href={'/bookings/bookings-list'}>
                Back to <span className='capitalize'>kanban</span>
              </Link>
            
          </div>
        </CardBox>
        <CardBox className="mb-6" hasTable>
          <TableBookings
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={true}
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

BookingsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
        permission={'READ_BOOKINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default BookingsTablesPage
