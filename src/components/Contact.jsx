import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  // Links
  const GITHUB_URL = "https://github.com/willowcharm6";
  const LINKEDIN_URL = "https://linkedin.com/in/charmaine-guo";
  const RESEARCH_URL = "https://www.researchgate.net/profile/Charmaine-Guo?ev=hdr_xprf"; // Update this to your research page if you have one
  const GMAIL_URL = "mailto:guo.charmaineguo.cg@gmail.com";

  const styles = {
    page: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      position: 'relative',
      padding: '40px'
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '10px 20px',
      cursor: 'pointer',
      zIndex: 100,
      background: 'none',
      border: '1px solid #eee',
      borderRadius: '8px',
      color: '#000000',
    },
    mailboxWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: '600px', // Adjust based on your PNG size
      display: 'inline-block'
    },
    mailboxImg: {
      width: '100%',
      height: 'auto',
      display: 'block'
    },
    // The Hitboxes
    hitbox: {
      position: 'absolute',
      cursor: 'pointer',
      // border: '2px solid red', // Uncomment this to see the boxes while positioning!
      zIndex: 10
    }
  };

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Back
      </button>

      <div style={styles.mailboxWrapper}>
        <img 
          src="/images/mailbox.png" 
          alt="Contact Mailbox" 
          style={styles.mailboxImg} 
        />

        <a 
          href={RESEARCH_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            ...styles.hitbox,
            top: '45.5%',    
            left: '36%',
            width: '6%',
            height: '9%'
          }}
          title="Visit my GitHub"
        />

        <a 
          href={GITHUB_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            ...styles.hitbox,
            top: '61%',    
            left: '46%',
            width: '7%',
            height: '10%'
          }}
          title="Visit my GitHub"
        />
        <a 
          href={GMAIL_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            ...styles.hitbox,
            top: '49%',    
            left: '57%',
            width: '9%',
            height: '11%'
          }}
          title="Email me!"
        />

        {/* LinkedIn Hitbox */}
        <a 
          href={LINKEDIN_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            ...styles.hitbox,
            top: '65%',    
            left: '72%',
            width: '10%',
            height: '12%'
          }}
          title="Visit my LinkedIn"
        />
      </div>

      <p style={{ marginTop: '20px', color: '#6b7280' }}>Click a sticker to connect!</p>
    </div>
  );
};

export default Contact;