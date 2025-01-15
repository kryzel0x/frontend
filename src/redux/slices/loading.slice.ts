import { createSlice } from "@reduxjs/toolkit";

interface loading {
    loading: boolean,
    componentLoading: boolean,
}
const initialState: loading = {
    loading: false,
    componentLoading: false,
}

export const LoadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setComponentLoading: (state, { payload }) => {
            state.componentLoading = payload;
        },
    },
});

export const { setLoading, setComponentLoading } = LoadingSlice.actions;