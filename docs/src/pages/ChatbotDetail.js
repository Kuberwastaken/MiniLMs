import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaInfoCircle, FaFileCode, FaExpand, FaCompress } from 'react-icons/fa';

const ChatbotDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  font-family: 'Space Mono', monospace;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const InfoBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(94, 53, 177, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-right: 0.8rem;
  gap: 0.5rem;
`;

const ChatbotFrame = styled(motion.div)`
  width: 100%;
  background: var(--card-background);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  position: ${props => props.isFullscreen ? 'fixed' : 'relative'};
  top: ${props => props.isFullscreen ? '0' : 'auto'};
  left: ${props => props.isFullscreen ? '0' : 'auto'};
  right: ${props => props.isFullscreen ? '0' : 'auto'};
  bottom: ${props => props.isFullscreen ? '0' : 'auto'};
  z-index: ${props => props.isFullscreen ? '9999' : '1'};
  height: ${props => props.isFullscreen ? '100vh' : 'auto'};
  border-radius: ${props => props.isFullscreen ? '0' : '10px'};
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: ${props => props.isFullscreen ? '100vh' : '600px'};
  border: none;
  background-color: #111;
`;

const FullscreenButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const InfoSection = styled.div`
  background: var(--card-background);
  border-radius: 10px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: ${props => props.isFullscreen ? 'none' : 'block'};
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background: var(--card-background);
  border-radius: 10px;
  font-size: 1.2rem;
  color: var(--text-color);
`;

const ChatbotDetail = () => {
  const { type, version } = useParams();
  const [chatbotInfo, setChatbotInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadChatbotInfo = async () => {
      let path, title, fileSize, description, features;
      
      if (type === 'syneva') {
        if (version === 'latest') {
          path = '/MiniLMs/SYNEVA/SYNEVA.html';
          title = 'SYNEVA Latest';
          fileSize = '24 KB';
        } else {
          path = `/MiniLMs/SYNEVA/ARCHIVE/v${version}.html`;
          title = `SYNEVA v${version}`;
          fileSize = `${Math.floor(parseInt(version) * 1.5)} KB`;
        }
        
        description = 'SYNEVA (Synthetic Neural Verbal Assistant) is a lightweight chatbot designed to simulate conversational AI capabilities using only HTML and JavaScript.';
        features = [
          'Pattern matching for natural language responses',
          'Context awareness for more relevant replies',
          'Dynamic response generation based on user input',
          'Expandable knowledge base through JavaScript'
        ];
      } else if (type === 'abella') {
        if (version === 'v01') {
          path = '/MiniLMs/15ABELLA/v0.1.html';
          title = '15ABELLA v0.1';
          fileSize = '8 KB';
        } else if (version === 'v02') {
          path = '/MiniLMs/15ABELLA/v0.2.html';
          title = '15ABELLA v0.2';
          fileSize = '10 KB';
        } else if (version === 'poc') {
          path = '/MiniLMs/15ABELLA/POC.html';
          title = '15ABELLA POC';
          fileSize = '12 KB';
        } else if (version === 'poc-v2') {
          path = '/MiniLMs/15ABELLA/POC-v2.html';
          title = '15ABELLA POC-v2';
          fileSize = '13 KB';
        } else if (version === 'poc-v21') {
          path = '/MiniLMs/15ABELLA/POC-V2.1.html';
          title = '15ABELLA POC-V2.1';
          fileSize = '14 KB';
        } else if (version === 'poc-v22') {
          path = '/MiniLMs/15ABELLA/POC-V2.2.html';
          title = '15ABELLA POC-V2.2';
          fileSize = '15 KB';
        } else if (version === 'poc-v23') {
          path = '/MiniLMs/15ABELLA/POC-V2.3.html';
          title = '15ABELLA POC-V2.3';
          fileSize = '16 KB';
        }
        
        description = '15ABELLA is an experimental chatbot inspired by ELIZA, implementing pattern matching and response templates to create conversational experiences.';
        features = [
          'ELIZA-like pattern matching system',
          'Template-based response generation',
          'Keyword detection for contextual responses',
          'Simple memory for maintaining conversation context'
        ];
      }
      
      setChatbotInfo({
        path,
        title,
        fileSize,
        description,
        features
      });
      
      setIsLoading(false);
    };

    loadChatbotInfo();
  }, [type, version]);

  const getIframeUrl = () => {
    if (!chatbotInfo?.path) return '';
    return chatbotInfo.path;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <ChatbotDetailContainer>
      {!isFullscreen && (
        <Header>
          <BackButton to="/chatbots">
            <FaArrowLeft /> Back to Chatbots
          </BackButton>
        </Header>
      )}
      
      {isLoading ? (
        <LoadingMessage>
          Loading chatbot...
        </LoadingMessage>
      ) : chatbotInfo && (
        <>
          {!isFullscreen && (
            <>
              <Title>{chatbotInfo.title}</Title>
              <div style={{ marginBottom: '1.5rem' }}>
                <InfoBadge>
                  <FaInfoCircle /> {chatbotInfo.fileSize}
                </InfoBadge>
                <InfoBadge>
                  <FaFileCode /> HTML + JavaScript
                </InfoBadge>
              </div>
            </>
          )}
          
          <ChatbotFrame
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            isFullscreen={isFullscreen}
          >
            <FullscreenButton onClick={toggleFullscreen}>
              {isFullscreen ? <><FaCompress /> Exit Fullscreen</> : <><FaExpand /> Fullscreen</>}
            </FullscreenButton>
            <StyledIframe 
              src={getIframeUrl()}
              title={chatbotInfo.title}
              sandbox="allow-scripts allow-same-origin"
              isFullscreen={isFullscreen}
            />
          </ChatbotFrame>
          
          <InfoSection isFullscreen={isFullscreen}>
            <h2>About this Chatbot</h2>
            <p style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              {chatbotInfo.description}
            </p>
            
            <h3>Key Features</h3>
            <ul style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
              {chatbotInfo.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{feature}</li>
              ))}
            </ul>
            
            <p style={{ marginTop: '2rem' }}>
              This chatbot is implemented entirely in HTML and JavaScript, with no server-side components or external APIs.
              The file size is {chatbotInfo.fileSize}, demonstrating how compact yet functional these implementations can be.
            </p>
          </InfoSection>
        </>
      )}
    </ChatbotDetailContainer>
  );
};

export default ChatbotDetail;