import React from 'react';
import ImageField from '../ImageField';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import dataFormatter from '../../helpers/dataFormatter';
import { Pagination } from '../Pagination';
import {saveFile} from "../../helpers/fileSaver";
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

import {hasPermission} from "../../helpers/userPermissions";


type Props = {
  pembayarans: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const CardPembayarans = ({
  pembayarans,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
    const asideScrollbarsStyle = useAppSelector(
        (state) => state.style.asideScrollbarsStyle,
    );
    const bgColor = useAppSelector((state) => state.style.cardsColor);
    const darkMode = useAppSelector((state) => state.style.darkMode);
    const corners = useAppSelector((state) => state.style.corners);
    const focusRing = useAppSelector((state) => state.style.focusRingColor);
    
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_PEMBAYARANS')
    

  return (
    <div className={'p-4'}>
      {loading && <LoadingSpinner />}
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'
      >
        {!loading && pembayarans.map((item, index) => (
          <li
            key={item.id}
            className={`overflow-hidden ${corners !== 'rounded-full'? corners : 'rounded-3xl'} border  ${focusRing} border-gray-200 dark:border-dark-700 ${
                darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
          >
            
            <div className={`flex items-center ${bgColor} p-6  gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-dark-800 relative`}>
                
                <Link href={`/pembayarans/pembayarans-view/?id=${item.id}`} className='text-lg font-bold leading-6 line-clamp-1'>
                    {item.status_pembayaran}
                </Link>
              

              <div className='ml-auto '>
                <ListActionsPopover
                  onDelete={onDelete}
                  itemId={item.id}
                  pathEdit={`/pembayarans/pembayarans-edit/?id=${item.id}`}
                  pathView={`/pembayarans/pembayarans-view/?id=${item.id}`}
                  
                  hasUpdatePermission={hasUpdatePermission}
                  
                />
              </div>
            </div>
            <dl className='divide-y  divide-stone-300   dark:divide-dark-700 px-6 py-4 text-sm leading-6 h-64 overflow-y-auto'>
              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Booking</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.bookingsOneListFormatter(item.booking) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>MetodePembayaran</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.metode }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>JumlahTagihan</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.jumlah_tagihan }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>JumlahDibayar</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.jumlah_dibayar }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>StatusPembayaran</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.status_pembayaran }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>DibayarPada</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.dateTimeFormatter(item.dibayar_pada) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>BuktiPembayaran</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium'>
                            {dataFormatter.filesFormatter(item.bukti_bayar).map(link => (
                                <button
                                    key={link.publicUrl}
                                    onClick={(e) => saveFile(e, link.publicUrl, link.name)}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>DiverifikasiPada</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.dateTimeFormatter(item.diverifikasi_pada) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>DiverifikasiOleh</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.diverifikasi_oleh }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>CatatanVerifikasi</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.catatan_verifikasi }
                        </div>
                    </dd>
                </div>
              

              
            </dl>
          </li>
        ))}
        {!loading && pembayarans.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </ul>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </div>
  );
};

export default CardPembayarans;
