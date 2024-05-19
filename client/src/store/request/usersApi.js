import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../config"

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['users'],
    baseQuery,

    endpoints: build => ({
        getUsers: build.query({
            query: () => 'user-profile/',
            providesTags: ['users']
        }),

    })
})

export const { useGetUsersQuery } = usersApi