import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    boxSizing: 'border-box'
  },
  backgroundDot: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    backgroundColor: '#a855f7',
    borderRadius: '50%',
    opacity: 0.3
  },
  mainContainer: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '32rem',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  glassCard: {
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '3rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s ease'
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  catEmoji: {
    fontSize: '5rem',
    marginBottom: '1rem',
    display: 'inline-block'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #a855f7, #ec4899, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    lineHeight: '1.1'
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: '1.125rem',
    fontWeight: '300'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  button: {
    position: 'relative',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #9333ea, #ec4899)',
    borderRadius: '16px',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    fontSize: '1rem',
    boxShadow: '0 10px 25px rgba(147, 51, 234, 0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  factCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(71, 85, 105, 0.5)',
    borderRadius: '16px',
    padding: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  },
  factCardHover: {
    borderColor: 'rgba(168, 85, 247, 0.5)',
    boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)'
  },
  decorativeCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
    borderRadius: '50%',
    filter: 'blur(20px)'
  },
  factText: {
    color: '#f1f5f9',
    fontSize: '1.25rem',
    lineHeight: '1.6',
    position: 'relative',
    zIndex: 10,
    margin: 0
  },
  factAuthor: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem'
  },
  authorText: {
    color: '#a855f7',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    color: '#94a3b8',
    fontSize: '0.875rem'
  }
};

// Add keyframes for spinner animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  .pulse-animation {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(styleSheet);

function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [factHover, setFactHover] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
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
      {/* Animated background elements */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              ...styles.backgroundDot,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Main container */}
      <motion.div
        style={styles.mainContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glassmorphism card */}
        <motion.div
          style={styles.glassCard}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <motion.div
            style={styles.headerContainer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              style={styles.catEmoji}
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              🐱
            </motion.div>
            <h1 style={styles.title}>Whisker</h1>
            <p style={styles.subtitle}>Discover amazing cat facts</p>
          </motion.div>

          {/* Button */}
          <motion.div
            style={styles.buttonContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button
              onClick={fetchFact}
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
                ...(isHovering && !loading ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {loading ? (
                <>
                  <div style={styles.spinner} />
                  Fetching...
                </>
              ) : (
                <>
                  ✨ Get Cat Fact
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Fact display */}
          <AnimatePresence mode="wait">
            {fact && !loading && (
              <motion.div
                key={fact}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  style={{
                    ...styles.factCard,
                    ...(factHover ? styles.factCardHover : {})
                  }}
                  onMouseEnter={() => setFactHover(true)}
                  onMouseLeave={() => setFactHover(false)}
                  whileHover={{ 
                    borderColor: "rgba(168, 85, 247, 0.5)",
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative elements */}
                  <motion.div
                    style={styles.decorativeCircle}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <motion.p
                    style={styles.factText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    "{fact}"
                  </motion.p>
                  
                  <motion.div
                    style={styles.factAuthor}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <span style={styles.authorText}>— Cat Wisdom</span>
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
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.p
              className="pulse-animation"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Made by Gunabh Sharan!!✨
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;