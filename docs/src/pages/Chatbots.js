import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaAngleDown, FaExternalLinkAlt, FaInfoCircle, FaCode, FaGithub } from 'react-icons/fa';

const ChatbotsContainer = styled.div`
  max-width: 1200px;
  margin: 6rem auto 2rem;
  padding: 0 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
`;

const Description = styled.p`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  opacity: 0.8;
  line-height: 1.7;
`;

const ModelsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ModelSection = styled.div`
  position: relative;
`;

const ModelCard = styled.div`
  background: rgba(15, 15, 25, 0.4);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
`;

const CardSubtitle = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const ModelDescription = styled.p`
  line-height: 1.7;
  opacity: 0.8;
  margin-bottom: 2rem;
`;

const ModelDetails = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const VersionSelector = styled.div`
  position: relative;
  margin-top: 2rem;
  z-index: 5;
`;

const SelectorButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-color);
  font-family: 'Space Mono', monospace;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background: rgba(15, 15, 25, 0.95);
  border-radius: 8px;
  backdrop-filter: blur(15px);
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--text-color);
  transition: all 0.2s ease;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .version-tag {
    opacity: 0.6;
    font-size: 0.8rem;
  }
`;

const ChatbotCard = styled.div`
  margin-top: 4rem;
  background: rgba(15, 15, 25, 0.4);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-color);
  font-family: 'Space Mono', monospace;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  font-size: 1rem;
  text-decoration: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
  }
