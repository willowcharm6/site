import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

  const testimonials = [
    { id: 1, name: "Anonymous Nomination for Executive Board", quote: "Charmaine is a fantastic leader. She is organized, direct others wonderfully, and is very devoted to the club. She has hands-on experience manufacturing the harness, and has a good understanding of the electrical systems within the car. This past year, she's developed her skills in PCB design and bring up by working on PDM. I believe that her experience gives her the technical capabilities to guide the development of VCU, PDM and harness. Having worked on the harness for two years, I'm certain that she has many ideas on how to improve the architecture of the car to optimize for manufacturing and maintainability of harness.", time: "1:14.203" },
    { id: 2, name: "Anonymous Nomination for Executive Board", quote: "Charmaine has really impressed me with how she's been tackling the harness. I think that she has recognized the state it's in and has been really driving at leading members of LV to get that work accomplished. She has more board knowledge now having some experience with PDM, and a lot of knowledge about the overall structure of the car from harness. She is also such a people person it's crazy. I think that the chudlings exist in large part because she brought them together. I would love to see what LV or DAQ would look like under her direction.", time: "1:14.550" },
    { id: 3, name: "Anonymous Nomination for Executive Board", quote: "She's so knowledgeable and dedicated to the team and is always willing to do the not so pretty, but necessary work to make our car successful (harness lol). She has amazing people skills and can lead a group of people really well. She would be an amazing asset to the exec board next year.", time: "1:15.012" },
    // { id: 4, name: "Manufacturing Lead", quote: "Design for manufacturing was spot on this season.", time: "1:15.889" }
  ];

const LapTimerBoard = () => {
    const styles = {
      board: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#00ff00', // Classic "Racing Green" or Matrix-style digital green
        fontFamily: '"Courier New", Courier, monospace',
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #333',
        width: '100%',
        maxWidth: '900px',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)',
        marginTop: '30px'
      },
      header: {
        borderBottom: '1px solid #333',
        paddingBottom: '10px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        color: '#aaa'
      },
      row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid #222'
      },
      name: {
        fontWeight: 'bold',
        width: '30%'
      },
      quote: {
        fontSize: '0.9rem',
        fontStyle: 'italic',
        color: '#fff',
        width: '50%',
        paddingRight: '10px'
      },
      time: {
        color: '#ffff00', // Yellow for the "time"
        width: '20%',
        textAlign: 'right'
      }
    };

    return (
      <div style={styles.board}>
        <div style={styles.header}>
          <span>Pos / Driver</span>
          <span>Review / Feedback</span>
          <span>Lap Time</span>
        </div>
        {testimonials.map((t, index) => (
          <div key={t.id} style={styles.row}>
            <span style={styles.name}>{index + 1}. {t.name}</span>
            <span style={styles.quote}>"{t.quote}"</span>
            <span style={styles.time}>{t.time}</span>
          </div>
        ))}
      </div>
    );
  };

