import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from './store';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <StoreProvider>
      <App />
    </StoreProvider>,
  );
}
