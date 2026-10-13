import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from "./users/usersSlice";
import rolesSlice from "./roles/rolesSlice";
import permissionsSlice from "./permissions/permissionsSlice";
import konsumensSlice from "./konsumens/konsumensSlice";
import groomersSlice from "./groomers/groomersSlice";
import hewansSlice from "./hewans/hewansSlice";
import layanansSlice from "./layanans/layanansSlice";
import tarif_ukuransSlice from "./tarif_ukurans/tarif_ukuransSlice";
import jadwal_groomersSlice from "./jadwal_groomers/jadwal_groomersSlice";
import bookingsSlice from "./bookings/bookingsSlice";
import pembayaransSlice from "./pembayarans/pembayaransSlice";
import riwayat_groomingsSlice from "./riwayat_groomings/riwayat_groomingsSlice";
import notifikasisSlice from "./notifikasis/notifikasisSlice";
import log_aktivitasSlice from "./log_aktivitas/log_aktivitasSlice";
import salon_settingsSlice from "./salon_settings/salon_settingsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

users: usersSlice,
roles: rolesSlice,
permissions: permissionsSlice,
konsumens: konsumensSlice,
groomers: groomersSlice,
hewans: hewansSlice,
layanans: layanansSlice,
tarif_ukurans: tarif_ukuransSlice,
jadwal_groomers: jadwal_groomersSlice,
bookings: bookingsSlice,
pembayarans: pembayaransSlice,
riwayat_groomings: riwayat_groomingsSlice,
notifikasis: notifikasisSlice,
log_aktivitas: log_aktivitasSlice,
salon_settings: salon_settingsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
