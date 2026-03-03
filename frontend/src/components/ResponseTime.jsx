'use client';

export default function ResponseTime({ startTime, endTime }) {
  const duration = endTime - startTime;
  const seconds = (duration / 1000).toFixed(2);

  return (
    <div style={styles.container}>
      <span style={styles.icon}>⚡</span>
      <span style={styles.text}>
        Analysis completed in <strong>{seconds}s</strong>
      </span>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '20px',
  },
  text: {
    color: 'white',
    fontSize: '14px',
  },
};
