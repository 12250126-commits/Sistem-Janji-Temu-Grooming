import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },
  
  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline ?? icon.mdiTable,
    permissions: 'READ_ROLES'
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline ?? icon.mdiTable,
    permissions: 'READ_PERMISSIONS'
  },
  {
    href: '/konsumens/konsumens-list',
    label: 'Konsumens',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiAccountBox' in icon ? icon['mdiAccountBox' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_KONSUMENS'
  },
  {
    href: '/groomers/groomers-list',
    label: 'Groomers',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiScissorsCutting' in icon ? icon['mdiScissorsCutting' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_GROOMERS'
  },
  {
    href: '/hewans/hewans-list',
    label: 'Hewans',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPaw' in icon ? icon['mdiPaw' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_HEWANS'
  },
  {
    href: '/layanans/layanans-list',
    label: 'Layanans',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiContentCut' in icon ? icon['mdiContentCut' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_LAYANANS'
  },
  {
    href: '/tarif_ukurans/tarif_ukurans-list',
    label: 'Tarif ukurans',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCashPlus' in icon ? icon['mdiCashPlus' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TARIF_UKURANS'
  },
  {
    href: '/jadwal_groomers/jadwal_groomers-list',
    label: 'Jadwal groomers',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCalendarClock' in icon ? icon['mdiCalendarClock' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_JADWAL_GROOMERS'
  },
  {
    href: '/bookings/bookings-list',
    label: 'Bookings',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCalendarCheck' in icon ? icon['mdiCalendarCheck' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_BOOKINGS'
  },
  {
    href: '/pembayarans/pembayarans-list',
    label: 'Pembayarans',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiReceiptText' in icon ? icon['mdiReceiptText' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PEMBAYARANS'
  },
  {
    href: '/riwayat_groomings/riwayat_groomings-list',
    label: 'Riwayat groomings',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiHistory' in icon ? icon['mdiHistory' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_RIWAYAT_GROOMINGS'
  },
  {
    href: '/notifikasis/notifikasis-list',
    label: 'Notifikasis',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiWhatsapp' in icon ? icon['mdiWhatsapp' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_NOTIFIKASIS'
  },
  {
    href: '/log_aktivitas/log_aktivitas-list',
    label: 'Log aktivitas',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiClipboardListOutline' in icon ? icon['mdiClipboardListOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_LOG_AKTIVITAS'
  },
  {
    href: '/salon_settings/salon_settings-list',
    label: 'Salon settings',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiStoreSettings' in icon ? icon['mdiStoreSettings' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_SALON_SETTINGS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
