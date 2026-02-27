import { useState } from 'react';

const FormulaPage = ({ onBack }) => {
  const projects = [
    {
      id: 1,
      title: "Fall 2025",
      description: "Joined Formula on the Power Distribution Subteam",
      top: '2%',
      left: '45%',
      rotation: -10,
      scale: -1 
    },
    {
      id: 2,
      title: "Suspension Geometry",
      description: "Optimized roll centers and camber gain...",
      top: '50%',
      left: '75%',
      rotation: 70,
      scale: -1,
      offsetX: -5
    },
    {
      id: 3,
      title: "Aerodynamics",
      description: "CFD analysis of the front wing...",
      top: '72%',
      left: '55%',
      rotation: 10,
      offsetY: 14
    },
    {
      id: 4,
      title: "Data Acquisition",
      description: "Implemented real-time sensor logging...",
      top: '40%',
      left: '25%',
      rotation: 38,
      offsetX: 10
    }
  ];

  const [carPos, setCarPos] = useState({ 
    top: '15%', 
    left: '50%', 
    rotate: 0, 
    scale: 1 
  });
  const [selectedProject, setSelectedProject] = useState(null);

  const handleConeClick = (project) => {
    const topNum = parseFloat(project.top);
    const leftNum = parseFloat(project.left);
    
    setCarPos({
      top: `${topNum + (project.offsetY || 5)}%`,
      left: `${leftNum + (project.offsetX || 0)}%`,
      rotate: project.rotation,
      scale: project.scale || 1
    });
    setSelectedProject(project);
  };

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: 'white',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '10px 20px',
      cursor: 'pointer',
      zIndex: 100
    },
    trackContainer: {
      position: 'relative',
      width: '80%',
      height: '70%',
      marginTop: '60px',
    },
    trackImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    car: {
      position: 'absolute',
      width: '17%',
      height: 'auto',
      transition: 'all 0.8s ease-in-out',
      transform: `translate(-50%, -50%) rotate(${carPos.rotate}deg) scaleX(${carPos.scale})`,
      left: carPos.left,
      top: carPos.top,
      zIndex: 5
    },
    cone: {
      position: 'absolute',
      width: '5%',
      cursor: 'pointer',
      transform: 'translate(-50%, -50%)',
      zIndex: 4,
      filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.2))'
    },
    infoBox: {
      position: 'absolute', // Now absolute relative to trackContainer
      padding: '15px',
      width: '200px', // Smaller width to fit better on track
      textAlign: 'left',
      border: '1px solid #333',
      borderRadius: '8px',
      backgroundColor: 'rgba(31, 0, 48, 0.95)', // Semi-transparent
      zIndex: 10,
      pointerEvents: 'none', // Allows clicking through if necessary
      boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>← Back to Shelf</button>
      
      <h1>FSAE Projects</h1>

      <div style={styles.trackContainer}>
        <img 
          src="/images/formula/racetrack.png" 
          alt="Racetrack" 
          style={styles.trackImage} 
        />

        {projects.map((proj) => (
          <img
            key={proj.id}
            src="/images/formula/cone.png"
            alt="Cone"
            style={{ ...styles.cone, top: proj.top, left: proj.left }}
            onClick={() => handleConeClick(proj)}
          />
        ))}

        <img 
          src="/images/formula/car.png" 
          alt="Race car" 
          style={styles.car} 
        />

        {/* Info Box is now INSIDE the track container */}
        {selectedProject && (
          <div style={{ 
            ...styles.infoBox, 
            top: selectedProject.top, 
            left: selectedProject.left,
            // Adjust transform so the box doesn't sit exactly ON the cone
            transform: 'translate(20%, -50%)' 
          }}>
            <h4 style={{ margin: '0 0 5px 0' }}>{selectedProject.title}</h4>
            <p style={{ margin: 0, fontSize: '14px' }}>{selectedProject.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormulaPage;