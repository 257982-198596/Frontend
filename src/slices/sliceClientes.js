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
      state.clientes = filtrarClientes;
    },
    crearClientes: (state, action) => {
      const clienteEditado = action.payload;
      const nuevaListaClientes = [...state.clientes, clienteEditado];
      //const filtrarClientes = state.clientes.filter(        (cliente) => cliente.id != action.payload.id      );
      //const nuevosClientes = [...filtrarClientes, clienteEditado];
      console.log('nuevaListaClientes', nuevaListaClientes)
      state.clientes = nuevaListaClientes;
    },
    actualizarClientes: (state, action) => {
      const clienteEditado = action.payload;
      const nuevaListaClientes = [...state.clientes, clienteEditado];
      //const filtrarClientes = state.clientes.filter(        (cliente) => cliente.id != action.payload.id      );
      //const nuevosClientes = [...filtrarClientes, clienteEditado];
      console.log('nuevaListaClientes', nuevaListaClientes)
      state.clientes = nuevaListaClientes;
    },
  },
});

export const { cargarClientes, eliminarCliente, crearClientes, actualizarClientes } =
  sliceClientes.actions;
export default sliceClientes.reducer;
