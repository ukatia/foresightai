'use client';

export default function ScenarioInput({ onAnalyze, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const scenario = formData.get('scenario');
    const context = formData.get('context');
    const options = formData.get('options').split('\n').filter(o => o.trim());
    
    onAnalyze({ scenario, context, options });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔮 Foresight AI</h1>
      <p style={styles.subtitle}>Simulate decisions before you make them</p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>What decision are you facing?</label>
          <input
            name="scenario"
            placeholder="e.g., Should I accept the job offer?"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Context (optional)</label>
          <textarea
            name="context"
            placeholder="Any relevant background information..."
            rows={3}
            style={styles.textarea}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Your Options (one per line)</label>
          <textarea
            name="options"
            placeholder="Accept the offer&#10;Negotiate for better terms&#10;Decline and stay"
            required
            rows={4}
            style={styles.textarea}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{...styles.button, opacity: loading ? 0.6 : 1}}
        >
          {loading ? '⏳ Analyzing...' : '🚀 Analyze Decision'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  title: {
    fontSize: '48px',
    margin: '0 0 10px 0',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '40px',
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  field: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '16px',
    fontSize: '18px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
