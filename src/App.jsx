import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './App.css'
import Rutas from './rutas/Rutas'
import "./estilos/estilos.css"
import { sliceClientes } from './slices/sliceClientes'
import { sliceTiposDocumentos } from './slices/sliceTiposDocumentos'
import { slicePaises } from './slices/slicePaises'

export const store = configureStore({
  reducer: {
    sliceClientes: sliceClientes.reducer,
    sliceTiposDocumentos: sliceTiposDocumentos.reducer,
    slicePaises: slicePaises.reducer
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
