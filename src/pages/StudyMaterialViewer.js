import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IpynbRenderer } from 'react-ipynb-renderer';
import 'react-ipynb-renderer/dist/styles/monokai.css';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

const ViewerContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.8em;
    color: var(--text-color);
  }

  p {
    margin-bottom: 1em;
    line-height: 1.7;
    color: rgba(240, 240, 240, 0.9);
  }

  a {
    color: var(--accent-color);
    text-decoration: underline;
    &:hover {
      color: var(--secondary-color);
    }
  }

  code:not(pre > code) {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Space Mono', monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 1em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  ul, ol {
    margin-bottom: 1em;
    padding-left: 2em;
  }

  li {
    margin-bottom: 0.5em;
  }

  blockquote {
    border-left: 4px solid var(--accent-color);
    margin-left: 0;
    padding-left: 1.5em;
    color: rgba(240, 240, 240, 0.8);
    font-style: italic;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 1em 0;
  }

  .jp-Notebook {
    background-color: transparent !important;
    color: var(--text-color);
  }

  .jp-Cell {
    border-top: 1px solid rgba(255,255,255,0.1) !important;
    margin-bottom: 10px;
  }

  .jp-CodeCell .jp-InputArea .jp-Editor {
    background-color: rgba(0,0,0,0.2) !important;
  }

  .jp-CodeCell .jp-OutputArea {
    background-color: rgba(0,0,0,0.1) !important;
  }

  .jp-MarkdownCell {
    color: var(--text-color);
  }

  .jp-MarkdownCell h1, .jp-MarkdownCell h2, .jp-MarkdownCell h3, .jp-MarkdownCell h4 {
    color: var(--text-color) !important;
    border-bottom: 1px solid rgba(255,255,255,0.2) !important;
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  padding: 3rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  padding: 3rem;
  color: #ff6b6b;
`;

const BackButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

const BackButton = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  font-family: 'Space Mono', monospace;
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(var(--accent-color-rgb, 129, 212, 250), 0.1);
    color: var(--accent-color);
  }
`;

const StudyMaterialViewer = () => {
  const params = useParams();
  const filePath = params['*'];
  const [markdown, setMarkdown] = useState('');
  const [notebookJson, setNotebookJson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filePath) {
      setError('No file path provided.');
      setIsLoading(false);
      return;
    }

    setMarkdown('');
    setNotebookJson(null);
    setError(null);
    setIsLoading(true);

    let fullUrl;
    if (process.env.NODE_ENV === 'development') {
      fullUrl = `http://localhost:8000/${filePath}`;
    } else {
      fullUrl = `${process.env.PUBLIC_URL}/${filePath}`;
    }

    fetch(fullUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}. URL: ${fullUrl}`);
        }
        return response.text();
      })
      .then(text => {
        if (filePath.endsWith('.ipynb')) {
          try {
            const jsonData = JSON.parse(text);
            if (jsonData.cells) {
              jsonData.cells.forEach(cell => {
                if (cell.cell_type === 'code' && cell.outputs) {
                  cell.outputs.forEach(output => {
                    if (output.name === 'stdout' || output.output_type === 'stream') {
                      if (Array.isArray(output.text)) {
                        output.text = output.text.map(line => line.replace(/\u001b\[[0-9;]*[mGKH]/g, ''));
                      } else if (typeof output.text === 'string') {
                        output.text = output.text.replace(/\u001b\[[0-9;]*[mGKH]/g, '');
                      }
                    }
                  });
                }
              });
            }
            setNotebookJson(jsonData);
          } catch (e) {
            console.error('Error parsing notebook JSON:', e);
            setError('Failed to parse notebook file. Ensure it is valid JSON.');
          }
        } else if (filePath.endsWith('.md')) {
          setMarkdown(text);
        } else {
          setError('Unsupported file type. Only .md and .ipynb are supported.');
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching file:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [filePath]);

  if (isLoading) {
    return <ViewerContainer><LoadingMessage>Loading study material...</LoadingMessage></ViewerContainer>;
  }

  if (error) {
    return <ViewerContainer><ErrorMessage>Error: {error}</ErrorMessage></ViewerContainer>;
  }

  return (
    <ViewerContainer>
      <BackButtonContainer>
        <BackButton to="/study-materials">
          <FaArrowLeft /> Back to Study Materials
        </BackButton>
      </BackButtonContainer>
      {notebookJson && (
        <IpynbRenderer 
          ipynb={notebookJson} 
          syntaxTheme="xonokai"
          language="python"
          bgTransparent={true}
        />
      )}
      {markdown && <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>}
      {!notebookJson && !markdown && !isLoading && (
        <ErrorMessage>No content to display for this file type or an error occurred.</ErrorMessage>
      )}
    </ViewerContainer>
  );
};

export default StudyMaterialViewer; 