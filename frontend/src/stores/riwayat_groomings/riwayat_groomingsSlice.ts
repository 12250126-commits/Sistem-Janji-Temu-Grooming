import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {fulfilledNotify, rejectNotify, resetNotify} from "../../helpers/notifyStateHandler";

interface MainState {
    riwayat_groomings: any
    loading: boolean
    count: number
    refetch: boolean;
    rolesWidgets: any[];
    notify: {
        showNotification: boolean
        textNotification: string
        typeNotification: string
    }
}

const initialState: MainState = {
    riwayat_groomings: [],
    loading: false,
    count: 0,
    refetch: false,
    rolesWidgets: [],
    notify: {
        showNotification: false,
        textNotification: '',
        typeNotification: 'warn',
    },
}

export const fetch = createAsyncThunk('riwayat_groomings/fetch', async (data: any) => {
    const { id, query } = data
    const result = await axios.get(
        `riwayat_groomings${
            query || (id ? `/${id}` : '')
        }`
    )
    return id ? result.data : {rows: result.data.rows, count: result.data.count};
})

export const deleteItemsByIds = createAsyncThunk(
  'riwayat_groomings/deleteByIds',
  async (data: any, { rejectWithValue }) => {
    try {
      await axios.post('riwayat_groomings/deleteByIds', { data });
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteItem = createAsyncThunk('riwayat_groomings/deleteRiwayat_groomings', async (id: string, { rejectWithValue }) => {
    try {
        await axios.delete(`riwayat_groomings/${id}`)
    } catch (error) {
        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
})

export const create = createAsyncThunk('riwayat_groomings/createRiwayat_groomings', async (data: any, { rejectWithValue }) => {
    try {
        const result = await axios.post(
          'riwayat_groomings',
          { data }
        )
        return result.data
    } catch (error) {
        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
})

export const uploadCsv = createAsyncThunk(
  'riwayat_groomings/uploadCsv',
  async (file: File, { rejectWithValue }) => {
      try {
          const data = new FormData();
          data.append('file', file);
          data.append('filename', file.name);

          const result = await axios.post('riwayat_groomings/bulk-import', data, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          return result.data;
      } catch (error) {
          if (!error.response) {
              throw error;
          }

          return rejectWithValue(error.response.data);
      }
  },
);

export const update = createAsyncThunk('riwayat_groomings/updateRiwayat_groomings', async (payload: any, { rejectWithValue }) => {
    try {
        const result = await axios.put(
          `riwayat_groomings/${payload.id}`,
          { id: payload.id, data: payload.data }
        )
        return result.data
    } catch (error) {
        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
})


export const riwayat_groomingsSlice = createSlice({
    name: 'riwayat_groomings',
    initialState,
    reducers: {
        setRefetch: (state, action: PayloadAction<boolean>) => {
            state.refetch = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetch.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })
        builder.addCase(fetch.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(fetch.fulfilled, (state, action) => {
            if (action.payload.rows && action.payload.count >= 0) {
                state.riwayat_groomings = action.payload.rows;
                state.count = action.payload.count;
            } else {
                state.riwayat_groomings = action.payload;
            }
            state.loading = false
        })

        builder.addCase(deleteItemsByIds.pending, (state) => {
            state.loading = true;
            resetNotify(state);
        });

        builder.addCase(deleteItemsByIds.fulfilled, (state) => {
            state.loading = false;
            fulfilledNotify(state, 'Riwayat_groomings has been deleted');
        });

        builder.addCase(deleteItemsByIds.rejected, (state, action) => {
            state.loading = false;
            rejectNotify(state, action);
        });

        builder.addCase(deleteItem.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })

        builder.addCase(deleteItem.fulfilled, (state) => {
            state.loading = false
            fulfilledNotify(state, `${'Riwayat_groomings'.slice(0, -1)} has been deleted`);
        })

        builder.addCase(deleteItem.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(create.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })
        builder.addCase(create.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(create.fulfilled, (state) => {
            state.loading = false
            fulfilledNotify(state, `${'Riwayat_groomings'.slice(0, -1)} has been created`);
        })

        builder.addCase(update.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })
        builder.addCase(update.fulfilled, (state) => {
            state.loading = false
            fulfilledNotify(state, `${'Riwayat_groomings'.slice(0, -1)} has been updated`);
        })
        builder.addCase(update.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(uploadCsv.pending, (state) => {
            state.loading = true;
            resetNotify(state);
        })
        builder.addCase(uploadCsv.fulfilled, (state) => {
            state.loading = false;
            fulfilledNotify(state, 'Riwayat_groomings has been uploaded');
        })
        builder.addCase(uploadCsv.rejected, (state, action) => {
            state.loading = false;
            rejectNotify(state, action);
        })

        
    },
})

// Action creators are generated for each case reducer function
 export const { setRefetch } = riwayat_groomingsSlice.actions

export default riwayat_groomingsSlice.reducer
