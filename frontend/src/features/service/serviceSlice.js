import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { } from './serviceService'

const initialState = {
    services: [],
    service: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    messsge: ''
}

export const createService = createAsyncThunk(
    'services/create',
    async (serviceData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await serviceService.createService(serviceData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {

    }
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer