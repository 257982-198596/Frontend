import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  frecuencias: []
};
export const sliceFrecuencias = createSlice({
  name: "sliceFrecuencias",
  initialState,
  reducers: {
    cargarFrecuencias: (state, action) => {
      const listaFrecuencias = action.payload.frecuenciasStore;
      state.frecuencias = listaFrecuencias;
      
    }
    
    
  },
});

export const { cargarFrecuencias } =
sliceFrecuencias.actions;
export default sliceFrecuencias.reducer;
