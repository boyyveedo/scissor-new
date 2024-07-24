import React from 'react';
import Navbar from './components/NavBar';
import { HomeSection } from './components/HomeSection';
import URLShortForm from './components/URLShortForm';
import Main from './components/Main';


const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HomeSection />
      <Main />
    </div>
  );
};

export default App;
