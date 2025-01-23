import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviciosActivosCliente: [],
};

export const sliceAreaClientes = createSlice({
  name: "sliceAreaClientes",
  initialState,
  reducers: {
    cargarServiciosActivos: (state, action) => {
      state.serviciosActivosCliente = action.payload.servicios;
    },
    
  },
});

export const { cargarServiciosActivos } = sliceAreaClientes.actions;
export default sliceAreaClientes.reducer;
