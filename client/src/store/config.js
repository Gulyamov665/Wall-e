
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURL = import.meta.env.VITE_BASE_URL
// const admins = 'admins/'

const getToken = () => {
    const authTokens = JSON.parse(localStorage.getItem('auth'));
    return authTokens ? `Bearer ${authTokens}` : ''
}


export const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
            headers.set('Authorization', token)
        }

        return headers
    },
})