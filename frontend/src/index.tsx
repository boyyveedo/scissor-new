import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css'; // Assuming you have a global CSS file
import reportWebVitals from './reportWebVitals';

const redirectUri = window.location.origin;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-7qo6wjkq8kn38us4.us.auth0.com'
      clientId='64I3Zv9wm0SFBaHkcAAxzqtPdnhSsMvW'
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: 'https://www.scissor-api.com',
        scope: "openid profile email read:scissor",
        responseType: "code",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
