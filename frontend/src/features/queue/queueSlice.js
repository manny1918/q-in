import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import queueService from './queueService'

const initialState = {
    services: [],
    service: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    messsge: ''
}

export const addCustomerToQueue = createAsyncThunk(
    'queue/add-customer',
    async (turnData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await queueService.addCustomerToTheQueue(turnData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getServices = createAsyncThunk(
    'services/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await serviceService.getServices(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getService = createAsyncThunk(
    'services/get',
    async (serviceId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await serviceService.getService(serviceId, token)
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
        builder
            .addCase(createService.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createService.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createService.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(getServices.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getServices.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.services = actions.payload
            })
            .addCase(getServices.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(getService.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getService.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.service = actions.payload
            })
            .addCase(getService.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
    }
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer