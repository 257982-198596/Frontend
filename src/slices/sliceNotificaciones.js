import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificaciones: []
};
export const sliceNotificaciones = createSlice({
  name: "sliceNotificaciones",
  initialState,
  reducers: {
    cargarNotificaciones: (state, action) => {
      const listaNotificaciones = action.payload.notificacionesStore;
      state.notificaciones = listaNotificaciones;
      
    }
    
    
  },
});

export const { cargarNotificaciones } =
sliceNotificaciones.actions;
export default sliceNotificaciones.reducer;
