import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {fulfilledNotify, rejectNotify, resetNotify} from "../../helpers/notifyStateHandler";

interface MainState {
    konsumens: any
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
    konsumens: [],
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

export const fetch = createAsyncThunk('konsumens/fetch', async (data: any) => {
    const { id, query } = data
    const result = await axios.get(
        `konsumens${
            query || (id ? `/${id}` : '')
        }`
    )
    return id ? result.data : {rows: result.data.rows, count: result.data.count};
})

export const deleteItemsByIds = createAsyncThunk(
  'konsumens/deleteByIds',
  async (data: any, { rejectWithValue }) => {
    try {
      await axios.post('konsumens/deleteByIds', { data });
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteItem = createAsyncThunk('konsumens/deleteKonsumens', async (id: string, { rejectWithValue }) => {
    try {
        await axios.delete(`konsumens/${id}`)
    } catch (error) {
        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
})

export const create = createAsyncThunk('konsumens/createKonsumens', async (data: any, { rejectWithValue }) => {
    try {
        const result = await axios.post(
          'konsumens',
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
  'konsumens/uploadCsv',
  async (file: File, { rejectWithValue }) => {
      try {
          const data = new FormData();
          data.append('file', file);
          data.append('filename', file.name);

          const result = await axios.post('konsumens/bulk-import', data, {
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

export const update = createAsyncThunk('konsumens/updateKonsumens', async (payload: any, { rejectWithValue }) => {
    try {
        const result = await axios.put(
          `konsumens/${payload.id}`,
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


export const konsumensSlice = createSlice({
    name: 'konsumens',
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
                state.konsumens = action.payload.rows;
                state.count = action.payload.count;
            } else {
                state.konsumens = action.payload;
            }
            state.loading = false
        })

        builder.addCase(deleteItemsByIds.pending, (state) => {
            state.loading = true;
            resetNotify(state);
        });

        builder.addCase(deleteItemsByIds.fulfilled, (state) => {
            state.loading = false;
            fulfilledNotify(state, 'Konsumens has been deleted');
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
            fulfilledNotify(state, `${'Konsumens'.slice(0, -1)} has been deleted`);
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
            fulfilledNotify(state, `${'Konsumens'.slice(0, -1)} has been created`);
        })

        builder.addCase(update.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })
        builder.addCase(update.fulfilled, (state) => {
            state.loading = false
            fulfilledNotify(state, `${'Konsumens'.slice(0, -1)} has been updated`);
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
            fulfilledNotify(state, 'Konsumens has been uploaded');
        })
        builder.addCase(uploadCsv.rejected, (state, action) => {
            state.loading = false;
            rejectNotify(state, action);
        })

        
    },
})

// Action creators are generated for each case reducer function
 export const { setRefetch } = konsumensSlice.actions

export default konsumensSlice.reducer
