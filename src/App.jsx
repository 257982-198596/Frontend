import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './App.css'
import Rutas from './rutas/Rutas'
import "./estilos/estilos.css"
import { sliceClientes } from './slices/sliceClientes'


export const store = configureStore({
  reducer: {
    sliceClientes: sliceClientes.reducer
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
