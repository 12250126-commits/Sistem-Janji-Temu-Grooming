import dayjs from 'dayjs';
import _ from 'lodash';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return [];
        return arr.map((item) => item);
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },
    dataGridEditFormatter(obj) {
        return _.transform(obj, (result, value, key) => {
            if (_.isArray(value)) {
                result[key] = _.map(value, 'id');
            } else if (_.isObject(value)) {
                result[key] = value.id;
            } else {
                result[key] = value;
            }
        });
    },
    
        
        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.firstName)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },
        
    
        
        rolesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        rolesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        rolesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        rolesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
        permissionsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.name)
        },
        permissionsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        permissionsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        permissionsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },
        
    
        
        konsumensManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.kode_konsumen)
        },
        konsumensOneListFormatter(val) {
            if (!val) return ''
            return val.kode_konsumen
        },
        konsumensManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.kode_konsumen}
            });
        },
        konsumensOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.kode_konsumen, id: val.id}
        },
        
    
        
        groomersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.nama_tampilan)
        },
        groomersOneListFormatter(val) {
            if (!val) return ''
            return val.nama_tampilan
        },
        groomersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.nama_tampilan}
            });
        },
        groomersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.nama_tampilan, id: val.id}
        },
        
    
        
        hewansManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.nama)
        },
        hewansOneListFormatter(val) {
            if (!val) return ''
            return val.nama
        },
        hewansManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.nama}
            });
        },
        hewansOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.nama, id: val.id}
        },
        
    
        
        layanansManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.nama)
        },
        layanansOneListFormatter(val) {
            if (!val) return ''
            return val.nama
        },
        layanansManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.nama}
            });
        },
        layanansOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.nama, id: val.id}
        },
        
    
        
    
        
    
        
        bookingsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map((item) => item.kode_booking)
        },
        bookingsOneListFormatter(val) {
            if (!val) return ''
            return val.kode_booking
        },
        bookingsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.kode_booking}
            });
        },
        bookingsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.kode_booking, id: val.id}
        },
        
    
        
    
        
    
        
    
        
    
        
    
}
