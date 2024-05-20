import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../config";


export const tokenApi = createApi({
    reducerPath: 'tokenApi',
    tagTypes: ['Token'],
    baseQuery,

    endpoints: build => ({
        token: build.mutation({
            query: body => ({
                url: 'token/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Token']
        }),
        tokenRefresh: build.mutation({
            query: body => ({
                url: 'token/refresh/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Token']
        })
    })
})

export const { useTokenMutation, useTokenRefreshMutation } = tokenApi