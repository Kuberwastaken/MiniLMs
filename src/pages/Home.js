import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot, FaBook, FaGithub, FaCode, FaBrain, FaGraduationCap, FaHistory } from 'react-icons/fa';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 4rem;
  min-height: 80vh;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  max-width: 700px;
  margin-bottom: 3rem;
  line-height: 1.7;
  opacity: 0.8;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(motion.button)`
  background: ${props => props.primary ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: var(--text-color);
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.primary ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 1.5rem;
  margin-bottom: 6rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(6, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const BentoBox = styled(motion.div)`
  background: var(--card-background);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(50, 50, 70, 0.5);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    border-color: var(--accent-color);
    transform: translateY(-5px);
    box-shadow: 0 0 25px rgba(220, 220, 240, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.gradient || 'linear-gradient(135deg, rgba(40, 40, 60, 0.6), rgba(20, 20, 40, 0.6))'};
    opacity: 0.1;
    z-index: -1;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 0.15;
  }
`;

const MainBox = styled(BentoBox)`
  grid-column: span 8;
  grid-row: span 2;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const MediumBox = styled(BentoBox)`
  grid-column: span 4;
  grid-row: span 2;
  
  @media (max-width: 992px) {
    grid-column: span 3;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const SmallBox = styled(BentoBox)`
  grid-column: span 4;
  grid-row: span 1;
  
  @media (max-width: 992px) {
    grid-column: span 3;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const BoxTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.color || 'var(--accent-color)'};
`;

const BoxContent = styled.p`
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const BoxLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  margin-top: auto;
  
  &:after {
    content: '→';
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }
  
  &:hover:after {
    opacity: 1;
    transform: translateX(3px);
  }
`;

const AnimatedText = ({ children }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
};

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
        >
          MiniLMs Project
        </Title>
        
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Exploring the fascinating world of small language models through 
          interactive chatbots, research, and educational resources.
        </Subtitle>
        
        <ButtonContainer
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <Button
            as={Link}
            to="/chatbots"
            primary
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRobot /> Explore Implementations
          </Button>
          
          <Button
            as={Link}
            to="/study-materials"
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBook /> Study Resources
          </Button>
          
          <Button
            as="a"
            href="https://github.com/Kuberwastaken/MiniLMs"
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub /> View on GitHub
          </Button>
        </ButtonContainer>
      </HeroSection>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <BentoGrid>
          <MainBox 
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            gradient="linear-gradient(135deg, #2a2a3a, #1a1a2a)"
          >
            <BoxTitle>
              <FaRobot /> Interactive Chatbots
            </BoxTitle>
            <BoxContent>
              Explore our collection of language models implemented as web chatbots. From simple pattern matching to more advanced response generation techniques, each chatbot demonstrates different approaches to natural language processing.
            </BoxContent>
            <BoxContent>
              The project features two main families: SYNEVA and 15ABELLA, each representing different implementation strategies and capabilities. Try them out directly in your browser with no installation required.
            </BoxContent>
            <BoxLink to="/chatbots">
              Explore implementations
            </BoxLink>
          </MainBox>
          
          <MediumBox 
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            gradient="linear-gradient(135deg, #252535, #151525)"
          >
            <IconWrapper color="var(--accent-color)">
              <FaGraduationCap />
            </IconWrapper>
            <BoxTitle>Learn & Study</BoxTitle>
            <BoxContent>
              Access a curated collection of educational resources about language models, neural networks, and AI concepts.
            </BoxContent>
            <BoxLink to="/study-materials">
              Browse resources
            </BoxLink>
          </MediumBox>
          
          <SmallBox 
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            gradient="linear-gradient(135deg, #202030, #181828)"
          >
            <BoxTitle>
              <FaCode />
            </BoxTitle>
            <BoxContent>
              Minimal HTML and JavaScript implementations of conversational agents.
            </BoxContent>
            <BoxLink as="a" href="https://github.com/Kuberwastaken/MiniLMs" target="_blank">
              View source
            </BoxLink>
          </SmallBox>
          
          <SmallBox 
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            gradient="linear-gradient(135deg, #1C1C2C, #121222)"
          >
            <BoxTitle>
              <FaBrain />
            </BoxTitle>
            <BoxContent>
              Explore neural network concepts and implementations from scratch.
            </BoxContent>
            <BoxLink to="/study-materials">
              Learn more
            </BoxLink>
          </SmallBox>

          <SmallBox 
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <BoxTitle>
              <FaHistory /> 
            </BoxTitle>
            <BoxContent>
              Follow the project's progress and insights through our development logs.
            </BoxContent>
            <BoxLink to="/devlogs">
              View Devlogs
            </BoxLink>
          </SmallBox>
        </BentoGrid>
      </motion.div>
    </HomeContainer>
  );
};

export default Home;