import axios from 'axios'

const API_URL = '/api/customers/'

const createCustomer = async (customerData) => {
    const response = await axios.post(API_URL, customerData)

    return response.data
}

const getCustomer = async (customerId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + customerId, config)

    return response.data
}

const getCustomers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

const getCustomersByUser = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + userId, config)

    return response.data
}

const customerService = {
    createCustomer,
    getCustomers,
    getCustomer,
    getCustomersByUser
}

export default customerService