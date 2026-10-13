
const { v4: uuid } = require("uuid");

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert("roles", [
      
      
      { id: getId("Administrator"), name: "Administrator", createdAt, updatedAt },
      
       
        { id: getId("User"), name: "User", createdAt, updatedAt },
      
      
      { id: getId("Public"), name: "Public", createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        { id: getId(`CREATE_${name.toUpperCase()}`), createdAt, updatedAt, name: `CREATE_${name.toUpperCase()}` },
        { id: getId(`READ_${name.toUpperCase()}`), createdAt, updatedAt, name: `READ_${name.toUpperCase()}` },
        { id: getId(`UPDATE_${name.toUpperCase()}`), createdAt, updatedAt, name: `UPDATE_${name.toUpperCase()}` },
        { id: getId(`DELETE_${name.toUpperCase()}`), createdAt, updatedAt, name: `DELETE_${name.toUpperCase()}` }
      ];
    }

    const entities = [
      "users","roles","permissions","konsumens","groomers","hewans","layanans","tarif_ukurans","jadwal_groomers","bookings","pembayarans","riwayat_groomings","notifikasis","log_aktivitas","salon_settings",,
    ];
await queryInterface.bulkInsert("permissions", entities.flatMap(createPermissions));
await queryInterface.bulkInsert("permissions", [{ id: getId(`READ_API_DOCS`), createdAt, updatedAt, name: `READ_API_DOCS` }]);
await queryInterface.bulkInsert("permissions", [{ id: getId(`CREATE_SEARCH`), createdAt, updatedAt, name: `CREATE_SEARCH`}]);


await queryInterface.sequelize.query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);


await queryInterface.bulkInsert("rolesPermissionsPermissions", [
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_USERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_USERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_USERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_USERS') },
          
    
  
    
    
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_KONSUMENS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_KONSUMENS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_KONSUMENS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_KONSUMENS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_GROOMERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_GROOMERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_GROOMERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_GROOMERS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_HEWANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_HEWANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_HEWANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_HEWANS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_LAYANANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_LAYANANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_LAYANANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_LAYANANS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_TARIF_UKURANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_TARIF_UKURANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_TARIF_UKURANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_TARIF_UKURANS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_JADWAL_GROOMERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_JADWAL_GROOMERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_JADWAL_GROOMERS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_JADWAL_GROOMERS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_BOOKINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_BOOKINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_BOOKINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_BOOKINGS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_PEMBAYARANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_PEMBAYARANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_PEMBAYARANS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_PEMBAYARANS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_RIWAYAT_GROOMINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_RIWAYAT_GROOMINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_RIWAYAT_GROOMINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_RIWAYAT_GROOMINGS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_NOTIFIKASIS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_NOTIFIKASIS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_NOTIFIKASIS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_NOTIFIKASIS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_LOG_AKTIVITAS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_LOG_AKTIVITAS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_LOG_AKTIVITAS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_LOG_AKTIVITAS') },
          
    
  
    
    
      
      
           
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_SALON_SETTINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('READ_SALON_SETTINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('UPDATE_SALON_SETTINGS') },
              { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('DELETE_SALON_SETTINGS') },
          
    
  
    
     
  
      
       
         { createdAt, updatedAt, roles_permissionsId: getId("User"), permissionId: getId('CREATE_SEARCH') },
      
      
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_USERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_USERS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_ROLES') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_ROLES') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_PERMISSIONS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_PERMISSIONS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_KONSUMENS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_KONSUMENS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_KONSUMENS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_KONSUMENS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_GROOMERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_GROOMERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_GROOMERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_GROOMERS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_HEWANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_HEWANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_HEWANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_HEWANS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_LAYANANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_LAYANANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_LAYANANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_LAYANANS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_TARIF_UKURANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_TARIF_UKURANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_TARIF_UKURANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_TARIF_UKURANS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_JADWAL_GROOMERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_JADWAL_GROOMERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_JADWAL_GROOMERS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_JADWAL_GROOMERS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_BOOKINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_BOOKINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_BOOKINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_BOOKINGS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_PEMBAYARANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_PEMBAYARANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_PEMBAYARANS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_PEMBAYARANS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_RIWAYAT_GROOMINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_RIWAYAT_GROOMINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_RIWAYAT_GROOMINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_RIWAYAT_GROOMINGS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_NOTIFIKASIS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_NOTIFIKASIS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_NOTIFIKASIS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_NOTIFIKASIS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_LOG_AKTIVITAS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_LOG_AKTIVITAS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_LOG_AKTIVITAS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_LOG_AKTIVITAS') },
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_SALON_SETTINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_SALON_SETTINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('UPDATE_SALON_SETTINGS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('DELETE_SALON_SETTINGS') },
    
    
    
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('READ_API_DOCS') },
    { createdAt, updatedAt, roles_permissionsId: getId("Administrator"), permissionId: getId('CREATE_SEARCH') },
    ]);


  await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("SuperAdmin")}' WHERE "email"='super_admin@flatlogic.com'`);
  await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("Administrator")}' WHERE "email"='admin@flatlogic.com'`);
  
   
      
       
        await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("User")}' WHERE "email"='client@hello.com'`);
        await queryInterface.sequelize.query(`UPDATE "users" SET "app_roleId"='${getId("User")}' WHERE "email"='john@doe.com'`);
      
      

}
};

