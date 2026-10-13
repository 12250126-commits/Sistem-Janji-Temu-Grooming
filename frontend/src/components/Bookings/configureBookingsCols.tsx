import React from 'react';
import BaseIcon from '../BaseIcon';
import { mdiEye, mdiTrashCan, mdiPencilOutline } from '@mdi/js';
import axios from 'axios';
import {
    GridActionsCellItem,
    GridRowParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import ImageField from '../ImageField';
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter'
import DataGridMultiSelect from "../DataGridMultiSelect";
import ListActionsPopover from '../ListActionsPopover';

import {hasPermission} from "../../helpers/userPermissions";

type Params = (id: string) => void;

export const loadColumns = async (
    onDelete: Params,
    entityName: string,
    
    user
    
) => {
    async function callOptionsApi(entityName: string) {
        
        if (!hasPermission(user, 'READ_' + entityName.toUpperCase())) return [];
        
        try {
        const data = await axios(`/${entityName}/autocomplete?limit=100`);
        return data.data;
        } catch (error) {
         console.log(error);
         return [];
        }
    }
    
    const hasUpdatePermission = hasPermission(user, 'UPDATE_BOOKINGS')
    
    return [
        
        {
            field: 'kode_booking',
            headerName: 'KodeBooking',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'konsumen',
            headerName: 'Konsumen',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('konsumens'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,
          
        },
        
        {
            field: 'hewan',
            headerName: 'Hewan',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('hewans'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,
          
        },
        
        {
            field: 'layanan',
            headerName: 'Layanan',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('layanans'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,
          
        },
        
        {
            field: 'groomer',
            headerName: 'Groomer',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('groomers'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,
          
        },
        
        {
            field: 'waktu_mulai',
            headerName: 'WaktuMulai',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'dateTime',
            valueGetter: (params: GridValueGetterParams) =>
                new Date(params.row.waktu_mulai),
          
        },
        
        {
            field: 'waktu_selesai',
            headerName: 'WaktuSelesai',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'dateTime',
            valueGetter: (params: GridValueGetterParams) =>
                new Date(params.row.waktu_selesai),
          
        },
        
        {
            field: 'durasi_menit',
            headerName: 'Durasi(menit)',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'number',
          
        },
        
        {
            field: 'harga_dasar_snapshot',
            headerName: 'HargaDasar(snapshot)',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'number',
          
        },
        
        {
            field: 'tarif_ukuran_snapshot',
            headerName: 'TarifUkuran(snapshot)',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'number',
          
        },
        
        {
            field: 'total_biaya',
            headerName: 'TotalBiaya',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'number',
          
        },
        
        {
            field: 'status_booking',
            headerName: 'StatusBooking',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'status_diubah_pada',
            headerName: 'StatusDiubahPada',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'dateTime',
            valueGetter: (params: GridValueGetterParams) =>
                new Date(params.row.status_diubah_pada),
          
        },
        
        {
            field: 'status_diubah_oleh',
            headerName: 'StatusDiubahOleh',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'catatan_konsumen',
            headerName: 'CatatanKonsumen',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'catatan_admin',
            headerName: 'CatatanAdmin',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'dibatalkan_pada',
            headerName: 'DibatalkanPada',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'dateTime',
            valueGetter: (params: GridValueGetterParams) =>
                new Date(params.row.dibatalkan_pada),
          
        },
        
        {
            field: 'alasan_batal',
            headerName: 'AlasanBatal',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            
        },
        
        {
            field: 'butuh_reschedule',
            headerName: 'ButuhPenjadwalanUlang',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
          
            
            editable: hasUpdatePermission,
            
            type: 'boolean',
          
        },
        
        {
            field: 'actions',
            type: 'actions',
            minWidth: 30,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
            getActions: (params: GridRowParams) => {
                
               return [
                   <div key={params?.row?.id}>
                      <ListActionsPopover
                      onDelete={onDelete}
                      itemId={params?.row?.id}
                      pathEdit={`/bookings/bookings-edit/?id=${params?.row?.id}`}
                      pathView={`/bookings/bookings-view/?id=${params?.row?.id}`}
                      
                      hasUpdatePermission={hasUpdatePermission}
                      
                    />
                   </div>,
                  ]
            },
        },
    ];
};
