import { createSlice } from "@reduxjs/toolkit";

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
        userDetails: {},
        token: "",
        tempToken: "",
        deploying: false,
        remainingTime: 0,
        aptBalance: 0,
        aptDecimals: 8,
        krzBalance: 0,
        krzDecimals: 6
    },

    reducers: {
        setUserDetails: (state, param) => {
            const { payload } = param;
            state.userDetails = payload;
        },

        email: (state, param) => {
            const { payload } = param;
            state.email = payload;
        },
       
        token: (state, param) => {
            const { payload } = param;
            state.token = payload;
        },
        setTempToken: (state, param) => {
            const { payload } = param;
            state.tempToken = payload;
        },
        setDeploying: (state, param) => {
            const { payload } = param;
            state.deploying = payload;
        },
        setRemainingTime: (state, param) => {
            const { payload } = param;
            state.remainingTime = payload;
        },
        logoutUser: (state) => {
            state.token = "";
            state.userDetails = {};
            state.krzBalance = 0;
            state.aptBalance = 0;
            state.tempToken = "";
        },
        setAptBalance: (state, param) => {
            const { payload } = param;
            state.aptBalance = payload;
        },
        setAptDecimals: (state, param) => {
            const { payload } = param;
            state.aptDecimals = payload;
        },
        setKrzBalance: (state, param) => {
            const { payload } = param;
            state.krzBalance = payload;
        },
        setKrzDecimals: (state, param) => {
            const { payload } = param;
            state.krzDecimals = payload;
        },
    }
})

/**ACTIONS FOR SLICE*/
export const { setUserDetails, email, logoutUser, token, setTempToken, setDeploying, setRemainingTime, setAptBalance, setKrzBalance, setAptDecimals, setKrzDecimals } = UserSlice.actions

