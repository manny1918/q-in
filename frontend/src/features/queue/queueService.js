import axios from 'axios'

const API_URL = '/api/queue/'

const addCustomerToTheQueue = async (turnData) => {
    const response = await axios.post(API_URL, turnData)

    return response.data
}

const getQueue = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + userId, config)

    return response.data
}

const removeFromQueue = async (turnId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + turnId, config)

    return response.data
}

const getQueues = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

const customerService = {
    addCustomerToTheQueue,
    getQueue,
    getQueues,
    removeFromQueue
}

export default customerService