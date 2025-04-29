import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaRobot, FaBook } from 'react-icons/fa';

const FooterContainer = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  padding: 0 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  a {
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  &:hover {
    opacity: 1;
    transform: translateX(3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
  opacity: 0.6;
  max-width: 1200px;
  margin: 3rem auto 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: var(--text-color);
  font-size: 1.3rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: var(--text-color);
  }
`;

const FooterDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.7;
  margin-bottom: 1.5rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>MiniLMs Project</FooterTitle>
          <FooterDescription>
            Exploring, studying, and creating small language models for
            interactive conversations and learning.
          </FooterDescription>
          <SocialLinks>
            <SocialLink 
              href="https://github.com/Kuberwastaken/MiniLMs" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Navigation</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <Link to="/">Home</Link>
            </FooterLink>
            <FooterLink>
              <Link to="/chatbots">
                <FaRobot /> Implementations
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/study-materials">
                <FaBook /> Study Resources
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a 
                href="https://github.com/Kuberwastaken/MiniLMs" 
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            </FooterLink>
            <FooterLink>
              <a 
                href="https://github.com/Kuberwastaken/MiniLMs/blob/main/README.md" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </FooterLink>
            <FooterLink>
              <a 
                href="https://github.com/Kuberwastaken/MiniLMs/issues" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues & Feedback
              </a>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} MiniLMs Project. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;