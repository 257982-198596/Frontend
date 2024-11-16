import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientes: [],
};
export const sliceClientes = createSlice({
  name: "sliceClientes",
  initialState,
  reducers: {
    cargarClientes: (state, action) => {
      const listaClientes = action.payload.clientesStore;
      state.clientes = listaClientes;
      console.log("state", state.clientes);
    },
    eliminarCliente: (state, action) => {
      const filtrarClientes = state.clientes.filter(
        (cliente) => cliente.id != action.payload.id
      );
      state.cliente = filtrarClientes;
    },
    actualizarClientes: (state, action) => {
      const filtrarClientes = state.clientes.filter(
        (cliente) => cliente.id != action.payload.id
      );
      state.cliente = filtrarClientes;
    },
  },
});

export const { cargarClientes, eliminarCliente, actualizarClientes } = sliceClientes.actions;
export default sliceClientes.reducer;
