import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './App.css'
import Rutas from './rutas/Rutas'
import "./estilos/estilos.css"
import { sliceClientes } from './slices/sliceClientes'
import { sliceTiposDocumentos } from './slices/sliceTiposDocumentos'
import { slicePaises } from './slices/slicePaises'
import { sliceServicios } from './slices/sliceServicios'
import { sliceCategorias } from './slices/sliceCategorias'
import { sliceMonedas } from './slices/sliceMonedas'
import { sliceFrecuencias } from './slices/sliceFrecuencias'
import { sliceCobros } from './slices/sliceCobros'

export const store = configureStore({
  reducer: {
    sliceClientes: sliceClientes.reducer,
    sliceTiposDocumentos: sliceTiposDocumentos.reducer,
    slicePaises: slicePaises.reducer,
    sliceServicios: sliceServicios.reducer,
    sliceCategorias: sliceCategorias.reducer,
    sliceMonedas: sliceMonedas.reducer,
    sliceFrecuencias: sliceFrecuencias.reducer,
    sliceCobros: sliceCobros.reducer,
  },
});
function App() {
  return (
    <Provider store={store}>
      <Rutas></Rutas>
    </Provider>
  );
}

export default App
