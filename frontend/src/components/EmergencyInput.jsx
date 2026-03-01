'use client';

export default function EmergencyInput({ onAnalyze, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    onAnalyze({
      location: formData.get('location'),
      situation: formData.get('situation'),
      photo_description: formData.get('photo_description') || null,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🚨 Emergency Action Planner</h1>
        <p style={styles.subtitle}>AI-powered safety guidance in critical moments</p>
      </div>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>📍 Where are you?</label>
          <input
            name="location"
            placeholder="e.g., Home, Office, Downtown Seattle"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>⚠️ What's happening?</label>
          <textarea
            name="situation"
            placeholder="Describe the emergency situation clearly..."
            required
            rows={5}
            style={styles.textarea}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>📷 Photo context (optional)</label>
          <textarea
            name="photo_description"
            placeholder="Describe what you see in the photo if you have one..."
            rows={2}
            style={styles.textarea}
          />
          <p style={styles.hint}>Future: Upload photo for visual analysis</p>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{...styles.button, opacity: loading ? 0.6 : 1}}
        >
          {loading ? '⏳ Analyzing...' : '🚀 Get Action Plan'}
        </button>

        <p style={styles.disclaimer}>
          ⚠️ For life-threatening emergencies, call 911 immediately
        </p>
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
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '48px',
    margin: '0 0 10px 0',
    color: 'white',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  field: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    margin: '6px 0 0 0',
  },
  button: {
    width: '100%',
    padding: '18px',
    fontSize: '18px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#667eea',
    fontWeight: '600',
    margin: '0',
  },
};
