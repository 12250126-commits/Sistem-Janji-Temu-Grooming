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
    jadwal_groomers: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const ListJadwal_groomers = ({ jadwal_groomers, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_JADWAL_GROOMERS')
    
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);


    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && jadwal_groomers.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex ${bgColor} ${corners !== 'rounded-full' ? corners : 'rounded-3xl'}  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}>
                          
                          <Link
                              href={`/jadwal_groomers/jadwal_groomers-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                              }
                          >
                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Groomer</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.groomersOneListFormatter(item.groomer) }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Hari</p>
                                <p className={'line-clamp-2'}>{ item.hari }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>JamMulai(HH:MM)</p>
                                <p className={'line-clamp-2'}>{ item.jam_mulai }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>JamSelesai(HH:MM)</p>
                                <p className={'line-clamp-2'}>{ item.jam_selesai }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>JamIstirahatMulai(HH:MM)</p>
                                <p className={'line-clamp-2'}>{ item.jam_istirahat_mulai }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>JamIstirahatSelesai(HH:MM)</p>
                                <p className={'line-clamp-2'}>{ item.jam_istirahat_selesai }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>KapasitasSlot</p>
                                <p className={'line-clamp-2'}>{ item.kapasitas_slot }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Aktif</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.booleanFormatter(item.is_active) }</p>
                            </div>
                          

                          
                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/jadwal_groomers/jadwal_groomers-edit/?id=${item.id}`}
                              pathView={`/jadwal_groomers/jadwal_groomers-view/?id=${item.id}`}
                              
                              hasUpdatePermission={hasUpdatePermission}
                              
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && jadwal_groomers.length === 0 && (
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

export default ListJadwal_groomers