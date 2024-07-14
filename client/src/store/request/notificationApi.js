import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../config";

const URL = import.meta.env.VITE_NOTIFICATION_URL


export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    tagTypes: ['notification'],
    baseQuery,


    endpoints: build => ({
        sendMessage: build.mutation({
            query: body => ({
                url: URL + 'send_message/',
                method: "POST",
                body,
            }),
            invalidatesTags: ['notification']
        }),
    })
})

export const { useSendMessageMutation } = notificationApi