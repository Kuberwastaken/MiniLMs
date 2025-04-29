import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StarryBackground from './components/StarryBackground';

// Pages
import Home from './pages/Home';
import Chatbots from './pages/Chatbots';
import StudyMaterials from './pages/StudyMaterials';
import ChatbotDetail from './pages/ChatbotDetail';
import NotFound from './pages/NotFound';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  position: relative;
  z-index: 2;
`;

function App() {
  return (
    <AppContainer>
      <StarryBackground />
      <Navbar />
      <MainContent>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbots" element={<Chatbots />} />
            <Route path="/chatbots/:type/:version" element={<ChatbotDetail />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;