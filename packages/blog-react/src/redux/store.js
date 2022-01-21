import {configureStore} from '@reduxjs/toolkit';
import {userSlice , setUserinfo} from './useSlice'

export const store = configureStore({
    reducer : userSlice.reducer
})
