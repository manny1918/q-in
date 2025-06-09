import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import serviceReducer from '../features/service/serviceSlice'
import userReducer from '../features/user/userSlice'
import customerReducer from '../features/customer/customerSlice'
import queueReducer from '../features/queue/queueSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        service: serviceReducer,
        user: userReducer,
        customer: customerReducer,
        queue: queueReducer
    }
})