import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientes: [],
};
export const sliceClientes = createSlice({
  name: "sliceClientes",
  initialState,
  reducers: {
    //cargar clientes a store
    cargarClientes: (state, action) => {
      const listaClientes = action.payload.clientesStore;
      state.clientes = listaClientes;
    },
    //eliminar cliente de store
    eliminarCliente: (state, action) => {
      const filtrarClientes = state.clientes.filter(
        (cliente) => cliente.id != action.payload.id
      );
      state.clientes = filtrarClientes;
    },
    //alta cliente en store
    crearClientes: (state, action) => {
      const clienteEditado = action.payload;
      const nuevaListaClientes = [...state.clientes, clienteEditado];
      //const filtrarClientes = state.clientes.filter(        (cliente) => cliente.id != action.payload.id      );
      //const nuevosClientes = [...filtrarClientes, clienteEditado];
      console.log("nuevaListaClientes", nuevaListaClientes);
      state.clientes = nuevaListaClientes;
    },
    //update cliente en store
    actualizarClientes: (state, action) => {
      const clienteEditado = action.payload;

      const filtrarClientes = state.clientes.filter(
        (cliente) => cliente.id != action.payload.id
      );
      const nuevaListaClientes = [...filtrarClientes, clienteEditado];
      state.clientes = nuevaListaClientes.sort((a, b) => a.id - b.id);
    },
  },
});

export const {
  cargarClientes,
  eliminarCliente,
  crearClientes,
  actualizarClientes,
} = sliceClientes.actions;
export default sliceClientes.reducer;
