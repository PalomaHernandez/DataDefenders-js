import axios, {type AxiosInstance} from 'axios'

const apiUrl: string = 'https://unimanager.test'

export const axiosLoginInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        Accept: 'application/json'
    }
})

export const axiosApiInstance: AxiosInstance = axios.create({
    baseURL: `${apiUrl}/api`,
    withCredentials: true,
    headers: {
        Accept: 'application/json'
    }
})