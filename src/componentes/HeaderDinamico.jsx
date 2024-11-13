import { useLocation } from 'react-router-dom';
import HeaderHome from './HeaderHome';

function DynamicHeader() {
  const location = useLocation();

  let headerText;
  let header;
  switch (location.pathname) {
    case '/':
      headerText = 'Home';
      header = <HeaderHome />;
      break;
    case '/clientes':
      headerText = 'Clientes';
      break;
    case '/notificaciones':
      headerText = 'Notificaciones';
      break;
    case '/cobros':
      headerText = 'Cobros';
      break;
    case '/reportes':
      headerText = 'Reportes';
      break;
    case '/categorias':
      headerText = 'Categorías';
      break;
    default:
      headerText = 'Inicio';
  }

  return (
    <>
      {header}
    </>
  );
}

export default DynamicHeader;
