import { createSlice } from "@reduxjs/toolkit";
const VcSlice = createSlice({
    name: "app",
    initialState: {
        logo: null,
        userInfo: null
    },
    reducers: {
        setLogo: (state, action) => {
            if (action.payload && !action.payload.startsWith("Content"))
                state.logo = action.payload;
            else
                state.logo = null;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
});
export const { setLogo, setUserInfo } = VcSlice.actions;
export default VcSlice.reducer;