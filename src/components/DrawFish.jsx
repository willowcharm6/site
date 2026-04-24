import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, onValue, push, remove, get } from 'firebase/database';
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
    
    // Transparent setup
    canvas.width = Math.min(600, window.innerWidth - 40);
    canvas.height = Math.min(600, window.innerHeight - 300);

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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveFish = async () => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL('image/png');
    
    try {
      const fishRef = ref(database, 'aquarium/fish');
      
      // FIFO Logic (Max 20 fish)
      if (fishCount >= 20) {
        const snapshot = await get(fishRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
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

      // Clean up for the next drawing
      clearCanvas();
      
      // Simple feedback since we aren't redirecting
      alert("Your fish swam away into the aquarium! 🌊🐠");
      
    } catch (error) {
      console.error('Error saving fish:', error);
      alert('Oops! Check your database rules or connection.');
    }
  };

  const colors = ['#FF6B9D', '#FFA06B', '#FFD56B', '#6BFF9D', '#6B9DFF', '#9D6BFF', '#FF6BFF', '#6BFFFF'];

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/aquarium')} style={styles.backButton}>← Back</button>
      
      <h1 style={styles.title}>Draw Your Fish! 🐠</h1>
      <p style={styles.subtitle}>Current Fish in Water: {fishCount} / 20</p>
      
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
            <button 
              key={c} 
              onClick={() => setColor(c)} 
              style={{
                ...styles.colorButton, 
                background: c, 
                border: color === c ? '4px solid white' : 'none',
                transform: color === c ? 'scale(1.1)' : 'scale(1)'
              }} 
            />
          ))}
        </div>
        
        <div style={{textAlign: 'center', marginTop: '10px'}}>
           <p style={styles.label}>Brush Size: {brushSize}px</p>
           <input 
             type="range" 
             min="2" 
             max="20" 
             value={brushSize} 
             onChange={(e) => setBrushSize(parseInt(e.target.value))} 
             style={styles.slider} 
           />
        </div>
      </div>

      <div style={styles.actionButtons}>
        <button onClick={clearCanvas} style={styles.clearButton}>🗑️ Clear</button>
        <button onClick={saveFish} style={styles.saveButton}>✨ Set it Free!</button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    paddingTop: '60px',
    position: 'relative',
    fontFamily: '"Fredoka", "Comic Sans MS", cursive',
    overflowX: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '2.5rem',
    color: 'white',
    margin: '0',
    textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
  },
  subtitle: {
    color: 'white',
    marginBottom: '20px',
  },
  canvasContainer: {
    borderRadius: '20px',
    padding: '10px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    marginBottom: '20px',
  },
  canvas: {
    cursor: 'crosshair',
    touchAction: 'none',
    display: 'block',
  },
  controls: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '30px',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  colorButton: {
    aspectRatio: '1',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  slider: {
    width: '100%',
    cursor: 'pointer',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
  },
  clearButton: {
    padding: '12px 25px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  saveButton: {
    padding: '12px 35px',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 6px 20px rgba(255,107,157,0.4)',
  },
};

export default DrawFish;