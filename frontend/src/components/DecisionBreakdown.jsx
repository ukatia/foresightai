'use client';

export default function DecisionBreakdown({ data, onSimulate }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Decision Analysis</h2>
      <p style={styles.scenario}>{data.scenario}</p>

      <div style={styles.optionsGrid}>
        {data.simulations.map((sim, idx) => (
          <div key={idx} style={styles.card}>
            <h3 style={styles.optionTitle}>{sim.option}</h3>
            
            <div style={styles.score}>
              <span style={styles.scoreLabel}>Score:</span>
              <span style={styles.scoreValue}>{sim.recommendation_score}/10</span>
            </div>

            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>✅ Pros</h4>
              <ul style={styles.list}>
                {sim.pros.map((pro, i) => <li key={i}>{pro}</li>)}
              </ul>
            </div>

            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>❌ Cons</h4>
              <ul style={styles.list}>
                {sim.cons.map((con, i) => <li key={i}>{con}</li>)}
              </ul>
            </div>

            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>⚠️ Risks</h4>
              <ul style={styles.list}>
                {sim.risks.map((risk, i) => <li key={i}>{risk}</li>)}
              </ul>
            </div>

            <button 
              onClick={() => onSimulate(sim)}
              style={styles.simulateBtn}
            >
              🎯 Simulate This Option
            </button>
          </div>
        ))}
      </div>

      <div style={styles.recommendation}>
        <h3 style={styles.recTitle}>💡 Recommendation</h3>
        <p style={styles.recOption}>{data.overall_recommendation}</p>
        <p style={styles.recReasoning}>{data.reasoning}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  scenario: {
    fontSize: '18px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '40px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  optionTitle: {
    fontSize: '20px',
    marginBottom: '16px',
    color: '#333',
  },
  score: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  scoreLabel: {
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  list: {
    margin: '0',
    paddingLeft: '20px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  simulateBtn: {
    width: '100%',
    padding: '12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  recommendation: {
    background: '#f0f7ff',
    padding: '30px',
    borderRadius: '12px',
    border: '2px solid #667eea',
  },
  recTitle: {
    fontSize: '24px',
    marginBottom: '12px',
  },
  recOption: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#667eea',
    marginBottom: '12px',
  },
  recReasoning: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
  },
};
