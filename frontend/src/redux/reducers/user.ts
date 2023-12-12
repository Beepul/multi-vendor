import { createReducer, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser: (state, action) => {

        }
    }
})


export const {loadUser} = userSlice.actions 

export default userSlice