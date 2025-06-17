import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import queueService from './queueService'

const initialState = {
    queue: [],
    queues: [],
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

export const getQueues = createAsyncThunk(
    'queue/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await queueService.getQueues(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getMyQueue = createAsyncThunk(
    'queue/my-queue',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await queueService.addCustomerToTheQueue(_, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const serviceSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQueues.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQueues.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.queues = actions.payload
            })
            .addCase(getQueues.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(getMyQueue.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyQueue.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.queue = actions.payload
            })
            .addCase(getMyQueue.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
    }
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer