import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientes: []
};
export const sliceClientes = createSlice({
  name: "sliceClientes",
  initialState,
  reducers: {
    cargarClientes: (state, action) => {
      
      const listaClientes = action.payload.clientesStore;
      console.log(listaClientes)
      state.clientes = listaClientes;

      console.log('state',state.clientes);
    },
    
  },
});

export const { cargarClientes } =
sliceClientes.actions;
export default sliceClientes.reducer;
