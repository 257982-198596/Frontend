import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mediosDePago: []
};
export const sliceMediosDePago = createSlice({
  name: "sliceMediosDePago",
  initialState,
  reducers: {
    cargarMediosDePago: (state, action) => {
      const listaMediosDePago = action.payload.mediosDePagoStore;
      state.mediosDePago = listaMediosDePago;
      
    }
    
    
  },
});

export const { cargarMediosDePago } =
sliceMediosDePago.actions;
export default sliceMediosDePago.reducer;
