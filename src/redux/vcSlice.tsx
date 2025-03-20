import { createSlice } from "@reduxjs/toolkit";
const VcSlice = createSlice({
    name: "app",
    initialState: {
        logo: null
    },
    reducers: {
        setLogo: (state, action) => {
            if (action.payload && !action.payload.startsWith("Content"))
                state.logo = action.payload;
            else
                state.logo = null;
        }
    }
});
export const { setLogo } = VcSlice.actions;
export default VcSlice.reducer;