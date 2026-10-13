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
  hewans: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const CardHewans = ({
  hewans,
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
    const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_HEWANS')
    

  return (
    <div className={'p-4'}>
      {loading && <LoadingSpinner />}
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'
      >
        {!loading && hewans.map((item, index) => (
          <li
            key={item.id}
            className={`overflow-hidden ${corners !== 'rounded-full'? corners : 'rounded-3xl'} border  ${focusRing} border-gray-200 dark:border-dark-700 ${
                darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
          >
            
            <div className={`flex items-center ${bgColor} p-6  md:p-0 md:block  gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-dark-800 relative`}>
                
                <Link
                    href={`/hewans/hewans-view/?id=${item.id}`}
                    className={'cursor-pointer'}
                >
                  <ImageField
                    name={'Avatar'}
                    image={item.foto}
                    className='w-12 h-12 md:w-full md:h-44 rounded-lg md:rounded-b-none overflow-hidden ring-1 ring-gray-900/10'
                    imageClassName='h-full w-full flex-none rounded-lg md:rounded-b-none bg-white object-cover'
                  />
                  <p className={'px-6 py-2 font-semibold'}>{item.nama}</p>
                </Link>
              

              <div className='ml-auto  md:absolute md:top-0 md:right-0 '>
                <ListActionsPopover
                  onDelete={onDelete}
                  itemId={item.id}
                  pathEdit={`/hewans/hewans-edit/?id=${item.id}`}
                  pathView={`/hewans/hewans-view/?id=${item.id}`}
                  
                  hasUpdatePermission={hasUpdatePermission}
                  
                />
              </div>
            </div>
            <dl className='divide-y  divide-stone-300   dark:divide-dark-700 px-6 py-4 text-sm leading-6 h-64 overflow-y-auto'>
              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Pemilik</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.konsumensOneListFormatter(item.konsumen) }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>NamaHewan</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.nama }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Jenis</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.jenis }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Ras</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.ras }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Ukuran</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.ukuran }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Umur(bulan)</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.umur_bulan }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Berat(kg)</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.berat_kg }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>CatatanKhusus</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.catatan_khusus }
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>FotoHewan</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium'>
                            <ImageField
                                name={'Avatar'}
                                image={item.foto}
                                className='mx-auto w-8 h-8'
                            />
                        </div>
                    </dd>
                </div>
              

              
              
                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='  text-gray-500  dark:text-dark-600'>Aktif</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.booleanFormatter(item.is_active) }
                        </div>
                    </dd>
                </div>
              

              
            </dl>
          </li>
        ))}
        {!loading && hewans.length === 0 && (
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

export default CardHewans;
