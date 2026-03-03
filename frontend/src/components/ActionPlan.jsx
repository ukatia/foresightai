'use client';

export default function ActionPlan({ data, onReset }) {
  const getRiskColor = (level) => {
    const colors = {
      LOW: '#27ae60',
      MODERATE: '#f39c12',
      HIGH: '#e67e22',
      CRITICAL: '#e74c3c',
    };
    return colors[level] || '#95a5a6';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      CRITICAL: '#e74c3c',
      HIGH: '#e67e22',
      MEDIUM: '#f39c12',
    };
    return colors[priority] || '#95a5a6';
  };

  return (
    <div style={styles.container}>
      <button onClick={onReset} style={styles.backBtn}>
        ← New Emergency
      </button>

      {/* Quick 911 Button */}
      <a href="tel:911" style={styles.call911Button}>
        🚨 Call 911 Now
      </a>

      {/* Risk Assessment */}
      <div style={{...styles.riskCard, borderColor: getRiskColor(data.risk_level)}}>
        <div style={styles.riskHeader}>
          <span style={styles.riskIcon}>⚠️</span>
          <div>
            <h2 style={styles.riskTitle}>Risk Assessment</h2>
            <span style={{...styles.riskLevel, color: getRiskColor(data.risk_level)}}>
              {data.risk_level}
            </span>
          </div>
        </div>
        <p style={styles.riskSummary}>{data.risk_summary}</p>
      </div>

      {/* Calm Message */}
      <div style={styles.calmCard}>
        <span style={styles.calmIcon}>💙</span>
        <p style={styles.calmMessage}>{data.calm_message}</p>
      </div>

      {/* Action Plan */}
      <div style={styles.planSection}>
        <h2 style={styles.planTitle}>📋 Step-by-Step Action Plan</h2>
        <div style={styles.steps}>
          {data.action_plan.map((step) => (
            <div key={step.step_number} style={styles.step}>
              <div style={styles.stepHeader}>
                <span style={styles.stepNumber}>{step.step_number}</span>
                <div style={styles.stepMeta}>
                  <span style={{...styles.priority, background: getPriorityColor(step.priority)}}>
                    {step.priority}
                  </span>
                  <span style={styles.time}>⏱️ {step.time_estimate}</span>
                </div>
              </div>
              <p style={styles.stepAction}>{step.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div style={styles.resourcesCard}>
        <h3 style={styles.resourcesTitle}>📞 Additional Resources</h3>
        <ul style={styles.resourcesList}>
          {data.additional_resources.map((resource, idx) => (
            <li key={idx} style={styles.resourceItem}>{resource}</li>
          ))}
        </ul>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          This plan is AI-generated guidance. Always prioritize your safety and contact emergency services when needed.
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
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '16px',
    fontWeight: '600',
  },
  call911Button: {
    display: 'block',
    padding: '16px',
    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: '24px',
    textAlign: 'center',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(231, 76, 60, 0.4)',
  },
  riskCard: {
    background: '#fff',
    padding: '30px',
    borderRadius: '16px',
    marginBottom: '24px',
    borderLeft: '6px solid',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  riskHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  riskIcon: {
    fontSize: '48px',
  },
  riskTitle: {
    margin: '0 0 8px 0',
    fontSize: '24px',
  },
  riskLevel: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  riskSummary: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    margin: '0',
  },
  calmCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '24px',
    borderRadius: '16px',
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  calmIcon: {
    fontSize: '36px',
  },
  calmMessage: {
    fontSize: '18px',
    lineHeight: '1.6',
    margin: '0',
    fontWeight: '500',
  },
  planSection: {
    background: '#fff',
    padding: '30px',
    borderRadius: '16px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  planTitle: {
    fontSize: '28px',
    marginBottom: '24px',
    margin: '0 0 24px 0',
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  step: {
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '12px',
    border: '2px solid #e9ecef',
  },
  stepHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  stepNumber: {
    width: '36px',
    height: '36px',
    background: '#667eea',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  stepMeta: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  priority: {
    padding: '4px 12px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
  },
  time: {
    fontSize: '14px',
    color: '#666',
  },
  stepAction: {
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0',
    color: '#333',
  },
  resourcesCard: {
    background: '#fff',
    padding: '30px',
    borderRadius: '16px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  resourcesTitle: {
    fontSize: '22px',
    marginBottom: '16px',
    margin: '0 0 16px 0',
  },
  resourcesList: {
    margin: '0',
    paddingLeft: '20px',
  },
  resourceItem: {
    fontSize: '16px',
    lineHeight: '2',
    color: '#555',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '12px',
  },
  footerText: {
    margin: '0',
    color: 'white',
    fontSize: '14px',
  },
};
