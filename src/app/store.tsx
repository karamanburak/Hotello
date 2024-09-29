import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
    persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "../features/authSlice";


const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
    reducer: {
        auth: persistedReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    REHYDRATE,]
            }
        }),
    devTools: import.meta.env.NODE_ENV !== "production",
})
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;