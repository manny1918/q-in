import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'

const initialState = {
    customers: [],
    customer: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    messsge: ''
}

export const createCustomer = createAsyncThunk(
    'customer/create',
    async (customerData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.createCustomer(customerData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getCustomer = createAsyncThunk(
    'customer/get',
    async (customerId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.getCustomer(customerId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getCustomers = createAsyncThunk(
    'customer/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.getCustomers(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getCustomersByUser = createAsyncThunk(
    'customer/user',
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.getCustomersByUser(userId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const userSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCustomer.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = actions.payload
            })
            .addCase(createCustomer.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(getCustomer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCustomer.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = actions.payload
            })
            .addCase(getCustomer.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(getCustomers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCustomers.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = actions.payload
            })
            .addCase(getCustomers.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(getCustomersByUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCustomersByUser.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = actions.payload
            })
            .addCase(getCustomersByUser.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
    }
})

export const { reset } = userSlice.actions
export default userSlice.reducer