import { useState, useEffect } from 'react';

// Import your images
import smiski1 from '/images/home/smiski1.png';
import smiski2 from '/images/home/smiski2.png';
import smiski3 from '/images/home/smiski3.png';
import miffy1 from '/images/home/miffy1.png';
import catbus from '/images/home/cat-bus.png';
import usb from '/images/home/usb-drive.png';
import digicam from '/images/home/digicam.png';
import snailshell1 from '/images/home/snailshell1.png';
import snailshell2 from '/images/home/snailshell2.png';
import sunglasses from '/images/home/sunglasses.png';


// Import your shelf background image
import shelfBackgroundImage from '/images/home/trinket-wall-bg.png';

import Resume from './components/Resume';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import FormulaPage from './components/FormulaPage';

const ShelfPortfolio = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentPage, setCurrentPage] = useState('portfolio');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate shelf dimensions based on window size
  const getShelfDimensions = () => {
    const padding = 40;
    const navHeight = 60; // Reduced from 80
    const availableWidth = windowSize.width - padding;
    const availableHeight = windowSize.height - navHeight - padding;
    
    // Adjust this to match your trinket-wall-bg.png aspect ratio
    // Common ratios: 16/9, 4/3, 3/2, 16/10
    const shelfAspectRatio = 4 / 3; // Change this to match your image
    
    const widthBasedHeight = availableWidth / shelfAspectRatio;
    const heightBasedWidth = availableHeight * shelfAspectRatio;
    
    if (widthBasedHeight <= availableHeight) {
      return {
        width: Math.min(availableWidth, 1200), // Max width limit
        height: Math.min(widthBasedHeight, 800) // Max height limit
      };
    } else {
      return {
        width: Math.min(heightBasedWidth, 1200),
        height: Math.min(availableHeight, 800)
      };
    }
  };

  const shelfDimensions = getShelfDimensions();

  const shelfItems = [
    { 
      id: 'smiski1', 
      left: '10.5%', 
      top: '12.5%', 
      width: '11%',
      label: 'About Me',
      description: 'Get to know who I am',
      image: smiski1
    },
    { 
      id: 'smiski2', 
      left: '17%', 
      top: '16%', 
      width: '8.5%',
      label: 'Projects',
      description: 'My creative work',
      image: smiski2
    },
    { 
      id: 'smiski3', 
      left: '24%', 
      top: '16%', 
      width: '8.5%',
      label: 'Formula',
      description: 'Northwestern University FSAE',
      image: smiski3
    },
    { 
      id: 'miffy', 
      left: '36.5%', 
      top: '12.5%', 
      width: '11%',
      label: 'Contact',
      description: 'Let\'s connect',
      image: miffy1
    },
    { 
      id: 'catbus', 
      left: '54%', 
      top: '6%', 
      width: '19%',
      label: 'Contact',
      description: 'Let\'s connect',
      image: catbus
    },
    { 
      id: 'usb', 
      left: '27%', 
      top: '37%', 
      width: '7.5%',
      label: 'Contact',
      description: 'Let\'s connect',
      image: usb
    },
    { 
      id: 'digicam', 
      left: '11%', 
      top: '44%', 
      width: '23%',
      label: 'Blog',
      description: 'Thoughts and musings',
      image: digicam
    },
    { 
      id: 'snailshell1', 
      left: '40%', 
      top: '45.5%', 
      width: '8%',
      label: 'Resume',
      description: 'Professional background',
      image: snailshell1
    },
    { 
      id: 'snailshell2', 
      left: '60.5%', 
      top: '56%', 
      width: '12%',
      label: 'Gallery',
      description: 'Creative collection',
      image: snailshell2
    },
    { 
      id: 'sunglasses', 
      left: '35.5%', 
      top: '72%', 
      width: '14%',
      label: 'Gallery',
      description: 'Creative collection',
      image: sunglasses
    }
  ];

  const handleItemClick = (item) => {
    console.log('Clicked item:', item); // Debug log
    console.log('Item label:', item.label); // Debug log
    
    if (item.label === 'Resume') {
      setCurrentPage('resume');
    }
      else if (item.label === 'About Me') { 
      setCurrentPage('aboutme');
    } else if (item.label === 'Contact') {
      setCurrentPage('contact');
    } else if (item.label === 'Formula') {
      setCurrentPage('formula');
      console.log('Navigating to FormulaPage'); // Debug log
    } else {
      console.log(`Navigating to: ${item.label}`);
      // Add other page navigation here later
    }
  };

  if (currentPage === 'resume') {
    return <Resume onBack={() => setCurrentPage('portfolio')} />;
  }
  if (currentPage === 'aboutme') {
    return <AboutMe onBack={() => setCurrentPage('portfolio')} />;
  }
  if (currentPage === 'contact') {
    return <Contact onBack={() => setCurrentPage('portfolio')} />;
  }
  if (currentPage === 'formula') {
   return <FormulaPage onBack={() => setCurrentPage('portfolio')} />;
  }

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 20px 40px 20px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    },
    navigation: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#6b7280',
      flexShrink: 0
    },
    navTitle: {
      fontSize: '1.125rem',
      fontWeight: '300',
      marginBottom: '0.25rem',
      margin: 0
    },
    navSubtitle: {
      fontSize: '0.875rem',
      opacity: '0.7',
      margin: 0
    },
    shelfContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      minHeight: 0 // Important for flex sizing
    },
    shelf: {
      position: 'relative',
      width: `${shelfDimensions.width}px`,
      height: `${shelfDimensions.height}px`,
      backgroundImage: `url(${shelfBackgroundImage})`,
      backgroundSize: 'contain', // Changed from 'cover' to 'contain'
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      border: '1px solid #e5e7eb' // Optional: helps see the boundaries
    },
    shelfItem: {
      position: 'absolute',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
      zIndex: '10'
    },
    shelfItemHover: {
      transform: 'scale(1.1)',
      zIndex: '20'
    },
    itemCircle: {
      width: '100%',
      aspectRatio: '1',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      border: '2px solid rgba(211, 211, 211, 0.8)'
    },
    itemImage: {
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    },
    tooltip: {
      position: 'absolute',
      top: '-4rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      whiteSpace: 'nowrap',
      zIndex: '30',
      pointerEvents: 'none'
    },
    tooltipTitle: {
      fontWeight: '500',
      marginBottom: '0.125rem'
    },
    tooltipDesc: {
      fontSize: '0.75rem',
      opacity: '0.8'
    },
    tooltipArrow: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '4px solid rgba(0, 0, 0, 0.8)'
    },
    currentSection: {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 40
    },
    sectionText: {
      color: '#374151',
      fontWeight: '500'
    }
  };

  return (
    
    <div style={styles.container}>
      {/* Navigation hint */}
      <div style={styles.navigation}>
        <p style={styles.navTitle}>Click on any item to explore</p>
        <p style={styles.navSubtitle}>Hover for details</p>
      </div>

      {/* Shelf Container */}
      <div style={styles.shelfContainer}>
        <div style={styles.shelf}>
          {/* Shelf Items */}
          {shelfItems.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.shelfItem,
                ...(hoveredItem?.id === item.id ? styles.shelfItemHover : {}),
                left: item.left,
                top: item.top,
                width: item.width
              }}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div style={styles.itemCircle}>
                <img 
                  src={item.image} 
                  alt={item.label}
                  style={styles.itemImage}
                />
              </div>
              
              {/* Hover tooltip */}
              {hoveredItem?.id === item.id && (
                <div style={styles.tooltip}>
                  <div style={styles.tooltipTitle}>{item.label}</div>
                  <div style={styles.tooltipDesc}>{item.description}</div>
                  <div style={styles.tooltipArrow}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current section indicator */}
      {hoveredItem && (
        <div style={styles.currentSection}>
          <span style={styles.sectionText}>{hoveredItem.label}</span>
        </div>
      )}
    </div>
  );
};

export default ShelfPortfolio;
