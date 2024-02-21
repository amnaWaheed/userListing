import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Spinner from './components/Spinner';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Suspense fallback={ <CircularProgress />}>
       <BrowserRouter>
         <App />
       </BrowserRouter>
     </Suspense>
  </React.StrictMode>
);

reportWebVitals();

