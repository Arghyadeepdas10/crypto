import { configureStore } from "@reduxjs/toolkit";
import CoinReducer from "../Slice/CoinSlice"

export const Store = configureStore({
    reducer:{
        coin: CoinReducer,
    }
})