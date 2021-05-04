import {createStore} from 'redux';
import rootReducer from './reducers/index'
import React from 'react'
import {Provider} from 'react-redux'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const DataStoreRedux = ({children})=>{
    return(
        <Provider store ={store}>
           {children}
        </Provider>
    )
}

export default DataStoreRedux