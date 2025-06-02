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