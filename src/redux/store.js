import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import taskReducer from './task/taskReducer'

const persistConfig = {
    key: 'taskReducer',
    storage: storage
}

const pReducer = persistReducer(persistConfig, taskReducer)
const store = createStore(pReducer)
const persistor = persistStore(store)

export { persistor, store }