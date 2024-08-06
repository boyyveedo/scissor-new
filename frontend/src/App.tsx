import React from 'react';
import Navbar from './components/NavBar';
import { HomeSection } from './components/HomeSection';
import URLShortForm from './components/URLShortForm';
import Main from './components/Main';
import HistoryPage from './pages/LinkHistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<>
          <HomeSection />
          <Main />
        </>} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

    </div>
  );
};

export default App;



// // src/App.tsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/NavBar';
// import { HomeSection } from './components/HomeSection';
// import URLShortForm from './components/URLShortForm';
// import Main from './components/Main';
// import HistoryPage from './pages/LinkHistoryPage';

// const App: React.FC = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomeSection />} />
//         <Route path="/shorten" element={<URLShortForm />} />
//         <Route path="/main" element={<Main />} />
//         <Route path="/history" element={<HistoryPage />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;