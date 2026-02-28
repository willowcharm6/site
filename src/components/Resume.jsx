import React from 'react';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const navigate = useNavigate();
  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    },
    backButton: {
      position: 'absolute',
      top: '50px',
      left: '20px',
      padding: '10px 20px',
      cursor: 'pointer',
      zIndex: 100,
      background: 'white',
      borderRadius: '8px',
      color: '#000000',
    },
    iframe: {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block'
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>← Back</button>
      <iframe 
        src="/resume/Charmaine_Guo_Resume.pdf"
        style={styles.iframe}
        title="Charmaine Guo Resume"
      />
    </div>
  );
};

export default Resume;