import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    users: [],
    viewUser: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    messsge: ''
}

export const getUsers = createAsyncThunk(
    'users/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userService.getUsers(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getUser = createAsyncThunk(
    'users/get',
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userService.getUser(userId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const deleteUser = createAsyncThunk(
    'users/delete',
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userService.deleteUser(userId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.viewUser = actions.payload
            })
            .addCase(getUser.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = actions.payload
            })
            .addCase(getUsers.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteUser.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messsge = actions.payload
            })
    }
})

export const { reset } = userSlice.actions
export default userSlice.reducer