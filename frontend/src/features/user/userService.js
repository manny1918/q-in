import axios from 'axios'

const API_URL = '/api/users/'


const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteUser = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + userId, config)

    return response.data
}

const updateUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + `/${userData.id}`, userData.userData, config)
    return response.data
}

const getUser = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + userId, config)

    return response.data
}


const userService = {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}

export default userService