import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../config";


export const classificationApi = createApi({
    reducerPath: 'classificationApi',
    tagTypes: ['classification'],
    baseQuery,

    endpoints: build => ({
        getClassification: build.query({
            query: () => 'classification/',
            providesTags: ['classification']
        }),

        addClassification: build.mutation({
            query: body => ({
                url: 'classification/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['classification']
        }),

        updateClassification: build.mutation({
            query: ({ body, id }) => ({
                url: `classification/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['classification']
        }),

        deleteClassification: build.mutation({
            query: id => ({
                url: `classification/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['classification']
        })
    })
})


export const {
    useGetClassificationQuery,
    useLazyGetClassificationQuery,
    useAddClassificationMutation,
    useDeleteClassificationMutation,
    useUpdateClassificationMutation,
} = classificationApi