`;

const VersionInfo = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem;
  
  h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  p {
    opacity: 0.7;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const dropdownVariants = {
  hidden: { opacity: 0, y: -5, height: 0 },
  visible: { 
    opacity: 1, 
    y: 0,
    height: 'auto',
    transition: { 
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    y: -5, 
    height: 0,
    transition: { 
      duration: 0.2
    }
  }
};

const Chatbots = () => {
  const [synevaDropdownOpen, setSynevaDropdownOpen] = useState(false);
  const [abellaDropdownOpen, setAbellaDropdownOpen] = useState(false);
  const [selectedSyneva, setSelectedSyneva] = useState(null);
  const [selectedAbella, setSelectedAbella] = useState(null);

  const basePath = process.env.PUBLIC_URL || '';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setSynevaDropdownOpen(false);
        setAbellaDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const synevaVersions = [
    { 
      id: 'latest', 
      name: 'SYNEVA Latest', 
      version: 'Latest', 
      description: 'The latest version of SYNEVA with improved conversational abilities and expanded knowledge.',
      filePath: '/SYNEVA/SYNEVA.html'
    },
    { 
      id: 'v17', 
      name: 'SYNEVA v17', 
      version: 'v17', 
      description: 'Version 17 with enhanced pattern matching and response variety.',
      filePath: '/SYNEVA/ARCHIVE/v17.html'
    },
    { 
      id: 'v15', 
      name: 'SYNEVA v15', 
      version: 'v15',
      description: 'Version 15 featuring improved dialogue flow and contextual awareness.',
      filePath: '/SYNEVA/ARCHIVE/v15.html'
    },
    { 
      id: 'v12', 
      name: 'SYNEVA v12', 
      version: 'v12',
      description: 'Version 12 with initial context tracking capabilities.',
      filePath: '/SYNEVA/ARCHIVE/v12.html'
    },
    { 
      id: 'v10', 
      name: 'SYNEVA v10', 
      version: 'v10',
      description: 'Version 10 featuring expanded response templates.',
      filePath: '/SYNEVA/ARCHIVE/v10.html'
    },
    { 
      id: 'v5', 
      name: 'SYNEVA v5', 
      version: 'v5',
      description: 'Version 5, one of the early implementations with basic conversational capabilities.',
      filePath: '/SYNEVA/ARCHIVE/v5.html'
    }
  ];

  const abellaVersions = [
    { 
      id: 'poc-v23', 
      name: '15ABELLA POC-V2.3', 
      version: 'POC-V2.3',
      description: 'The latest version with optimized pattern matching and improved response generation.',
      filePath: '/15ABELLA/POC-V2.3.html'
    },
    { 
      id: 'poc-v22', 
      name: '15ABELLA POC-V2.2', 
      version: 'POC-V2.2',
      description: 'Version 2.2 with enhanced response variety and pattern recognition.',
      filePath: '/15ABELLA/POC-V2.2.html'
    },
    { 
      id: 'poc-v21', 
      name: '15ABELLA POC-V2.1', 
      version: 'POC-V2.1',
      description: 'Version 2.1 featuring improved conversation flow.',
      filePath: '/15ABELLA/POC-V2.1.html'
    },
    { 
      id: 'poc-v2', 
      name: '15ABELLA POC-v2', 
      version: 'POC-v2',
      description: 'Proof of Concept version 2 with initial pattern matching capabilities.',
      filePath: '/15ABELLA/POC-v2.html'
    },
    { 
      id: 'poc', 
      name: '15ABELLA POC', 
      version: 'POC',
      description: 'The original Proof of Concept implementation.',
      filePath: '/15ABELLA/POC.html'
    },
    { 
      id: 'v02', 
      name: '15ABELLA v0.2', 
      version: 'v0.2',
      description: 'Version 0.2 with basic conversational abilities.',
      filePath: '/15ABELLA/v0.2.html'
    },
    { 
      id: 'v01', 
      name: '15ABELLA v0.1', 
      version: 'v0.1',
      description: 'The initial version of 15ABELLA.',
      filePath: '/15ABELLA/v0.1.html'
    }
  ];

  useEffect(() => {
    if (!selectedSyneva && synevaVersions.length > 0) {
      setSelectedSyneva(synevaVersions[0]);
    }
  }, [selectedSyneva, synevaVersions]);

  const handleSelectSyneva = (version) => {
    setSelectedSyneva(version);
    setSynevaDropdownOpen(false);
  };

  const handleSelectAbella = (version) => {
    setSelectedAbella(version);
    setAbellaDropdownOpen(false);
  };

  return (
    <ChatbotsContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Chatbot Implementations
        </Title>
        <Description>
          Explore our interactive language model implementations. Select a chatbot version to
          interact with it directly in your browser.
        </Description>
      </PageHeader>
      
      <ModelsWrapper>
        {/* SYNEVA Section */}
        <ModelSection>
          <ModelCard>
            <CardHeader>
              <CardTitle>
                <FaRobot /> SYNEVA
              </CardTitle>
              <CardSubtitle>
                (Synthetic Neural Engine for Verbal Adaptability)
              </CardSubtitle>
              <ModelDescription>
                An experimental chatbot with pattern matching and intelligent response generation, built to explore language model evolution.
              </ModelDescription>
            </CardHeader>
            <CardBody>
              <ModelDetails>
                <DetailItem>
                  <FaCode /> Built with HTML & JavaScript
                </DetailItem>
                <DetailItem>
                  <FaInfoCircle /> Multiple versions available
                </DetailItem>
              </ModelDetails>
              
              <VersionSelector className="dropdown-container">
                <SelectorButton 
                  onClick={() => setSynevaDropdownOpen(!synevaDropdownOpen)}
                  isOpen={synevaDropdownOpen}
                >
                  {selectedSyneva ? selectedSyneva.name : 'Select a version'}
                  <FaAngleDown />
                </SelectorButton>
                
                <AnimatePresence>
                  {synevaDropdownOpen && (
                    <DropdownMenu
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {synevaVersions.map(version => (
                        <DropdownItem 
                          key={version.id}
                          onClick={() => handleSelectSyneva(version)}
                          className={selectedSyneva?.id === version.id ? 'active' : ''}
                        >
                          {version.name}
                          <span className="version-tag">{version.version}</span>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </VersionSelector>
              
              {selectedSyneva && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <VersionInfo>
                    <h4>About {selectedSyneva.name}</h4>
                    <p>{selectedSyneva.description}</p>
                  </VersionInfo>
                  
                  <LinkButton 
                    href={`${basePath}${selectedSyneva.filePath}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Open Chatbot
                  </LinkButton>
                </motion.div>
              )}
            </CardBody>
          </ModelCard>
        </ModelSection>
        
        {/* 15ABELLA Section */}
        <ModelSection>
          <ModelCard>
            <CardHeader>
              <CardTitle>
                <FaRobot /> 15ABELLA
              </CardTitle>
              <CardSubtitle>
                (15kB Adaptive Behavioral Engine for Low-memory Linguistic Applications)
              </CardSubtitle>
              <ModelDescription>
                An ELIZA-inspired chatbot that demonstrates classic AI conversation techniques with modern enhancements.
              </ModelDescription>
            </CardHeader>
            <CardBody>
              <ModelDetails>
                <DetailItem>
                  <FaCode /> Built with HTML & JavaScript
                </DetailItem>
                <DetailItem>
                  <FaInfoCircle /> Proof-of-concept versions available
                </DetailItem>
              </ModelDetails>
              
              <VersionSelector className="dropdown-container">
                <SelectorButton 
                  onClick={() => setAbellaDropdownOpen(!abellaDropdownOpen)}
                  isOpen={abellaDropdownOpen}
                >
                  {selectedAbella ? selectedAbella.name : 'Select a version'}
                  <FaAngleDown />
                </SelectorButton>
                
                <AnimatePresence>
                  {abellaDropdownOpen && (
                    <DropdownMenu
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {abellaVersions.map(version => (
                        <DropdownItem 
                          key={version.id}
                          onClick={() => handleSelectAbella(version)}
                          className={selectedAbella?.id === version.id ? 'active' : ''}
                        >
                          {version.name}
                          <span className="version-tag">{version.version}</span>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </VersionSelector>
              
              {selectedAbella && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <VersionInfo>
                    <h4>About {selectedAbella.name}</h4>
                    <p>{selectedAbella.description}</p>
                  </VersionInfo>
                  
                  <LinkButton 
                    href={`${basePath}${selectedAbella.filePath}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Open Chatbot
                  </LinkButton>
                </motion.div>
              )}
            </CardBody>
          </ModelCard>
        </ModelSection>
      </ModelsWrapper>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '3rem' }}>Featured Implementations</h2>
        
        <ChatbotCard>
          <CardHeader>
            <CardTitle>
              <FaRobot /> Latest SYNEVA
            </CardTitle>
            <CardSubtitle>
              The most advanced version of our primary chatbot
            </CardSubtitle>
          </CardHeader>
          <CardContent>
            <p>SYNEVA represents our main chatbot implementation, featuring pattern matching, context awareness, and response generation capabilities. The latest version includes improvements in conversation flow and knowledge base.</p>
            
            <LinkButton 
              href={`${basePath}/SYNEVA/SYNEVA.html`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt /> Try SYNEVA Latest
            </LinkButton>
          </CardContent>
        </ChatbotCard>
        
        <ChatbotCard style={{ marginTop: '2rem' }}>
          <CardHeader>
            <CardTitle>
              <FaRobot /> Latest 15ABELLA
            </CardTitle>
            <CardSubtitle>
              Our most compact yet powerful chatbot
            </CardSubtitle>
          </CardHeader>
          <CardContent>
            <p>15ABELLA is our ultra-compact chatbot implementation, designed to demonstrate efficient pattern matching in a minimal footprint. The latest POC-V2.3 version includes enhanced response capabilities while maintaining its small size.</p>
            
            <LinkButton 
              href={`${basePath}/15ABELLA/POC-V2.3.html`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt /> Try 15ABELLA POC-V2.3
            </LinkButton>
          </CardContent>
        </ChatbotCard>
      </motion.div>
    </ChatbotsContainer>
  );
};

export default Chatbots;