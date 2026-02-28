import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MailClub = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track screen width to swap animation direction
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const STRIPE_SUB_LINK = "https://buy.stripe.com/dRmbJ29Lre91gQDdWd7kc01";
  const STRIPE_ONCE_LINK = "https://buy.stripe.com/8x27sM8Hn4yr1VJ2dv7kc02";

  // Desktop: Slide left (-110%) and center vertically
  // Mobile: Slide up (-110%) and center horizontally
  const getTransform = () => {
    if (!isOpen) {
      // When closed, we stay at scale(0) so it shrinks to a point
      return 'translate(0, 0) scale(0)';
    }
    
    // When open, we slide AND scale to 1
    if (isMobile) {
      return 'translateY(110%) scale(1)'; 
    }
    return 'translateX(-110%) scale(1)'; 
  };

  const getOrigin = () => {
    if (isMobile) return 'top center'; // Grow from the top of the mailbox
    return 'right center'; // Grow from the side of the mailbox
  };

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.backButton}> ← Back</button>

      <h3 style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#B18183',
      }}>You have mail!</h3>

      <div style={styles.mailboxContainer} onClick={() => setIsOpen(!isOpen)}>
        
        <div style={{
          ...styles.letter,
          transform: getTransform(),
          transformOrigin: getOrigin(),
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}>
          <h3 style={{
            margin: '0 0 10px 0',
            color: '#546A7B',
          }}>Mail Club</h3>
          <p style={{
            color: '#6D2E46',
          }}>Get a physical letter every month!</p>
          <div style={styles.buttonGroup}>
            <a href={STRIPE_SUB_LINK} style={styles.stripeBtn}>Subscribe ($5/mo)</a>
            <a href={STRIPE_ONCE_LINK} style={styles.stripeBtnSecondary}>This Month Only ($6)</a>
          </div>
        </div>

        <img 
          src="/images/mailclub/mailbox.png" 
          alt="Mailbox" 
          style={{
            ...styles.mailboxImg,
            transform: isOpen ? 'rotate(-5deg)' : 'rotate(0deg)'
          }} 
        />
      </div>
      <div style={styles.donationSection}>
        <p style={styles.themeText}>March theme: <strong>Dream Big</strong></p>
        <p style={styles.donationText}>
          25% of profits go towards {' '}
          <a 
            href="https://www.thedream.us/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.donationLink}
          >
            thedream.us
          </a>
        </p>
      </div>
    </div>
  ); 
};

const styles = {
  page: {
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    overflow: 'auto',
    alignItems: 'center', 
    justifyContent: 'center', 
    background: '#f9f9f9',
    position: 'relative' 
  },
  mailboxContainer: { 
    position: 'relative', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center' 
  },
  mailboxImg: { 
    width: '300px', 
    transition: 'transform 0.5s ease' 
  },
  letter: {
    position: 'absolute', 
    bottom: '50%',
    right: '10%',
    zIndex: 1, 
    background: '#FDECD8', 
    padding: '20px',
    border: '1px solid #ddd', 
    boxShadow: '5px 5px 15px rgba(0,0,0,0.1)',
    width: 'min(280px, 60vw)',
    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    borderRadius: '4px',
    zIndex: 100
  },
  buttonGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px' 
  },
  stripeBtn: {
    background: '#635bff', 
    color: 'white', 
    padding: '10px', 
    textDecoration: 'none', 
    borderRadius: '4px', 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  stripeBtnSecondary: {
    background: '#e3e8ee', 
    color: '#4f566b', 
    padding: '10px', 
    textDecoration: 'none', 
    borderRadius: '4px', 
    textAlign: 'center'
  },
  backButton: { 
    position: 'absolute', 
    top: '20px', 
    left: '20px', 
    cursor: 'pointer', 
    border: 'none', 
    background: 'none',
    fontSize: '1rem',
    color: '#6b7280',
    zIndex: 10 // Make sure it stays on top
  },
  donationSection: {
    marginTop: '40px',
    textAlign: 'center',
    zIndex: 5,
    maxWidth: '80vw'
  },
  themeText: {
    fontSize: '1.1rem',
    color: '#546A7B',
    margin: '0 0 8px 0',
    fontFamily: 'sans-serif'
  },
  donationText: {
    fontSize: '0.9rem',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.5'
  },
  donationLink: {
    color: '#6D2E46',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderBottom: '2px solid #ba874b', // Subtle "tape" or "sticker" look
    paddingBottom: '2px',
    transition: 'all 0.2s ease'
  }
};

export default MailClub;