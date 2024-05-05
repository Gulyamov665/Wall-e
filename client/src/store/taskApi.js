import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    tagTypes: 'Tasks',
    baseQuery,

    endpoints: build => ({
        getTask: build.query({
            query: classification => `tasks/?classification=1`,
            providesTags: ['Tasks']
        }),
        addTask: build.mutation({
            query: body => ({
                url: 'tasks/',
                method: "POST",
                body
            }),
            invalidatesTags: ['Tasks']
        }),
    })
})

export const { useGetTaskQuery } = tasksApi