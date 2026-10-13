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
    riwayat_groomings: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const ListRiwayat_groomings = ({ riwayat_groomings, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_RIWAYAT_GROOMINGS')
    
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);


    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && riwayat_groomings.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex ${bgColor} ${corners !== 'rounded-full' ? corners : 'rounded-3xl'}  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}>
                          
                            <ImageField
                                  name={'Avatar'}
                                  image={item.foto_setelah}
                                  className='w-24 h-24 rounded-l overflow-hidden hidden md:block'
                                  imageClassName={'rounded-l rounded-r-none h-full object-cover'}
                            />
                          
                          <Link
                              href={`/riwayat_groomings/riwayat_groomings-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                              }
                          >
                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Booking</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.bookingsOneListFormatter(item.booking) }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Hewan</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.hewansOneListFormatter(item.hewan) }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>Groomer</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.groomersOneListFormatter(item.groomer) }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>MulaiPada</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.mulai_pada) }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>SelesaiPada</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.selesai_pada) }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>BeratSetelah(kg)</p>
                                <p className={'line-clamp-2'}>{ item.berat_kg_setelah }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>KondisiSetelah</p>
                                <p className={'line-clamp-2'}>{ item.kondisi_setelah }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>CatatanTindakan</p>
                                <p className={'line-clamp-2'}>{ item.catatan_tindakan }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>CatatanKondisi</p>
                                <p className={'line-clamp-2'}>{ item.catatan_kondisi }</p>
                            </div>
                          

                          
                          
                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs   text-gray-500 '}>FotoSetelah</p>
                                <ImageField
                                  name={'Avatar'}
                                  image={item.foto_setelah}
                                  className='mx-auto w-8 h-8'
                                />
                            </div>
                          

                          
                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/riwayat_groomings/riwayat_groomings-edit/?id=${item.id}`}
                              pathView={`/riwayat_groomings/riwayat_groomings-view/?id=${item.id}`}
                              
                              hasUpdatePermission={hasUpdatePermission}
                              
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && riwayat_groomings.length === 0 && (
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

export default ListRiwayat_groomings