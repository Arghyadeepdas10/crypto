import { createSlice } from "@reduxjs/toolkit";

export const CoinSlice = createSlice({
    name: "coin",
    initialState:{
        coin:[],
    },
    reducers:{
        reset:(state)=>{
            state.coin = 0;
        }
    }
})

export const {reset} = CoinSlice.actions;
export default CoinSlice.reducer;