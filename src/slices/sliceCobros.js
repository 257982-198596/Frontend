import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cobros: []
};
export const sliceCobros = createSlice({
  name: "sliceCobros",
  initialState,
  reducers: {
    cargarCobros: (state, action) => {
      const listaCobros = action.payload.cobrosStore;
      state.cobros = listaCobros;   
    },
    eliminarCobro: (state, action) => {
      const filtrarCobros = state.cobros.filter(
        (cobro) => cobro.id != action.payload.id
      );
      state.cobros = filtrarCobros;
    },
    //alta cobro en store
    crearCobro: (state, action) => {
      const cobroEditado = action.payload;
      const nuevaListaCobros = [...state.cobros, cobroEditado];

      console.log("nuevaListaCobros", nuevaListaCobros);
      state.cobros = nuevaListaCobros;
    },
    
    
  },
});

export const { cargarCobros, eliminarCobro, crearCobro } =
sliceCobros.actions;
export default sliceCobros.reducer;
