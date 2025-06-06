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

const customerService = {
    createCustomer,
    getCustomer
}

export default customerService