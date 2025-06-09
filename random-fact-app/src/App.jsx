import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f23 50%, #000000 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    boxSizing: 'border-box'
  },
  backgroundOrb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)',
    zIndex: 1
  },
  mainContainer: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '40rem',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  glassCard: {
    backdropFilter: 'blur(40px)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '32px',
    padding: '3.5rem',
    boxShadow: `
      0 32px 64px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 100px rgba(147, 51, 234, 0.3)
    `,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  },
  cardShine: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease'
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '3.5rem',
    position: 'relative'
  },
  catEmoji: {
    fontSize: '6rem',
    marginBottom: '1.5rem',
    display: 'inline-block',
    filter: 'drop-shadow(0 8px 32px rgba(147, 51, 234, 0.6))',
    position: 'relative'
  },
  catGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1
  },
  title: {
    fontSize: '4.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)',
    backgroundSize: '300% 300%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem',
    lineHeight: '1',
    letterSpacing: '-0.02em',
    textShadow: '0 0 30px rgba(255, 107, 107, 0.5)'
  },
  subtitle: {
    color: '#e2e8f0',
    fontSize: '1.25rem',
    fontWeight: '300',
    opacity: 0.9,
    letterSpacing: '0.5px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem'
  },
  button: {
    position: 'relative',
    padding: '1.25rem 3rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    fontWeight: '700',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    fontSize: '1.1rem',
    boxShadow: `
      0 20px 40px rgba(102, 126, 234, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'inherit'
  },
  buttonGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1
  },
  buttonContent: {
    position: 'relative',
    zIndex: 2
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  spinner: {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  factCard: {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '24px',
    padding: '2.5rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
  },
  factGradientBorder: {
    position: 'absolute',
    inset: 0,
    padding: '2px',
    background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
    borderRadius: '24px',
    zIndex: -1
  },
  factInner: {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
    borderRadius: '22px',
    height: '100%',
    width: '100%'
  },
  decorativeElements: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    borderRadius: '24px'
  },
  floatingShape: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
    filter: 'blur(20px)'
  },
  factText: {
    color: '#f8fafc',
    fontSize: '1.4rem',
    lineHeight: '1.7',
    position: 'relative',
    zIndex: 10,
    margin: 0,
    fontWeight: '400',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
  },
  factAuthor: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
    position: 'relative',
    zIndex: 10
  },
  authorText: {
    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '1rem',
    fontWeight: '600',
    fontStyle: 'italic'
  },
  footer: {
    textAlign: 'center',
    marginTop: '3rem',
    color: '#cbd5e1',
    fontSize: '1rem',
    fontWeight: '300'
  },
  magicSparkle: {
    position: 'absolute',
    color: '#feca57',
    fontSize: '1.5rem',
    pointerEvents: 'none',
    zIndex: 20
  }
};

// Enhanced CSS with more animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
  }
  
  @keyframes scrollbarGlow {
    0%, 100% { 
      background: linear-gradient(45deg, #667eea, #764ba2);
      box-shadow: 0 0 15px rgba(102, 126, 234, 0.6);
    }
    50% { 
      background: linear-gradient(45deg, #ff6b6b, #feca57);
      box-shadow: 0 0 25px rgba(255, 107, 107, 0.8);
    }
  }
  
  .gradient-animation {
    animation: gradientShift 4s ease infinite;
  }
  
  .floating-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  .sparkle-animation {
    animation: sparkle 2s ease-in-out infinite;
  }
  
  /* Enhanced Scrollbar */
  ::-webkit-scrollbar {
    width: 14px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.9);
    border-radius: 12px;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 12px;
    border: 2px solid rgba(15, 23, 42, 0.5);
    animation: scrollbarGlow 4s ease-in-out infinite;
    transition: all 0.3s ease;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    box-shadow: 0 0 30px rgba(255, 107, 107, 1);
    transform: scale(1.1);
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;
document.head.appendChild(styleSheet);

function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2000);
  };

  const fetchFact = async () => {
    setLoading(true);
    createSparkles();
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      setFact('Failed to fetch fact 😿');
      console.error('Error fetching fact:', error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Dynamic Background Orbs */}
      <motion.div
        style={{
          ...styles.backgroundOrb,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
          top: '10%',
          left: '10%'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div
        style={{
          ...styles.backgroundOrb,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -40, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          style={{
            ...styles.magicSparkle,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 1.5, delay: sparkle.delay }}
        >
          ✨
        </motion.div>
      ))}

      {/* Main Container */}
      <motion.div
        style={styles.mainContainer}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Glass Card */}
        <motion.div
          style={styles.glassCard}
          whileHover={{ 
            scale: 1.02,
            boxShadow: `
              0 40px 80px rgba(0, 0, 0, 0.6),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              0 0 120px rgba(102, 126, 234, 0.5)
            `
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          onHoverStart={() => {
            // Trigger shine effect
            const shineEl = document.querySelector('.card-shine');
            if (shineEl) shineEl.style.left = '100%';
          }}
          onHoverEnd={() => {
            const shineEl = document.querySelector('.card-shine');
            if (shineEl) shineEl.style.left = '-100%';
          }}
        >
          <div className="card-shine" style={styles.cardShine} />
          
          {/* Header */}
          <motion.div
            style={styles.headerContainer}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={styles.catGlow} />
              <motion.div
                style={styles.catEmoji}
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="floating-animation"
              >
                🐱
              </motion.div>
            </div>
            
            <motion.h1 
              style={styles.title}
              className="gradient-animation"
              whileHover={{ scale: 1.05 }}
            >
              Bella
            </motion.h1>
            <p style={styles.subtitle}>Discover magical cat wisdom</p>
          </motion.div>

          {/* Button */}
          <motion.div
            style={styles.buttonContainer}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
          >
            <motion.button
              onClick={fetchFact}
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {})
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `
                  0 25px 50px rgba(102, 126, 234, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div style={styles.buttonGradientOverlay} />
              <div style={styles.buttonContent}>
                {loading ? (
                  <>
                    <div style={styles.spinner} />
                    Summoning Magic...
                  </>
                ) : (
                  <>
                    🌟 Reveal Cat Wisdom
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>

          {/* Fact Display */}
          <AnimatePresence mode="wait">
            {fact && !loading && (
              <motion.div
                key={fact}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  style={styles.factCard}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={styles.factGradientBorder}>
                    <div style={styles.factInner} />
                  </div>
                  
                  <div style={styles.decorativeElements}>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        style={{
                          ...styles.floatingShape,
                          width: `${60 + i * 20}px`,
                          height: `${60 + i * 20}px`,
                          top: `${20 + i * 30}%`,
                          right: `${10 + i * 15}%`
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.5, 0.2],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                      />
                    ))}
                  </div>
                  
                  <motion.p
                    style={styles.factText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    "{fact}"
                  </motion.p>
                  
                  <motion.div
                    style={styles.factAuthor}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <span style={styles.authorText}>— Ancient Cat Wisdom</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            style={styles.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Developed by Gunabh Sharan!!✨
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;