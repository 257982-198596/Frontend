import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tiposDocumentos: []
};
export const sliceTiposDocumentos = createSlice({
  name: "sliceTiposDocumentos",
  initialState,
  reducers: {
    cargarTiposDocumentos: (state, action) => {
      const listaTiposDocumentos = action.payload.tiposDocumentosStore;
      state.tiposDocumentos = listaTiposDocumentos;
      
    }
    
    
  },
});

export const { cargarTiposDocumentos } =
sliceTiposDocumentos.actions;
export default sliceTiposDocumentos.reducer;
