import axios from 'axios'

const API_URL = '/api/customers/'

const create = async (customerData) => {
    const response = await axios.post(API_URL, customerData)

    return response.data
}

const customerService = {
    create
}

export default customerService