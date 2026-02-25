import { useState, useRef, useEffect } from 'react';

const AboutMe = ({ onBack }) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Photo descriptions
  const photoDescriptions = {
    breakfast: {
      title: 'Treats',
      description: 'I love to bake pastries, check out my favorite recipes.'
    },
    dog: {
      title: 'Dog',
      description: 'A furry friend bringing joy and companionship to everyday moments.'
    },
    drink: {
      title: 'Drink',
      description: 'A refreshing beverage to enjoy during a break.'
    },
    ferret: {
      title: 'Ferret',
      description: 'An adorable and playful little companion.'
    },
    fish: {
      title: 'Fish',
      description: 'Beautiful aquatic life captured in a moment.'
    },
    icecream: {
      title: 'Ice Cream',
      description: 'A sweet treat to enjoy on any day.'
    },
    meonabench: {
      title: 'Me on a Bench',
      description: 'A moment of relaxation and reflection.'
    },
    montrealpark: {
      title: 'Montreal Park',
      description: 'Exploring the natural beauty of Montreal\'s parks.'
    },
    popover: {
      title: 'Popover',
      description: 'A delightful baked good, fresh and warm.'
    },
    sealion: {
      title: 'Sea Lion',
      description: 'An incredible marine mammal in its natural habitat.'
    },
    seahorses: {
      title: 'Seahorses',
      description: 'Magical creatures of the ocean, graceful and unique.'
    },
    sewing: {
      title: 'Sewing',
      description: 'Crafting and creating with needle and thread.'
    },
    stingray: {
      title: 'Stingray',
      description: 'A fascinating and graceful sea creature gliding through water.'
    },
    turtle: {
      title: 'Turtle',
      description: 'A slow-moving, gentle creature of wisdom and patience.'
    }
  };

  const photoData = [
    { 
      id: 'breakfast', 
      src: '/images/aboutme/breakfast.png', 
      maxWidth: 200,
      initialX: 100,
      initialY: 100
    },
    { 
      id: 'dog', 
      src: '/images/aboutme/dog.png', 
      maxWidth: 180,
      initialX: 350,
      initialY: 200
    },
    { 
      id: 'drink', 
      src: '/images/aboutme/drink.png', 
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
      maxWidth: 270,
      initialX: 500,
      initialY: 400
    },
    { 
      id: 'icecream', 
      src: '/images/aboutme/icecream.png', 
      maxWidth: 150,
      initialX: 800,
      initialY: 300
    },
    { 
      id: 'meonabench', 
      src: '/images/aboutme/meonabench.png', 
      maxWidth: 250,
      initialX: 300,
      initialY: 300
    },
    { 
      id: 'montrealpark', 
      src: '/images/aboutme/montrealpark.png', 
      maxWidth: 350,
      initialX: 450,
      initialY: 80
    },
    { 
      id: 'popover', 
      src: '/images/aboutme/popover.png', 
      maxWidth: 150,
      initialX: 700,
      initialY: 250
    },
    { 
      id: 'sealion', 
      src: '/images/aboutme/sealion.png', 
      maxWidth: 150,
      initialX: 50,
      initialY: 450
    },
    { 
      id: 'seahorses', 
      src: '/images/aboutme/seahorses.png', 
      maxWidth: 150,
      initialX: 400,
      initialY: 500
    },
    { 
      id: 'sewing', 
      src: '/images/aboutme/sewing.png', 
      maxWidth: 150,
      initialX: 650,
      initialY: 420
    },
    { 
      id: 'stingray', 
      src: '/images/aboutme/stingray.png', 
      maxWidth: 150,
      initialX: 150,
      initialY: 250
    },
    { 
      id: 'turtle', 
      src: '/images/aboutme/turtle.png', 
      maxWidth: 150,
      initialX: 550,
      initialY: 180
    }
  ];

  // Initialize photos with physics properties
  useEffect(() => {
    if (containerSize.width === 0) return;

    const loadImageDimensions = (photoData) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          const width = photoData.maxWidth;
          const height = width * aspectRatio;
          
          resolve({
            ...photoData,
            width,
            height,
            x: Math.min(photoData.initialX, containerSize.width - width),
            y: Math.min(photoData.initialY, containerSize.height - height),
            vx: 0,
            vy: 0,
            mass: (width * height) / 10000,
            zIndex: Math.floor(Math.random() * 100),
          });
        };
        img.onerror = () => {
          resolve({
            ...photoData,
            width: photoData.maxWidth,
            height: photoData.maxWidth,
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
        const friction = 0.98;
        const bounce = 0.7;

        newPhotos.forEach(photo => {
          if (dragging?.id === photo.id) return;

          photo.x += photo.vx;
          photo.y += photo.vy;

          photo.vx *= friction;
          photo.vy *= friction;

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

        for (let i = 0; i < newPhotos.length; i++) {
          for (let j = i + 1; j < newPhotos.length; j++) {
            const photo1 = newPhotos[i];
            const photo2 = newPhotos[j];

            const cx1 = photo1.x + photo1.width / 2;
            const cy1 = photo1.y + photo1.height / 2;
            const cx2 = photo2.x + photo2.width / 2;
            const cy2 = photo2.y + photo2.height / 2;

            const dx = cx2 - cx1;
            const dy = cy2 - cy1;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const minDistance = ((photo1.width + photo1.height) / 4) + ((photo2.width + photo2.height) / 4);

            if (distance < minDistance && distance > 0) {
              const nx = dx / distance;
              const ny = dy / distance;

              const overlap = minDistance - distance;
              const separateX = nx * overlap * 0.5;
              const separateY = ny * overlap * 0.5;

              photo1.x -= separateX;
              photo1.y -= separateY;
              photo2.x += separateX;
              photo2.y += separateY;

              const rvx = photo2.vx - photo1.vx;
              const rvy = photo2.vy - photo1.vy;
              const speed = rvx * nx + rvy * ny;

              if (speed > 0) continue;

              const restitution = 0.8;
              const impulse = 2 * speed / (photo1.mass + photo2.mass);

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
    
    const photo = photos.find(p => p.id === photoId);
    setSelectedPhoto(photo);
    
    setDragging({
      id: photoId,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: Date.now()
    });

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

    newX = Math.max(0, Math.min(newX, containerSize.width - photo.width));
    newY = Math.max(0, Math.min(newY, containerSize.height - photo.height));

    const timeDelta = now - dragging.lastTime;
    if (timeDelta > 0) {
      const vx = (e.clientX - dragging.lastX) / timeDelta * 16;
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
      setPhotos(prev => prev.map(p => 
        p.id === dragging.id 
          ? { 
              ...p, 
              vx: (dragging.velocityX || 0) * 0.5,
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
      overflow: 'hidden',
    },
    photoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      pointerEvents: 'none',
      display: 'block'
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
    },
    sidebar: {
      position: 'fixed',
      right: 0,
      top: 0,
      height: '100vh',
      width: '350px',
      background: 'rgba(20, 20, 20, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 999,
      padding: '30px 24px',
      boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.3)',
      transform: selectedPhoto ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
      overflowY: 'auto',
      color: 'white'
    },
    closeSidebar: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      cursor: 'pointer',
      padding: '0',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
      transition: 'opacity 0.2s ease',
    },
    sidebarTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '16px',
      marginTop: '20px',
      color: 'white'
    },
    sidebarDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.85)',
      marginBottom: '20px'
    }
  };

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

  const getPhotoDescription = () => {
    if (!selectedPhoto) return null;
    return photoDescriptions[selectedPhoto.id] || { title: 'Unknown', description: '' };
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
        Drag and throw photos around! Click to learn more.
      </div>

      <div style={styles.sidebar}>
        <button
          style={styles.closeSidebar}
          onClick={() => setSelectedPhoto(null)}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.7'}
        >
          ✕
        </button>
        {selectedPhoto && (
          <>
            <h2 style={styles.sidebarTitle}>
              {getPhotoDescription().title}
            </h2>
            <p style={styles.sidebarDescription}>
              {getPhotoDescription().description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutMe;