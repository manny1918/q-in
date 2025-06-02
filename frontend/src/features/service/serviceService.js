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

const serviceService = {
    createService
}

export default serviceService