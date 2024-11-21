import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paises: []
};
export const slicePaises = createSlice({
  name: "slicePaises",
  initialState,
  reducers: {
    cargarPaises: (state, action) => {
      const listaPaises = action.payload.paisesStore;
      state.paises = listaPaises;
      
    }
    
    
  },
});

export const { cargarPaises } =
slicePaises.actions;
export default slicePaises.reducer;
