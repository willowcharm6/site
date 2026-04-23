import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

const Aquarium = () => {
  const navigate = useNavigate();
  const [fish, setFish] = useState([]);

  // Listen for fish updates from Firebase in real-time
  useEffect(() => {
    const fishRef = ref(database, 'aquarium/fish');
    
    // Subscribe to real-time updates
    const unsubscribe = onValue(fishRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and keep only last 10
        const fishArray = Object.values(data).slice(-10);
        setFish(fishArray);
      } else {
        setFish([]);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.ocean}>
      {/* Wavy water surface effect */}
      <div style={styles.surface} />
      
      {/* Light rays from above */}
      <div style={styles.lightRays}>
        <div style={{...styles.ray, left: '15%', animationDelay: '0s'}} />
        <div style={{...styles.ray, left: '40%', animationDelay: '1.5s'}} />
        <div style={{...styles.ray, left: '65%', animationDelay: '0.8s'}} />
        <div style={{...styles.ray, left: '85%', animationDelay: '2.2s'}} />
      </div>

      {/* Bubbles */}
      <div style={styles.bubbles}>
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            style={{
              ...styles.bubble,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      {/* Fish swimming */}
      {fish.map((fishData, idx) => (
        <SwimmingFish key={fishData.id} fishData={fishData} index={idx} />
      ))}

      {/* Bottom sand/coral decoration */}
      <div style={styles.oceanFloor}>
        <div style={styles.seaweed1} />
        <div style={styles.seaweed2} />
        <div style={styles.seaweed3} />
      </div>

      {/* Draw button - positioned at top right */}
      <button 
        onClick={() => navigate('/drawfish')} 
        style={styles.drawButton}
      >
        Draw a Fish! 🎨
      </button>

      {/* Fish counter */}
      <div style={styles.counter}>
        {fish.length} / 10 fish
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes shimmer {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }

          @keyframes rise {
            0% { 
              bottom: -20px; 
              opacity: 0.4;
            }
            50% { 
              opacity: 0.8;
            }
            100% { 
              bottom: 100vh; 
              opacity: 0;
            }
          }

          @keyframes sway {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            50% { transform: translateX(10px) rotate(5deg); }
          }

          @keyframes wave {
            0%, 100% { 
              transform: translateX(0) scaleY(1);
            }
            50% { 
              transform: translateX(-50px) scaleY(1.1);
            }
          }
        `}
      </style>
    </div>
  );
};

const SwimmingFish = ({ fishData, index }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 80,
    y: 20 + Math.random() * 60,
  });
  const [direction, setDirection] = useState(Math.random() > 0.5 ? 1 : -1);

  useEffect(() => {
    const swimInterval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + (direction * 0.5);
        let newY = prev.y + (Math.random() - 0.5) * 2;

        // Bounce off edges
        if (newX > 90 || newX < 0) {
          setDirection(d => -d);
          newX = Math.max(0, Math.min(90, newX));
        }

        // Keep in vertical bounds
        newY = Math.max(15, Math.min(75, newY));

        return { x: newX, y: newY };
      });
    }, 100);

    return () => clearInterval(swimInterval);
  }, [direction]);

  return (
    <div style={{
      position: 'absolute',
      left: `${position.x}%`,
      top: `${position.y}%`,
      transition: 'all 0.1s linear',
      zIndex: 10 + index,
      transform: `scaleX(${direction})`,
    }}>
      <img 
        src={fishData.imageUrl} 
        alt="Fish drawing"
        style={{
          maxWidth: '120px',
          maxHeight: '120px',
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
          animation: 'float 3s ease-in-out infinite',
          animationDelay: `${index * 0.3}s`,
        }}
      />
    </div>
  );
};

const styles = {
  ocean: {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(to bottom, #1e3a5f 0%, #2a5780 30%, #1a4d6d 60%, #0d2a3f 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Fredoka", "Comic Sans MS", cursive',
  },
  surface: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '120px',
    background: 'linear-gradient(to bottom, rgba(100,200,255,0.3) 0%, transparent 100%)',
    animation: 'wave 8s ease-in-out infinite',
    zIndex: 1,
  },
  lightRays: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    pointerEvents: 'none',
    zIndex: 2,
  },
  ray: {
    position: 'absolute',
    top: 0,
    width: '80px',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 60%)',
    transform: 'skewX(-15deg)',
    animation: 'shimmer 4s ease-in-out infinite',
  },
  bubbles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 3,
  },
  bubble: {
    position: 'absolute',
    bottom: '-20px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.3))',
    animation: 'rise 10s linear infinite',
  },
  oceanFloor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '120px',
    background: 'linear-gradient(to top, #0a1f2e 0%, transparent 100%)',
    zIndex: 5,
  },
  seaweed1: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    width: '30px',
    height: '80px',
    background: 'linear-gradient(to top, #1a4d3d, #2a6d5d)',
    borderRadius: '50% 50% 0 0',
    animation: 'sway 3s ease-in-out infinite',
    transformOrigin: 'bottom',
  },
  seaweed2: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '25px',
    height: '100px',
    background: 'linear-gradient(to top, #1a4d3d, #2a6d5d)',
    borderRadius: '50% 50% 0 0',
    animation: 'sway 4s ease-in-out infinite',
    animationDelay: '1s',
    transformOrigin: 'bottom',
  },
  seaweed3: {
    position: 'absolute',
    bottom: 0,
    left: '75%',
    width: '35px',
    height: '90px',
    background: 'linear-gradient(to top, #1a4d3d, #2a6d5d)',
    borderRadius: '50% 50% 0 0',
    animation: 'sway 3.5s ease-in-out infinite',
    animationDelay: '0.5s',
    transformOrigin: 'bottom',
  },
  drawButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '15px 30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,107,157,0.4)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    zIndex: 100,
    fontFamily: '"Fredoka", "Comic Sans MS", cursive',
  },
  counter: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: '2px solid rgba(255,255,255,0.3)',
    zIndex: 100,
  },
};

export default Aquarium;