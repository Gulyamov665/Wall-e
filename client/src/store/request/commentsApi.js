import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../config";


export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    tagTypes: ['comments', 'Tasks'],
    baseQuery,

    endpoints: build => ({
        getComments: build.query({
            query: (id) => id ? `tasks-comments/?task=${id}` : `tasks-comments/`,
            providesTags: ['comments']
        }),
        AddComments: build.mutation({
            query: body => ({
                url: 'tasks-comments/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['comments']
        }),
        updateComment: build.mutation({
            query: ({ body, id }) => ({
                url: `tasks-comments/${id}/`,
                method: "PUT",
                body
            }),
            invalidatesTags: ['comments']
        }),

        deleteComment: build.mutation({
            query: id => ({
                url: `tasks-comments/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['comments']
        })
    })
})

export const {
    useGetCommentsQuery,
    useAddCommentsMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useLazyGetCommentsQuery,
} = commentsApi