import axios from 'axios'

const API_URL = '/api/queue/'

const addCustomerToTheQueue = async (turnData) => {
    const response = await axios.post(API_URL, turnData)

    return response.data
}

const customerService = {
    addCustomerToTheQueue
}

export default customerService