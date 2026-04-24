import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, onValue, push, remove, get } from 'firebase/database'; // Added 'remove' and 'get'
import { database } from '../firebase';

const DrawFish = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF6B9D');
  const [brushSize, setBrushSize] = useState(8);
  const [fishCount, setFishCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = Math.min(600, window.innerWidth - 40);
    canvas.height = Math.min(600, window.innerHeight - 300);

    // REMOVED: ctx.fillStyle = 'white'; ctx.fillRect(...) 
    // We want it transparent!

    const fishRef = ref(database, 'aquarium/fish');
    const unsubscribe = onValue(fishRef, (snapshot) => {
      const data = snapshot.val();
      setFishCount(data ? Object.keys(data).length : 0);
    });

    return () => unsubscribe();
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Clear back to transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveFish = async () => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL('image/png');
    
    try {
      const fishRef = ref(database, 'aquarium/fish');
      
      // LOGIC: If 10 or more fish, delete the oldest one first
      if (fishCount >= 10) {
        const snapshot = await get(fishRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Firebase keys are chronological, so the first key is the oldest
          const oldestFishKey = Object.keys(data)[0];
          await remove(ref(database, `aquarium/fish/${oldestFishKey}`));
        }
      }

      const newFish = {
        id: Date.now() + Math.random(),
        imageUrl: imageUrl,
        timestamp: Date.now(),
      };

      const newFishRef = push(fishRef);
      await set(newFishRef, newFish);

      // AUTO REDIRECT instead of alert
      navigate('/aquarium');
      
    } catch (error) {
      console.error('Error saving fish:', error);
      alert('Oops! Check your database rules/connection.');
    }
  };

  const colors = ['#FF6B9D', '#FFA06B', '#FFD56B', '#6BFF9D', '#6B9DFF', '#9D6BFF', '#FF6BFF', '#6BFFFF'];

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/aquarium')} style={styles.backButton}>← Back</button>
      <h1 style={styles.title}>Draw Your Fish! 🐠</h1>
      
      <div style={{...styles.canvasContainer, background: 'rgba(255,255,255,0.1)', border: '2px dashed white'}}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          style={styles.canvas}
        />
      </div>

      <div style={styles.controls}>
        <div style={styles.colorGrid}>
          {colors.map(c => (
            <button key={c} onClick={() => setColor(c)} style={{...styles.colorButton, background: c, border: color === c ? '4px solid white' : 'none'}} />
          ))}
        </div>
        <input type="range" min="2" max="20" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} style={styles.slider} />
      </div>

      <div style={styles.actionButtons}>
        <button onClick={clearCanvas} style={styles.clearButton}>🗑️ Clear</button>
        <button onClick={saveFish} style={styles.saveButton}>✨ Set it Free!</button>
      </div>
    </div>
  );
};

// ... keep your existing styles, but maybe update canvasContainer to look cooler with transparency

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    paddingTop: '80px',
    position: 'relative',
    fontFamily: '"Fredoka", "Comic Sans MS", cursive',
    overflowX: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 10px 0',
    textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.9)',
    margin: '0 0 30px 0',
    textAlign: 'center',
  },
  canvasContainer: {
    background: 'white',
    borderRadius: '20px',
    padding: '10px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    marginBottom: '30px',
  },
  canvas: {
    border: '3px solid #667eea',
    borderRadius: '15px',
    cursor: 'crosshair',
    touchAction: 'none',
    display: 'block',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  colorPicker: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '20px',
    border: '2px solid rgba(255,255,255,0.2)',
  },
  label: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '12px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  colorButton: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  brushControl: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '20px',
    border: '2px solid rgba(255,255,255,0.2)',
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '5px',
    outline: 'none',
    background: 'rgba(255,255,255,0.3)',
    cursor: 'pointer',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  clearButton: {
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  saveButton: {
    padding: '15px 40px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(255,107,157,0.4)',
    transition: 'all 0.2s ease',
  },
};

export default DrawFish;