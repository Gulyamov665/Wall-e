import { configureStore } from "@reduxjs/toolkit"
import { tasksApi } from "./request/taskApi"
import { usersApi } from "./request/usersApi"
import { classificationApi } from "./request/classificationApi"
import { commentsApi } from "./request/commentsApi"
import { tokenApi } from "./request/Token"
import { notificationApi } from "./request/notificationApi"


export default configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [classificationApi.reducerPath]: classificationApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [tokenApi.reducerPath]: tokenApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        tasksApi.middleware,
        usersApi.middleware,
        classificationApi.middleware,
        commentsApi.middleware,
        tokenApi.middleware,
        notificationApi.middleware,
    )
})