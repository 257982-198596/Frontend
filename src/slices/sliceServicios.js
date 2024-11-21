import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicios: [],
};
export const sliceServicios = createSlice({
  name: "sliceServicios",
  initialState,
  reducers: {
    //cargar servicios a store
    cargarServicios: (state, action) => {
      const listaServicios = action.payload.serviciosStore;
      state.servicios = listaServicios;
    },
    //eliminar servicio de store
    eliminarServicio: (state, action) => {
      const filtrarServicios = state.servicios.filter(
        (servicio) => servicio.id != action.payload.id
      );
      state.servicios = filtrarServicios;
    },
    //alta SERVICIO en store
    crearServicios: (state, action) => {
      const servicioEditado = action.payload;
      const nuevaListaServicios = [...state.servicios, servicioEditado];

      console.log("nuevaListaServicios", nuevaListaServicios);
      state.servicios = nuevaListaServicios;
    },
    //update cliente en store
    actualizarServicios: (state, action) => {
      const servicioEditado = action.payload
      const filtrarServicios = state.servicios.filter(
        (servicio) => servicio.id != action.payload.id
      );
      const nuevaListaServicios = [...filtrarServicios, servicioEditado];
      state.servicios = nuevaListaServicios.sort((a, b) => a.id - b.id);
    },
  },
});

export const {
    cargarServicios,
    crearServicios,
    actualizarServicios,
    eliminarServicio
} = sliceServicios.actions;
export default sliceServicios.reducer;
