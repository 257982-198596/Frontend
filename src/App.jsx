import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './App.css'
import Rutas from './rutas/Rutas'
import "./estilos/estilos.css"


export const store = configureStore({
  reducer: {
    
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
