'use client';

export default function OutcomePrediction({ option, onBack }) {
  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>
        ← Back to Analysis
      </button>

      <div style={styles.hero}>
        <h1 style={styles.title}>🎯 Outcome Simulation</h1>
        <h2 style={styles.optionName}>{option.option}</h2>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.icon}>📊</span>
            <h3 style={styles.cardTitle}>Probability</h3>
          </div>
          <p style={styles.probability}>{option.probability}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.icon}>⭐</span>
            <h3 style={styles.cardTitle}>Recommendation Score</h3>
          </div>
          <p style={styles.score}>{option.recommendation_score}/10</p>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>✅ Positive Outcomes</h3>
        <div style={styles.outcomeList}>
          {option.pros.map((pro, i) => (
            <div key={i} style={styles.outcomeItem}>
              <span style={styles.bullet}>•</span>
              <span>{pro}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>❌ Negative Outcomes</h3>
        <div style={styles.outcomeList}>
          {option.cons.map((con, i) => (
            <div key={i} style={styles.outcomeItem}>
              <span style={styles.bullet}>•</span>
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>⚠️ Risk Factors</h3>
        <div style={styles.riskList}>
          {option.risks.map((risk, i) => (
            <div key={i} style={styles.riskItem}>
              <span style={styles.riskIcon}>⚠️</span>
              <span>{risk}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          This simulation is based on AI analysis. Use it as guidance, not absolute truth.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  backBtn: {
    padding: '10px 20px',
    background: '#f5f5f5',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '30px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '42px',
    margin: '0 0 20px 0',
  },
  optionName: {
    fontSize: '28px',
    color: '#667eea',
    fontWeight: '600',
    margin: '0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '24px',
  },
  cardTitle: {
    fontSize: '16px',
    margin: '0',
    color: '#666',
  },
  probability: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '0',
  },
  score: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '0',
  },
  section: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '22px',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  outcomeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  outcomeItem: {
    display: 'flex',
    gap: '12px',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  bullet: {
    color: '#667eea',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  riskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  riskItem: {
    display: 'flex',
    gap: '12px',
    fontSize: '16px',
    lineHeight: '1.6',
    padding: '12px',
    background: '#fff3cd',
    borderRadius: '8px',
  },
  riskIcon: {
    fontSize: '20px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px',
    background: '#f5f5f5',
    borderRadius: '8px',
  },
  footerText: {
    margin: '0',
    color: '#666',
    fontSize: '14px',
  },
};
