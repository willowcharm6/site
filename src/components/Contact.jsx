import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';

const Contact = ({ onBack }) => {
  const [openedMailbox, setOpenedMailbox] = useState(null);

  // Helper function to adjust brightness
  function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
      (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
      .toString(16).slice(1);
  }

  const mailboxes = [
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: '#FF6B6B',
      link: 'mailto:your-email@example.com',
      description: 'Send me an email'
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      color: '#333333',
      link: 'https://github.com/yourusername',
      description: 'Check out my projects'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      link: 'https://linkedin.com/in/yourprofile',
      description: 'Connect with me'
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      color: '#1DA1F2',
      link: 'https://twitter.com/yourhandle',
      description: 'Follow me'
    }
  ];

  const handleMailboxClick = (mailbox) => {
    setOpenedMailbox(mailbox.id);
    window.open(mailbox.link, '_blank');
  };

  const handleClose = () => {
    setOpenedMailbox(null);
  };

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 10,
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '2px solid white',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    title: {
      color: 'white',
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '50px',
      textShadow: '0 4px 6px rgba(0,0,0,0.2)',
      textAlign: 'center'
    },
    mailboxGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto'
    },
    mailboxWrapper: {
      perspective: '1000px'
    },
    mailbox: {
      position: 'relative',
      width: '180px',
      height: '140px',
      cursor: 'pointer',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    mailboxBody: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '10px 10px 20px 20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    },
    mailboxIcon: {
      fontSize: '48px',
      marginBottom: '8px'
    },
    mailboxLabel: {
      color: 'white',
      fontWeight: '600',
      fontSize: '16px',
      textAlign: 'center'
    },
    mailboxFlag: {
      position: 'absolute',
      right: '-12px',
      top: '30px',
      width: '20px',
      height: '50px',
      background: 'rgba(255,255,255,0.4)',
      borderRadius: '2px',
      border: '2px solid rgba(255,255,255,0.6)',
      transition: 'right 0.4s ease, transform 0.4s ease'
    },
    openedMessage: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      background: 'white',
      padding: '20px 30px',
      borderRadius: '30px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      animation: 'slideIn 0.4s ease',
      zIndex: 100
    },
    openedText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#333'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      marginLeft: '10px',
      color: '#666',
      transition: 'color 0.2s ease'
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={onBack}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        ← Back
      </button>

      <h1 style={styles.title}>Get in Touch</h1>

      <div style={styles.mailboxGrid}>
        {mailboxes.map((mailbox) => {
          const IconComponent = mailbox.icon;
          const isOpen = openedMailbox === mailbox.id;

          const mailboxBodyStyle = {
            ...styles.mailboxBody,
            background: isOpen 
              ? `linear-gradient(135deg, ${adjustBrightness(mailbox.color, 20)} 0%, ${mailbox.color} 100%)`
              : `linear-gradient(135deg, ${mailbox.color} 0%, ${adjustBrightness(mailbox.color, -20)} 100%)`,
            border: isOpen ? '3px solid rgba(255,255,255,0.5)' : '3px solid rgba(255,255,255,0.3)',
            boxShadow: isOpen 
              ? '0 12px 48px rgba(0,0,0,0.4), inset 0 2px 8px rgba(255,255,255,0.2)'
              : '0 8px 32px rgba(0,0,0,0.3)'
          };

          return (
            <div key={mailbox.id} style={styles.mailboxWrapper}>
              <div
                style={{
                  ...styles.mailbox,
                  transform: isOpen ? 'rotateX(20deg) scale(1.05)' : 'rotateX(0deg)'
                }}
                onClick={() => handleMailboxClick(mailbox)}
              >
                <div style={mailboxBodyStyle}>
                  <div style={styles.mailboxIcon}>
                    <IconComponent size={48} color="white" strokeWidth={1.5} />
                  </div>
                  <div style={styles.mailboxLabel}>{mailbox.label}</div>
                </div>
                <div
                  style={{
                    ...styles.mailboxFlag,
                    ...(isOpen && { right: '8px', transform: 'rotateZ(90deg)' })
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {openedMailbox && (
        <div style={styles.openedMessage}>
          <Send size={20} color="#667eea" />
          <span style={styles.openedText}>Opening your connection...</span>
          <button
            style={styles.closeButton}
            onClick={handleClose}
            onMouseEnter={(e) => e.target.style.color = '#333'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;