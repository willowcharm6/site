import React from 'react';

const Resume = ({ onBack }) => {
  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 10,
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px'
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
      <button 
        style={styles.backButton}
        onClick={onBack}
      >
        ← Back to Portfolio
      </button>
      <iframe 
        src="/resume/Charmaine_Guo_Resume.pdf"
        style={styles.iframe}
        title="Charmaine Guo Resume"
      />
    </div>
  );
};

export default Resume;