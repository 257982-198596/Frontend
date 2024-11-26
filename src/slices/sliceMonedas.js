import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monedas: []
};
export const sliceMonedas = createSlice({
  name: "sliceMonedas",
  initialState,
  reducers: {
    cargarMonedas: (state, action) => {
      const listaMonedas = action.payload.monedasStore;
      state.monedas = listaMonedas;
      
    }
    
    
  },
});

export const { cargarMonedas } =
sliceMonedas.actions;
export default sliceMonedas.reducer;
