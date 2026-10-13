import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import {saveFile} from "../../helpers/fileSaver";
import ListActionsPopover from "../ListActionsPopover";
import {useAppSelector} from "../../stores/hooks";
import {Pagination} from "../Pagination";
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

const ListHewans = ({ hewans, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_HEWANS')
    
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);


    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && hewans.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex ${bgColor} ${corners !== 'rounded-full' ? corners : 'rounded-3xl'}  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}>
                          
                            <ImageField
                                  name={'Avatar'}
                                  image={item.foto}
                                  className='w-24 h-24 rounded-l overflow-hidden hidden md:block'
                                  imageClassName={'rounded-l rounded-r-none h-full object-cover'}
                            />
                          
                          <Link
                              href={`/hewans/hewans-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                              }
                          >
                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Pemilik</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.konsumensOneListFormatter(item.konsumen) }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>NamaHewan</p>
                                <p className={'line-clamp-2'}>{ item.nama }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Jenis</p>
                                <p className={'line-clamp-2'}>{ item.jenis }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Ras</p>
                                <p className={'line-clamp-2'}>{ item.ras }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Ukuran</p>
                                <p className={'line-clamp-2'}>{ item.ukuran }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Umur(bulan)</p>
                                <p className={'line-clamp-2'}>{ item.umur_bulan }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Berat(kg)</p>
                                <p className={'line-clamp-2'}>{ item.berat_kg }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>CatatanKhusus</p>
                                <p className={'line-clamp-2'}>{ item.catatan_khusus }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>FotoHewan</p>
                                <ImageField
                                  name={'Avatar'}
                                  image={item.foto}
                                  className='mx-auto w-8 h-8'
                                />
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Aktif</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.booleanFormatter(item.is_active) }</p>
                            </div>
                          

                          
                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/hewans/hewans-edit/?id=${item.id}`}
                              pathView={`/hewans/hewans-view/?id=${item.id}`}
                              
                              hasUpdatePermission={hasUpdatePermission}
                              
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && hewans.length === 0 && (
                  <div className='col-span-full flex items-center justify-center h-40'>
                      <p className=''>No data to display</p>
                  </div>
                )}
            </div>
            <div className={'flex items-center justify-center my-6'}>
                <Pagination
                  currentPage={currentPage}
                  numPages={numPages}
                  setCurrentPage={onPageChange}
                />
            </div>
        </>
    )
};

export default ListHewans