const FormulaPage = () => {
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      title: "Fall 2025",
      description: "Joined Formula on the Power Distribution Subteam",
      top: '2%',
      left: '45%',
      rotation: -8,
      scale: -1,
      offsetY: 6
    },
    {
      id: 2,
      title: "Design - Winter 25",
      description: "Designed the back box harness using RapidHarness. Information from signals was set by discussing with the DAQ team to determine what signals each board in the box required.",
      images: ["/images/formula/25/rapidback1-25.png", "/images/formula/25/rapidback2-25.png"],
      top: '40%',
      left: '8%',
      rotation: 32,
      offsetX: 18
    },
    {
      id: 3,
      title: "External Manufacturing - Spring 25",
      description: [
        "Manufactured the roll hoop external harness which involves the shutdown circuit.",
        "Manufactured parts of the external harness including thermistors to the motor, signals from dashbox to external, signals from the low voltage box to external, and signals from the high voltage box to external.",
        "Set the pinouts for the pigtails used externally with a What's that Pin spreadsheet to determine where signals come from internally."
      ],  
      images: ["/images/formula/25/dashbox-on-car-25.JPG", 
        "/images/formula/25/connectors-25.JPG",  
        "/images/formula/25/rollhoop-25.jpg", 
        "/images/formula/25/WTP1-25.png", 
        "/images/formula/25/WTP2-25.png", 
        "/images/formula/25/WTP3-25.png"],    
      top: '92%',
      left: '55%',
      rotation: 10,
      offsetY: -8
    },
    {
      id: 4,
      title: "Internal Manufacturing - Spring 25",
      description: ["Manufactured the dash box internal harness to be removed when necessary.",
        "Manufactured the back box internal harness"],
      images: ["/images/formula/25/back-box-25.JPG", "/images/formula/25/dashbox-25.JPG"],
      top: '50%',
      left: '92%',
      rotation: 70,
      scale: -1,
      offsetX: -5
    }
  ];

  const [carPos, setCarPos] = useState({ top: '13%', left: '70%', rotate: 35, scale: -1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);


  const handleConeClick = (project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
      return;
    }

    const topNum = parseFloat(project.top);
    const leftNum = parseFloat(project.left);
    
    const isOnRightSide = leftNum > 50;
    console.log(`Project ${project.id} is on the ${isOnRightSide ? 'right' : 'left'} side of the track.`);
    const boxXTransform = isOnRightSide ? '-115%' : '15%';

    setCarPos({
      top: `${topNum + (project.offsetY || 5)}%`,
      left: `${leftNum + (project.offsetX || 0)}%`,
      rotate: project.rotation,
      scale: project.scale || 1
    });
    setSelectedProject({...project, boxTransform: boxXTransform});
  };

  
  const styles = {
    container: {
      width: '100vw',
    minHeight: '100vh', // Changed from height: '100vh'
    backgroundColor: '#ffffff', // Explicit white
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'auto', // Allows scrolling down to the board
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    paddingBottom: '100px' // Space at the very bottom
    },
    title: { 
      color: 'black', 
      zIndex: 10,
      fontSize: 'calc(1rem + 2vw)',
      textAlign: 'center',
      margin: '40px 0 20px 0'
    },
    backButton: {
      position: 'fixed',
      top: '20px',
      left: '20px',
      padding: '10px 20px',
      cursor: 'pointer',
      zIndex: 500,
      backgroundColor: 'white',
      color: 'black'
    },
    trackContainer: {
      position: 'relative',
      width: '50%',
      // height: '70%',
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
    },
    trackImage: { 
      width: '100%', 
      height: 'auto', 
      objectFit: 'contain' 
    },
    car: {
      position: 'absolute',
      width: '32%',
      height: 'auto',
      transition: 'all 0.8s ease-in-out',
      transform: `translate(-50%, -50%) rotate(${carPos.rotate}deg) scaleX(${carPos.scale})`,
      left: carPos.left,
      top: carPos.top,
      zIndex: 5,
      pointerEvents: 'none' 
    },
    cone: {
      position: 'absolute',
      width: '8%',
      cursor: 'pointer',
      transform: 'translate(-50%, -50%)',
      zIndex: 4,
    },
    infoBox: {
      position: 'absolute',
      padding: '12px',
      width: '400px',
      textAlign: 'left',
      borderRadius: '12px',
      backgroundColor: 'rgba(30, 0, 42, 0.98)',
      zIndex: 10,
      boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      border: '1px solid #ccc',
      color: 'white' 
    },
    imageGallery: {
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '5px'
    },
    projectImage: {
      width: '100%', 
      minWidth: '180px',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '6px',
      backgroundColor: '#f0f0f0',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    overlay: {
      position: 'fixed', 
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(128, 128, 128, 0.7)', 
      backdropFilter: 'blur(8px)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3000, 
      cursor: 'zoom-out'
    },
    fullscreenImg: {
      width: '50%', 
      height: 'auto', 
      objectFit: 'contain',
      borderRadius: '12px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      border: '6px solid white',
      backgroundColor: 'white' 
    },
    closeButton: {
      position: 'absolute',
      top: '30px',      
      right: '30px',    
      background: 'white',
      border: 'none',
      borderRadius: '20%',
      width: '40px',
      height: '40px',
      color: 'black',
      fontSize: '28px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      zIndex: 3001 // Ensure it sits above the image
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}> ← Back</button>

      <h1 style={styles.title}>2025 FSAE Projects</h1>

      <div style={styles.trackContainer}>

        <img src="/images/formula/racetrack.png" alt="Racetrack" style={styles.trackImage} />

        {projects.map((proj) => (
          <img
            key={proj.id}
            src="/images/formula/cone.png"
            alt="Cone"
            style={{ ...styles.cone, top: proj.top, left: proj.left }}
            onClick={() => handleConeClick(proj)}
          />
        ))}

        <img src="/images/formula/car.png" alt="Race car" style={styles.car} />

        {selectedProject && (
          <div style={{
            ...styles.infoBox,
            top: selectedProject.top,
            left: selectedProject.left,
            transform: `translate(${selectedProject.boxTransform}, -50%)`
          }}>
            <div style={styles.imageGallery}>
              {selectedProject.images && selectedProject.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="project"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenImage(imgSrc);
                  }}
                  style={styles.projectImage}
                />
              ))}
            </div>

            <h4 style={{ margin: 0 }}>{selectedProject.title}</h4>
            {/* Check if description is an array to render bullets, otherwise render as text */}
            {Array.isArray(selectedProject.description) ? (
              <ul style={{ 
                margin: 0, 
                paddingLeft: '18px', 
                fontSize: '13px', 
                color: '#ffffff',
                textAlign: 'left' // Ensures bullets align correctly
              }}>
                {selectedProject.description.map((point, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, fontSize: '13px', color: '#ffffff' }}>
                  {selectedProject.description}
              </p>
            )}
          </div>
        )}
      </div>

      <LapTimerBoard />

      {/* Fullscreen Overlay */}
      {fullscreenImage && (
        <div style={styles.overlay} onClick={() => setFullscreenImage(null)}>
          <button 
            style={styles.closeButton} 
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
            }}
          >
            &times;
          </button>
          
          <img 
            src={fullscreenImage} 
            style={styles.fullscreenImg} 
            onClick={(e) => e.stopPropagation()} 
            alt="Fullscreen" 
          />
        </div>
      )}
    </div>
  );
};



export default FormulaPage;