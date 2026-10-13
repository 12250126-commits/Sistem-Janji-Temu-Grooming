import * as icon from '@mdi/js';
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import BaseIcon from "../components/BaseIcon";
import { getPageTitle } from '../config'
import Link from "next/link";

import { hasPermission } from "../helpers/userPermissions";
import { fetchWidgets } from '../stores/roles/rolesSlice';
import { WidgetCreator } from '../components/WidgetCreator/WidgetCreator';
import { SmartWidget } from '../components/SmartWidget/SmartWidget';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
const Dashboard = () => {
    const dispatch = useAppDispatch();
    const iconsColor = useAppSelector((state) => state.style.iconsColor);
    const corners = useAppSelector((state) => state.style.corners);
    const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

    const loadingMessage = 'Loading...';

    
    const [users, setUsers] = React.useState(loadingMessage);
    const [roles, setRoles] = React.useState(loadingMessage);
    const [permissions, setPermissions] = React.useState(loadingMessage);
    const [konsumens, setKonsumens] = React.useState(loadingMessage);
    const [groomers, setGroomers] = React.useState(loadingMessage);
    const [hewans, setHewans] = React.useState(loadingMessage);
    const [layanans, setLayanans] = React.useState(loadingMessage);
    const [tarif_ukurans, setTarif_ukurans] = React.useState(loadingMessage);
    const [jadwal_groomers, setJadwal_groomers] = React.useState(loadingMessage);
    const [bookings, setBookings] = React.useState(loadingMessage);
    const [pembayarans, setPembayarans] = React.useState(loadingMessage);
    const [riwayat_groomings, setRiwayat_groomings] = React.useState(loadingMessage);
    const [notifikasis, setNotifikasis] = React.useState(loadingMessage);
    const [log_aktivitas, setLog_aktivitas] = React.useState(loadingMessage);
    const [salon_settings, setSalon_settings] = React.useState(loadingMessage);

    
    const [widgetsRole, setWidgetsRole] = React.useState({
        role: { value: '', label: '' },
    });
    const { currentUser } = useAppSelector((state) => state.auth);
    const { isFetchingQuery } = useAppSelector((state) => state.openAi);
    
    const { rolesWidgets, loading } = useAppSelector((state) => state.roles);
    
    
    async function loadData() {
        const entities = ['users','roles','permissions','konsumens','groomers','hewans','layanans','tarif_ukurans','jadwal_groomers','bookings','pembayarans','riwayat_groomings','notifikasis','log_aktivitas','salon_settings',];
        const fns = [setUsers,setRoles,setPermissions,setKonsumens,setGroomers,setHewans,setLayanans,setTarif_ukurans,setJadwal_groomers,setBookings,setPembayarans,setRiwayat_groomings,setNotifikasis,setLog_aktivitas,setSalon_settings,];

        const requests = entities.map((entity, index) => {
          
          if(hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
            return axios.get(`/${entity.toLowerCase()}/count`);
          } else {
            fns[index](null);
            return Promise.resolve({data: {count: null}});
          }
          
        });

        Promise.allSettled(requests).then((results) => {
            results.forEach((result, i) => {
                if (result.status === 'fulfilled') {
                    fns[i](result.value.data.count);
                } else {
                    fns[i](result.reason.message);
                }
            });
        });
    }
  
    async function getWidgets(roleId) {
        await dispatch(fetchWidgets(roleId));
    }
    React.useEffect(() => {
        if (!currentUser) return;
        loadData().then();
        setWidgetsRole({ role: { value: currentUser?.app_role?.id, label: currentUser?.app_role?.name } });
    }, [currentUser]);

    React.useEffect(() => {
        if (!currentUser || !widgetsRole?.role?.value) return;
        getWidgets(widgetsRole?.role?.value || '').then();
    }, [widgetsRole?.role?.value]);
  
  return (
    <>
      <Head>
        <title>
            {getPageTitle('Overview')}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
            icon={icon.mdiChartTimelineVariant}
            title='Overview'
            main>
          {''}
        </SectionTitleLineWithButton>
        
        {hasPermission(currentUser, 'CREATE_ROLES') && <WidgetCreator
            currentUser={currentUser}
            isFetchingQuery={isFetchingQuery}
            setWidgetsRole={setWidgetsRole}
            widgetsRole={widgetsRole}
        />}
        {!!rolesWidgets.length &&
            hasPermission(currentUser, 'CREATE_ROLES') && (
                <p className='  text-gray-500 dark:text-gray-400 mb-4'>
                    {`${widgetsRole?.role?.label || 'Users'}'s widgets`}
                </p>
            )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 grid-flow-dense'>
            {(isFetchingQuery || loading) && (
                <div className={` ${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 text-lg leading-tight   text-gray-500 flex items-center ${cardsStyle} dark:border-dark-700 p-6`}>
                    <BaseIcon
                        className={`${iconsColor} animate-spin mr-5`}
                        w='w-16'
                        h='h-16'
                        size={48}
                        path={icon.mdiLoading}
                    />{' '}
                    Loading widgets...
                </div>
            )}

            { rolesWidgets &&
                rolesWidgets.map((widget) => (
                    <SmartWidget
                        key={widget.id}
                        userId={currentUser?.id}
                        widget={widget}
                        roleId={widgetsRole?.role?.value || ''}
                        admin={hasPermission(currentUser, 'CREATE_ROLES')}
                    />
            ))}
        </div>

        {!!rolesWidgets.length && <hr className='my-6 text-pastelBrownTheme-mainBG  ' />}
        
        <div id="dashboard" className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>
        
          
            {hasPermission(currentUser, 'READ_USERS') && <Link href={'/users/users-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Users
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {users}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiAccountGroup || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_ROLES') && <Link href={'/roles/roles-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Roles
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {roles}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiShieldAccountVariantOutline || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PERMISSIONS') && <Link href={'/permissions/permissions-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Permissions
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {permissions}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiShieldAccountOutline || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_KONSUMENS') && <Link href={'/konsumens/konsumens-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Konsumens
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {konsumens}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiAccountBox' in icon ? icon['mdiAccountBox' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_GROOMERS') && <Link href={'/groomers/groomers-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Groomers
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {groomers}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiScissorsCutting' in icon ? icon['mdiScissorsCutting' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_HEWANS') && <Link href={'/hewans/hewans-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Hewans
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {hewans}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiPaw' in icon ? icon['mdiPaw' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_LAYANANS') && <Link href={'/layanans/layanans-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Layanans
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {layanans}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiContentCut' in icon ? icon['mdiContentCut' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_TARIF_UKURANS') && <Link href={'/tarif_ukurans/tarif_ukurans-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Tarif ukurans
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {tarif_ukurans}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCashPlus' in icon ? icon['mdiCashPlus' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_JADWAL_GROOMERS') && <Link href={'/jadwal_groomers/jadwal_groomers-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Jadwal groomers
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {jadwal_groomers}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCalendarClock' in icon ? icon['mdiCalendarClock' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_BOOKINGS') && <Link href={'/bookings/bookings-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Bookings
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {bookings}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCalendarCheck' in icon ? icon['mdiCalendarCheck' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PEMBAYARANS') && <Link href={'/pembayarans/pembayarans-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Pembayarans
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {pembayarans}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiReceiptText' in icon ? icon['mdiReceiptText' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_RIWAYAT_GROOMINGS') && <Link href={'/riwayat_groomings/riwayat_groomings-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Riwayat groomings
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {riwayat_groomings}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiHistory' in icon ? icon['mdiHistory' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_NOTIFIKASIS') && <Link href={'/notifikasis/notifikasis-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Notifikasis
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {notifikasis}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiWhatsapp' in icon ? icon['mdiWhatsapp' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_LOG_AKTIVITAS') && <Link href={'/log_aktivitas/log_aktivitas-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Log aktivitas
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {log_aktivitas}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiClipboardListOutline' in icon ? icon['mdiClipboardListOutline' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_SALON_SETTINGS') && <Link href={'/salon_settings/salon_settings-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Salon settings
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {salon_settings}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiStoreSettings' in icon ? icon['mdiStoreSettings' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
          
        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
