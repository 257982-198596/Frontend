import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: []
};

export const sliceCategorias = createSlice({
  name: "sliceCategorias",
  initialState,
  reducers: {
    // cargar categorias a store
    cargarCategorias: (state, action) => {
      const listaCategorias = action.payload.categoriasStore;
      state.categorias = listaCategorias;
    },
    // eliminar categoria de store
    eliminarCategoria: (state, action) => {
      const filtrarCategorias = state.categorias.filter(
        (categoria) => categoria.id !== action.payload.id
      );
      state.categorias = filtrarCategorias;
    },
    // alta categoria en store
    crearCategoria: (state, action) => {
      const categoriaNueva = action.payload;
      const nuevaListaCategorias = [...state.categorias, categoriaNueva];
      state.categorias = nuevaListaCategorias;
    },
    // actualizar categoria en store
    actualizarCategoria: (state, action) => {
      const categoriaEditada = action.payload;
      const filtrarCategorias = state.categorias.filter(
        (categoria) => categoria.id !== action.payload.id
      );
      const nuevaListaCategorias = [...filtrarCategorias, categoriaEditada];
      state.categorias = nuevaListaCategorias.sort((a, b) => a.id - b.id);
    },
  },
});

export const {
  cargarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} = sliceCategorias.actions;

export default sliceCategorias.reducer;
