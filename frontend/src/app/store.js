import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import serviceReducer from '../features/service/serviceSlice'
import userReducer from '../features/user/userSlice'
import curtomerReducer from '../features/customer/customerSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        service: serviceReducer,
        user: userReducer,
        customer: curtomerReducer
    }
})