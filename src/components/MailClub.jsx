import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MailClub = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const STRIPE_SUB_LINK = "https://buy.stripe.com/dRmbJ29Lre91gQDdWd7kc01";
  const STRIPE_ONCE_LINK = "https://buy.stripe.com/8x27sM8Hn4yr1VJ2dv7kc02";

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
          transform: isOpen 
            ? 'translateX(-260px) scale(1)' 
            : 'translateX(0px) scale(0)',
          opacity: isOpen ? 1 : 0,
          transformOrigin: 'right center', // The "Point" it grows from
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
    </div>
  ); 
};

const styles = {
  page: {
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    background: '#f9f9f9',
    position: 'relative' // Added this to make the absolute back button stay in place
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
    top: '1%',
    left: '1%',
    zIndex: 1, 
    background: '#FDECD8', 
    padding: '20px',
    border: '1px solid #ddd', 
    boxShadow: '5px 5px 15px rgba(0,0,0,0.1)',
    width: '250px', 
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
  }
};

export default MailClub;