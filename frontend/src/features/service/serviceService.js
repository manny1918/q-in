import axios from 'axios'

const API_URL = '/api/services/'

const createService = async (serviceData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, serviceData, config)

    return response.data
}

const getServices = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

const getService = async (serviceId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + serviceId, config)

    return response.data
}

const serviceService = {
    createService,
    getServices,
    getService
}

export default serviceService