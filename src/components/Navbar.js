import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';

const NavContainer = styled.nav`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &.scrolled {
    padding: 0.7rem 2rem;
    background: rgba(5, 5, 10, 0.85);
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-family: 'Space Mono', monospace;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.5px;
  
  &:hover {
    color: var(--text-color);
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 3rem;

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    padding: 2rem;
    z-index: 99;
    gap: 2rem;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  font-family: 'Space Mono', monospace;
  font-weight: 400;
  position: relative;
  font-size: 0.95rem;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: var(--text-color);
    transition: width 0.3s ease;
  }
  
  &:hover {
    opacity: 1;
    color: var(--text-color);
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &.active {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    
    &:after {
      bottom: -8px;
      height: 2px;
    }
  }
`;

const GithubLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  opacity: 0.8;
  transition: opacity 0.3s ease;
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  
  &:hover {
    opacity: 1;
    color: var(--text-color);
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      damping: 30,
      type: "spring"
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <NavContainer className={scrolled ? 'scrolled' : ''}>
      <NavContent>
        <Logo to="/" onClick={closeMenu}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            MiniLMs
          </motion.div>
        </Logo>
        
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
        
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth > 768) && (
            <NavLinks
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <NavLink to="/" className={isActive('/')} onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/chatbots" className={isActive('/chatbots')} onClick={closeMenu}>
                Implementations
              </NavLink>
              <NavLink to="/study-materials" className={isActive('/study-materials')} onClick={closeMenu}>
                Study Resources
              </NavLink>
              <GithubLink 
                href="https://github.com/Kuberwastaken/MiniLMs" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaGithub /> GitHub
              </GithubLink>
            </NavLinks>
          )}
        </AnimatePresence>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;