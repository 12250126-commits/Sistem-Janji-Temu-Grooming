import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/users/usersSlice'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";


const UsersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)
    

    const { id } = router.query;
    
    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);


    return (
      <>
          <Head>
              <title>{getPageTitle('View users')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View users')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/users/users-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>First Name</p>
                    <p>{users?.firstName}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Last Name</p>
                    <p>{users?.lastName}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone Number</p>
                    <p>{users?.phoneNumber}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>E-Mail</p>
                    <p>{users?.email}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Disabled'>
                    <SwitchField
                      field={{name: 'disabled', value: users?.disabled}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Avatar</p>
                    {users?.avatar?.length
                      ? (
                        <ImageField
                          name={'avatar'}
                          image={users?.avatar}
                          className='w-20 h-20'
                        />
                      ) : <p>No Avatar</p>
                    }
                </div>
              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>App Role</p>
                    
                    
                    
                    
                        <p>{users?.app_role?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              
                <>
                    <p className={'block font-bold mb-2'}>Custom Permissions</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                    <th>Name</th>
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {users.custom_permissions && Array.isArray(users.custom_permissions) &&
                              users.custom_permissions.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/permissions/permissions-view/?id=${item.id}`)}>
                                  
                                    
                                    
                                  
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.custom_permissions?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
              

              

              
              

                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Konsumens AkunPengguna</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>KodeKonsumen</th>
                                
                                
                                
                                <th>Alamat</th>
                                
                                
                                
                                <th>SetujuTerimaNotifikasiWhatsApp</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {users.konsumens_user && Array.isArray(users.konsumens_user) &&
                              users.konsumens_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/konsumens/konsumens-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="kode_konsumen">
                                        { item.kode_konsumen }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="alamat">
                                        { item.alamat }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="wa_opt_in">
                                        { dataFormatter.booleanFormatter(item.wa_opt_in) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.konsumens_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Groomers AkunPengguna</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>KodeGroomer</th>
                                
                                
                                
                                <th>NamaTampilan</th>
                                
                                
                                
                                <th>BioSingkat</th>
                                
                                
                                
                                <th>Aktif</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {users.groomers_user && Array.isArray(users.groomers_user) &&
                              users.groomers_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/groomers/groomers-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="kode_groomer">
                                        { item.kode_groomer }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="nama_tampilan">
                                        { item.nama_tampilan }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="bio_singkat">
                                        { item.bio_singkat }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_active">
                                        { dataFormatter.booleanFormatter(item.is_active) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.groomers_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Log_aktivitas Pengguna</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>Aksi</th>
                                
                                
                                
                                <th>Entitas</th>
                                
                                
                                
                                <th>KunciEntitas</th>
                                
                                
                                
                                <th>Deskripsi</th>
                                
                                
                                
                                <th>IPAddress</th>
                                
                                
                                
                                <th>UserAgent</th>
                                
                                
                                
                                <th>TerjadiPada</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {users.log_aktivitas_user && Array.isArray(users.log_aktivitas_user) &&
                              users.log_aktivitas_user.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/log_aktivitas/log_aktivitas-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="aksi">
                                        { item.aksi }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="entitas">
                                        { item.entitas }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="kunci_entitas">
                                        { item.kunci_entitas }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="deskripsi">
                                        { item.deskripsi }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="ip_address">
                                        { item.ip_address }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="user_agent">
                                        { item.user_agent }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="terjadi_pada">
                                        { dataFormatter.dateTimeFormatter(item.terjadi_pada) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.log_aktivitas_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/users/users-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_USERS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default UsersView;