import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaRobot, FaBook } from 'react-icons/fa';

const NotFoundContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(motion.button)`
  background: ${props => props.primary ? 'var(--secondary-color)' : 'transparent'};
  color: var(--text-color);
  border: ${props => props.primary ? 'none' : '2px solid var(--secondary-color)'};
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? 'var(--primary-color)' : 'rgba(94, 53, 177, 0.2)'};
    transform: translateY(-3px);
  }
`;

const ErrorCode = styled(motion.div)`
  font-size: 8rem;
  font-weight: bold;
  opacity: 0.2;
  margin-bottom: 1rem;
  font-family: 'Space Mono', monospace;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        404
      </ErrorCode>
      
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Page Not Found
      </Title>
      
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Description>
      
      <ButtonContainer>
        <Button
          as={Link}
          to="/"
          primary
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <FaHome /> Go Home
        </Button>
        
        <Button
          as={Link}
          to="/chatbots"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <FaRobot /> Try Chatbots
        </Button>
        
        <Button
          as={Link}
          to="/study-materials"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <FaBook /> Study Materials
        </Button>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFound;