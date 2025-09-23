import { useState, useRef, useEffect } from 'react';

const AboutMe = ({ onBack }) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Your photo data - dimensions will be calculated from actual images
  const photoData = [
    { 
      id: 'breakfast', 
      src: '/images/aboutme/breakfast.png', 
      maxWidth: 200, // Maximum width you want
      initialX: 100,
      initialY: 100
    },
    { 
      id: 'dog', 
      src: '/images/aboutme/drink.png', 
      maxWidth: 180,
      initialX: 350,
      initialY: 200
    },
    { 
      id: 'drink', 
      src: '/images/aboutme/dog.png', 
      maxWidth: 160,
      initialX: 600,
      initialY: 150
    },
    { 
      id: 'ferret', 
      src: '/images/aboutme/ferret.png', 
      maxWidth: 190,
      initialX: 200,
      initialY: 350
    },
    { 
      id: 'fish', 
      src: '/images/aboutme/fish.jpg', 
      maxWidth: 170,
      initialX: 500,
      initialY: 400
    },
    { 
      id: 'icecream', 
      src: '/images/aboutme/icecream.png', 
      maxWidth: 150,
      initialX: 800,
      initialY: 300
    }
  ];

  // Initialize photos with physics properties
  useEffect(() => {
    if (containerSize.width === 0) return;

    // Function to load image and get its natural dimensions
    const loadImageDimensions = (photoData) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Calculate dimensions maintaining aspect ratio
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          const width = photoData.maxWidth;
          const height = width * aspectRatio;
          
          resolve({
            ...photoData,
            width,
            height,
            x: Math.min(photoData.initialX, containerSize.width - width),
            y: Math.min(photoData.initialY, containerSize.height - height),
            vx: 0, // velocity x
            vy: 0, // velocity y
            mass: (width * height) / 10000, // mass based on size
            zIndex: Math.floor(Math.random() * 100),
            rotation: (photoData.id.charCodeAt(photoData.id.length - 1) % 21) - 10
          });
        };
        img.onerror = () => {
          // Fallback if image fails to load
          resolve({
            ...photoData,
            width: photoData.maxWidth,
            height: photoData.maxWidth, // Square fallback
            x: Math.min(photoData.initialX, containerSize.width - photoData.maxWidth),
            y: Math.min(photoData.initialY, containerSize.height - photoData.maxWidth),
            vx: 0,
            vy: 0,
            mass: (photoData.maxWidth * photoData.maxWidth) / 10000,
            zIndex: Math.floor(Math.random() * 100),
            rotation: (photoData.id.charCodeAt(photoData.id.length - 1) % 21) - 10
          });
        };
        img.src = photoData.src;
      });
    };

    // Load all images and set up photos
    const initializePhotos = async () => {
      const photoPromises = photoData.map(photo => loadImageDimensions(photo));
      const initialPhotos = await Promise.all(photoPromises);
      setPhotos(initialPhotos);
    };

    initializePhotos();
  }, [containerSize]);

  // Physics simulation
  useEffect(() => {
    if (photos.length === 0) return;

    const updatePhysics = () => {
      setPhotos(prevPhotos => {
        const newPhotos = [...prevPhotos];
        const friction = 0.98; // Slow down over time
        const bounce = 0.7; // How bouncy collisions are

        // Update positions and handle wall collisions
        newPhotos.forEach(photo => {
          if (dragging?.id === photo.id) return; // Skip dragged photo

          // Apply velocity to position
          photo.x += photo.vx;
          photo.y += photo.vy;

          // Apply friction
          photo.vx *= friction;
          photo.vy *= friction;

          // Wall collisions
          if (photo.x <= 0) {
            photo.x = 0;
            photo.vx = Math.abs(photo.vx) * bounce;
          }
          if (photo.x + photo.width >= containerSize.width) {
            photo.x = containerSize.width - photo.width;
            photo.vx = -Math.abs(photo.vx) * bounce;
          }
          if (photo.y <= 0) {
            photo.y = 0;
            photo.vy = Math.abs(photo.vy) * bounce;
          }
          if (photo.y + photo.height >= containerSize.height) {
            photo.y = containerSize.height - photo.height;
            photo.vy = -Math.abs(photo.vy) * bounce;
          }
        });

        // Check collisions between photos
        for (let i = 0; i < newPhotos.length; i++) {
          for (let j = i + 1; j < newPhotos.length; j++) {
            const photo1 = newPhotos[i];
            const photo2 = newPhotos[j];

            // Skip if either is being dragged
            // if (dragging?.id === photo1.id || dragging?.id === photo2.id) continue;

            // Calculate centers
            const cx1 = photo1.x + photo1.width / 2;
            const cy1 = photo1.y + photo1.height / 2;
            const cx2 = photo2.x + photo2.width / 2;
            const cy2 = photo2.y + photo2.height / 2;

            // Calculate distance
            const dx = cx2 - cx1;
            const dy = cy2 - cy1;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Minimum distance for collision (average of both photos' sizes)
            const minDistance = ((photo1.width + photo1.height) / 4) + ((photo2.width + photo2.height) / 4);

            if (distance < minDistance && distance > 0) {
              // Collision detected! Calculate collision response

              // Normalize collision vector
              const nx = dx / distance;
              const ny = dy / distance;

              // Separate photos to prevent overlap
              const overlap = minDistance - distance;
              const separateX = nx * overlap * 0.5;
              const separateY = ny * overlap * 0.5;

              photo1.x -= separateX;
              photo1.y -= separateY;
              photo2.x += separateX;
              photo2.y += separateY;

              // Calculate relative velocity
              const rvx = photo2.vx - photo1.vx;
              const rvy = photo2.vy - photo1.vy;
              const speed = rvx * nx + rvy * ny;

              // Don't resolve if velocities are separating
              if (speed > 0) continue;

              // Calculate restitution (bounciness)
              const restitution = 0.8;
              const impulse = 2 * speed / (photo1.mass + photo2.mass);

              // Update velocities
              photo1.vx += impulse * photo2.mass * nx * restitution;
              photo1.vy += impulse * photo2.mass * ny * restitution;
              photo2.vx -= impulse * photo1.mass * nx * restitution;
              photo2.vy -= impulse * photo1.mass * ny * restitution;
            }
          }
        }

        return newPhotos;
      });
    };

    // Start animation loop
    const animate = () => {
      updatePhysics();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [photos.length, containerSize, dragging]);

  // Track container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Handle drag start
  const handleMouseDown = (e, photoId) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    
    setDragging({
      id: photoId,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: Date.now()
    });

    // Bring to front and stop movement
    setPhotos(prev => prev.map(p => 
      p.id === photoId 
        ? { ...p, zIndex: Math.max(...prev.map(ph => ph.zIndex)) + 1, vx: 0, vy: 0 }
        : p
    ));
  };

  // Handle drag move
  const handleMouseMove = (e) => {
    if (!dragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const photo = photos.find(p => p.id === dragging.id);
    const now = Date.now();
    
    let newX = e.clientX - containerRect.left - dragging.offsetX;
    let newY = e.clientY - containerRect.top - dragging.offsetY;

    // Keep within bounds
    newX = Math.max(0, Math.min(newX, containerSize.width - photo.width));
    newY = Math.max(0, Math.min(newY, containerSize.height - photo.height));

    // Calculate velocity for when we release
    const timeDelta = now - dragging.lastTime;
    if (timeDelta > 0) {
      const vx = (e.clientX - dragging.lastX) / timeDelta * 16; // Scale for 60fps
      const vy = (e.clientY - dragging.lastY) / timeDelta * 16;
      
      setDragging(prev => ({
        ...prev,
        lastX: e.clientX,
        lastY: e.clientY,
        lastTime: now,
        velocityX: vx,
        velocityY: vy
      }));
    }

    setPhotos(prev => prev.map(p => 
      p.id === dragging.id ? { ...p, x: newX, y: newY } : p
    ));
  };

  // Handle drag end
  const handleMouseUp = () => {
    if (dragging) {
      // Apply release velocity
      setPhotos(prev => prev.map(p => 
        p.id === dragging.id 
          ? { 
              ...p, 
              vx: (dragging.velocityX || 0) * 0.5, // Scale down the velocity
              vy: (dragging.velocityY || 0) * 0.5 
            }
          : p
      ));
    }
    setDragging(null);
  };

  // Attach global mouse events
  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, containerSize]);

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      background: 'rgb(255, 255, 255)',
      position: 'relative',
      overflow: 'hidden',
      cursor: dragging ? 'grabbing' : 'default'
    },
    backButton: {
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      backdropFilter: 'blur(10px)'
    },
    title: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '300',
      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      textAlign: 'right'
    },
    subtitle: {
      position: 'fixed',
      top: '60px',
      right: '20px',
      zIndex: 1000,
      color: 'rgba(255,255,255,0.8)',
      fontSize: '1rem',
      fontWeight: '300',
      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      textAlign: 'right'
    },
    photo: {
      position: 'absolute',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      transition: dragging ? 'none' : 'transform 0.2s ease',
      cursor: 'grab',
      userSelect: 'none',
      overflow: 'hidden', // This helps contain the image
    },
    photoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain', // Back to contain since dimensions now match
      pointerEvents: 'none',
      display: 'block' // Removes any inline spacing
    },
    instructions: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      color: 'rgba(255,255,255,0.9)',
      fontSize: '1rem',
      textAlign: 'center',
      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      background: 'rgba(0,0,0,0.3)',
      padding: '12px 24px',
      borderRadius: '25px',
      backdropFilter: 'blur(10px)'
    }
  };

  // Get photo style with physics
  const getPhotoStyle = (photo) => {
    return {
      ...styles.photo,
      left: `${photo.x}px`,
      top: `${photo.y}px`,
      width: `${photo.width}px`,
      height: `${photo.height}px`,
      zIndex: photo.zIndex,
      transform: `rotate(${photo.rotation}deg) ${dragging?.id === photo.id ? 'scale(1.05)' : 'scale(1)'}`,
      cursor: dragging?.id === photo.id ? 'grabbing' : 'grab'
    };
  };

  return (
    <div 
      ref={containerRef}
      style={styles.container}
      onMouseMove={handleMouseMove}
    >
      <button 
        style={styles.backButton}
        onClick={onBack}
      >
        ← Back
      </button>

      {photos.map(photo => (
        <div
          key={photo.id}
          style={getPhotoStyle(photo)}
          onMouseDown={(e) => handleMouseDown(e, photo.id)}
        >
          <img
            src={photo.src}
            alt={`About me ${photo.id}`}
            style={styles.photoImage}
            draggable={false}
          />
        </div>
      ))}

      <div style={styles.instructions}>
        Drag and throw photos around! 
      </div>
    </div>
  );
};

export default AboutMe;