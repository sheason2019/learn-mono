import {createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : 'userinfo',
    initialState : {
        userinfo : 0
    },
    reducers : {
        setUserinfo : (state,action) => {
            state.userinfo = action.payload;
        }
    }
})

export const { setUserinfo } = userSlice.actions;

