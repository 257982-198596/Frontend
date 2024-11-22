import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: []
};
export const sliceCategorias = createSlice({
  name: "sliceCategorias",
  initialState,
  reducers: {
    cargarCategorias: (state, action) => {
      const listaCategorias = action.payload.categoriasStore;
      state.categorias = listaCategorias;
      
    }
    
    
  },
});

export const { cargarCategorias } =
sliceCategorias.actions;
export default sliceCategorias.reducer;
