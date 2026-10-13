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
  riwayat_groomings: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const CardRiwayat_groomings = ({
  riwayat_groomings,
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
    const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_RIWAYAT_GROOMINGS')
    

  return (
    <div className={'p-4'}>
      {loading && <LoadingSpinner />}
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'
      >
        {!loading && riwayat_groomings.map((item, index) => (
          <li
            key={item.id}
            className={`overflow-hidden ${corners !== 'rounded-full'? corners : 'rounded-3xl'} border  ${focusRing} border-gray-200 dark:border-dark-700 ${
                darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
          >
            
            <div className={`flex items-center ${bgColor} p-6  md:p-0 md:block  gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-dark-800 relative`}>
                
                <Link
                    href={`/riwayat_groomings/riwayat_groomings-view/?id=${item.id}`}
                    className={'cursor-pointer'}
                >
                  <ImageField
                    name={'Avatar'}
                    image={item.foto_setelah}
                    className='w-12 h-12 md:w-full md:h-44 rounded-lg md:rounded-b-none overflow-hidden ring-1 ring-gray-900/10'
                    imageClassName='h-full w-full flex-none rounded-lg md:rounded-b-none bg-white object-cover'
                  />
                  <p className={'px-6 py-2 font-semibold'}>{item.kondisi_setelah}</p>
                </Link>
              

              <div className='ml-auto  md:absolute md:top-0 md:right-0 '>
                <ListActionsPopover
                  onDelete={onDelete}
                  itemId={item.id}
                  pathEdit={`/riwayat_groomings/riwayat_groomings-edit/?id=${item.id}`}
                  pathView={`/riwayat_groomings/riwayat_groomings-view/?id=${item.id}`}
                  
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
                    <dt className='  text-gray-500  dark:text-dark-600'>Hewan</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.hewansOneListFormatter(item.hewan) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Groomer</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.groomersOneListFormatter(item.groomer) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>MulaiPada</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.dateTimeFormatter(item.mulai_pada) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>SelesaiPada</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.dateTimeFormatter(item.selesai_pada) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>BeratSetelah(kg)</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.berat_kg_setelah }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>KondisiSetelah</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.kondisi_setelah }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>CatatanTindakan</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.catatan_tindakan }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>CatatanKondisi</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.catatan_kondisi }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>FotoSetelah</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium'>
                            <ImageField
                                name={'Avatar'}
                                image={item.foto_setelah}
                                className='mx-auto w-8 h-8'
                            />
                        </div>
                    </dd>
                </div>
              

              
            </dl>
          </li>
        ))}
        {!loading && riwayat_groomings.length === 0 && (
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

export default CardRiwayat_groomings;
