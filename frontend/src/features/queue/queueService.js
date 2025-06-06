import axios from 'axios'

const API_URL = '/api/customers/add-to-queue'

const createCustomer = async (turnData) => {
    const response = await axios.post(API_URL, turnData)

    return response.data
}

const customerService = {
    createCustomer
}

export default customerService