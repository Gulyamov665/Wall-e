import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../config";


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    tagTypes: ['Tasks'],
    baseQuery,

    endpoints: (build) => ({

        getTasks: build.query({
            query: (id) => id ? `tasks/${id}/` : `tasks/`,
            providesTags: ['Tasks']
        }),

        getTasksStatus: build.query({
            query: () => 'status/',
            providesTags: ['Tasks']
        }),

        getFilteredTasks: build.query({
            query: ({ classification = '', status = '', start_time_after, start_time_before, executor }) => `tasks/?classification=${classification}&status=${status}&start_time_after=${start_time_after}&start_time_before=${start_time_before}&executor=${executor}`,
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

        updateTask: build.mutation({
            query: ({ body, id }) => ({
                url: `tasks/${id}/`,
                method: "PUT",
                body
            }),
            invalidatesTags: ['Tasks']
        }),

        deleteTask: build.mutation({
            query: (id) => ({
                url: `tasks/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Tasks']

        })
    })
})

export const {
    useGetTasksQuery,
    useLazyGetTasksQuery,
    useGetTasksStatusQuery,
    useLazyGetFilteredTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApi