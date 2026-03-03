'use client';

export default function SharePlan({ data }) {
  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = formatPlanAsText(data);
    navigator.clipboard.writeText(text);
    alert('Action plan copied to clipboard!');
  };

  const formatPlanAsText = (data) => {
    let text = `EMERGENCY ACTION PLAN\n`;
    text += `Risk Level: ${data.risk_level}\n\n`;
    text += `Summary: ${data.risk_summary}\n\n`;
    text += `ACTION STEPS:\n`;
    data.action_plan.forEach(step => {
      text += `${step.step_number}. [${step.priority}] ${step.action} (${step.time_estimate})\n`;
    });
    text += `\nGuidance: ${data.calm_message}\n\n`;
    text += `Resources:\n`;
    data.additional_resources.forEach(resource => {
      text += `- ${resource}\n`;
    });
    return text;
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Share This Plan</h3>
      <div style={styles.buttons}>
        <button onClick={handlePrint} style={styles.button}>
          🖨️ Print Plan
        </button>
        <button onClick={handleCopy} style={styles.button}>
          📋 Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(255,255,255,0.1)',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '24px',
  },
  title: {
    fontSize: '18px',
    color: 'white',
    marginBottom: '16px',
    margin: '0 0 16px 0',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.2)',
    border: '2px solid rgba(255,255,255,0.4)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: '1',
    minWidth: '150px',
  },
};
