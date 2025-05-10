import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBook, FaUniversity, FaGraduationCap, FaBrain, FaCode, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StudyMaterialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 2rem auto;
  background: var(--card-background);
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const SearchIcon = styled.div`
  color: var(--text-color);
  opacity: 0.7;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1rem;
  padding: 0.5rem 0;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const CategoriesTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const CategoryTab = styled.button`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--card-background)'};
  color: var(--text-color);
  border: none;
  border-radius: 50px;
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'rgba(94, 53, 177, 0.3)'};
    transform: translateY(-3px);
  }
`;

const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const MaterialCard = styled(motion.div)`
  background: var(--card-background);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  background: rgba(94, 53, 177, 0.2);
`;

const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const ReadButton = styled(Link)`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  margin-top: 1rem;
  font-size: 0.9rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: var(--secondary-color);
    color: white;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  grid-column: 1 / -1;
`;

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories for study materials
  const categories = [
    { id: 'all', name: 'All Materials', icon: <FaBook /> },
    { id: 'neural-networks', name: 'Neural Networks', icon: <FaBrain /> },
    { id: 'llm-university', name: 'LLM University', icon: <FaUniversity /> },
    { id: 'coding', name: 'Coding Examples', icon: <FaCode /> },
    { id: 'history', name: 'AI History', icon: <FaGraduationCap /> }
  ];
  
  // Study materials data
  const studyMaterials = [
    {
      id: 'neural-network-intro',
      title: 'What is a Neural Network',
      description: 'A comprehensive introduction to neural networks, explaining the fundamental concepts and how they work.',
      category: 'neural-networks',
      link: 'STUDY-RESOURCES/But-What-is a-Neural-Network.md',
      buttonText: 'Read Article'
    },
    {
      id: 'eliza-history',
      title: 'History of ELIZA',
      description: 'Learn about ELIZA, one of the first chatbots ever created, and its impact on conversational AI.',
      category: 'history',
      link: 'STUDY-RESOURCES/History-Of-ELIZA.md',
      buttonText: 'Read Article'
    },
    {
      id: 'nn-from-scratch',
      title: 'Neural Networks from Scratch',
      description: 'Learn how to implement neural networks from the ground up with Python code examples.',
      category: 'neural-networks',
      link: 'STUDY-RESOURCES/Neural-Networks-from-Scratch/README.md',
      buttonText: 'View Resources'
    },
    {
      id: 'llm-from-scratch',
      title: 'LLMs from Scratch',
      description: 'Dive into the implementation details of large language models with step-by-step explanations.',
      category: 'neural-networks',
      link: 'STUDY-RESOURCES/LLMs-from-scratch/README.md',
      buttonText: 'View Resources'
    },
    {
      id: 'chatbot-building',
      title: 'Building a Chatbot',
      description: 'A practical guide to building conversational agents using modern techniques.',
      category: 'llm-university',
      link: 'STUDY-RESOURCES/Cohere-LLM-University/Building_a_Chatbot.ipynb',
      buttonText: 'View Notebook'
    },
    {
      id: 'rag-intro',
      title: 'Introduction to RAG',
      description: 'Learn about Retrieval Augmented Generation, a powerful technique for improving LLM responses.',
      category: 'llm-university',
      link: 'STUDY-RESOURCES/Cohere-LLM-University/Introduction_to_RAG.ipynb',
      buttonText: 'View Notebook'
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering Basics',
      description: 'Master the art of crafting effective prompts for language models.',
      category: 'llm-university',
      link: 'STUDY-RESOURCES/Cohere-LLM-University/Prompt_Engineering_Basics.ipynb',
      buttonText: 'View Notebook'
    },
    {
      id: 'semantic-search',
      title: 'What is Semantic Search',
      description: 'Understanding semantic search and how it differs from traditional keyword search.',
      category: 'llm-university',
      link: 'STUDY-RESOURCES/Cohere-LLM-University/What_is_Semantic_Search.ipynb',
      buttonText: 'View Notebook'
    },
    {
      id: 'text-embeddings',
      title: 'Introduction to Text Embeddings',
      description: 'Learn how text is converted into vector representations for machine learning models.',
      category: 'llm-university',
      link: 'STUDY-RESOURCES/Cohere-LLM-University/Introduction_Text_Embeddings.ipynb',
      buttonText: 'View Notebook'
    },
    {
      id: 'nn-python-impl',
      title: 'Neural Network Implementation',
      description: 'A practical Python implementation of a neural network with training examples.',
      category: 'coding',
      link: 'STUDY-RESOURCES/Neural-Networks-from-Scratch/NN-from-Scratch.ipynb',
      buttonText: 'View Code'
    },
    {
      id: 'tools-usage',
      title: 'LLM Tool Usage Patterns',
      description: 'Learn how large language models can use tools to enhance their capabilities.',
      category: 'llm-university',
      link: 'STUDY-RESOURCES/Cohere-LLM-University/tool_use_anatomy.ipynb',
      buttonText: 'View Notebook'
    },
    {
      id: 'fine-tuning',
      title: 'Fine-Tuning for Chat',
      description: 'How to customize language models through fine-tuning for chat applications.',
      category: 'llm-university',
      link: 'STUDY-RESOURCES/Cohere-LLM-University/Fine_Tuning_for_Chat.ipynb',
      buttonText: 'View Notebook'
    }
  ];
  
  // Filter study materials based on search query and active category
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <StudyMaterialsContainer>
      <PageHeader>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Study Materials
        </Title>
        <Description>
          Explore a curated collection of resources about language models, neural networks, 
          and AI concepts to deepen your understanding of the technology behind the MiniLMs project.
        </Description>
      </PageHeader>
      
      <SearchBox>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search study materials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBox>
      
      <CategoriesTabs>
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.name}
          </CategoryTab>
        ))}
      </CategoriesTabs>
      
      <MaterialsGrid
        as={motion.div}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map(material => (
            <MaterialCard key={material.id} variants={fadeInUp}>
              <CardHeader>
                <CardTitle>
                  {material.category === 'neural-networks' && <FaBrain />}
                  {material.category === 'llm-university' && <FaUniversity />}
                  {material.category === 'coding' && <FaCode />}
                  {material.category === 'history' && <FaGraduationCap />}
                  {material.title}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <p>{material.description}</p>
                <ReadButton to={`/study-material/${material.link}`}>
                  {material.buttonText}
                </ReadButton>
              </CardBody>
            </MaterialCard>
          ))
        ) : (
          <NoResults>
            <h3>No study materials found</h3>
            <p>Try adjusting your search query or selecting a different category.</p>
          </NoResults>
        )}
      </MaterialsGrid>
    </StudyMaterialsContainer>
  );
};

export default StudyMaterials;