const Courses = ({ onBack }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: '#faf9f6',
      padding: '40px',
      boxSizing: 'border-box'
    },
    backButton: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10,
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    header: {
      marginBottom: '60px'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '300',
      color: '#2d3748',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#6b7280',
      fontWeight: '300'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      maxWidth: '1200px'
    },
    box: {
      background: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    boxTitle: {
      fontSize: '1.8rem',
      fontWeight: '400',
      color: '#2d3748',
      marginBottom: '25px',
      borderBottom: '2px solid #2d3748',
      paddingBottom: '15px'
    },
    courseItem: {
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '1px solid #f3f4f6'
    },
    courseName: {
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#4a5568',
      marginBottom: '5px'
    },
    courseDescription: {
      fontSize: '0.95rem',
      color: '#6b7280',
      lineHeight: '1.5'
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={onBack}
      >
        ← Back
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>Course Menu</h1>
        <p style={styles.subtitle}>A curated selection of my academic journey</p>
      </div>

      <div style={styles.grid}>
        {/* Appetizers - Top Left */}
        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Appetizers: Minor in Cognitive Science</h2>
          
          <div style={styles.courseItem}>
            <div style={styles.courseName}>Psych 205: Research Methods in Psychology</div>
            <div style={styles.courseDescription}>
              What does psychology look like in practice? How does one uncover psychological phenomena? What are the controversies in the field of psychology, and how might we as researchers overcome them? This course covers the how of psychological research.
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Psych 373: Decision Making</div>
            <div style={styles.courseDescription}>
              Focus on human decision making from both descriptive and prescriptive perspectives. Theories and models of decision making will be evaluated and applied to a variety of contexts. Topics to be discussed include how people consider alternatives, make predictions and estimations, and evaluate possibilities.
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Cog Sci 110: Introduction to Cognitive Science</div>
            <div style={styles.courseDescription}>
              How Cognitive Science integrates theoretical and empirical perspectives from different fields to study the mind, brain, and intelligence, exemplified by interdisciplinary work conducted at Northwestern University.
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>LOC 313: Learning and Thinking in Organizations</div>
            <div style={styles.courseDescription}>
              Learning & Thinking in Organizations explores human judgment and decision making under conditions of uncertainty. You will learn to recognize recurring patterns in your own cognition and that of the people around you, and examine the ways those tendencies can lead people to better or worse courses of action. 
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Music 320: Listening in the Age of the Algorithm</div>
            <div style={styles.courseDescription}>
              Whether it's the movies we watch, the flights we buy, the goods we buy, or the music we listen to, algorithmic recommendation is changing how we experience the world around us. This class explores what it means to listen to music in an age of computational curation. As these systems are meant to model human preference, we will study what it means to have musical preferences, perceived musical features as similar, and what the role of social interactions on our own listening behaviors. 
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Cog Sci 207: Introduction to Cognitive Modeling</div>
            <div style={styles.courseDescription}>
              Learn how to think about cognitive models, i.e. computational models of aspects of cognition. 
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Phil 150: Elementary Logic I</div>
            <div style={styles.courseDescription}>
              This course acquaints students with both the power and limitations of formal deductive logic. We want true premises to lead to true conclusions---that is, we want the truth of the conclusions to follow from the truth of the premises. 
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Phil 250: Elementary Logic II</div>
            <div style={styles.courseDescription}>
              This second course in logic explores ways to extend and vary the systems developed in Phil 150. In 150, truth-functional logic assumed every sentence is either true or false but not both. What if, however, there were a third truth value? Or what if sentences could be both true and false at the same time, or neither?
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Phil 350: Advanced Logic</div>
            <div style={styles.courseDescription}>
              This course covers advanced topics in logic, including modal logic, intuitionistic logic, and the relationship between logic and language.
            </div>
          </div>

        </div>

        {/* Sides - Top Right */}
        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Sides: Theme and Electives</h2>
          
          <div style={styles.courseItem}>
            <div style={styles.courseName}>EE 202: Introduction to Electrical Engineering</div>
            <div style={styles.courseDescription}>
              {/* Arrays, linked lists, trees, and algorithm analysis */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Stat 202: Introduction to Statistics and Data Science</div>
            <div style={styles.courseDescription}>
              {/* Matrices, vector spaces, and transformations */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Chinese 115-1: Chinese I - Accelerated</div>
            <div style={styles.courseDescription}>
              First-quarter course of the accelerated beginning college-level sequence to develop basic literacy and oral proficiency in Chinese.
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Chinese 115-2: Chinese I - Accelerated</div>
            <div style={styles.courseDescription}>
              Second-quarter course of the accelerated beginning college-level sequence to develop basic literacy and oral proficiency in Chinese.
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Chinese 115-3: Chinese I - Accelerated</div>
            <div style={styles.courseDescription}>
              Third-quarter course of the accelerated beginning college-level sequence to develop basic literacy and oral proficiency in Chinese.
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Asian LC 290: Introductory Topics in Asian Languages and Cultures</div>
            <div style={styles.courseDescription}>
              This course provides an overview of the major languages and cultures of Asia, with a focus on their historical development and contemporary significance.
            </div>
          </div>
          

        </div>

        {/* Main Course 1 - Bottom Left */}
        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Materials Science and Engineering Double Major</h2>
          
          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 301: Introduction to Materials Science and Engineering Principles</div>
            <div style={styles.courseDescription}>
              {/* Full-stack development with React, Node.js, and databases */}
              </div>
          </div>
    
          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 302: Introduction to Materials Laboratories</div>
            <div style={styles.courseDescription}>
              {/* Neural networks, deep learning, and AI applications */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 314: Thermodynamics of Materials</div>
            <div style={styles.courseDescription}>
              {/* Agile development, testing, and project management */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 315: Phase Equilibria and Diffusion of Materials</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 316-1: Microstructual Dynamics</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 316-2: Microstructual Dynamics</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 351-2: Introductory Physics of Materials</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 391: Process Design</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 332: Mechanical Behavior of Solids</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>
          
          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 396-1: Senior Project in Materials Science and Engineering</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 3331: Soft Materials</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 361: Crystallography and Diffraction</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>MSE 396-2: Senior Project in Materials Science and Engineering</div>
            <div style={styles.courseDescription}>
              {/* 3D rendering, shaders, and visual computing */}
            </div>
          </div>

        </div>

        {/* Main Course 2 - Bottom Right */}
        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Main Course: Mathematics Double Major</h2>
          
          <div style={styles.courseItem}>
            <div style={styles.courseName}>Math 228-1: Multivariable Differential Calculus for Engineering</div>
            <div style={styles.courseDescription}>
              {/* SQL, NoSQL, and database design principles */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Math 228-2: Multivariable Integral Calculus for Engineering</div>
            <div style={styles.courseDescription}>
              {/* Processes, memory management, and system calls */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Math 300: Foundations of Higher Mathematics</div>
            <div style={styles.courseDescription}>
              {/* Interaction design and usability evaluation */}
            </div>
          </div>

          <div style={styles.courseItem}>
            <div style={styles.courseName}>Mobile App Development</div>
            <div style={styles.courseDescription}>
              iOS and Android development frameworks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;