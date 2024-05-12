import { configureStore } from "@reduxjs/toolkit"
import { tasksApi } from "./request/taskApi"


export default configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        tasksApi.middleware,
    )
})